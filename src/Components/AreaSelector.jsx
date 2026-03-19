import React from 'react';
import { useApp } from '../contexts/AppContext';

export function AreaSelector() {
  const { user, setArea, setUser } = useApp();

  if (!user) return null;
  
  const areas = [
    {
      id: 'criacao',
      title: '🎨 Criação',
      description: 'Criação, agenda, demandas e clientes',
      color: '#FF6B1D',
    },
    {
      id: 'comercial',
      title: '📊 Comercial',
      description: 'CRM, pipeline, vendas e metas',
      color: '#6464C8',
    },
    {
      id: 'administrativo',
      title: '⚙️ Administrativo',
      description: 'Usuários, filiais, financeiro e RH',
      color: '#64C864',
    },
  ];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#0D0A06',
      padding: '20px',
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 700,
          color: '#fff',
          marginBottom: '10px',
          textAlign: 'center',
        }}>
          Olá, {user.name}! 👋
        </h1>

        <p style={{
          color: '#aaa',
          textAlign: 'center',
          marginBottom: '40px',
          fontSize: '16px',
        }}>
          Selecione o ambiente de trabalho
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '30px',
        }}>
          {areas.map((area) => (
            <button
              key={area.id}
              onClick={() => setArea(area.id)}
              style={{
                padding: '25px 20px',
                background: 'rgba(26, 26, 26, 0.8)',
                border: `2px solid ${area.color}`,
                borderRadius: '12px',
                cursor: 'pointer',
                color: '#fff',
                transition: 'all 0.3s',
                textAlign: 'left',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${area.color}20`;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(26, 26, 26, 0.8)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                fontSize: '20px',
                fontWeight: 700,
                marginBottom: '8px',
                color: area.color,
              }}>
                {area.title}
              </div>
              <div style={{
                fontSize: '13px',
                color: '#999',
              }}>
                {area.description}
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={() => setUser(null)}
          style={{
            width: '100%',
            padding: '12px',
            background: 'rgba(200, 0, 0, 0.1)',
            border: '2px solid rgba(200, 0, 0, 0.5)',
            borderRadius: '8px',
            color: '#ff6666',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(200, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(200, 0, 0, 0.1)';
          }}
        >
          Sair
        </button>
      </div>
    </div>
  );
}

export default AreaSelector;
