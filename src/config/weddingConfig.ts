/**
 * ─────────────────────────────────────────────────────────────
 *  WEDDING CONFIGURATION — edit ONLY this file for a new client.
 * ─────────────────────────────────────────────────────────────
 *  • Every visible text has an English (`en`) and Hindi (`hi`) version.
 *    Guests switch with the EN | हिं button; each view shows ONE language.
 *  • Times use ISO-8601 with the +05:30 (IST) offset.
 *  • To use real photos: put files in src/assets/images/ and change the
 *    imports below (e.g. `import coupleHero from '../assets/images/couple.jpg'`).
 *  • The demo is a FICTIONAL invitation (sample artwork, sample names),
 *    not a claim about a real event at the venue.
 */
import coupleHero from '../assets/images/photos/couple-hero.jpg';
import groomPortrait from '../assets/images/photos/groom.jpg';
import bridePortrait from '../assets/images/photos/bride.jpg';
import photoForehead from '../assets/images/photos/couple-forehead.jpg';
import photoLaugh from '../assets/images/photos/couple-laugh.jpg';
import photoBlueSaree from '../assets/images/photos/couple-blue-saree.jpg';
import photoOrangeSaree from '../assets/images/photos/couple-orange-saree.jpg';
import photoNavy from '../assets/images/photos/couple-navy.jpg';
import haldiArt from '../assets/images/event-haldi.svg';
import mehendiArt from '../assets/images/event-mehendi.svg';
import sangeetArt from '../assets/images/event-sangeet.svg';
import baraatArt from '../assets/images/event-baraat.svg';
import mandapArt from '../assets/images/event-mandap.svg';
import venueImage from '../assets/images/venue.svg';
import film1Poster from '../assets/images/film-1-poster.jpg';
import film2Poster from '../assets/images/film-2-poster.jpg';

export type Lang = 'en' | 'hi';
/** A text in both languages. */
export interface L {
  en: string;
  hi: string;
}
const l = (en: string, hi: string): L => ({ en, hi });

export type EventAction = 'details' | 'directions';

export interface WeddingEvent {
  id: string;
  name: L;
  shortName: L;
  start: string; // ISO with offset
  end: string;
  theme: L;
  dressCode: L;
  description: L;
  details: L[];
  image: string;
  imageAlt: string;
  accent: string;
  action: EventAction;
  location?: string; // optional event-specific address (used for Maps)
}

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** which part of the photo stays visible in the frame, e.g. '30% 50%' */
  focus?: string;
}

export type VideoSource =
  | { type: 'mp4'; src: string; webm?: string } // file in public/videos/
  | { type: 'url'; src: string } // any hosted .mp4/.webm URL
  | { type: 'youtube'; id: string }
  | { type: 'none' };

export interface Film {
  id: string;
  title: L;
  duration: string;
  poster: string;
  source: VideoSource;
}

export const weddingConfig = {
  site: {
    title: 'Arjun & Meera — Wedding Invitation · 12 December 2026',
    description:
      'With the blessings of Lord Ganesha, Arjun Agarwal & Meera Agarwal invite you to celebrate their wedding on 12 December 2026 in Jaipur, Rajasthan.',
    canonicalUrl: '',
    ogImage: 'og-image.png',
    defaultLanguage: 'en' as Lang,
    rememberIntroInSession: true,
    /** Clearly marks the demo artwork for client presentations. Set false for real clients. */
    showSampleBadge: true,
  },

  couple: {
    groom: {
      fullName: l('Arjun Agarwal', 'अर्जुन अग्रवाल'),
      firstName: l('Arjun', 'अर्जुन'),
      relation: l('Beloved son of', 'सुपुत्र'),
      parents: l('Mr. Ramesh Agarwal & Mrs. Kavita Agarwal', 'श्री रमेश अग्रवाल एवं श्रीमती कविता अग्रवाल'),
      blurb: l(
        'With the blessings of his elders and the love of his family, Arjun begins a beautiful new chapter of his life.',
        'बड़ों के आशीर्वाद और परिवार के प्यार के साथ, अर्जुन अपने जीवन के एक सुंदर नए अध्याय की शुरुआत कर रहे हैं।',
      ),
      portrait: groomPortrait,
      portraitAlt: 'The groom in a cream sherwani and royal safa',
      /** true when the photo already has its own decorative frame (shown as-is, no extra frame) */
      portraitHasFrame: false,
    },
    bride: {
      fullName: l('Meera Agarwal', 'मीरा अग्रवाल'),
      firstName: l('Meera', 'मीरा'),
      relation: l('Beloved daughter of', 'सुपुत्री'),
      parents: l('Mr. Suresh Agarwal & Mrs. Anita Agarwal', 'श्री सुरेश अग्रवाल एवं श्रीमती अनीता अग्रवाल'),
      blurb: l(
        'With dreams in her eyes and love in her heart, Meera steps into a lifetime of beautiful memories.',
        'आँखों में सपने और दिल में प्यार लिए, मीरा जीवन भर की सुंदर यादों की ओर कदम बढ़ा रही हैं।',
      ),
      portrait: bridePortrait,
      portraitAlt: 'The bride in a red bridal lehenga and dupatta',
      portraitHasFrame: false,
    },
    heroImage: coupleHero,
    heroImageAlt: 'The bride and groom together in a palace corridor',
    tagline: l('Two Hearts. One Soul. A Lifetime of Togetherness.', 'दो दिल, एक आत्मा, जीवन भर का साथ।'),
  },

  wedding: {
    ceremonyStart: '2026-12-12T19:30:00+05:30',
    ceremonyEnd: '2026-12-12T23:30:00+05:30',
    timeZone: 'Asia/Kolkata',
    city: l('Jaipur, Rajasthan', 'जयपुर, राजस्थान'),
    calendarTitle: 'Arjun & Meera — Wedding Ceremony',
    calendarDescription:
      'With the blessings of Lord Ganesha, the Agarwal families joyfully invite you to the wedding ceremony of Arjun Agarwal & Meera Agarwal.',
  },

  venue: {
    /** Used for Google Maps & Calendar — keep it in English */
    mapName: 'Fairmont Jaipur',
    mapAddress: 'Kukas, Jaipur, Rajasthan, India',
    name: l('Fairmont Jaipur', 'फेयरमोंट जयपुर'),
    address: l('Kukas, Jaipur, Rajasthan, India', 'कूकस, जयपुर, राजस्थान'),
    image: venueImage,
    imageAlt: 'A Rajasthani palace with domes and a reflecting pool at sunset',
    note: l('Illustrative artwork — replace with a photograph of the venue.', 'सांकेतिक चित्र — स्थल की असली फ़ोटो लगाएँ।'),
  },

  events: [
    {
      id: 'haldi',
      name: l('Haldi Ceremony', 'हल्दी समारोह'),
      shortName: l('Haldi', 'हल्दी'),
      start: '2026-12-11T11:00:00+05:30',
      end: '2026-12-11T13:30:00+05:30',
      theme: l('Sunshine yellow, marigold flowers & brass décor', 'पीला रंग, गेंदे के फूल और पीतल की सजावट'),
      dressCode: l('Shades of yellow', 'पीले रंग के परिधान'),
      description: l(
        'Let the golden hues of Haldi bless our journey with love, laughter and happiness.',
        'हल्दी का सुनहरा रंग हमारे सफ़र को प्यार, हँसी और खुशियों से भर दे।',
      ),
      details: [l('Brunch will be served', 'नाश्ते की व्यवस्था रहेगी'), l('Folk songs with the family', 'परिवार के साथ लोकगीत')],
      image: haldiArt,
      imageAlt: 'Haldi décor with brass bowls of turmeric and marigolds',
      accent: '#E9A92A',
      action: 'details',
    },
    {
      id: 'mehendi',
      name: l('Mehendi Ceremony', 'मेहंदी समारोह'),
      shortName: l('Mehendi', 'मेहंदी'),
      start: '2026-12-11T16:00:00+05:30',
      end: '2026-12-11T18:30:00+05:30',
      theme: l('Mehendi green, rose red & floral décor', 'मेहंदी हरा, गुलाबी-लाल और फूलों की सजावट'),
      dressCode: l('Greens, pinks and florals', 'हरे और गुलाबी रंग के परिधान'),
      description: l(
        'An evening of beautiful henna, delightful colours and unforgettable memories.',
        'खूबसूरत मेहंदी, रंगों और यादगार पलों से सजी एक शाम।',
      ),
      details: [l('Mehendi artists for all guests', 'सभी मेहमानों के लिए मेहंदी'), l('High tea & chaat', 'चाय और चाट')],
      image: mehendiArt,
      imageAlt: 'Mehendi décor with a henna mandala and cushions',
      accent: '#5E7B2E',
      action: 'details',
    },
    {
      id: 'sangeet',
      name: l('Sangeet Night', 'संगीत संध्या'),
      shortName: l('Sangeet', 'संगीत'),
      start: '2026-12-11T19:00:00+05:30',
      end: '2026-12-11T23:30:00+05:30',
      theme: l('Royal maroon, golden lights & celebration', 'शाही मैरून, सुनहरी रोशनी और जश्न'),
      dressCode: l('Indian or Indo-western glamour', 'भारतीय या इंडो-वेस्टर्न परिधान'),
      description: l('An unforgettable night of music, dancing, joy and celebration.', 'संगीत, नृत्य और खुशियों से भरी एक यादगार रात।'),
      details: [l('Family performances & live band', 'परिवार की प्रस्तुतियाँ और लाइव बैंड'), l('Dinner from 8:30 PM', 'रात 8:30 बजे से भोजन')],
      image: sangeetArt,
      imageAlt: 'Sangeet stage with dholak, tabla and fairy lights',
      accent: '#641E2A',
      action: 'details',
    },
    {
      id: 'baraat',
      name: l('Royal Baraat', 'शाही बारात'),
      shortName: l('Baraat', 'बारात'),
      start: '2026-12-12T18:00:00+05:30',
      end: '2026-12-12T19:30:00+05:30',
      theme: l('Traditional Rajasthani procession', 'पारंपरिक राजस्थानी बारात'),
      dressCode: l('Traditional attire — safas for the groom’s side', 'पारंपरिक परिधान — वर पक्ष के लिए साफ़ा'),
      description: l(
        'The royal procession begins with celebration, music and endless joy.',
        'ढोल, संगीत और अपार खुशियों के साथ शाही बारात का आगमन।',
      ),
      details: [l('Please assemble 15 minutes early', 'कृपया 15 मिनट पहले पधारें'), l('Dhol, band and decorated horse', 'ढोल, बैंड और सजी हुई घोड़ी')],
      image: baraatArt,
      imageAlt: 'Baraat with the groom on a decorated horse and dhol players',
      accent: '#A63B45',
      action: 'details',
    },
    {
      id: 'wedding',
      name: l('Wedding Ceremony', 'विवाह संस्कार'),
      shortName: l('Vivah', 'विवाह'),
      start: '2026-12-12T19:30:00+05:30',
      end: '2026-12-12T23:30:00+05:30',
      theme: l('Sacred royal wedding mandap', 'पवित्र शाही मंडप'),
      dressCode: l('Traditional Indian formal', 'पारंपरिक भारतीय परिधान'),
      description: l(
        'Under the blessings of our families, two hearts promise forever.',
        'परिवारों के आशीर्वाद से, दो दिल सात जन्मों का वचन देंगे।',
      ),
      details: [l('Pheras under the mandap', 'मंडप में फेरे'), l('Wedding dinner follows', 'इसके बाद प्रीतिभोज')],
      image: mandapArt,
      imageAlt: 'Wedding mandap with floral pillars and the sacred fire',
      accent: '#A47A39',
      action: 'directions',
    },
  ] as WeddingEvent[],

  gallery: [
    { src: photoForehead, alt: 'The couple, foreheads touching', width: 1080, height: 1239, focus: '45% 40%' },
    { src: photoLaugh, alt: 'The couple laughing together', width: 764, height: 1400, focus: '50% 25%' },
    { src: photoBlueSaree, alt: 'The bride in a blue saree with the groom', width: 584, height: 1020, focus: '50% 30%' },
    { src: photoOrangeSaree, alt: 'The couple holding hands', width: 787, height: 1400, focus: '50% 30%' },
    { src: photoNavy, alt: 'The couple in a palace corridor', width: 820, height: 1400, focus: '50% 20%' },
  ] as GalleryImage[],

  /** Two portrait (9:16) films shown side by side. Use type 'none' to show "coming soon". */
  films: [
    {
      id: 'story',
      title: l('Our Love Story', 'हमारी प्रेम कहानी'),
      duration: '0:26',
      poster: film1Poster,
      source: { type: 'mp4', src: 'videos/film-our-story.mp4', webm: 'videos/film-our-story.webm' },
    },
    {
      id: 'save-date',
      title: l('Save the Date', 'शुभ तिथि'),
      duration: '0:19',
      poster: film2Poster,
      source: { type: 'mp4', src: 'videos/film-save-the-date.mp4', webm: 'videos/film-save-the-date.webm' },
    },
  ] as Film[],

  /** Background music: leave empty for the built-in gentle synthesised drone (copyright-free),
   *  or a LICENSED file in public/audio/, e.g. 'audio/shehnai.mp3'. */
  music: { src: '' },

  text: {
    gateTitle: l('Shubh Vivah', 'शुभ विवाह'),
    gateTagline: l('An Invitation to Celebrate Eternal Love', 'अटूट प्रेम के उत्सव का निमंत्रण'),
    invocation: l('॥ Shri Ganeshaya Namah ॥', '॥ ॐ श्री गणेशाय नमः ॥'),
    invocationShort: l('॥ Shri Ganeshaya Namah ॥', '॥ ॐ गणेशाय नमः ॥'),
    mantra: [
      l('Vakratunda Mahakaya Suryakoti Samaprabha,', 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।'),
      l('Nirvighnam Kuru Me Deva Sarva-Karyeshu Sarvada.', 'निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥'),
    ],
    ganeshaBlessing: l(
      'With the divine blessings of Lord Ganesha, we invite you to celebrate a beautiful beginning.',
      'श्री गणेश जी के आशीर्वाद से, हम आपको एक सुंदर शुरुआत के उत्सव में आमंत्रित करते हैं।',
    ),
    heroCouplet: [
      l('Two hearts unite, two families become one,', 'दो दिलों का मिलन, दो परिवारों का प्यार,'),
      l('a world of happiness has just begun.', 'सजने जा रहा है खुशियों से भरा संसार।'),
    ],
    countdownLine: l('Every passing moment brings us closer to forever.', 'हर बीतता पल हमें हमेशा के साथ के और करीब ला रहा है।'),
    countdownDone: l('Celebrating Our Forever Love', 'हमारे अटूट प्रेम का उत्सव'),
    invitation: [
      l(
        'With the divine blessings of Lord Ganesha and the love of our families, we joyfully invite you to celebrate the wedding of Arjun and Meera.',
        'श्री गणेश जी के आशीर्वाद और परिवारों के स्नेह के साथ, हम आपको अर्जुन और मीरा के विवाह में सादर आमंत्रित करते हैं।',
      ),
      l(
        'As two hearts unite and two families become one, your presence will fill our celebrations with warmth, laughter and unforgettable memories.',
        'जब दो दिल मिलेंगे और दो परिवार एक होंगे, तब आपकी उपस्थिति हमारे उत्सव को स्नेह, हँसी और यादगार पलों से भर देगी।',
      ),
      l(
        'Join us as we begin this beautiful journey of love, togetherness and forever.',
        'प्रेम और साथ के इस सुंदर सफ़र की शुरुआत में हमारे साथ शामिल हों।',
      ),
    ],
    invitationClosing: l('Your presence is our most precious blessing.', 'आपकी उपस्थिति ही हमारा सबसे अनमोल आशीर्वाद है।'),
    closingLine: l('Together is our favourite place to be.', 'साथ रहना ही हमारी सबसे प्यारी जगह है।'),
    closingCouplet: [
      l('Two hearts, one bond and countless joys —', 'दो दिल, एक रिश्ता और अनगिनत खुशियाँ…'),
      l('with your blessings, our new world begins.', 'आपके आशीर्वाद से सजेगी हमारी नई दुनिया।'),
    ],
    closingCall: l('We can’t wait to celebrate with you', 'आपके आगमन की प्रतीक्षा रहेगी'),
    footerBlessing: l('॥ Shubhamastu ॥', '॥ शुभमस्तु ॥'),
  },
};

export type WeddingConfig = typeof weddingConfig;
