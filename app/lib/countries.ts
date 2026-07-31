import type { Country } from '../types';

const BASE = 'https://countries.dev';

const FIELDS = 'name,capital,population,region,languages,flags,alpha2Code,alpha3Code,borders';

// Raw API object -> our clean Country shape
function mapCountry(c: any): Country {
  return {
    name: c.name ?? 'Unknown',
    capital: c.capital ?? '—',
    population: c.population ?? 0,
    region: c.region ?? 'Unknown',
    languages: Array.isArray(c.languages) ? c.languages.map((l: any) => l.name) : [],
    flag: c.flags?.svg ?? c.flags?.png ?? '',
    cca3: c.alpha3Code ?? c.alpha2Code ?? c.name,
    borders: Array.isArray(c.borders) ? c.borders : [],
  };
}

// Some endpoints return a bare object, others may wrap in an array — handle both.
function normalizeOne(json: any): any | null {
  if (!json) return null;
  const obj = Array.isArray(json) ? json[0] : json;
  if (!obj || obj.name === undefined) return null;
  return obj;
}

export async function getAllCountries(): Promise<Country[]> {
  const res = await fetch(`${BASE}/countries?fields=${FIELDS}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
  const json = await res.json();

  const list = Array.isArray(json) ? json : json?.data;
  if (!Array.isArray(list)) {
    throw new Error(`Unexpected API response: ${JSON.stringify(json).slice(0, 200)}`);
  }

  return list.map(mapCountry);
}

export async function getCountryByCode(code: string): Promise<Country | null> {
  const res = await fetch(`${BASE}/alpha/${code}?fields=${FIELDS}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;

  const json = await res.json();
  const obj = normalizeOne(json);
  if (!obj) return null;

  return mapCountry(obj);
}

// Fetches full country objects for a list of border codes, concurrently,
// so the detail page can show border country NAMES, not just raw codes.
// Uses Promise.all so all requests fire at once instead of one-by-one.
export async function getCountriesByCodes(codes: string[]): Promise<Country[]> {
  if (codes.length === 0) return [];

  const results = await Promise.all(
    codes.map(async (code) => {
      try {
        return await getCountryByCode(code);
      } catch {
        return null;
      }
    })
  );

  // Drop any that failed to resolve, keep the rest
  return results.filter((c): c is Country => c !== null);
}