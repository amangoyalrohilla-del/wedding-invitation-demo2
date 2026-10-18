import { weddingConfig } from '../config/weddingConfig';
import { useLang } from '../i18n';
import { scrollToId } from '../lib/dom';
import { links } from '../lib/weddingLinks';
import { ArrowUp, CalendarHeart, Navigation, RotateCcw } from './Icons';
import { FloralDivider, GaneshaEmblem, Petals, Reveal } from './Ornaments';
import { PremiumButton } from './PremiumButton';

export function FinalBlessings({ onReplayIntro }: { onReplayIntro: () => void }) {
  const { couple, wedding, text } = weddingConfig;
  const { t, u, ui, fmtDate } = useLang();
  return (
    <>
      <section id="blessings" className="finale" aria-labelledby="finale-title">
        <Petals count={14} className="finale__petals" />
        <div className="twinkles" aria-hidden="true">
          {Array.from({ length: 22 }, (_, i) => (
            <span key={i} style={{ left: `${(i * 37 + 7) % 100}%`, top: `${(i * 53 + 11) % 100}%`, animationDelay: `${(i * 0.43) % 4}s` }} />
          ))}
        </div>
        <div className="container">
          <Reveal className="finale__frame">
            <svg className="finale__arch" viewBox="0 0 600 120" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 120V60C0 30 60 20 120 20 170 20 220 4 300 2c80 2 130 18 180 18 60 0 120 10 120 40v60" fill="none" stroke="#D5B16F" strokeWidth="2" />
            </svg>
            <GaneshaEmblem size={64} title="Lord Ganesha" />
            <h2 id="finale-title" className="finale__names calligraphy">
              <span>{t(couple.groom.firstName)}</span>
              <span className="amp" aria-hidden="true">
                &amp;
              </span>
              <span className="sr-only"> {u(ui.and)} </span>
              <span>{t(couple.bride.firstName)}</span>
            </h2>
            <p className="finale__date">
              <time dateTime={wedding.ceremonyStart}>{fmtDate(wedding.ceremonyStart)}</time>
            </p>
            <p className="finale__line">{t(text.closingLine)}</p>
            <FloralDivider color="#D5B16F" />
            <p className="finale__couplet">
              {t(text.closingCouplet[0])}
              <br />
              {t(text.closingCouplet[1])}
            </p>
            <p className="finale__call">{t(text.closingCall)}</p>
            <div className="btn-row">
              <PremiumButton icon={CalendarHeart} variant="ivory" burst href={links.saveTheDate} aria-label={`${u(ui.saveTheDate)} — Google Calendar`}>
                {u(ui.saveTheDate)}
              </PremiumButton>
              <PremiumButton icon={Navigation} variant="ivory" href={links.directions} aria-label={`${u(ui.getDirections)} — Google Maps`}>
                {u(ui.getDirections)}
              </PremiumButton>
              <PremiumButton icon={ArrowUp} variant="outline" className="royal-btn--on-dark" onClick={() => scrollToId('home')}>
                {u(ui.backToTop)}
              </PremiumButton>
            </div>
          </Reveal>
        </div>
      </section>
      <footer className="site-footer">
        <svg viewBox="0 0 600 24" className="site-footer__orn" aria-hidden="true">
          <path d="M0 12h250M350 12h250" stroke="#D5B16F" strokeWidth="1" />
          <path d="M260 12l20-10 20 10-20 10ZM300 12l20-10 20 10-20 10Z" fill="none" stroke="#D5B16F" />
          <circle cx="300" cy="12" r="3" fill="#D5B16F" />
        </svg>
        <p className="site-footer__blessing">{t(text.footerBlessing)}</p>
        <p className="site-footer__small">
          {t(couple.groom.firstName)} &amp; {t(couple.bride.firstName)} · {fmtDate(wedding.ceremonyStart)} · {t(wedding.city)}
        </p>
        <button type="button" className="text-link text-link--light site-footer__replay" onClick={onReplayIntro}>
          <RotateCcw size={14} /> {u(ui.replay)}
        </button>
        {weddingConfig.site.showSampleBadge && <p className="site-footer__sample">{u(ui.sampleNote)}</p>}
      </footer>
    </>
  );
}
