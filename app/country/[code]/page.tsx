import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCountryByCode } from '../../lib/countries';

export default async function CountryDetailPage({
  params,
}: {
  params: { code: string };
}) {
  const country = await getCountryByCode(params.code);

  if (!country) {
    notFound();
  }

  return (
    <div>
      <Link href="/" className="mb-6 inline-block text-xs text-teal-400 hover:underline">
        ← Back to all countries
      </Link>

      <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
        <div className="h-56 w-full overflow-hidden bg-neutral-800">
          {country.flag && (
            <img
              src={country.flag}
              alt={`Flag of ${country.name}`}
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <div className="p-6">
          <h1 className="mb-4 text-2xl font-semibold text-neutral-50">{country.name}</h1>

          <div className="mb-6 grid grid-cols-2 gap-4 text-sm">
            <p className="text-neutral-400">
              Capital <span className="block text-neutral-100">{country.capital}</span>
            </p>
            <p className="text-neutral-400">
              Region <span className="block text-neutral-100">{country.region}</span>
            </p>
            <p className="text-neutral-400">
              Population
              <span className="block text-neutral-100">
                {country.population.toLocaleString()}
              </span>
            </p>
            <p className="text-neutral-400">
              Languages
              <span className="block text-neutral-100">
                {country.languages.length > 0 ? country.languages.join(', ') : '—'}
              </span>
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs uppercase tracking-wider text-neutral-500">
              Border Countries
            </p>
            {country.borders.length === 0 ? (
              <p className="text-sm text-neutral-600">No bordering countries.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {country.borders.map((code) => (
                  <Link
                    key={code}
                    href={`/country/${code}`}
                    className="rounded-full border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs text-neutral-300 hover:border-teal-400 hover:text-teal-400"
                  >
                    {code}
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
