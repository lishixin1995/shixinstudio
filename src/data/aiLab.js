import { imagesFor } from './projects.js'

// AI Lab entries. An entry with status 'soon' shows in the list but has no page yet.

const render = imagesFor('ai-lab/render-exploration')

export const aiLabIntro =
  'As artificial intelligence reshapes design, I explore how technology and architecture together can redefine human experience — from generated atmospheres to the tools behind everyday practice.'

export const aiEntries = [
  {
    slug: 'ai-design-workflow',
    status: 'soon',
    title: 'AI-Assisted Design Workflow',
    category: 'Workflow',
    subtitle: 'From reference to render',
    text: ['Coming soon.']
  },
  {
    slug: 'render-exploration',
    title: 'Render Exploration',
    category: 'AI Render',
    label: 'Visualization Study',
    subtitle: 'Light / Perception / Brutalism',
    location: '',
    year: '',
    credits: [['Tools', 'Midjourney, Stable Diffusion']],
    heading: 'Visualization Study',
    tagline: 'Exploring how light and perception transform emotion into space.',
    text: [
      'A series of generated studies asking how a return to the raw imagination of Brutalism might awaken new creativity and emotion — concrete, shadow and a single tree; forms that grow out of a cliff at night; galleries carved by light.'
    ],
    cover: render('cover', 'Concrete stair and courtyard', 'full', '1 / 1'),
    images: [
      render('01-form-study', 'Form study', 'half', '1 / 1'),
      render('02-cliff-at-night', 'Structure on the cliff at night', 'full', '2 / 1'),
      render('03-path-of-light', 'Path of light', 'half', '4 / 3'),
      render('04-opening-to-the-sky', 'Opening to the night sky', 'half', '4 / 3'),
      render('05-concrete-pavilion', 'Concrete pavilion', 'third', '1 / 1'),
      render('06-stair-and-tree', 'Stair and tree', 'third', '1 / 1'),
      render('07-cantilevered-stair', 'Cantilevered stair', 'third', '1 / 1'),
      render('08-gallery-of-light', 'Gallery of light', 'two-thirds', '16 / 9'),
      render('09-gallery-void', 'Gallery void', 'half', '4 / 3')
    ]
  },
  {
    slug: 'tools-and-experiments',
    status: 'soon',
    title: 'Tools & Experiments',
    category: 'Tools',
    subtitle: 'Everyday digital tools and open AI experiments',
    text: ['Coming soon.']
  }
]

export const findEntry = (slug) => aiEntries.find((entry) => entry.slug === slug && entry.status !== 'soon')
