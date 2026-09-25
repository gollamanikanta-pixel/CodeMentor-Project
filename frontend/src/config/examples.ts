/**
 * Static example snippets for the Playground's "Load Learning Example"
 * button, keyed by language id. Plain strings only — no execution, no
 * generation. Languages with no entry here (the Coming Soon tier) show a
 * friendly "no example yet" message instead of a missing/blank load.
 */
export const LEARNING_EXAMPLES: Record<string, string> = {
  python: "def average(total, count):\n    return total / count\n\nprint(average(90, 0))\n",
  javascript:
    "function average(total, count) {\n  return total / count;\n}\n\nconsole.log(average(90, 0));\n",
  typescript:
    "function average(total: number, count: number): number {\n  return total / count;\n}\n\nconsole.log(average(90, 0));\n",
  sql: "SELECT student_name, score\nFROM quiz_results\nWHERE score < 60\nORDER BY score ASC;\n",
  c: '#include <stdio.h>\n\nint average(int total, int count) {\n    return total / count;\n}\n\nint main(void) {\n    printf("%d\\n", average(90, 0));\n    return 0;\n}\n',
  cpp: '#include <iostream>\n\nint average(int total, int count) {\n    return total / count;\n}\n\nint main() {\n    std::cout << average(90, 0) << std::endl;\n    return 0;\n}\n',
  java: "public class Main {\n    static int average(int total, int count) {\n        return total / count;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(average(90, 0));\n    }\n}\n",
};
