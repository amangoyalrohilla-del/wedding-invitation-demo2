import { useEffect, useRef } from 'react';
import { weddingConfig } from '../config/weddingConfig';
import { LangToggle, useLang } from '../i18n';
import { sound } from '../lib/audio';
import { Mandala, Petals } from './Ornaments';

interface Props {
  opening: boolean;
  onOpen: () => void;
  onSkip: () => void;
}

/** Dome, chhatris and cornice that crown the gate arch. */
function GateCrown() {
  return (
    <svg className="palace-gate__crown" viewBox="0 0 300 118" aria-hidden="true">
      <defs>
        <linearGradient id="crownGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F6E2AD" />
          <stop offset=".55" stopColor="#D5B16F" />
          <stop offset="1" stopColor="#A47A39" />
        </linearGradient>
      </defs>
      {/* side chhatris */}
      {[46, 254].map((cx) => (
        <g key={cx}>
          <path d={`M${cx - 18} 96c-2-14 6-24 18-30 12 6 20 16 18 30Z`} fill="url(#crownGold)" stroke="#8A6128" />
          <path d={`M${cx} 66v-10`} stroke="#8A6128" strokeWidth="2" />
          <circle cx={cx} cy="54" r="3" fill="#D5B16F" />
          <rect x={cx - 22} y="95" width="44" height="6" rx="1" fill="#A47A39" />
          <rect x={cx - 17} y="101" width="5" height="12" fill="#A47A39" />
          <rect x={cx + 12} y="101" width="5" height="12" fill="#A47A39" />
        </g>
      ))}
      {/* main dome */}
      <path d="M108 100c-6-34 14-58 42-72 28 14 48 38 42 72Z" fill="url(#crownGold)" stroke="#8A6128" strokeWidth="1.5" />
      <path d="M128 96c-2-24 8-42 22-54" fill="none" stroke="#FFF4D6" strokeWidth="3" opacity=".55" />
      <path d="M150 28V8" stroke="#8A6128" strokeWidth="2.5" />
      <circle cx="150" cy="18" r="4" fill="#D5B16F" stroke="#8A6128" />
      <circle cx="150" cy="7" r="2.6" fill="#D5B16F" />
      <rect x="100" y="98" width="100" height="8" rx="2" fill="#A47A39" />
      {/* cornice */}
      <rect x="20" y="110" width="260" height="8" rx="2" fill="url(#crownGold)" stroke="#8A6128" />
      {Array.from({ length: 13 }, (_, i) => (
        <path key={i} d={`M${28 + i * 20} 110l6-7 6 7Z`} fill="#D5B16F" stroke="#8A6128" strokeWidth=".8" />
      ))}
    </svg>
  );
}

function Door({ side }: { side: 'l' | 'r' }) {
  return (
    <div className={`pg-door pg-door--${side}`} aria-hidden="true">
      <div className="pg-door__panel pg-door__panel--top" />
      <div className="pg-door__panel pg-door__panel--mid">
        <Mandala size={70} stroke="#E6C887" opacity={0.9} petals={10} className="pg-door__mandala" />
      </div>
      <div className="pg-door__panel pg-door__panel--low" />
      <span className="pg-door__ring" />
    </div>
  );
}

function Garland() {
  const beads = Array.from({ length: 34 }, (_, i) => {
    const t = i / 33;
    return { x: t * 1000, y: 14 + Math.sin(t * Math.PI) * 46, c: i % 2 ? '#F2A33A' : '#E8771F' };
  });
  return (
    <svg className="gate__garland" viewBox="0 0 1000 80" preserveAspectRatio="none" aria-hidden="true">
      {beads.map((b, i) => (
        <circle key={i} cx={b.x} cy={b.y} r="10" fill={b.c} />
      ))}
    </svg>
  );
}

export function RoyalGate({ opening, onOpen, onSkip }: Props) {
  const { t, u, ui } = useLang();
  const { text, couple } = weddingConfig;
  const clicked = useRef(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    btnRef.current?.focus({ preventScroll: true });
  }, []);

  const open = () => {
    if (clicked.current) return; // ignore double taps
    clicked.current = true;
    sound.bell(0.05);
    onOpen();
  };

  return (
    <div className={`gate ${opening ? 'is-opening' : ''}`} role="dialog" aria-modal="true" aria-label={t(text.gateTagline)}>
      <Mandala size={900} className="gate__mandala" stroke="#D5B16F" opacity={0.16} petals={24} />
      <Garland />
      <span className="gate__lamp gate__lamp--l" aria-hidden="true" />
      <span className="gate__lamp gate__lamp--r" aria-hidden="true" />
      <Petals count={9} className="gate__petals" />

      <div className="gate__stage">
        <p className="gate__title">{t(text.gateTitle)}</p>
        <p className="gate__tagline">{t(text.gateTagline)}</p>

        <div className="palace-gate">
          <GateCrown />
          <div className="palace-gate__frame">
            <div className="palace-gate__opening">
              <div className="palace-gate__light" aria-hidden="true" />
              <Door side="l" />
              <Door side="r" />
              <span className="palace-gate__seal" onClick={open} aria-hidden="true">
                <span>
                  {t(couple.groom.firstName)[0]}
                  <i>&amp;</i>
                  {t(couple.bride.firstName)[0]}
                </span>
              </span>
            </div>
          </div>
          <div className="palace-gate__steps" aria-hidden="true" />
        </div>

        <button ref={btnRef} type="button" className="gate__open" onClick={open} disabled={opening}>
          {u(ui.openInvitation)}
        </button>
      </div>

      <LangToggle className="gate__lang" />
      <button type="button" className="skip-intro" onClick={onSkip}>
        {u(ui.skipIntro)}
      </button>
    </div>
  );
}
