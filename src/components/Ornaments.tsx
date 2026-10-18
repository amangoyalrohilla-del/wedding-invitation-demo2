import { useId, useMemo, type CSSProperties, type ElementType, type ReactNode } from 'react';
import { useReveal } from '../lib/hooks';

/* ───────────────────────── Lord Ganesha emblem ─────────────────────────
   A respectful, symmetrical line-art invocation emblem in antique gold:
   mukut (crown), large ears, gentle eyes, tilak, single tusk (Ekadanta)
   and trunk curving to His left, seated above a lotus.                      */
export function GaneshaEmblem({ size = 160, className = '', title = 'Lord Ganesha' }: { size?: number; className?: string; title?: string }) {
  const uid = useId().replace(/:/g, '');
  const g = `gold${uid}`;
  const f = `face${uid}`;
  return (
    <svg className={className} width={size} height={size * 1.18} viewBox="0 0 200 236" role="img" aria-label={title}>
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F3DCA2" />
          <stop offset=".5" stopColor="#D5B16F" />
          <stop offset="1" stopColor="#A47A39" />
        </linearGradient>
        <radialGradient id={f} cx=".5" cy=".4" r=".7">
          <stop offset="0" stopColor="#FFF4DA" />
          <stop offset="1" stopColor="#F2D7A6" />
        </radialGradient>
      </defs>
      <g stroke="#8A6128" strokeWidth="1.6" strokeLinejoin="round">
        {/* halo */}
        <circle cx="100" cy="98" r="86" fill="none" stroke={`url(#${g})`} strokeWidth="2" opacity=".55" />
        <circle cx="100" cy="98" r="78" fill="none" stroke={`url(#${g})`} strokeWidth=".9" strokeDasharray="2 5" opacity=".7" />
        {/* ears */}
        <path d="M72 78C34 58 12 92 20 124c7 28 34 34 52 14 4-18 4-40 0-60Z" fill={`url(#${f})`} />
        <path d="M128 78c38-20 60 14 52 46-7 28-34 34-52 14-4-18-4-40 0-60Z" fill={`url(#${f})`} />
        <path d="M64 88c-18-4-30 10-28 28 2 14 14 20 26 14" fill="none" stroke="#C9973F" />
        <path d="M136 88c18-4 30 10 28 28-2 14-14 20-26 14" fill="none" stroke="#C9973F" />
        {/* head & face */}
        <path d="M68 76c0-10 64-10 64 0 6 30 4 50-10 66H78c-14-16-16-36-10-66Z" fill={`url(#${f})`} />
        {/* mukut */}
        <path d="M68 76l3-30 13 9 16-34 16 34 13-9 3 30Z" fill={`url(#${g})`} />
        <path d="M74 66h52M78 56l6 8M122 56l-6 8M100 32v30" fill="none" stroke="#8A6128" strokeWidth="1.2" />
        <circle cx="100" cy="17" r="5" fill={`url(#${g})`} />
        <circle cx="100" cy="48" r="5" fill="#A63B45" stroke="#8A6128" />
        <rect x="66" y="72" width="68" height="9" rx="4" fill={`url(#${g})`} />
        {/* tilak & eyes */}
        <path d="M100 84c-3 6-3 10 0 14 3-4 3-8 0-14Z" fill="#A63B45" stroke="none" />
        <path d="M80 104c5-5 11-5 15 0-4 3-11 3-15 0Z" fill="#432A2D" stroke="none" />
        <path d="M105 104c4-5 10-5 15 0-4 3-11 3-15 0Z" fill="#432A2D" stroke="none" />
        <path d="M78 98c5-4 12-4 17-1M105 97c5-3 12-3 17 1" fill="none" stroke="#8A6128" strokeWidth="1.2" />
        {/* tusk (Ekadanta) */}
        <path d="M84 126c-8 6-12 16-8 22 2-8 6-14 12-18Z" fill="#FFFBF0" />
        {/* trunk */}
        <path d="M89 116c-2 30-6 52 10 70 14 16 38 6 34-12-3-12-17-11-15 0 1 6-5 9-10 3-10-12-2-34-2-61Z" fill={`url(#${f})`} />
        <path d="M91 136h17M91 148h15M93 160h13" fill="none" stroke="#C9973F" strokeWidth="1.1" />
        {/* lotus seat */}
        <path d="M100 232c-30-6-50-18-56-30 20-2 40 6 56 30Z" fill="#E9A2A6" />
        <path d="M100 232c30-6 50-18 56-30-20-2-40 6-56 30Z" fill="#E9A2A6" />
        <path d="M100 232c-14-12-18-30-12-44 10 10 12 26 12 44Z" fill="#F7D3D2" />
        <path d="M100 232c14-12 18-30 12-44-10 10-12 26-12 44Z" fill="#F7D3D2" />
        <path d="M100 232c-8-16-8-34 0-50 8 16 8 34 0 50Z" fill="#C96970" />
      </g>
    </svg>
  );
}

/* ───────────────────────── Mandala (SVG) ───────────────────────── */
export function Mandala({ size = 320, className = '', stroke = '#D5B16F', opacity = 0.5, petals = 16 }: { size?: number; className?: string; stroke?: string; opacity?: number; petals?: number }) {
  const items = useMemo(() => Array.from({ length: petals }, (_, i) => (360 / petals) * i), [petals]);
  return (
    <svg className={className} width={size} height={size} viewBox="-100 -100 200 200" aria-hidden="true" style={{ opacity }}>
      <g fill="none" stroke={stroke} strokeWidth=".8">
        <circle r="98" />
        <circle r="92" strokeDasharray="1 3" />
        {items.map((a) => (
          <path key={`p${a}`} transform={`rotate(${a})`} d="M0-30C13-48 10-76 0-90-10-76-13-48 0-30Z" />
        ))}
        {items.map((a) => (
          <path key={`q${a}`} transform={`rotate(${a + 180 / petals})`} d="M0-42C8-55 6-68 0-74-6-68-8-55 0-42Z" />
        ))}
        <circle r="30" />
        <circle r="22" strokeDasharray="2 2" />
        {items.slice(0, 8).map((a) => (
          <path key={`c${a}`} transform={`rotate(${a * 2})`} d="M0-6Q8-15 0-22-8-15 0-6Z" />
        ))}
      </g>
    </svg>
  );
}

/* ───────────────────────── Floral divider ───────────────────────── */
export function FloralDivider({ className = '', color = '#A47A39' }: { className?: string; color?: string }) {
  return (
    <svg className={`floral-divider ${className}`} viewBox="0 0 320 32" width="240" height="24" aria-hidden="true">
      <g fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round">
        <path d="M8 16h104M208 16h104" />
        <path d="M112 16c10-10 22-10 30 0-8 10-20 10-30 0ZM208 16c-10-10-22-10-30 0 8 10 20 10 30 0Z" />
        <circle cx="4" cy="16" r="2.4" fill={color} />
        <circle cx="316" cy="16" r="2.4" fill={color} />
      </g>
      <g transform="translate(160 16)">
        <path d="M0-12C5-6 5 6 0 12-5 6-5-6 0-12Z" fill="#A63B45" />
        <path d="M-12 0C-6-5 6-5 12 0 6 5-6 5-12 0Z" fill="#C96970" />
        <circle r="3.2" fill="#D5B16F" />
      </g>
    </svg>
  );
}

/* ───────────────────────── Corner motif ───────────────────────── */
export function CornerMotif({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={`corner-motif ${className}`} style={style} viewBox="0 0 80 80" width="80" height="80" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <path d="M4 76V20Q4 4 20 4h56" />
        <path d="M12 76V26Q12 12 26 12h50" opacity=".6" />
        <path d="M22 22c10 2 16 8 18 18-10-2-16-8-18-18Z" fill="currentColor" fillOpacity=".25" />
        <path d="M36 14c4 4 4 10 0 14M14 36c4 4 10 4 14 0" />
        <circle cx="22" cy="22" r="2.2" fill="currentColor" />
      </g>
    </svg>
  );
}

/* ───────────────────────── Floating petals (CSS-only motion) ───────────────────────── */
export function Petals({ count = 14, className = '' }: { count?: number; className?: string }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const r = (n: number) => {
          const x = Math.sin(i * 999 + n * 77) * 10000;
          return x - Math.floor(x);
        };
        return {
          left: `${(r(1) * 100).toFixed(1)}%`,
          delay: `${(r(2) * -14).toFixed(2)}s`,
          duration: `${(11 + r(3) * 9).toFixed(1)}s`,
          size: 10 + r(4) * 12,
          drift: `${(r(5) * 120 - 60).toFixed(0)}px`,
          hue: r(6) > 0.5 ? '#C96970' : '#A63B45',
        };
      }),
    [count],
  );
  return (
    <div className={`petals ${className}`} aria-hidden="true">
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={
            {
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
              width: p.size,
              height: p.size * 0.7,
              background: p.hue,
              '--drift': p.drift,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

/* ───────────────────────── Section heading ───────────────────────── */
export function SectionHeading({ title, subtitle, light = false, id }: { title: string; subtitle?: string; light?: boolean; id?: string }) {
  const { ref, visible } = useReveal<HTMLElement>(0.3);
  return (
    <header ref={ref} className={`section-heading ${light ? 'is-light' : ''} ${visible ? 'is-visible' : ''}`}>
      <h2 id={id}>{title}</h2>
      {subtitle && <p className={/[ऀ-ॿ]/.test(subtitle) ? 'hindi' : 'italic-quote'}>{subtitle}</p>}
      <FloralDivider color={light ? '#D5B16F' : '#A47A39'} />
    </header>
  );
}

/* ───────────────────────── Reveal wrapper ───────────────────────── */
export function Reveal({ as: Tag = 'div', className = '', delay = 0, style, children, ...rest }: { as?: ElementType; className?: string; delay?: number; style?: CSSProperties; children: ReactNode; [k: string]: unknown }) {
  const { ref, visible } = useReveal<HTMLElement>();
  return (
    <Tag ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`} style={{ ...style, transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

/* ───────────────────────── Rose spray (used on photo frames) ───────────────────────── */
export function RoseSpray({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="-70 -50 140 90" aria-hidden="true">
      <path d="M-30 10C-50 0-62 8-66 18c14 4 26 0 36-8Z" fill="#5C7A3A" />
      <path d="M30 14c20-10 32-2 36 8-14 4-26 0-36-8Z" fill="#5C7A3A" />
      <path d="M0 22c-6 12-2 22 6 26 2-10 0-18-6-26Z" fill="#6E8E3A" />
      {[
        [-26, 0, 0.85, '#C96970'],
        [26, 4, 0.8, '#C96970'],
        [0, -6, 1.05, '#A63B45'],
      ].map(([x, y, s, c], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <circle r="18" fill={c as string} />
          <path d="M-12-4c2-10 18-12 22-2 2 10-8 16-14 12-6-4-2-12 4-12 4 0 4 6 0 6" fill="none" stroke="#641E2A" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}

/* ───────────────────────── Portrait frame (same for groom & bride) ─────────────────────────
   Matches the couple photo: arched top, ivory ring, thin gold border,
   a small gold finial at the apex, a soft mandala halo and roses at the base. */
export function JharokhaFrame({ src, alt, eager = false, hasOwnFrame = false }: { src: string; alt: string; eager?: boolean; hasOwnFrame?: boolean }) {
  if (hasOwnFrame) {
    return (
      <figure className="portrait portrait--own">
        <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" width={1083} height={1300} />
      </figure>
    );
  }
  return (
    <figure className="portrait">
      <Mandala size={460} className="portrait__halo" stroke="#C9973F" opacity={0.28} petals={20} />
      <svg className="portrait__finial" viewBox="0 0 60 40" aria-hidden="true">
        <path d="M30 2c5 7 5 13 0 18-5-5-5-11 0-18Z" fill="#D5B16F" stroke="#A47A39" />
        <path d="M30 20c-8-6-18-6-24 0 8 2 16 4 24 4 8 0 16-2 24-4-6-6-16-6-24 0Z" fill="#D5B16F" stroke="#A47A39" />
        <circle cx="30" cy="30" r="5" fill="#A63B45" stroke="#D5B16F" strokeWidth="2" />
      </svg>
      <div className="portrait__arch">
        <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" width={900} height={1200} />
      </div>
      <RoseSpray className="portrait__roses portrait__roses--l" />
      <RoseSpray className="portrait__roses portrait__roses--r" />
    </figure>
  );
}
