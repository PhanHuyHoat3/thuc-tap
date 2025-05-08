import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from '@mui/material'
import themeUI from './theme.js'

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={themeUI}>
    <StrictMode>
      <App />
    </StrictMode>
  </ThemeProvider>
)
