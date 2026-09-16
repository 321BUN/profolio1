import SearchBar from './SearchBar'
import { profile } from '../data/resume'

const LINKS = [
  { id: 'about', label: '关于' },
  { id: 'experience', label: '实习' },
  { id: 'project', label: '项目' },
  { id: 'campus', label: '校园' },
  { id: 'works', label: '作品' },
  { id: 'contact', label: '联系' },
]

export default function Navbar({ scrolled, active, query, setQuery, goTo }) {
  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a
          className="brand"
          href="#home"
          onClick={(e) => { e.preventDefault(); goTo('home') }}
        >
          <span className="brand-mark">{profile.name}</span>
          <span className="brand-en">Portfolio</span>
        </a>

        <nav className="nav-links">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={active === l.id ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); goTo(l.id) }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <SearchBar query={query} setQuery={setQuery} goTo={goTo} variant="nav" />
          <a
            className="nav-cta"
            href="#contact"
            onClick={(e) => { e.preventDefault(); goTo('contact') }}
          >
            联系我
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  )
}
