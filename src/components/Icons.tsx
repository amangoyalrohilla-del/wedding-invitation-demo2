/**
 * Lucide-style line icons (24×24, stroke 1.75) inlined to keep the bundle tiny.
 * Swap for `lucide-react` if preferred — names match Lucide's.
 */
import type { ReactNode, SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const make = (paths: ReactNode) =>
  function Icon({ size = 20, ...rest }: IconProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        {...rest}
      >
        {paths}
      </svg>
    );
  };

export const CalendarHeart = make(
  <>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
    <path d="M12 19.5s-3.5-2-3.5-4.3a1.8 1.8 0 0 1 3.5-.6 1.8 1.8 0 0 1 3.5.6c0 2.3-3.5 4.3-3.5 4.3z" />
  </>,
);
export const MapPin = make(
  <>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </>,
);
export const Navigation = make(<path d="m3 11 19-9-9 19-2-8-8-2z" />);
export const Music = make(
  <>
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </>,
);
export const VolumeX = make(
  <>
    <path d="M11 5 6 9H2v6h4l5 4V5z" />
    <path d="m22 9-6 6M16 9l6 6" />
  </>,
);
export const Volume2 = make(
  <>
    <path d="M11 5 6 9H2v6h4l5 4V5z" />
    <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />
  </>,
);
export const Play = make(<path d="M7 4.5v15l12.5-7.5L7 4.5z" fill="currentColor" stroke="none" />);
export const X = make(<path d="M18 6 6 18M6 6l12 12" />);
export const ChevronLeft = make(<path d="m15 18-6-6 6-6" />);
export const ChevronRight = make(<path d="m9 18 6-6-6-6" />);
export const ChevronDown = make(<path d="m6 9 6 6 6-6" />);
export const ArrowUp = make(<path d="M12 19V5M5 12l7-7 7 7" />);
export const Menu = make(<path d="M4 7h16M4 12h16M4 17h16" />);
export const Images = make(
  <>
    <rect x="6" y="6" width="15" height="13" rx="2" />
    <path d="M3 16V5a2 2 0 0 1 2-2h11" />
    <circle cx="11" cy="11" r="1.5" />
    <path d="m21 16-4-4-7 7" />
  </>,
);
export const Clock = make(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </>,
);
export const Shirt = make(<path d="M20.4 6.6 16 4a4 4 0 0 1-8 0L3.6 6.6a1 1 0 0 0-.5 1.2l1.2 3.6a1 1 0 0 0 1.2.6L7 11.5V20a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-8.5l1.5.5a1 1 0 0 0 1.2-.6l1.2-3.6a1 1 0 0 0-.5-1.2z" />);
export const Heart = make(<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z" />);
export const Sparkles = make(
  <>
    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
    <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
  </>,
);
export const ExternalLink = make(
  <>
    <path d="M15 3h6v6M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </>,
);
export const ScrollText = make(
  <>
    <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
    <path d="M19 17V5a2 2 0 0 0-2-2H4M15 8h-5M15 12h-5" />
  </>,
);
export const RotateCcw = make(
  <>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </>,
);
