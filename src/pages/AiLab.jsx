import { StillIndex } from '../components/StillIndex.jsx'
import { aiEntries, aiLabIntro } from '../data/aiLab.js'
import { usePageTitle } from '../router.jsx'

// The same quiet list and rippling preview as Projects; entries still to
// come are listed as "Soon".
export function AiLab() {
  usePageTitle('AI Lab')
  return <StillIndex heading="AI Lab" intro={aiLabIntro} items={aiEntries} base="/ai-lab" />
}
