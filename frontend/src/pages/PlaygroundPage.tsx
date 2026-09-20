import Editor from "@monaco-editor/react";
import { Play } from "lucide-react";
import { useState } from "react";
import type { SupportedLanguage } from "../types";

const STARTER_CODE: Record<SupportedLanguage, string> = {
  python: "def average(total, count):\n    return total / count\n\nprint(average(90, 0))\n",
  javascript: "function average(total, count) {\n  return total / count;\n}\n\nconsole.log(average(90, 0));\n",
};

const COMING_SOON_PANELS = [
  {
    title: "Errors & Learning Hints",
    body: "Run your code and this fills in with what's wrong, highlighted line by line — never the fixed code itself.",
  },
  {
    title: "Tips",
    body: "A few short, targeted suggestions once there's a result to look at.",
  },
  {
    title: "Visuals",
    body: "A diagram of what your code is actually doing, generated locally with Mermaid.",
  },
];

export function PlaygroundPage() {
  const [language, setLanguage] = useState<SupportedLanguage>("python");
  const [code, setCode] = useState(STARTER_CODE.python);

  function handleLanguageChange(next: SupportedLanguage) {
    setLanguage(next);
    setCode(STARTER_CODE[next]);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-medium text-ink">Playground</h1>
          <p className="mt-1 text-sm text-ink-soft">
            The editor below is fully working. Running and analyzing code lands in the next phase.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-line bg-surface p-1">
          {(["python", "javascript"] as const).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => handleLanguageChange(lang)}
              className={`rounded px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                language === lang ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="overflow-hidden rounded-lg border border-line">
          <div className="flex items-center justify-between border-b border-line bg-surface px-4 py-2">
            <span className="text-sm font-medium text-ink-soft">
              {language === "python" ? "main.py" : "main.js"}
            </span>
            <button
              type="button"
              disabled
              title="Local execution arrives in the next phase"
              className="flex cursor-not-allowed items-center gap-1.5 rounded-md bg-ink/40 px-3 py-1.5 text-sm font-medium text-paper"
            >
              <Play className="h-3.5 w-3.5" aria-hidden="true" />
              Run
            </button>
          </div>
          <Editor
            height="480px"
            language={language}
            value={code}
            onChange={(value) => setCode(value ?? "")}
            theme="vs-dark"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              padding: { top: 16 },
            }}
          />
        </div>

        <div className="flex flex-col gap-4">
          {COMING_SOON_PANELS.map((panel) => (
            <div key={panel.title} className="rounded-lg border border-line bg-surface p-4">
              <h2 className="text-sm font-semibold text-ink">{panel.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-faint">{panel.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
