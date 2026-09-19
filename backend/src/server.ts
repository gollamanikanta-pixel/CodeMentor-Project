import { createApp } from "./app.js";
import { env, isAiConfigured } from "./config/env.js";

const app = createApp();

app.listen(env.PORT, () => {
  console.log(`CodeMentor backend listening on http://localhost:${env.PORT}`);
  console.log(`  Environment : ${env.NODE_ENV}`);
  console.log(`  CORS origin : ${env.CLIENT_ORIGIN}`);
  console.log(`  AI provider : ${isAiConfigured ? "configured" : "not configured (local-only mode)"}`);
});
