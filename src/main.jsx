import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.jsx'
import { RouterProvider } from './router.jsx'
import './styles/base.css'
import './styles/layout.css'
import './styles/home.css'
import './styles/projects.css'
import './styles/pages.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider>
      <App />
    </RouterProvider>
  </StrictMode>
)
