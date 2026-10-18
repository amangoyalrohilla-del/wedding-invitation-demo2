import { weddingConfig, type WeddingEvent } from '../config/weddingConfig';
import { fullVenue, googleCalendarUrl, mapsDirectionsUrl, mapsSearchUrl, outlookCalendarUrl, type CalendarEventInput } from './links';

const { wedding, venue, couple } = weddingConfig;
/** Maps & calendar always use the English venue name/address. */
export const venueQuery = fullVenue(venue.mapName, venue.mapAddress);

export const ceremonyCalendar: CalendarEventInput = {
  title: wedding.calendarTitle,
  start: wedding.ceremonyStart,
  end: wedding.ceremonyEnd,
  location: venueQuery,
  details: wedding.calendarDescription,
  timeZone: wedding.timeZone,
};

export const eventCalendar = (e: WeddingEvent): CalendarEventInput => ({
  title: `${couple.groom.firstName.en} & ${couple.bride.firstName.en} — ${e.name.en}`,
  start: e.start,
  end: e.end,
  location: e.location ?? venueQuery,
  details: `${e.description.en}\n\nDress code: ${e.dressCode.en}`,
  timeZone: wedding.timeZone,
});

export const links = {
  saveTheDate: googleCalendarUrl(ceremonyCalendar),
  outlookPersonal: outlookCalendarUrl(ceremonyCalendar, 'personal'),
  outlookWork: outlookCalendarUrl(ceremonyCalendar, 'work'),
  directions: mapsDirectionsUrl(venueQuery),
  map: mapsSearchUrl(venueQuery),
};
