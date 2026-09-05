/** Easter Sunday (Gregorian, Meeus/Jones/Butcher algorithm), as a UTC date. */
function easterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(year, month - 1, day));
}

function toISODate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** Norway's public holidays ("røde dager") for a given year, as YYYY-MM-DD strings. */
function norwegianHolidays(year: number): Set<string> {
  const easter = easterSunday(year);
  const days = new Set<string>();
  const fromEaster = (offset: number) => {
    const d = new Date(easter);
    d.setUTCDate(d.getUTCDate() + offset);
    days.add(toISODate(d));
  };

  fromEaster(-3); // Maundy Thursday
  fromEaster(-2); // Good Friday
  fromEaster(0); // Easter Sunday
  fromEaster(1); // Easter Monday
  fromEaster(39); // Ascension Day
  fromEaster(49); // Whit Sunday
  fromEaster(50); // Whit Monday

  days.add(`${year}-01-01`); // New Year's Day
  days.add(`${year}-05-01`); // Labour Day
  days.add(`${year}-05-17`); // Constitution Day
  days.add(`${year}-12-25`); // Christmas Day
  days.add(`${year}-12-26`); // Boxing Day

  return days;
}

/** @param dateStr an ISO date string, e.g. "2026-05-17" */
export function isNorwegianPublicHoliday(dateStr: string): boolean {
  const year = new Date(dateStr).getUTCFullYear();
  if (!Number.isFinite(year)) return false;
  return norwegianHolidays(year).has(dateStr.slice(0, 10));
}

export function isWeekend(dateStr: string): boolean {
  const day = new Date(dateStr).getUTCDay();
  return day === 0 || day === 6;
}

/** Weekend +15%, public holiday +40% (holiday takes precedence, not stacked). */
export function getPriceMultiplier(dateStr: string): number {
  if (isNorwegianPublicHoliday(dateStr)) return 1.4;
  if (isWeekend(dateStr)) return 1.15;
  return 1;
}

export function getSurchargeLabel(dateStr: string): string | null {
  if (isNorwegianPublicHoliday(dateStr)) return "Public holiday (+40%)";
  if (isWeekend(dateStr)) return "Weekend (+15%)";
  return null;
}

export type SurchargeType = "holiday" | "weekend" | null;

export function getSurchargeType(dateStr: string): SurchargeType {
  if (isNorwegianPublicHoliday(dateStr)) return "holiday";
  if (isWeekend(dateStr)) return "weekend";
  return null;
}
