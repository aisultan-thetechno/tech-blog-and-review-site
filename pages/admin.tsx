import React, { useState } from 'react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Неверный пароль');
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
        <form onSubmit={handleLogin} style={{ backgroundColor: '#0f172a', padding: '2rem', borderRadius: '1rem', border: '1px solid #1e293b', width: '100%', maxWidth: '400px' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#22d3ee', marginBottom: '0.5rem' }}>Вход в Админ-панель</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Введите пароль для доступа</p>
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', backgroundColor: '#020617', border: '1px solid #334155', borderRadius: '0.5rem', color: '#fff', marginBottom: '1rem', outline: 'none' }}
          />
          <button type="submit" style={{ width: '100%', padding: '0.75rem', backgroundColor: '#06b6d4', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}>
            Войти
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#fff', padding: '2rem', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '1rem', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#22d3ee' }}>Панель управления CIRCUIT</h1>
          <button onClick={() => setIsAuthenticated(false)} style={{ backgroundColor: '#1e293b', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer' }}>
            Выйти
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '1.5rem', borderRadius: '0.75rem' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Статус админки</span>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4ade80', marginTop: '0.5rem' }}>Активна</p>
          </div>
        </div>
      </div>
    </div>
  );
}
