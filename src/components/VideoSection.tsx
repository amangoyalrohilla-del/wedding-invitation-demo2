import { useEffect, useState } from 'react';
import { weddingConfig, type Film } from '../config/weddingConfig';
import { useLang } from '../i18n';
import { sound } from '../lib/audio';
import { Play } from './Icons';
import { Modal } from './Modal';
import { Reveal, SectionHeading } from './Ornaments';

function FilmCard({ film, index, onPlay }: { film: Film; index: number; onPlay: (f: Film) => void }) {
  const { t, u, ui } = useLang();
  const available = film.source.type !== 'none';
  return (
    <Reveal className="film-card" delay={index * 140}>
      <div className="film-card__screen">
        <img src={film.poster} alt="" loading="lazy" decoding="async" width={540} height={960} />
        <div className="film-card__shade" aria-hidden="true" />
        {weddingConfig.site.showSampleBadge && <span className="film-card__tag">{u(ui.sampleFilm)}</span>}
        <span className="film-card__time">{film.duration}</span>
        {available ? (
          <button type="button" className="film-card__play" onClick={() => onPlay(film)} aria-haspopup="dialog" aria-label={`${u(ui.playFilm)}: ${t(film.title)}`}>
            <span className="film-card__ring" aria-hidden="true" />
            <Play size={26} />
          </button>
        ) : (
          <p className="film-card__soon">{u(ui.comingSoon)}</p>
        )}
        <p className="film-card__title">{t(film.title)}</p>
      </div>
    </Reveal>
  );
}

export function VideoSection() {
  const { films } = weddingConfig;
  const { t, u, ui } = useLang();
  const [active, setActive] = useState<Film | null>(null);

  // Pause the ambience while a film plays so audio never overlaps.
  useEffect(() => {
    if (!active) return;
    sound.duck(true);
    return () => sound.duck(false);
  }, [active]);

  const src = active?.source;
  return (
    <section id="film" className="film section section--maroon" aria-labelledby="film-title">
      <div className="film__glow" aria-hidden="true" />
      <div className="container">
        <SectionHeading id="film-title" title={u(ui.filmTitle)} subtitle={u(ui.filmSub)} light />
        <div className="film__pair">
          {films.map((f, i) => (
            <FilmCard key={f.id} film={f} index={i} onPlay={setActive} />
          ))}
        </div>
      </div>

      <Modal open={!!active} onClose={() => setActive(null)} labelledBy="film-modal-title" className="modal--video">
        <h3 id="film-modal-title" className="video-caption">
          {active ? t(active.title) : ''}
        </h3>
        <div className="video-frame">
          {src?.type === 'youtube' ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(src.id)}?autoplay=1&rel=0&modestbranding=1`}
              title={active ? t(active.title) : ''}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : src?.type === 'mp4' || src?.type === 'url' ? (
            <video poster={active?.poster} controls playsInline autoPlay preload="metadata">
              <source src={src.src} type={src.src.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
              {src.type === 'mp4' && src.webm && <source src={src.webm} type="video/webm" />}
            </video>
          ) : null}
        </div>
      </Modal>
    </section>
  );
}
