import { readStorage, writeStorage } from "./localStorage";
import { STORAGE_KEYS } from "./keys";

export interface Project {
  id: string;
  title: string;
  languageId: string;
  code: string;
  stdin: string;
  createdAt: string;
  updatedAt: string;
}

export function loadProjects(): Project[] {
  return readStorage<Project[]>(STORAGE_KEYS.projects, []);
}

function saveProjects(projects: Project[]): void {
  writeStorage(STORAGE_KEYS.projects, projects);
}

/**
 * Saves a project. If `id` is provided and matches an existing project,
 * that project is updated in place; otherwise a new project is created.
 * Returns the saved project (with its id) either way.
 */
export function upsertProject(input: {
  id?: string;
  title: string;
  languageId: string;
  code: string;
  stdin: string;
}): Project {
  const projects = loadProjects();
  const now = new Date().toISOString();

  if (input.id) {
    const index = projects.findIndex((project) => project.id === input.id);
    if (index !== -1) {
      const updated: Project = { ...projects[index], ...input, id: projects[index].id, updatedAt: now };
      projects[index] = updated;
      saveProjects(projects);
      return updated;
    }
  }

  const created: Project = {
    id: crypto.randomUUID(),
    title: input.title,
    languageId: input.languageId,
    code: input.code,
    stdin: input.stdin,
    createdAt: now,
    updatedAt: now,
  };
  saveProjects([created, ...projects]);
  return created;
}

export function deleteProject(id: string): void {
  saveProjects(loadProjects().filter((project) => project.id !== id));
}
