import { weddingConfig } from '../config/weddingConfig';
import { useLang } from '../i18n';
import { Heart } from './Icons';
import { ProfileSection } from './ProfileSection';

export function GroomSection() {
  const { ui } = useLang();
  return (
    <ProfileSection
      id="groom"
      tone="ivory"
      heading={ui.groomHeading}
      subheading={ui.groomSub}
      person={weddingConfig.couple.groom}
      cta={ui.meetBride}
      ctaTarget="bride"
      ctaIcon={Heart}
    />
  );
}
