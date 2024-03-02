import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './pages/router.tsx'
import { SnackProvider } from './contexts/SnackContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SnackProvider>
      <RouterProvider router={router} />
    </SnackProvider>
  </React.StrictMode>,
)
