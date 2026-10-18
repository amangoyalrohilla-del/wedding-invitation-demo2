import { useState } from 'react';
import { weddingConfig } from '../config/weddingConfig';
import { useLang } from '../i18n';
import { links } from '../lib/weddingLinks';
import { CalendarHeart, ChevronDown, ExternalLink } from './Icons';
import { CornerMotif, Reveal, SectionHeading } from './Ornaments';
import { PremiumButton } from './PremiumButton';

export function SaveTheDate() {
  const { wedding } = weddingConfig;
  const { t, u, ui, lang, fmtWeekday, fmtMonthYear, fmtTime } = useLang();
  const [more, setMore] = useState(false);
  const start = wedding.ceremonyStart;
  const [month, year] = fmtMonthYear(start).split(' ');
  const day = Number(start.slice(8, 10));
  return (
    <section id="save-the-date" className="std section section--ivory" aria-labelledby="std-title">
      <div className="container">
        <SectionHeading id="std-title" title={u(ui.stdTitle)} subtitle={u(ui.stdSub)} />
        <Reveal className="std__card">
          <CornerMotif className="std__corner tl" />
          <CornerMotif className="std__corner tr" />
          <CornerMotif className="std__corner bl" />
          <CornerMotif className="std__corner br" />
          <p className="std__weekday">{fmtWeekday(start)}</p>
          <p className="std__day">
            <span className="std__num">{day}</span>
            <span className="std__month">
              {month}
              <br />
              {year}
            </span>
          </p>
          <p className="std__time">
            {fmtTime(start)}
            {lang === 'en' ? ' IST' : ''}
          </p>
          <p className="std__city">{t(wedding.city)}</p>

          <PremiumButton icon={CalendarHeart} burst href={links.saveTheDate} aria-label={`${u(ui.saveTheDate)} — Google Calendar`}>
            {u(ui.saveTheDate)}
          </PremiumButton>
          <p className="std__note">{u(ui.stdNote)}</p>

          <button type="button" className="std__more" aria-expanded={more} aria-controls="std-other" onClick={() => setMore((m) => !m)}>
            {u(ui.useOutlook)} <ChevronDown size={16} className={more ? 'rot' : ''} />
          </button>
          <div id="std-other" className="std__other" hidden={!more}>
            <a href={links.outlookPersonal} target="_blank" rel="noopener noreferrer">
              {u(ui.outlookPersonal)} <ExternalLink size={14} />
            </a>
            <a href={links.outlookWork} target="_blank" rel="noopener noreferrer">
              {u(ui.outlookWork)} <ExternalLink size={14} />
            </a>
            <p>{u(ui.appleNote)}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
