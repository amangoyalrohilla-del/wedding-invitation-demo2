import type { ComponentType } from 'react';
import type { L } from '../config/weddingConfig';
import { useLang } from '../i18n';
import { scrollToId } from '../lib/dom';
import { JharokhaFrame, Reveal, SectionHeading } from './Ornaments';
import { PremiumButton } from './PremiumButton';

interface Person {
  fullName: L;
  parents: L;
  relation: L;
  blurb: L;
  portrait: string;
  portraitAlt: string;
  portraitHasFrame?: boolean;
}

interface Props {
  id: string;
  heading: L;
  subheading: L;
  person: Person;
  cta: L;
  ctaTarget: string;
  ctaIcon?: ComponentType<{ size?: number }>;
  flip?: boolean;
  tone: 'ivory' | 'blush';
}

/** Shared layout for groom & bride — identical frames, identical (centred) alignment. */
export function ProfileSection({ id, heading, subheading, person, cta, ctaTarget, ctaIcon, flip, tone }: Props) {
  const { t } = useLang();
  return (
    <section id={id} className={`profile section section--${tone}`} aria-labelledby={`${id}-title`}>
      <div className="container">
        <SectionHeading id={`${id}-title`} title={t(heading)} subtitle={t(subheading)} />
        <div className={`profile__grid ${flip ? 'is-flipped' : ''}`}>
          <Reveal className="profile__media reveal--photo">
            <JharokhaFrame src={person.portrait} alt={person.portraitAlt} hasOwnFrame={person.portraitHasFrame} />
          </Reveal>
          <Reveal className="profile__text" delay={120}>
            <h3 className="profile__name calligraphy shimmer">{t(person.fullName)}</h3>
            <p className="profile__parents">
              <em>{t(person.relation)}</em>
              <br />
              {t(person.parents)}
            </p>
            <p className="profile__blurb">{t(person.blurb)}</p>
            <PremiumButton icon={ctaIcon} onClick={() => scrollToId(ctaTarget)}>
              {t(cta)}
            </PremiumButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
