'use client';

export default function ErrorCountry({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-8 text-center">
      <p className="mb-4 text-sm text-red-300">
        Couldn't load this country: {error.message}
      </p>
      <button
        onClick={() => reset()}
        className="rounded-lg bg-teal-400 px-4 py-2 text-xs font-medium text-neutral-950 hover:bg-teal-300"
      >
        Try again
      </button>
    </div>
  );
}