import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './components/Router'
import UserProvider from './context/user-context'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <Router />
    </UserProvider>
  </React.StrictMode>
)
