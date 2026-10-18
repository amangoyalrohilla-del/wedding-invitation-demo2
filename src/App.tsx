import { useCallback, useEffect, useRef, useState } from 'react';
import { weddingConfig } from './config/weddingConfig';
import { sound } from './lib/audio';
import { lockScroll, safeSession, unlockScroll } from './lib/dom';
import { usePrefersReducedMotion } from './lib/hooks';
import { useLang } from './i18n';
import { BrideSection } from './components/BrideSection';
import { CoupleHero } from './components/CoupleHero';
import { Countdown } from './components/Countdown';
import { FinalBlessings } from './components/FinalBlessings';
import { GaneshWelcome } from './components/GaneshWelcome';
import { GroomSection } from './components/GroomSection';
import { InvitationMessage } from './components/InvitationMessage';
import { Navigation } from './components/Navigation';
import { PhotoGallery } from './components/PhotoGallery';
import { RoyalGate } from './components/RoyalGate';
import { ScrollProgress } from './components/ScrollProgress';
import { SaveTheDate } from './components/SaveTheDate';
import { VenueSection } from './components/VenueSection';
import { VideoSection } from './components/VideoSection';
import { WeddingFunctions } from './components/WeddingFunctions';

type Phase = 'gate' | 'opening' | 'ganesha' | 'leaving' | 'done';
const KEY = 'royal-invite-opened';

function initialPhase(): Phase {
  if (typeof window === 'undefined') return 'gate';
  const params = new URLSearchParams(window.location.search);
  if (params.has('skipIntro')) return 'done';
  if (weddingConfig.site.rememberIntroInSession && safeSession.get(KEY) === '1') return 'done';
  return 'gate';
}

export default function App() {
  sound.configure(weddingConfig.music.src);
  const [phase, setPhase] = useState<Phase>(initialPhase);
  const [skippedAtGate, setSkippedAtGate] = useState(false);
  const reduced = usePrefersReducedMotion();
  const { u, ui } = useLang();
  const timers = useRef<number[]>([]);
  const introVisible = phase !== 'done';

  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));
  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  // Lock page scroll while the intro overlay is showing
  useEffect(() => {
    if (!introVisible) return;
    lockScroll();
    return () => unlockScroll();
  }, [introVisible]);

  const finish = useCallback(() => {
    setPhase((p) => {
      if (p === 'leaving' || p === 'done') return p;
      return 'leaving';
    });
    safeSession.set(KEY, '1');
    later(
      () => {
        setPhase('done');
        window.scrollTo({ top: 0 });
        document.getElementById('hero-title')?.focus?.({ preventScroll: true });
      },
      reduced ? 250 : 900,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const openGate = () => {
    if (phase !== 'gate') return;
    setPhase('opening');
    later(() => setPhase((p) => (p === 'opening' ? 'ganesha' : p)), reduced ? 500 : 2000);
  };

  const replay = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    safeSession.remove(KEY);
    setSkippedAtGate(false);
    window.scrollTo({ top: 0 });
    setPhase('gate');
  };

  return (
    <>
      <a className="skip-link" href="#home">
        {u(ui.skipIntro)}
      </a>

      {introVisible && (
        <div className={`intro ${phase === 'leaving' ? 'is-leaving' : ''}`}>
          {(phase === 'opening' || phase === 'ganesha' || (phase === 'leaving' && !skippedAtGate)) && (
            <GaneshWelcome onDone={finish} onSkip={finish} leaving={phase === 'leaving'} />
          )}
          {(phase === 'gate' || phase === 'opening' || (phase === 'leaving' && skippedAtGate)) && (
            <RoyalGate
              opening={phase === 'opening'}
              onOpen={openGate}
              onSkip={() => {
                setSkippedAtGate(true);
                finish();
              }}
            />
          )}
        </div>
      )}

      <div className="site" aria-hidden={introVisible} inert={introVisible ? true : undefined}>
        {phase === 'done' && <Navigation />}
        {phase === 'done' && <ScrollProgress />}
        <main>
          <CoupleHero introDone={phase === 'done' || phase === 'leaving'} />
          <GroomSection />
          <BrideSection />
          <Countdown />
          <SaveTheDate />
          <WeddingFunctions />
          <VenueSection />
          <PhotoGallery />
          <VideoSection />
          <InvitationMessage />
        </main>
        <FinalBlessings onReplayIntro={replay} />
      </div>
    </>
  );
}
