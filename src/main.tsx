import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { applyStoredTheme } from './hooks/useTheme'
import App from './App.tsx'
import { StorageGate } from './components/StorageGate'

applyStoredTheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StorageGate><App /></StorageGate>
  </StrictMode>,
)
