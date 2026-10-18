/** Smooth-scroll to a section id (respects reduced motion via CSS `scroll-behavior`). */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  // move focus for keyboard / screen-reader users without jumping
  const heading = el.querySelector<HTMLElement>('h1, h2');
  if (heading) {
    heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: true });
  }
}

/** Reference-counted body scroll lock — never gets "stuck" when modals stack/close. */
let lockCount = 0;
export function lockScroll() {
  if (lockCount++ === 0) {
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = sbw > 0 ? `${sbw}px` : '';
    document.documentElement.classList.add('scroll-locked');
  }
}
export function unlockScroll() {
  if (lockCount === 0) return;
  if (--lockCount === 0) {
    document.documentElement.classList.remove('scroll-locked');
    document.body.style.paddingRight = '';
  }
}

/** sessionStorage can throw (private mode, sandboxed previews) — always guarded. */
export const safeSession = {
  get(key: string): string | null {
    try {
      return window.sessionStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      window.sessionStorage.setItem(key, value);
    } catch {
      /* ignore */
    }
  },
  remove(key: string) {
    try {
      window.sessionStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  },
};
