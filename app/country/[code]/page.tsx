import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCountryByCode, getCountriesByCodes } from '../../lib/countries';

export default async function CountryDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const country = await getCountryByCode(code.toUpperCase());

  if (!country) {
    notFound();
  }

  const borderCountries = await getCountriesByCodes(country.borders ?? []);

  return (
    <div>
      <Link
        href="/"
        className="mb-6 inline-block text-xs text-neutral-400 hover:text-neutral-100"
      >
        ← Back to all countries
      </Link>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="h-64 w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
          {country.flag && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={country.flag}
              alt={`Flag of ${country.name}`}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        <div>
          <h1 className="mb-4 text-2xl font-semibold text-neutral-50">
            {country.name}
          </h1>
          <dl className="space-y-2 text-sm">
            <div className="flex gap-2">
              <dt className="font-medium text-neutral-400">Capital:</dt>
              <dd className="text-neutral-200">{country.capital}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-medium text-neutral-400">Region:</dt>
              <dd className="text-neutral-200">{country.region}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-medium text-neutral-400">Population:</dt>
              <dd className="text-neutral-200">
                {country.population.toLocaleString()}
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-medium text-neutral-400">Languages:</dt>
              <dd className="text-neutral-200">
                {country.languages.length > 0
                  ? country.languages.join(', ')
                  : 'N/A'}
              </dd>
            </div>
          </dl>

          <div className="mt-6">
            <h2 className="mb-2 text-sm font-semibold text-neutral-300">
              Border Countries
            </h2>
            {borderCountries.length === 0 ? (
              <p className="text-xs text-neutral-500">
                No bordering countries.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {borderCountries.map((b) => (
                  <Link
                    key={b.cca3}
                    href={`/country/${b.cca3}`}
                    className="rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs text-neutral-300 hover:border-teal-400 hover:text-teal-400"
                  >
                    {b.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}