import type { ButtonHTMLAttributes, ComponentType, MouseEvent, ReactNode } from 'react';
import { burstPetals } from '../lib/effects';

type Variant = 'primary' | 'outline' | 'ivory';

interface BaseProps {
  children: ReactNode;
  icon?: ComponentType<{ size?: number }>;
  variant?: Variant;
  className?: string;
  /** celebratory petal burst on click (used for Save the Date) */
  burst?: boolean;
}

const burstFrom = (e: MouseEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  burstPetals(r.left + r.width / 2, r.top + r.height / 2);
};

type AsButton = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AsLink = BaseProps & { href: string; external?: boolean; onClick?: () => void; 'aria-label'?: string };

/** Royal maroon pill with a thin gold outline, gentle glow and visible focus ring.
 *  Renders an <a> when `href` is given (real links for maps/calendar), else a <button>. */
export function PremiumButton(props: AsButton | AsLink) {
  const { children, icon: Icon, variant = 'primary', className = '', burst = false } = props;
  const cls = `royal-btn royal-btn--${variant} ${className}`;
  const inner = (
    <>
      <span className="royal-btn__shine" aria-hidden="true" />
      {Icon && (
        <span className="royal-btn__icon">
          <Icon size={18} />
        </span>
      )}
      <span className="royal-btn__label">{children}</span>
    </>
  );

  if ('href' in props && props.href) {
    const { href, external = true, onClick } = props;
    return (
      <a
        className={cls}
        href={href}
        onClick={(e) => {
          if (burst) burstFrom(e);
          onClick?.();
        }}
        aria-label={props['aria-label']}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }
  const { icon: _i, variant: _v, className: _c, children: _ch, burst: _b, onClick, ...btn } = props as AsButton;
  return (
    <button
      type="button"
      className={cls}
      {...btn}
      onClick={(e) => {
        if (burst) burstFrom(e);
        onClick?.(e);
      }}
    >
      {inner}
    </button>
  );
}
