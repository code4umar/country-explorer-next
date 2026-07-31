import { getAllCountries } from './lib/countries';
import SearchAndFilter from './SearchAndFilter';

export default async function HomePage() {
  const countries = await getAllCountries();

  return (
    <div>
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-teal-400">
        Week 5 · Next.js App Router
      </p>
      <h1 className="mb-6 text-2xl font-semibold text-neutral-50">All Countries</h1>
      <SearchAndFilter countries={countries} />
    </div>
  );
}