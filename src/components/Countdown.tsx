import { weddingConfig } from '../config/weddingConfig';
import { useLang } from '../i18n';
import { useCountdown } from '../lib/hooks';
import { Mandala, Reveal, SectionHeading } from './Ornaments';

const pad = (n: number, len = 2) => String(n).padStart(len, '0');

export function Countdown() {
  const { wedding, text } = weddingConfig;
  const { t, u, ui } = useLang();
  const c = useCountdown(wedding.ceremonyStart);
  const units = [
    { key: 'd', label: u(ui.units.days), value: pad(c.days, c.days > 99 ? 3 : 2) },
    { key: 'h', label: u(ui.units.hours), value: pad(c.hours) },
    { key: 'm', label: u(ui.units.minutes), value: pad(c.minutes) },
    { key: 's', label: u(ui.units.seconds), value: pad(c.seconds) },
  ];

  return (
    <section id="countdown" className="countdown section section--rose" aria-labelledby="countdown-title">
      <Mandala size={760} className="countdown__mandala" stroke="#F3DCA2" opacity={0.22} petals={24} />
      <div className="container">
        <SectionHeading id="countdown-title" title={u(ui.countdownTitle)} subtitle={u(ui.countdownSub)} light />
        {c.done ? (
          <Reveal className="countdown__done">
            <p className="calligraphy">{t(text.countdownDone)}</p>
          </Reveal>
        ) : (
          <Reveal className="countdown__row" role="timer" aria-label={`${c.days} ${u(ui.units.days)}, ${c.hours} ${u(ui.units.hours)}, ${c.minutes} ${u(ui.units.minutes)}`}>
            {units.map((unit) => (
              <div className="cd-unit" key={unit.key}>
                <svg className="cd-unit__frame" viewBox="0 0 120 160" preserveAspectRatio="none" aria-hidden="true">
                  <path
                    d="M4 156V58C4 32 26 18 42 16 50 6 56 2 60 1c4 1 10 5 18 15 16 2 38 16 38 42v98Z"
                    fill="rgba(255,248,239,.08)"
                    stroke="#D5B16F"
                    strokeWidth="1.6"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    d="M12 150V62C12 40 30 28 44 26 52 16 57 12 60 11c3 1 8 5 16 15 14 2 32 14 32 36v88Z"
                    fill="none"
                    stroke="#D5B16F"
                    strokeOpacity=".5"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                <span className="cd-unit__dot" aria-hidden="true" />
                <span className="cd-unit__value" aria-hidden="true">
                  <span key={unit.value} className="cd-unit__digits">
                    {unit.value}
                  </span>
                </span>
                <span className="cd-unit__label">{unit.label}</span>
              </div>
            ))}
          </Reveal>
        )}
        <p className="countdown__line">{t(text.countdownLine)}</p>
      </div>
    </section>
  );
}
