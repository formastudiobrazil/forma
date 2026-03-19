import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';

export function Login() {
  const { members, setUser } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = (members || []).find(
        m => m.id === username && m.pass === password
      );

      if (user) {
        setUser(user);
        console.log('✅ Login realizado:', user.name);
      } else {
        setError('Usuário ou senha incorretos');
      }
    } catch (err) {
      setError('Erro ao fazer login: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#0D0A06',
    }}>
      <div style={{
        background: '#1a1a1a',
        padding: '40px',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '400px',
        border: '1px solid rgba(255,107,29,0.3)',
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 700,
          color: '#FF6B1D',
          marginBottom: '30px',
          textAlign: 'center',
        }}>
          FormaOS
        </h1>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#aaa',
              fontSize: '14px',
            }}>
              Usuário
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              style={{
                width: '100%',
                padding: '10px',
                background: '#0D0A06',
                border: '1px solid rgba(255,107,29,0.5)',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '14px',
                boxSizing: 'border-box',
                fontFamily: 'Poppins',
              }}
              placeholder="admin_felipe"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#aaa',
              fontSize: '14px',
            }}>
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              style={{
                width: '100%',
                padding: '10px',
                background: '#0D0A06',
                border: '1px solid rgba(255,107,29,0.5)',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '14px',
                boxSizing: 'border-box',
                fontFamily: 'Poppins',
              }}
              placeholder="••••••"
            />
          </div>

          {error && (
            <div style={{
              color: '#ff4444',
              fontSize: '12px',
              marginBottom: '15px',
              padding: '8px',
              background: 'rgba(255,68,68,0.1)',
              borderRadius: '4px',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: '#FF6B1D',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div style={{
          marginTop: '20px',
          fontSize: '12px',
          color: '#666',
          textAlign: 'center',
        }}>
          <p>Teste com:</p>
          <p>admin_felipe / felipe95</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
