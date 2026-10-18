import { weddingConfig } from '../config/weddingConfig';
import { useLang } from '../i18n';
import { scrollToId } from '../lib/dom';
import { links } from '../lib/weddingLinks';
import { CalendarHeart, ScrollText } from './Icons';
import { CornerMotif, FloralDivider, GaneshaEmblem, Petals, RoseSpray } from './Ornaments';
import { PremiumButton } from './PremiumButton';

export function CoupleHero({ introDone }: { introDone: boolean }) {
  const { couple, wedding, text } = weddingConfig;
  const { t, u, ui, lang, fmtDate } = useLang();
  return (
    <section id="home" className={`hero ${introDone ? 'is-ready' : ''}`} aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true" />
      <Petals count={9} className="hero__petals" />
      <div className="container hero__inner">
        <div className="hero__invocation">
          <GaneshaEmblem size={58} title="Lord Ganesha emblem" />
          <p>{t(text.invocationShort)}</p>
        </div>

        <figure className="hero__photo">
          <div className="hero__arch">
            <img
              className="hero__img"
              src={couple.heroImage}
              alt={couple.heroImageAlt}
              width={1125}
              height={1406}
              fetchPriority="high"
              decoding="async"
            />
            <div className="hero__overlay">
              <svg className="hero__overlay-shape" viewBox="0 0 400 140" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="heroOverlay" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#A63B45" stopOpacity=".78" />
                    <stop offset="1" stopColor="#641E2A" stopOpacity=".94" />
                  </linearGradient>
                </defs>
                <path d="M0 40C60 4 130-6 200 14 270-6 340 4 400 40V140H0Z" fill="url(#heroOverlay)" />
                <path d="M0 40C60 4 130-6 200 14 270-6 340 4 400 40" fill="none" stroke="#D5B16F" strokeWidth="1.6" />
                <path d="M188 14l12-10 12 10-12 10Z" fill="#D5B16F" />
              </svg>
              <p className="hero__shayari">
                {t(text.heroCouplet[0])}
                <br />
                {t(text.heroCouplet[1])}
              </p>
            </div>
          </div>
          <CornerMotif className="hero__corner tl" />
          <CornerMotif className="hero__corner tr" />
          <RoseSpray className="hero__roses hero__roses--l" />
          <RoseSpray className="hero__roses hero__roses--r" />
        </figure>

        <div className="hero__names">
          <h1 id="hero-title" className="calligraphy shimmer">
            <span>{t(couple.groom.fullName)}</span>
            <span className="amp" aria-hidden="true">
              &amp;
            </span>
            <span className="sr-only"> {u(ui.and)} </span>
            <span>{t(couple.bride.fullName)}</span>
          </h1>
          <p className="hero__tagline">{t(couple.tagline)}</p>
          <FloralDivider />
          <p className="hero__date">
            <time dateTime={wedding.ceremonyStart}>{lang === 'en' ? fmtDate(wedding.ceremonyStart).toUpperCase() : fmtDate(wedding.ceremonyStart)}</time>
          </p>
          <p className="hero__city">{t(wedding.city)}</p>
          <div className="btn-row">
            <PremiumButton icon={ScrollText} onClick={() => scrollToId('celebrations')}>
              {u(ui.viewEvents)}
            </PremiumButton>
            <PremiumButton icon={CalendarHeart} variant="outline" burst href={links.saveTheDate} aria-label={`${u(ui.saveOurDate)} — Google Calendar`}>
              {u(ui.saveOurDate)}
            </PremiumButton>
          </div>
        </div>
      </div>
    </section>
  );
}
