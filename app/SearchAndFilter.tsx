'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { Country, Region } from './types';

const REGIONS: Region[] = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

export default function SearchAndFilter({ countries }: { countries: Country[] }) {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState<Region>('All');

  const filtered = useMemo(() => {
    return countries.filter((c) => {
      const matchesRegion = region === 'All' || c.region === region;
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
      return matchesRegion && matchesSearch;
    });
  }, [countries, search, region]);

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search countries..."
        className="mb-4 w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-neutral-100 placeholder-neutral-600 outline-none focus:border-teal-400"
      />

      <div className="mb-6 flex flex-wrap gap-1.5">
        {REGIONS.map((r) => (
          <button
            key={r}
            onClick={() => setRegion(r)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              region === r
                ? 'bg-teal-400 text-neutral-950'
                : 'border border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-neutral-100'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-neutral-600">
          No countries match your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((c) => (
            <Link
              key={c.cca3}
              href={`/country/${c.cca3}`}
              className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 transition hover:border-neutral-700"
            >
              <div className="h-28 w-full overflow-hidden bg-neutral-800">
                {c.flag && (
                  <img src={c.flag} alt={`Flag of ${c.name}`} className="h-full w-full object-cover" />
                )}
              </div>
              <div className="p-4">
                <h3 className="mb-1 truncate text-sm font-semibold text-neutral-50">{c.name}</h3>
                <p className="mb-2 text-xs text-neutral-500">{c.region}</p>
                <p className="text-xs text-neutral-400">Capital: {c.capital}</p>
                <p className="text-xs text-neutral-400">
                  Population: {c.population.toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
