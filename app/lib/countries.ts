import type { Country } from '../types';

const BASE = 'https://countries.dev';

// Raw API object -> our clean Country shape
function mapCountry(c: any): Country {
  return {
    name: c.name ?? 'Unknown',
    capital: c.capital ?? '—',
    population: c.population ?? 0,
    region: c.region ?? 'Unknown',
    languages: c.languages ? c.languages.map((l: any) => l.name) : [],
    flag: c.flags?.svg ?? c.flags?.png ?? '',
    cca3: c.alpha3Code ?? c.name,
    borders: c.borders ?? [],
  };
}

export async function getAllCountries(): Promise<Country[]> {
  const res = await fetch(
    `${BASE}/countries?fields=name,capital,population,region,languages,flags,alpha3Code,borders`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
  const json = await res.json();

  if (!Array.isArray(json)) {
    throw new Error(`Unexpected API response: ${JSON.stringify(json).slice(0, 200)}`);
  }

  return json.map(mapCountry);
}

export async function getCountryByCode(code: string): Promise<Country | null> {
  const res = await fetch(`${BASE}/alpha/${code}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  const json = await res.json();

  if (!json || json.name === undefined) return null;
  return mapCountry(json);
}