import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <span className="font-display text-6xl font-medium text-ink">404</span>
      <h1 className="mt-4 text-lg font-medium text-ink">There's no page at this address.</h1>
      <p className="mt-2 text-ink-soft">Check the URL, or head back and start from the Playground.</p>
      <Link
        to="/"
        className="mt-6 rounded-md bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-ink/90"
      >
        Back to Home
      </Link>
    </div>
  );
}
