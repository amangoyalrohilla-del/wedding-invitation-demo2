import { weddingConfig } from '../config/weddingConfig';
import { useLang } from '../i18n';
import { scrollToId } from '../lib/dom';
import { MapPin } from './Icons';
import { CornerMotif, FloralDivider, Mandala, Reveal } from './Ornaments';
import { PremiumButton } from './PremiumButton';

export function InvitationMessage() {
  const { text } = weddingConfig;
  const { t, u, ui } = useLang();
  return (
    <section id="invitation" className="invite section section--blush" aria-labelledby="invite-title">
      <div className="container">
        <Reveal className="invite__card">
          <Mandala size={520} className="invite__mandala" stroke="#A47A39" opacity={0.14} petals={20} />
          <CornerMotif className="invite__corner tl" />
          <CornerMotif className="invite__corner tr" />
          <CornerMotif className="invite__corner bl" />
          <CornerMotif className="invite__corner br" />
          <h2 id="invite-title">{u(ui.inviteTitle)}</h2>
          <FloralDivider />
          {text.invitation.map((p) => (
            <p key={p.en.slice(0, 24)} className="invite__para">
              {t(p)}
            </p>
          ))}
          <p className="invite__closing">{t(text.invitationClosing)}</p>
          <PremiumButton icon={MapPin} onClick={() => scrollToId('venue')}>
            {u(ui.viewVenue)}
          </PremiumButton>
        </Reveal>
      </div>
    </section>
  );
}
