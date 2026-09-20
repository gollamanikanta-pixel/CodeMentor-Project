import { FolderGit2 } from "lucide-react";

export function ProjectsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <FolderGit2 className="mx-auto h-8 w-8 text-ink-faint" aria-hidden="true" />
      <h1 className="mt-4 font-display text-2xl font-medium text-ink">Projects</h1>
      <p className="mt-3 leading-relaxed text-ink-soft">
        This is where your saved Playground sessions will live — each one keeping its code, which
        hints you used, and whether you got it running on your own. Nothing's saved yet in this
        phase, so there's nothing to show here.
      </p>
    </div>
  );
}
