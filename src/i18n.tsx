/**
 * Language switch: the whole invitation shows in ONE language at a time
 * (English or Hindi). Wedding-specific texts live in the config as { en, hi };
 * fixed interface labels live in UI below.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { weddingConfig, type L, type Lang } from './config/weddingConfig';

const UI = {
  openInvitation: { en: 'Open the Invitation', hi: 'निमंत्रण खोलें' },
  skipIntro: { en: 'Skip Intro', hi: 'आगे बढ़ें' },
  nav: {
    home: { en: 'Home', hi: 'मुख्य' },
    couple: { en: 'The Couple', hi: 'जोड़ी' },
    countdown: { en: 'Countdown', hi: 'उलटी गिनती' },
    celebrations: { en: 'Celebrations', hi: 'समारोह' },
    venue: { en: 'Venue', hi: 'विवाह स्थल' },
    gallery: { en: 'Gallery', hi: 'गैलरी' },
    invitation: { en: 'Invitation', hi: 'निमंत्रण' },
  },
  viewEvents: { en: 'View Wedding Events', hi: 'विवाह कार्यक्रम देखें' },
  saveOurDate: { en: 'Save Our Date', hi: 'तिथि सेव करें' },
  saveTheDate: { en: 'Save the Date', hi: 'तिथि सेव करें' },
  groomHeading: { en: 'Meet Our Groom', hi: 'हमारे दूल्हे राजा' },
  groomSub: { en: 'The Royal Groom', hi: 'शाही दूल्हा' },
  brideHeading: { en: 'Meet Our Bride', hi: 'हमारी दुल्हन रानी' },
  brideSub: { en: 'The Royal Bride', hi: 'शाही दुल्हन' },
  meetBride: { en: 'Meet the Bride', hi: 'दुल्हन से मिलिए' },
  exploreCelebration: { en: 'Explore Our Celebration', hi: 'उत्सव देखें' },
  countdownTitle: { en: 'The Auspicious Countdown', hi: 'शुभ घड़ी की प्रतीक्षा' },
  countdownSub: { en: 'Until the sacred pheras begin', hi: 'पवित्र फेरों तक का समय' },
  units: {
    days: { en: 'Days', hi: 'दिन' },
    hours: { en: 'Hours', hi: 'घंटे' },
    minutes: { en: 'Minutes', hi: 'मिनट' },
    seconds: { en: 'Seconds', hi: 'सेकंड' },
  },
  stdTitle: { en: 'Save the Date', hi: 'शुभ तिथि' },
  stdSub: { en: 'Mark your calendar for our forever', hi: 'इस ख़ास दिन को अपने कैलेंडर में जोड़ें' },
  stdNote: {
    en: 'Opens Google Calendar with the ceremony filled in — tap “Save” there to add it.',
    hi: 'Google Calendar में कार्यक्रम भरा हुआ खुलेगा — वहाँ “Save” दबाएँ।',
  },
  useOutlook: { en: 'Use Outlook instead?', hi: 'Outlook इस्तेमाल करते हैं?' },
  outlookPersonal: { en: 'Outlook.com / Hotmail', hi: 'Outlook.com / Hotmail' },
  outlookWork: { en: 'Microsoft 365 (work / school)', hi: 'Microsoft 365 (ऑफ़िस / कॉलेज)' },
  appleNote: {
    en: 'Apple Calendar: open the Google or Outlook link and save it there, or add it manually.',
    hi: 'Apple Calendar: Google या Outlook लिंक खोलकर वहाँ सेव करें, या खुद जोड़ लें।',
  },
  celebrationsTitle: { en: 'The Wedding Celebrations', hi: 'विवाह समारोह' },
  celebrationsSub: { en: 'Colours, rituals and two families coming together', hi: 'रंग, रस्में और रिश्तों का खूबसूरत संगम' },
  viewDetails: { en: 'View Ceremony Details', hi: 'कार्यक्रम विवरण' },
  viewBaraat: { en: 'View Baraat Details', hi: 'बारात विवरण' },
  getDirections: { en: 'Get Directions', hi: 'रास्ता देखें' },
  openMaps: { en: 'Open Google Maps', hi: 'गूगल मैप्स खोलें' },
  detailsLink: { en: 'View ceremony details', hi: 'कार्यक्रम विवरण देखें' },
  dressCode: { en: 'Dress code', hi: 'पहनावा' },
  theme: { en: 'Theme', hi: 'थीम' },
  addToCalendar: { en: 'Add to Calendar', hi: 'कैलेंडर में जोड़ें' },
  directions: { en: 'Directions', hi: 'रास्ता' },
  venueTitle: { en: 'The Royal Wedding Venue', hi: 'विवाह स्थल' },
  venueSub: { en: 'Where our new journey begins', hi: 'जहाँ हमारे नए सफ़र की शुरुआत होगी' },
  galleryTitle: { en: 'Our Beautiful Journey', hi: 'हमारा खूबसूरत सफ़र' },
  gallerySub: { en: 'Some love stories are written in the stars.', hi: 'कुछ प्रेम कहानियाँ सितारों में लिखी होती हैं।' },
  exploreMemories: { en: 'Explore Our Memories', hi: 'यादें देखें' },
  photo: { en: 'Photo', hi: 'फ़ोटो' },
  prev: { en: 'Previous photo', hi: 'पिछली फ़ोटो' },
  next: { en: 'Next photo', hi: 'अगली फ़ोटो' },
  filmTitle: { en: 'A Love Story in Motion', hi: 'चलचित्र में हमारी कहानी' },
  filmSub: { en: 'Every beautiful journey begins with a single moment.', hi: 'हर खूबसूरत सफ़र एक पल से शुरू होता है।' },
  playFilm: { en: 'Play Film', hi: 'फ़िल्म चलाएँ' },
  sampleFilm: { en: 'Sample', hi: 'सैंपल' },
  comingSoon: { en: 'Coming soon', hi: 'जल्द आ रही है' },
  inviteTitle: { en: 'With Love & Blessings', hi: 'सप्रेम निमंत्रण' },
  viewVenue: { en: 'View the Wedding Venue', hi: 'विवाह स्थल देखें' },
  backToTop: { en: 'Back to Top', hi: 'ऊपर जाएँ' },
  replay: { en: 'Replay the entrance', hi: 'शुरुआत फिर से देखें' },
  sampleNote: {
    en: 'Demo invitation · fictional couple · illustrative artwork & sample films.',
    hi: 'डेमो निमंत्रण · काल्पनिक जोड़ी · सांकेतिक चित्र और सैंपल फ़िल्में।',
  },
  close: { en: 'Close', hi: 'बंद करें' },
  menu: { en: 'Open section menu', hi: 'मेनू खोलें' },
  closeMenu: { en: 'Close menu', hi: 'मेनू बंद करें' },
  musicOn: { en: 'Play soft background music', hi: 'हल्का संगीत चलाएँ' },
  musicOff: { en: 'Mute background music', hi: 'संगीत बंद करें' },
  switchTo: { en: 'हिंदी में देखें', hi: 'View in English' },
  and: { en: 'and', hi: 'और' },
  ist: { en: 'IST', hi: '' },
};

type UIKey = typeof UI;

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (v: L) => string;
  ui: UIKey;
  /** pick a UI string */
  u: (v: L) => string;
  fmtDate: (iso: string) => string;
  fmtWeekday: (iso: string) => string;
  fmtTime: (iso: string) => string;
  fmtMonthYear: (iso: string) => string;
}

const LangContext = createContext<Ctx | null>(null);
const KEY = 'invite-lang';

const readLang = (): Lang => {
  try {
    const v = window.localStorage.getItem(KEY);
    if (v === 'en' || v === 'hi') return v;
  } catch {
    /* storage blocked */
  }
  return weddingConfig.site.defaultLanguage;
};

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<Ctx>(() => {
    // Hindi month/weekday names, but numbers stay as 0-9 digits.
    const loc = lang === 'hi' ? 'hi-IN-u-nu-latn' : 'en-GB';
    const tz = 'Asia/Kolkata';
    const dateF = new Intl.DateTimeFormat(loc, { day: 'numeric', month: 'long', year: 'numeric', timeZone: tz });
    const weekF = new Intl.DateTimeFormat(loc, { weekday: 'long', timeZone: tz });
    const monthYearF = new Intl.DateTimeFormat(loc, { month: 'long', year: 'numeric', timeZone: tz });
    const timeF = new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: tz });
    const hourF = new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hour12: false, timeZone: tz });
    const fmtTime = (iso: string) => {
      const d = new Date(iso);
      const base = timeF.format(d).toUpperCase().replace(/\s+/g, ' ');
      if (lang === 'en') return base;
      const h = Number(hourF.format(d));
      const part = h < 12 ? 'सुबह' : h < 16 ? 'दोपहर' : h < 20 ? 'शाम' : 'रात';
      return `${part} ${base.replace(/ (AM|PM)$/, '')} बजे`;
    };
    return {
      lang,
      setLang,
      t: (v: L) => v[lang],
      u: (v: L) => v[lang],
      ui: UI,
      fmtDate: (iso) => dateF.format(new Date(iso)),
      fmtWeekday: (iso) => weekF.format(new Date(iso)),
      fmtMonthYear: (iso) => monthYearF.format(new Date(iso)),
      fmtTime,
    };
  }, [lang, setLang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): Ctx {
  const c = useContext(LangContext);
  if (!c) throw new Error('useLang must be used inside <LangProvider>');
  return c;
}

/** Small EN | हिं switch */
export function LangToggle({ className = '' }: { className?: string }) {
  const { lang, setLang, ui } = useLang();
  return (
    <div className={`lang-toggle ${className}`} role="group" aria-label={ui.switchTo[lang]}>
      <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')} lang="en">
        EN
      </button>
      <button type="button" aria-pressed={lang === 'hi'} onClick={() => setLang('hi')} lang="hi">
        हिं
      </button>
    </div>
  );
}
