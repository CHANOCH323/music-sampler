import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// ייבוא הקונטקסטים שלך
import { SamplesProvider } from './contexts/SamplesContext'
import { AuthProvider } from './contexts/AuthContext'  

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>      
      <SamplesProvider> 
        <App />
      </SamplesProvider>
    </AuthProvider>
  </StrictMode>,
)
