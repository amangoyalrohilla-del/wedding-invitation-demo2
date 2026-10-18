import { useEffect, useState } from 'react';
import { weddingConfig } from '../config/weddingConfig';
import { LangToggle, useLang } from '../i18n';
import { sound } from '../lib/audio';
import { scrollToId } from '../lib/dom';
import { useActiveSection } from '../lib/hooks';
import { Menu, Music, VolumeX, X } from './Icons';

const ITEMS = [
  { id: 'home', key: 'home' },
  { id: 'groom', key: 'couple' },
  { id: 'countdown', key: 'countdown' },
  { id: 'celebrations', key: 'celebrations' },
  { id: 'venue', key: 'venue' },
  { id: 'gallery', key: 'gallery' },
  { id: 'invitation', key: 'invitation' },
] as const;
// sections that should highlight a nav item
const WATCH = ['home', 'groom', 'bride', 'countdown', 'save-the-date', 'celebrations', 'venue', 'gallery', 'film', 'invitation', 'blessings'];
const ALIAS: Record<string, string> = { bride: 'groom', 'save-the-date': 'countdown', film: 'gallery', blessings: 'invitation' };

export function Navigation() {
  const active = useActiveSection(WATCH);
  const current = ALIAS[active] ?? active;
  const [scrolled, setScrolled] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [soundOn, setSoundOn] = useState(sound.enabled);
  const { couple } = weddingConfig;
  const { t, u, ui } = useLang();

  useEffect(() => sound.subscribe(setSoundOn), []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    if (!sheet) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSheet(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [sheet]);

  const go = (id: string) => {
    setSheet(false);
    // let the sheet close before scrolling (avoids iOS jank)
    window.setTimeout(() => scrollToId(id), 30);
  };

  return (
    <>
      <nav className={`topnav ${scrolled ? 'is-solid' : ''}`} aria-label="Invitation sections">
        <button type="button" className="topnav__brand calligraphy" onClick={() => go('home')} aria-label="Back to top">
          {t(couple.groom.firstName)[0]}
          <span>&amp;</span>
          {t(couple.bride.firstName)[0]}
        </button>
        <ul className="topnav__list">

          {ITEMS.map((it) => (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={current === it.id ? 'is-active' : ''}
                aria-current={current === it.id ? 'true' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  go(it.id);
                }}
              >
                {u(ui.nav[it.key])}
              </a>
            </li>
          ))}
        </ul>
        <LangToggle className="topnav__lang" />
      </nav>

      <div className="fab-group">
        <button
          type="button"
          className={`fab fab--music ${soundOn ? 'is-on' : ''}`}
          aria-pressed={soundOn}
          aria-label={soundOn ? u(ui.musicOff) : u(ui.musicOn)}
          onClick={() => sound.toggle()}
        >
          {soundOn ? <Music size={20} /> : <VolumeX size={20} />}
          {soundOn && <span className="fab__bars" aria-hidden="true"><i /><i /><i /></span>}
        </button>
        <button type="button" className="fab fab--menu" aria-label={u(ui.menu)} aria-expanded={sheet} aria-controls="nav-sheet" onClick={() => setSheet(true)}>
          <Menu size={22} />
        </button>
      </div>

      <div className={`nav-sheet ${sheet ? 'is-open' : ''}`} id="nav-sheet" aria-hidden={!sheet} inert={!sheet ? true : undefined}>
        <button type="button" className="nav-sheet__scrim" aria-label={u(ui.closeMenu)} tabIndex={-1} onClick={() => setSheet(false)} />
        <div className="nav-sheet__panel" role="dialog" aria-label={u(ui.menu)}>
          <div className="nav-sheet__head">
            <span className="calligraphy">
              {t(couple.groom.firstName)} &amp; {t(couple.bride.firstName)}
            </span>
            <LangToggle />
            <button type="button" className="nav-sheet__close" onClick={() => setSheet(false)} aria-label={u(ui.closeMenu)}>
              <X size={22} />
            </button>
          </div>
          <ul>
            {ITEMS.map((it) => (
              <li key={it.id}>
                <a
                  href={`#${it.id}`}
                  className={current === it.id ? 'is-active' : ''}
                  aria-current={current === it.id ? 'true' : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    go(it.id);
                  }}
                >
                  {u(ui.nav[it.key])}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
