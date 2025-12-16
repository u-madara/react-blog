import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './lib/buffer-polyfill' // Import Buffer polyfill
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/react-blog">
      <App />
    </BrowserRouter>
  </StrictMode>,
)
