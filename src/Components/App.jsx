import React from 'react'
import { AppProvider, useApp } from '../contexts/AppContext'
import { Login } from './Login'
import { AreaSelector } from './AreaSelector'
import { Dashboard } from './Dashboard'

function AppRouter() {
  const { user, area, loading } = useApp()

  if (loading.members) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#0D0A06',
        color: '#fff',
        fontFamily: 'Poppins',
      }}>
        <div>
          <div style={{ fontSize: '20px', marginBottom: '20px' }}>
            ⏳ Carregando sistema...
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Login />
  }

  if (!area) {
    return <AreaSelector />
  }

  return <Dashboard />
}

export default function App() {
  return (
    <div style={{
      background: '#0D0A06',
      color: '#fff',
      minHeight: '100vh',
      fontFamily: 'Poppins, sans-serif',
    }}>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </div>
  )
}
