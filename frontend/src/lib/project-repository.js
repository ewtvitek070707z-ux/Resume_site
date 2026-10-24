import { projects } from '../data/projects.js';

// UI consumes this interface, not a CMS-specific response.
// A future adapter can fetch published projects and normalize them here.
export async function getProjects() {
  return projects;
}
