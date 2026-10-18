/** Calendar + maps link builders. No API keys, no downloads. */

/** "2026-12-12T19:30:00+05:30" → "20261212T193000" (local wall-clock time, used with ctz) */
const toGoogleLocal = (iso: string) => iso.slice(0, 19).replace(/[-:]/g, '');

export interface CalendarEventInput {
  title: string;
  start: string; // ISO with offset
  end: string;
  location: string;
  details: string;
  timeZone: string;
}

/** Opens Google Calendar's real "create event" screen, prefilled. */
export function googleCalendarUrl(e: CalendarEventInput): string {
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: e.title,
    dates: `${toGoogleLocal(e.start)}/${toGoogleLocal(e.end)}`,
    ctz: e.timeZone,
    details: e.details,
    location: e.location,
  });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}

/** Outlook.com (personal) or Microsoft 365 (work/school) compose-event deeplink. */
export function outlookCalendarUrl(e: CalendarEventInput, account: 'personal' | 'work' = 'personal'): string {
  const host = account === 'personal' ? 'https://outlook.live.com' : 'https://outlook.office.com';
  const p = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: e.title,
    startdt: e.start.slice(0, 19) + e.start.slice(19), // keep offset
    enddt: e.end,
    location: e.location,
    body: e.details,
  });
  return `${host}/calendar/0/action/compose?${p.toString()}`;
}

export const fullVenue = (name: string, address: string) => `${name}, ${address}`;

/** Google Maps place search for the venue (works on web; opens the Maps app on phones). */
export const mapsSearchUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

/** Google Maps directions from the guest's current location to the venue. */
export const mapsDirectionsUrl = (destination: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;

export const openExternal = (url: string) => {
  const w = window.open(url, '_blank', 'noopener,noreferrer');
  if (!w) window.location.href = url; // popup blocked → same-tab fallback
};
