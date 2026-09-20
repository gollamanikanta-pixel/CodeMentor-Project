import { Link } from "react-router-dom";

const STEPS = [
  {
    n: "1",
    title: "Write or paste your code, then run it.",
    body: "Python and JavaScript run right where you're working — no setup, no account required for the basics.",
  },
  {
    n: "2",
    title: "If something's wrong, it gets highlighted — not fixed.",
    body: "The Errors & Learning Hints panel points at the line, names the problem, and explains why it happens.",
  },
  {
    n: "3",
    title: "You fix it yourself, then run it again.",
    body: "Click \u201cI Fixed It \u2014 Run Code Again\u201d once you've made a change. There's no button that fixes it for you.",
  },
  {
    n: "4",
    title: "Once it runs, see why it works.",
    body: "A diagram of the logic and a couple of quick quiz questions check that you actually understood it.",
  },
];

export function LandingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* Hero */}
      <section className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
        <div>
          <h1 className="font-display text-4xl font-medium leading-[1.1] tracking-tight text-ink sm:text-5xl">
            Get stuck. Get a hint. Get it yourself.
          </h1>
          <p className="mt-6 max-w-md text-lg text-ink-soft">
            CodeMentor runs your Python and JavaScript, flags what's wrong, and explains it line by
            line — without ever handing you the fixed code.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/playground"
              className="rounded-md bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-ink/90"
            >
              Open the Playground
            </Link>
            <Link to="/help" className="text-sm font-medium text-ink-soft hover:text-ink">
              See how hints work
            </Link>
          </div>
        </div>

        <div
          className="rounded-lg border border-line bg-ink p-5 font-mono text-sm text-paper shadow-sm"
          aria-hidden="true"
        >
          <div className="flex gap-1.5 pb-4">
            <span className="h-2.5 w-2.5 rounded-full bg-flag/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-highlighter/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-verified/70" />
          </div>
          <pre className="overflow-x-auto leading-relaxed">
            <code>
              <span className="text-paper/50">1</span>{"  "}def average(total, count):{"\n"}
              <span className="rounded bg-highlighter/20 px-1 text-paper">
                <span className="text-paper/50">2</span>{"  "}    return total / count
              </span>
              {"\n"}
              <span className="text-paper/50">3</span>{"  "}{"\n"}
              <span className="text-paper/50">4</span>{"  "}print(average(90, 0))
            </code>
          </pre>
          <div className="mt-4 rounded-md border border-highlighter/40 bg-highlighter-soft/10 p-3 text-xs leading-relaxed text-highlighter">
            Errors &amp; Learning Hints — line 2: this divides by <code>count</code>, and{" "}
            <code>count</code> can be 0 here. What should happen instead when it is?
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-line py-16 sm:py-20">
        <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">
          How a session actually goes
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {STEPS.map((step) => (
            <div key={step.n} className="flex gap-4">
              <span className="font-display text-2xl font-medium text-highlighter">{step.n}</span>
              <div>
                <h3 className="font-medium text-ink">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="grid gap-12 border-t border-line py-16 sm:py-20 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">
            Why we don't just fix it for you
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-ink-soft">
            The fastest way to stop learning is to let something else solve the problem. CodeMentor
            will tell you exactly what's wrong and why — but writing the corrected line is left to
            you, every time. That's the part that actually teaches you something.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">
            Runs mostly on your machine
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-ink-soft">
            Python and JavaScript execute locally, and most explanations come from local analysis —
            not an AI call. AI only gets involved when you explicitly ask for deeper help, and
            you'll always see how many requests you have left.
          </p>
        </div>
      </section>

      <section className="border-t border-line py-16 text-center sm:py-20">
        <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">
          Bring a piece of code you're stuck on.
        </h2>
        <Link
          to="/playground"
          className="mt-6 inline-block rounded-md bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-ink/90"
        >
          Open the Playground
        </Link>
      </section>
    </div>
  );
}
