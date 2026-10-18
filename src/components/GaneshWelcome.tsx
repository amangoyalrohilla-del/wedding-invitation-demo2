import { useEffect, useState } from 'react';
import { weddingConfig } from '../config/weddingConfig';
import { useLang } from '../i18n';
import { usePrefersReducedMotion } from '../lib/hooks';
import { GaneshaEmblem, Mandala, Petals } from './Ornaments';

interface Props {
  onDone: () => void;
  onSkip: () => void;
  leaving: boolean;
}

function TempleBell({ side }: { side: 'l' | 'r' }) {
  return (
    <svg className={`temple-bell temple-bell--${side}`} viewBox="0 0 40 150" aria-hidden="true">
      <line x1="20" y1="0" x2="20" y2="96" stroke="#A47A39" strokeWidth="1.5" />
      {[20, 44, 68].map((y) => (
        <circle key={y} cx="20" cy={y} r="5" fill={y === 44 ? '#A63B45' : '#E8771F'} />
      ))}
      <circle cx="20" cy="100" r="4" fill="none" stroke="#A47A39" strokeWidth="2" />
      <path d="M6 132c0-18 6-26 14-26s14 8 14 26l4 4H2Z" fill="#D5B16F" stroke="#A47A39" />
      <circle cx="20" cy="142" r="4" fill="#A47A39" />
    </svg>
  );
}

function Diya({ className = '' }: { className?: string }) {
  return (
    <svg className={`diya ${className}`} viewBox="-30 -40 60 52" aria-hidden="true">
      <circle cx="0" cy="-18" r="20" fill="url(#diyaGlowG)" />
      <path d="M-22 0c4 12 40 12 44 0Z" fill="#A47A39" />
      <path d="M-22 0c12-6 32-6 44 0l4-4c-16-6-36-6-52 0Z" fill="#D5B16F" />
      <path className="diya__flame" d="M0-6c-7-8-3-18 0-28 3 10 7 20 0 28Z" fill="#FFB43A" />
      <path d="M0-8c-3-5-1-11 0-16 1 5 3 11 0 16Z" fill="#FFF3C4" />
    </svg>
  );
}

/** Stage timeline: 0 glow → 1 arch unfolds → 2 deity reveal → 3 invocation text → done */
export function GaneshWelcome({ onDone, onSkip, leaving }: Props) {
  const text = weddingConfig.text;
  const { t, u, ui, lang } = useLang();
  const reduced = usePrefersReducedMotion();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const plan = reduced ? [100, 200, 300, 4200] : [300, 850, 1450, 5800];
    const timers = [
      window.setTimeout(() => setStage(1), plan[0]),
      window.setTimeout(() => setStage(2), plan[1]),
      window.setTimeout(() => setStage(3), plan[2]),
      window.setTimeout(onDone, plan[3]),
    ];
    return () => timers.forEach(window.clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  return (
    <div
      className={`ganesha-scene stage-${stage} ${leaving ? 'is-leaving' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Shri Ganesha invocation"
    >
      <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
        <defs>
          <radialGradient id="diyaGlowG">
            <stop offset="0" stopColor="#FFD98A" stopOpacity=".8" />
            <stop offset="1" stopColor="#FFD98A" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
      <div className="ganesha-scene__glow" aria-hidden="true" />
      <div className="ganesha-scene__rays" aria-hidden="true" />
      <Mandala size={720} className="ganesha-scene__mandala" stroke="#C9973F" opacity={0.45} petals={24} />
      <div className="ganesha-scene__particles" aria-hidden="true">
        {Array.from({ length: 18 }, (_, i) => (
          <span key={i} style={{ left: `${(i * 53) % 100}%`, animationDelay: `${(i * 0.37) % 5}s`, animationDuration: `${6 + (i % 5)}s` }} />
        ))}
      </div>
      <TempleBell side="l" />
      <TempleBell side="r" />

      <div className="ganesha-scene__arch" aria-hidden="true">
        <svg viewBox="0 0 400 520" preserveAspectRatio="none">
          <path
            d="M10 520V200C10 120 70 70 120 62 150 20 180 8 200 2c20 6 50 18 80 60 50 8 110 58 110 138v320"
            fill="none"
            stroke="#A47A39"
            strokeWidth="4"
          />
          <path
            d="M28 520V206C28 134 82 90 128 82 156 42 182 28 200 22c18 6 44 20 72 60 46 8 100 52 100 124v314"
            fill="none"
            stroke="#D5B16F"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      <div className="ganesha-scene__content">
        <div className="ganesha-scene__deity">
          <GaneshaEmblem size={170} title="Lord Ganesha" />
        </div>
        <h1 className="ganesha-scene__invocation" lang={lang === 'hi' ? 'sa' : 'en'}>
          {t(text.invocation)}
        </h1>
        <p className="ganesha-scene__mantra" lang={lang === 'hi' ? 'sa' : 'en'}>
          {t(text.mantra[0])}
          <br />
          {t(text.mantra[1])}
        </p>
        <p className="ganesha-scene__blessing">{t(text.ganeshaBlessing)}</p>
      </div>

      <div className="ganesha-scene__diyas" aria-hidden="true">
        <Diya />
        <Diya className="diya--sm" />
        <Diya className="diya--sm" />
        <Diya />
      </div>
      <Petals count={12} className="ganesha-scene__petals" />

      <button type="button" className="skip-intro" onClick={onSkip}>
        {u(ui.skipIntro)}
      </button>
    </div>
  );
}
