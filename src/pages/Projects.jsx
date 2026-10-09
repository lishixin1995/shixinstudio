import { StillIndex } from '../components/StillIndex.jsx'
import { categories, projects } from '../data/projects.js'
import { usePageTitle } from '../router.jsx'

// Every project on one screen: a quiet list of names and one preview that the
// chosen project ripples into (StillIndex), on computers and phones alike.
export function Projects() {
  usePageTitle('Projects')
  return <StillIndex heading="Projects" items={projects} base="/projects" filters={categories} />
}
