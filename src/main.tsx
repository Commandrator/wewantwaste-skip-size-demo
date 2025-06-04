import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import languages from "./lang/index.tsx"
import App from './App.tsx'
const browserLanguage = navigator.language as keyof typeof languages;
const langPack = languages[browserLanguage] ?? languages["en"];
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
export {langPack};