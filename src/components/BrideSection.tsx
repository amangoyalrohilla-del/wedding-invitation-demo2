import { weddingConfig } from '../config/weddingConfig';
import { useLang } from '../i18n';
import { Sparkles } from './Icons';
import { ProfileSection } from './ProfileSection';

export function BrideSection() {
  const { ui } = useLang();
  return (
    <ProfileSection
      id="bride"
      tone="blush"
      flip
      heading={ui.brideHeading}
      subheading={ui.brideSub}
      person={weddingConfig.couple.bride}
      cta={ui.exploreCelebration}
      ctaTarget="countdown"
      ctaIcon={Sparkles}
    />
  );
}
