import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// ייבוא הקונטקסט שלך
import { SamplesProvider } from './contexts/SamplesContext'

createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
    <SamplesProvider>
      
      <App />
    </SamplesProvider>
  </StrictMode>,
)

