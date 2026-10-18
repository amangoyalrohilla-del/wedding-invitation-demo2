import { weddingConfig } from '../config/weddingConfig';
import { useLang } from '../i18n';
import { links } from '../lib/weddingLinks';
import { MapPin, Navigation } from './Icons';
import { Reveal, SectionHeading } from './Ornaments';
import { PremiumButton } from './PremiumButton';

export function VenueSection() {
  const { venue, wedding } = weddingConfig;
  const { t, u, ui, lang, fmtWeekday, fmtDate, fmtTime } = useLang();
  return (
    <section id="venue" className="venue section section--blush" aria-labelledby="venue-title">
      <div className="container">
        <SectionHeading id="venue-title" title={u(ui.venueTitle)} subtitle={u(ui.venueSub)} />
        <div className="venue__grid">
          <Reveal className="venue__media reveal--photo">
            <figure className="venue__frame">
              <img src={venue.image} alt={venue.imageAlt} loading="lazy" decoding="async" width={1600} height={1100} />
            </figure>
            {weddingConfig.site.showSampleBadge && <p className="venue__note">{t(venue.note)}</p>}
          </Reveal>
          <Reveal className="venue__info" delay={120}>
            <span className="venue__pin" aria-hidden="true">
              <MapPin size={26} />
            </span>
            <h3 className="venue__name">{t(venue.name)}</h3>
            <address className="venue__address">{t(venue.address)}</address>
            <p className="venue__when">
              {fmtWeekday(wedding.ceremonyStart)}, {fmtDate(wedding.ceremonyStart)}
              <br />
              {fmtTime(wedding.ceremonyStart)}
              {lang === 'en' ? ' IST' : ''}
            </p>
            <div className="btn-row btn-row--stack">
              <PremiumButton icon={Navigation} href={links.directions} aria-label={`${u(ui.getDirections)} — Google Maps`}>
                {u(ui.getDirections)}
              </PremiumButton>
              <PremiumButton icon={MapPin} variant="outline" href={links.map} aria-label={u(ui.openMaps)}>
                {u(ui.openMaps)}
              </PremiumButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
