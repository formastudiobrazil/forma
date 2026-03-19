import React, { useState, useEffect, useContext, useRef, useCallback, useMemo } from 'react';

export default function App() {
  return (
    <div style={{
      background: '#0D0A06',
      color: '#fff',
      minHeight: '100vh',
      fontFamily: 'Poppins, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: 700
      }}>
        ✅ Sistema Funcional!
      </div>
    </div>
  );
}
