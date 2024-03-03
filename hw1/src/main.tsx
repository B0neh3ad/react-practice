import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App';
import { SnackProvider } from './contexts/SnackContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SnackProvider>
      <App />
    </SnackProvider>
  </React.StrictMode>,
)
