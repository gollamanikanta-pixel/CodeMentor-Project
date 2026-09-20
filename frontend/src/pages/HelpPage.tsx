const FAQS = [
  {
    q: "Why won't CodeMentor just show me the fixed code?",
    a: "Because reading a fix and writing one yourself teach very different things. CodeMentor will always tell you exactly what's wrong and where — the line that fixes it is left for you to write.",
  },
  {
    q: "What happens when I click \u201cI Fixed It \u2014 Run Code Again\u201d?",
    a: "It re-runs your edited code from scratch, the same as the first run. If the same problem (or a new one) turns up, it gets highlighted again.",
  },
  {
    q: "Does CodeMentor call AI every time I run my code?",
    a: "No. Most of what you see — line explanations, common error messages, diagrams, quiz questions — comes from local analysis in your browser, not an AI call. AI only runs when you explicitly click \u201cAsk AI for Deeper Help,\u201d and you'll always see how many of those you have left for the day.",
  },
  {
    q: "Which languages are supported right now?",
    a: "Python and JavaScript. Both run locally — Python through Pyodide, JavaScript in its own worker. Other languages may appear as \u201cComing Soon\u201d but aren't runnable yet.",
  },
];

export function HelpPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-2xl font-medium text-ink">Help</h1>
      <p className="mt-3 leading-relaxed text-ink-soft">
        A few questions that come up early. If something's still unclear once the Playground is
        fully wired up, this is the page that'll grow to cover it.
      </p>

      <dl className="mt-10 flex flex-col gap-8">
        {FAQS.map((faq) => (
          <div key={faq.q}>
            <dt className="font-medium text-ink">{faq.q}</dt>
            <dd className="mt-2 leading-relaxed text-ink-soft">{faq.a}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
