import { loader } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import EditorWorker from "monaco-editor/editor/editor.worker?worker";
import TsWorker from "monaco-editor/language/typescript/ts.worker?worker";

/**
 * By default @monaco-editor/react fetches the Monaco engine from a CDN at
 * runtime. That contradicts this project's local-first design and would
 * quietly break the Playground on a restricted network, so this points it
 * at the `monaco-editor` package installed in node_modules instead.
 *
 * Only two workers are wired up: the base editor worker (always needed)
 * and the TypeScript/JavaScript worker (covers our "javascript" language).
 * Python has no bundled language service in Monaco — it falls back to the
 * base editor worker for tokenizing, which is all it needs here.
 */
self.MonacoEnvironment = {
  getWorker(_workerId: string, label: string) {
    if (label === "typescript" || label === "javascript") {
      return new TsWorker();
    }
    return new EditorWorker();
  },
};

loader.config({ monaco });
