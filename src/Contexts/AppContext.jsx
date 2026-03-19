import React, { createContext, useContext, useState } from 'react';
import { useFirebaseCollections } from '../hooks/useFirebaseCollections';

// Create Context
export const AppContext = createContext(null);

// Context Provider Component
export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [area, setArea] = useState(null);

  // Load all collections
  const members = useFirebaseCollections('members');
  const clientes = useFirebaseCollections('clientes');
  const calendar = useFirebaseCollections('calendar');
  const demands = useFirebaseCollections('demands');
  const filiais = useFirebaseCollections('filiais');
  const crmLeads = useFirebaseCollections('crm_leads');
  const news = useFirebaseCollections('news');
  const meetings = useFirebaseCollections('meetings');
  const captacoesAV = useFirebaseCollections('captacoes_av');
  const ads = useFirebaseCollections('ads');
  const chat_channels = useFirebaseCollections('chat_channels');
  const avisos = useFirebaseCollections('avisos');

  const value = {
    // User & Auth
    user,
    setUser,
    area,
    setArea,

    // Collections
    members: members.data,
    setMembers: (newMembers) => {
      // Update individual members to Firebase
      newMembers.forEach(m => {
        if (m.id) members.update(m.id, m);
      });
    },
    addMember: members.add,
    updateMember: members.update,
    deleteMember: members.remove,

    clientes: clientes.data,
    setClientes: (newClientes) => {
      newClientes.forEach(c => {
        if (c.id) clientes.update(c.id, c);
      });
    },
    addCliente: clientes.add,
    updateCliente: clientes.update,
    deleteCliente: clientes.remove,

    calendar: calendar.data,
    setCalendar: (newCalendar) => {
      newCalendar.forEach(c => {
        if (c.id) calendar.update(c.id, c);
      });
    },
    addCalendar: calendar.add,
    updateCalendar: calendar.update,
    deleteCalendar: calendar.remove,

    demands: demands.data,
    setDemands: (newDemands) => {
      newDemands.forEach(d => {
        if (d.id) demands.update(d.id, d);
      });
    },
    addDemand: demands.add,
    updateDemand: demands.update,
    deleteDemand: demands.remove,

    filiais: filiais.data,
    crmLeads: crmLeads.data,
    news: news.data,
    meetings: meetings.data,
    captacoesAV: captacoesAV.data,
    ads: ads.data,
    chat_channels: chat_channels.data,
    avisos: avisos.data,

    // Loading states
    loading: {
      members: members.loading,
      clientes: clientes.loading,
      calendar: calendar.loading,
      demands: demands.loading,
    }
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// Custom Hook to use AppContext
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp deve ser usado dentro de AppProvider');
  }
  return ctx;
}
