import React from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { Login } from './components/Login';
import { AreaSelector } from './components/AreaSelector';
import { Dashboard } from './components/Dashboard';

// Main App Router
function AppRouter() {
  const { user, area, loading } = useApp();

  // Loading state
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
    );
  }

  // Not logged in
  if (!user) {
    return <Login />;
  }

  // Logged in but no area selected
  if (!area) {
    return <AreaSelector />;
  }

  // All areas go to same Dashboard for now
  return <Dashboard />;
}

// Main App with Provider
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
  );
}
