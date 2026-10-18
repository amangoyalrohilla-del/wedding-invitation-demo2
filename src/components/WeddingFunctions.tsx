import { useState, type CSSProperties } from 'react';
import { weddingConfig, type WeddingEvent } from '../config/weddingConfig';
import { useLang } from '../i18n';
import { tiltHandlers } from '../lib/effects';
import { googleCalendarUrl, mapsDirectionsUrl } from '../lib/links';
import { eventCalendar, links, venueQuery } from '../lib/weddingLinks';
import { CalendarHeart, Clock, MapPin, Navigation, ScrollText, Shirt, Sparkles } from './Icons';
import { Modal } from './Modal';
import { Reveal, SectionHeading } from './Ornaments';
import { PremiumButton } from './PremiumButton';

function EventPanel({ e, index, onDetails }: { e: WeddingEvent; index: number; onDetails: (e: WeddingEvent) => void }) {
  const { t, u, ui, fmtDate, fmtTime, fmtWeekday } = useLang();
  const directions = e.location ? mapsDirectionsUrl(e.location) : links.directions;
  const tilt = tiltHandlers(5);
  return (
    <Reveal as="article" className={`event-panel event-panel--${e.id}`} delay={(index % 3) * 110} style={{ '--accent': e.accent } as CSSProperties} aria-labelledby={`ev-${e.id}`}>
      <div className="event-panel__frame" {...tilt}>
        <span className="event-panel__glare" aria-hidden="true" />
        <div className="event-panel__media">
          <img src={e.image} alt={e.imageAlt} loading="lazy" decoding="async" width={1000} height={700} />
          <span className="event-panel__badge" aria-hidden="true">
            {t(e.shortName)}
          </span>
        </div>
        <div className="event-panel__body">
          <p className="event-panel__eyebrow">{fmtWeekday(e.start)}</p>
          <h3 id={`ev-${e.id}`}>{t(e.name)}</h3>
          <div className="event-panel__meta">
            <span>
              <CalendarHeart size={16} />
              <time dateTime={e.start}>{fmtDate(e.start)}</time>
            </span>
            <span>
              <Clock size={16} />
              {fmtTime(e.start)}
            </span>
          </div>
          <p className="event-panel__theme">{t(e.theme)}</p>
          <p className="event-panel__copy">“{t(e.description)}”</p>
          <div className="event-panel__actions">
            {e.action === 'directions' ? (
              <PremiumButton icon={Navigation} href={directions} aria-label={`${u(ui.getDirections)} — ${t(e.name)}`}>
                {u(ui.getDirections)}
              </PremiumButton>
            ) : (
              <PremiumButton icon={ScrollText} onClick={() => onDetails(e)} aria-haspopup="dialog">
                {e.id === 'baraat' ? u(ui.viewBaraat) : u(ui.viewDetails)}
              </PremiumButton>
            )}
            {e.action === 'directions' && (
              <button type="button" className="text-link" onClick={() => onDetails(e)} aria-haspopup="dialog">
                {u(ui.detailsLink)}
              </button>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function EventDetails({ e }: { e: WeddingEvent }) {
  const { t, u, ui, lang, fmtDate, fmtTime, fmtWeekday } = useLang();
  const where = e.location ?? venueQuery;
  const whereLabel = e.location ?? `${t(weddingConfig.venue.name)}, ${t(weddingConfig.venue.address)}`;
  return (
    <div className="event-details">
      <img className="event-details__img" src={e.image} alt="" width={1000} height={700} />
      <div className="event-details__body">
        <h3 id="event-details-title">{t(e.name)}</h3>
        <ul className="event-details__facts">
          <li>
            <CalendarHeart size={18} />
            <span>
              {fmtWeekday(e.start)}, {fmtDate(e.start)}
            </span>
          </li>
          <li>
            <Clock size={18} />
            <span>
              {fmtTime(e.start)} – {fmtTime(e.end)}
              {lang === 'en' ? ' IST' : ''}
            </span>
          </li>
          <li>
            <MapPin size={18} />
            <span>{whereLabel}</span>
          </li>
          <li>
            <Shirt size={18} />
            <span>
              <strong>{u(ui.dressCode)}:</strong> {t(e.dressCode)}
            </span>
          </li>
          <li>
            <Sparkles size={18} />
            <span>
              <strong>{u(ui.theme)}:</strong> {t(e.theme)}
            </span>
          </li>
        </ul>
        <p className="event-details__copy">“{t(e.description)}”</p>
        {e.details.length > 0 && (
          <ul className="event-details__list">
            {e.details.map((d) => (
              <li key={d.en}>{t(d)}</li>
            ))}
          </ul>
        )}
        <div className="btn-row btn-row--left">
          <PremiumButton icon={CalendarHeart} href={googleCalendarUrl(eventCalendar(e))} aria-label={`${u(ui.addToCalendar)} — ${t(e.name)}`}>
            {u(ui.addToCalendar)}
          </PremiumButton>
          <PremiumButton icon={Navigation} variant="outline" href={mapsDirectionsUrl(where)} aria-label={`${u(ui.directions)} — ${t(e.name)}`}>
            {u(ui.directions)}
          </PremiumButton>
        </div>
      </div>
    </div>
  );
}

export function WeddingFunctions() {
  const { events } = weddingConfig;
  const { u, ui } = useLang();
  const [active, setActive] = useState<WeddingEvent | null>(null);
  return (
    <section id="celebrations" className="functions section section--ivory" aria-labelledby="functions-title">
      <div className="container">
        <SectionHeading id="functions-title" title={u(ui.celebrationsTitle)} subtitle={u(ui.celebrationsSub)} />
        <div className="functions__grid">
          {events.map((e, i) => (
            <EventPanel key={e.id} e={e} index={i} onDetails={setActive} />
          ))}
        </div>
      </div>
      <Modal open={!!active} onClose={() => setActive(null)} labelledBy="event-details-title" className="modal--event">
        {active && <EventDetails e={active} />}
      </Modal>
    </section>
  );
}
