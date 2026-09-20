import { Route, Routes } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { HelpPage } from "../pages/HelpPage";
import { LandingPage } from "../pages/LandingPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { PlaygroundPage } from "../pages/PlaygroundPage";
import { ProjectsPage } from "../pages/ProjectsPage";
import { QuizHistoryPage } from "../pages/QuizHistoryPage";
import { SettingsPage } from "../pages/SettingsPage";

export function AppRouter() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/playground" element={<PlaygroundPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/quiz-history" element={<QuizHistoryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppLayout>
  );
}
