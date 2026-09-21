/* 基于 React Bits Aurora（JS + CSS 变体，MIT）扩展：
   1) lightMode 保留但主站使用默认模式（半透明彩带叠在浅色渐变底上，无黑色背景）
   2) 新增 uMouse / uMouseActive uniform：鼠标经过处波浪强度升高、彩带饱和度提高（波浪式色彩追踪） */
import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import { useEffect, useRef } from 'react';

import './Aurora.css';

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
uniform float uLightMode;
uniform vec2 uMouse;
uniform float uMouseActive;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ),
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {              \\
  int index = 0;                                            \\
  for (int i = 0; i < 2; i++) {                               \\
     ColorStop currentColor = colors[i];                    \\
     bool isInBetween = currentColor.position <= factor;    \\
     index = int(mix(float(index), float(i), float(isInBetween))); \\
  }                                                         \\
  ColorStop currentColor = colors[index];                   \\
  ColorStop nextColor = colors[index + 1];                  \\
  float range = nextColor.position - currentColor.position; \\
  float lerpFactor = (factor - currentColor.position) / range; \\
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \\
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);

  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);

  /* 鼠标波浪追踪：以纵横比校正距离，鼠标波及范围内波浪增强、饱和度提高 */
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 md = vec2((uv.x - uMouse.x) * aspect, uv.y - uMouse.y);
  float mglow = smoothstep(0.55, 0.0, length(md)) * uMouseActive;

  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height * (1.0 + mglow * 0.35);

  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);

  /* 原有彩色基础上，鼠标附近提高饱和度（mix 系数 > 1 即过饱和外推） */
  float luma = dot(clamp(rampColor, 0.0, 1.0), vec3(0.2126, 0.7152, 0.0722));
  vec3 satColor = mix(vec3(luma), rampColor, 1.0 + mglow * 1.4);
  vec3 auroraColor = intensity * clamp(satColor, 0.0, 2.0);

  if (uLightMode > 0.5) {
    float energy = clamp(max(intensity, 0.0), 0.0, 1.0);
    float coverage = clamp(auroraAlpha * (0.55 + 0.45 * energy), 0.0, 0.86);
    vec3 chroma = pow(clamp(satColor, 0.0, 1.0), vec3(1.2));
    float chromaPeak = max(chroma.r, max(chroma.g, chroma.b));
    chroma /= max(chromaPeak, 0.0001);
    fragColor = vec4(mix(vec3(1.0), chroma, min(coverage * 1.08, 0.94)), 1.0);
  } else {
    fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
  }
}
`;

export default function Aurora(props) {
  const { colorStops = ['#5227FF', '#7cff67', '#5227FF'], amplitude = 1.0, blend = 0.5, lightMode = false } = props;
  const propsRef = useRef(props);
  propsRef.current = props;

  const ctnDom = useRef(null);

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;

    /* WebGL 不可用时静默降级：仅保留渐变底色，不影响页面其余部分 */
    let renderer, gl, program, mesh;
    try {
      renderer = new Renderer({
        alpha: true,
        premultipliedAlpha: true,
        antialias: true
      });
      gl = renderer.gl;
      if (!gl) throw new Error('WebGL context unavailable');
      gl.clearColor(0, 0, 0, 0);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.canvas.style.backgroundColor = 'transparent';
    } catch (err) {
      console.warn('Aurora: WebGL unavailable, fallback to gradient background.');
      return undefined;
    }

    function resize() {
      if (!ctn) return;
      const width = ctn.offsetWidth;
      const height = ctn.offsetHeight;
      renderer.setSize(width, height);
      if (program) {
        program.uniforms.uResolution.value = [width, height];
      }
    }
    window.addEventListener('resize', resize);

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    const colorStopsArray = colorStops.map(hex => {
      const c = new Color(hex);
      return [c.r, c.g, c.b];
    });

    try {
      program = new Program(gl, {
        vertex: VERT,
        fragment: FRAG,
        uniforms: {
          uTime: { value: 0 },
          uAmplitude: { value: amplitude },
          uColorStops: { value: colorStopsArray },
          uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
          uBlend: { value: blend },
          uLightMode: { value: lightMode ? 1 : 0 },
          uMouse: { value: [0.62, 0.62] },
          uMouseActive: { value: 0 }
        }
      });
      mesh = new Mesh(gl, { geometry, program });
      ctn.appendChild(gl.canvas);
    } catch (err) {
      console.warn('Aurora: shader init failed, fallback to gradient background.', err);
      window.removeEventListener('resize', resize);
      return undefined;
    }

    /* 鼠标波浪追踪：全局监听指针，换算为容器内归一化坐标（y 轴向上），
       缓动跟随 + 出界淡出；触屏设备不启用 */
    let tx = 0.62, ty = 0.55, mx = tx, my = ty;
    let active = 0, activeTarget = 0;
    let hoverSupported = !window.matchMedia('(hover: none)').matches;

    const onMove = (e) => {
      const r = ctn.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      activeTarget = inside ? 1 : 0;
      if (inside || active > 0.01) {
        tx = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
        ty = 1 - Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
      }
    };
    if (hoverSupported) document.addEventListener('pointermove', onMove, { passive: true });

    let animateId = 0;
    const update = t => {
      animateId = requestAnimationFrame(update);
      const { time = t * 0.01, speed = 1.0 } = propsRef.current;
      program.uniforms.uTime.value = time * speed * 0.1;
      program.uniforms.uAmplitude.value = propsRef.current.amplitude ?? 1.0;
      program.uniforms.uBlend.value = propsRef.current.blend ?? blend;
      program.uniforms.uLightMode.value = (propsRef.current.lightMode ?? lightMode) ? 1 : 0;
      const stops = propsRef.current.colorStops ?? colorStops;
      program.uniforms.uColorStops.value = stops.map(hex => {
        const c = new Color(hex);
        return [c.r, c.g, c.b];
      });
      /* 鼠标位置与活跃度缓动，波浪式追踪 */
      mx += (tx - mx) * 0.075;
      my += (ty - my) * 0.075;
      active += (activeTarget - active) * 0.055;
      program.uniforms.uMouse.value = [mx, my];
      program.uniforms.uMouseActive.value = active;
      renderer.render({ scene: mesh });
    };
    animateId = requestAnimationFrame(update);

    resize();

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener('resize', resize);
      if (hoverSupported) document.removeEventListener('pointermove', onMove);
      if (ctn && gl.canvas.parentNode === ctn) {
        ctn.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amplitude, blend, lightMode]);

  return <div ref={ctnDom} className="aurora-container" />;
}
