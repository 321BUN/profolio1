// 由 hue 映射到低饱和明亮渐变占位类（蓝调主导）
export function tone(hue = 0) {
  if (hue < 50) return 'ph--blue'
  if (hue < 170) return 'ph--sage'
  if (hue < 250) return 'ph--blue'
  if (hue < 310) return 'ph--lav'
  return 'ph--gold'
}
