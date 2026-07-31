import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-12 text-center">
      <p className="mb-4 text-sm text-neutral-400">
        We couldn't find a country with that code.
      </p>
      <Link href="/" className="text-xs text-teal-400 hover:underline">
        ← Back to all countries
      </Link>
    </div>
  );
}