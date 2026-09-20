import { ListChecks } from "lucide-react";

export function QuizHistoryPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <ListChecks className="mx-auto h-8 w-8 text-ink-faint" aria-hidden="true" />
      <h1 className="mt-4 font-display text-2xl font-medium text-ink">Quiz History</h1>
      <p className="mt-3 leading-relaxed text-ink-soft">
        Once you fix a piece of code, CodeMentor asks a couple of quick questions to check the fix
        actually made sense to you. Your answers and scores over time will show up here — quizzes
        aren't wired up yet in this phase, so there's no history to show.
      </p>
    </div>
  );
}
