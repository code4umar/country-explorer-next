export default function LoadingCountry() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
      <div className="h-56 w-full bg-neutral-800" />
      <div className="space-y-3 p-6">
        <div className="h-6 w-1/3 rounded bg-neutral-800" />
        <div className="h-4 w-1/2 rounded bg-neutral-800" />
        <div className="h-4 w-2/3 rounded bg-neutral-800" />
      </div>
    </div>
  );
}