import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useLang } from '../i18n';
import { lockScroll, unlockScroll } from '../lib/dom';
import { X } from './Icons';

interface Props {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  className?: string;
  /** extra key handling (e.g. arrows in the lightbox) */
  onKey?: (e: KeyboardEvent) => void;
}

/** Accessible modal: portal, focus trap, Escape to close, focus restore, safe scroll lock. */
export function Modal({ open, onClose, labelledBy, children, className = '', onKey }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const { u, ui } = useLang();
  const onCloseRef = useRef(onClose);
  const onKeyRef = useRef(onKey);
  onCloseRef.current = onClose;
  onKeyRef.current = onKey;

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    lockScroll();
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>('[data-autofocus]')?.focus() ?? panel?.focus();

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      onKeyRef.current?.(e);
      if (e.key === 'Tab' && panel) {
        const items = panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), video, iframe, [tabindex]:not([tabindex="-1"])');
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
      unlockScroll();
      previous?.focus?.({ preventScroll: true });
    };
  }, [open]);

  if (!open) return null;
  return createPortal(
    <div className={`modal ${className}`} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal__panel" role="dialog" aria-modal="true" aria-labelledby={labelledBy} ref={panelRef} tabIndex={-1}>
        <button type="button" className="modal__close" onClick={onClose} aria-label={u(ui.close)} data-autofocus>
          <X size={22} />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
