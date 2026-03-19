import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';

export function Dashboard() {
  const { user, area, setArea, clientes, addCliente, members } = useApp();
  const [newClientName, setNewClientName] = useState('');

  const handleAddCliente = async () => {
    if (!newClientName.trim()) return;

    try {
      await addCliente({
        nome: newClientName,
        email: `contato@${newClientName.toLowerCase().replace(' ', '')}.com.br`,
        telefone: '(51) 9999-0000',
        endereco: 'Rua teste',
        cidade: 'Porto Alegre',
        estado: 'RS',
        responsaveis: [user?.id],
        datainicio: new Date().toISOString().split('T')[0],
        saude: 'bom',
        escopo: [],
        acoes: [],
        observacoes: '',
      });
      setNewClientName('');
      alert('✅ Cliente criado com sucesso!');
    } catch (err) {
      alert('❌ Erro ao criar cliente: ' + err.message);
    }
  };

  return (
    <div style={{
      background: '#0D0A06',
      minHeight: '100vh',
      color: '#fff',
      padding: '40px',
      fontFamily: 'Poppins',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
      }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 700, margin: 0 }}>
            Olá, {user?.name}! 👋
          </h1>
          <p style={{ color: '#aaa', margin: '5px 0 0 0' }}>
            Ambiente: <strong>{area}</strong>
          </p>
        </div>
        <button
          onClick={() => setArea(null)}
          style={{
            padding: '10px 20px',
            background: '#FF6B1D',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Voltar
        </button>
      </div>

      {/* STATUS CARDS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '40px',
      }}>
        <div style={{
          background: 'rgba(255, 107, 29, 0.1)',
          border: '1px solid rgba(255, 107, 29, 0.3)',
          borderRadius: '12px',
          padding: '20px',
        }}>
          <div style={{ color: '#FF6B1D', fontSize: '28px', fontWeight: 700 }}>
            {(clientes || []).length}
          </div>
          <div style={{ color: '#aaa', fontSize: '12px', marginTop: '5px' }}>
            Clientes cadastrados
          </div>
        </div>

        <div style={{
          background: 'rgba(100, 200, 100, 0.1)',
          border: '1px solid rgba(100, 200, 100, 0.3)',
          borderRadius: '12px',
          padding: '20px',
        }}>
          <div style={{ color: '#64C864', fontSize: '28px', fontWeight: 700 }}>
            {(members || []).length}
          </div>
          <div style={{ color: '#aaa', fontSize: '12px', marginTop: '5px' }}>
            Membros da equipe
          </div>
        </div>

        <div style={{
          background: 'rgba(100, 100, 200, 0.1)',
          border: '1px solid rgba(100, 100, 200, 0.3)',
          borderRadius: '12px',
          padding: '20px',
        }}>
          <div style={{ color: '#6464C8', fontSize: '28px', fontWeight: 700 }}>
            ✅
          </div>
          <div style={{ color: '#aaa', fontSize: '12px', marginTop: '5px' }}>
            Sistema funcional
          </div>
        </div>
      </div>

      {/* ADD CLIENT FORM */}
      <div style={{
        background: 'rgba(26, 26, 26, 0.8)',
        border: '1px solid rgba(255, 107, 29, 0.3)',
        borderRadius: '12px',
        padding: '30px',
        marginBottom: '40px',
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>
          Novo Cliente
        </h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Nome do cliente"
            value={newClientName}
            onChange={(e) => setNewClientName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleAddCliente();
            }}
            style={{
              flex: 1,
              padding: '10px 15px',
              background: '#0D0A06',
              border: '1px solid rgba(255, 107, 29, 0.5)',
              borderRadius: '6px',
              color: '#fff',
              fontSize: '14px',
              fontFamily: 'Poppins',
            }}
          />
          <button
            onClick={handleAddCliente}
            style={{
              padding: '10px 25px',
              background: '#FF6B1D',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Criar
          </button>
        </div>
      </div>

      {/* CLIENTES LIST */}
      <div style={{
        background: 'rgba(26, 26, 26, 0.8)',
        border: '1px solid rgba(255, 107, 29, 0.3)',
        borderRadius: '12px',
        padding: '30px',
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>
          Clientes
        </h2>
        {clientes && clientes.length > 0 ? (
          <div>
            {clientes.map((cliente) => (
              <div
                key={cliente.id}
                style={{
                  padding: '15px',
                  background: '#0D0A06',
                  marginBottom: '10px',
                  borderRadius: '6px',
                  borderLeft: `4px solid #FF6B1D`,
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: '5px' }}>
                  {cliente.nome}
                </div>
                <div style={{ fontSize: '12px', color: '#aaa' }}>
                  {cliente.email} • {cliente.telefone}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: '#666', textAlign: 'center' }}>
            Nenhum cliente cadastrado
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
