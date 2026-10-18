import { useCallback, useRef, useState } from 'react';
import { weddingConfig } from '../config/weddingConfig';
import { useLang } from '../i18n';
import { ChevronLeft, ChevronRight, Images } from './Icons';
import { Modal } from './Modal';
import { Reveal, SectionHeading } from './Ornaments';
import { PremiumButton } from './PremiumButton';

export function PhotoGallery() {
  const { gallery } = weddingConfig;
  const { u, ui } = useLang();
  const [index, setIndex] = useState<number | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const n = gallery.length;

  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + n) % n)), [n]);
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  };
  const img = index !== null ? gallery[index] : null;

  return (
    <section id="gallery" className="gallery section section--ivory" aria-labelledby="gallery-title">
      <div className="container">
        <SectionHeading id="gallery-title" title={u(ui.galleryTitle)} subtitle={u(ui.gallerySub)} />
        <ul className="gallery__grid">
          {gallery.map((g, i) => (
            <Reveal as="li" key={g.alt} delay={(i % 3) * 110} className="gallery__item">
              <button type="button" className="photo-frame" onClick={() => setIndex(i)} aria-label={`${u(ui.photo)} ${i + 1}: ${g.alt}`} aria-haspopup="dialog">
                <span className="photo-frame__mat">
                  <img src={g.src} alt={g.alt} loading="lazy" decoding="async" width={g.width} height={g.height} style={{ objectPosition: g.focus ?? '50% 50%' }} />
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
        <div className="btn-row">
          <PremiumButton icon={Images} onClick={() => setIndex(0)} aria-haspopup="dialog">
            {u(ui.exploreMemories)}
          </PremiumButton>
        </div>
      </div>

      <Modal open={img !== null} onClose={() => setIndex(null)} labelledBy="lightbox-count" className="modal--lightbox" onKey={onKey}>
        {img && (
          <div
            className="lightbox"
            onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
            onTouchEnd={(e) => {
              if (!touch.current) return;
              const dx = e.changedTouches[0].clientX - touch.current.x;
              const dy = e.changedTouches[0].clientY - touch.current.y;
              if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
              touch.current = null;
            }}
          >
            <figure className="lightbox__figure" key={index}>
              <img src={img.src} alt={img.alt} width={img.width} height={img.height} />
              <figcaption id="lightbox-count" className="lightbox__count">
                {(index ?? 0) + 1} / {n}
              </figcaption>
            </figure>
            <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => go(-1)} aria-label={u(ui.prev)}>
              <ChevronLeft size={26} />
            </button>
            <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => go(1)} aria-label={u(ui.next)}>
              <ChevronRight size={26} />
            </button>
          </div>
        )}
      </Modal>
    </section>
  );
}
