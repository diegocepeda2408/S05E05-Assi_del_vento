import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './routes/AppRouter.jsx'
import { HashRouter } from 'react-router-dom'
import { NameProvider } from './contexts/nameContext.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <NameProvider>
    <HashRouter>
      <AppRouter />
    </HashRouter>
  </NameProvider>
  // /* </StrictMode>, */
)
