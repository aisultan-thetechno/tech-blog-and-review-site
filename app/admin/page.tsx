'use client';

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
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-slate-900 border border-slate-800 p-8 rounded-xl max-w-md w-full space-y-4">
          <h1 className="text-2xl font-bold text-cyan-400">Вход в Админ-панель</h1>
          <p className="text-slate-400 text-sm">Введите пароль для управления контентом</p>
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500"
          />
          <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-semibold p-3 rounded-lg transition">
            Войти
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <h1 className="text-3xl font-bold text-cyan-400">Панель управления CIRCUIT</h1>
          <button onClick={() => setIsAuthenticated(false)} className="text-sm bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg">
            Выйти
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h3 className="text-slate-400 text-sm">Всего статей</h3>
            <p className="text-3xl font-bold text-white mt-2">5</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h3 className="text-slate-400 text-sm">Статус базы данных</h3>
            <p className="text-3xl font-bold text-emerald-400 mt-2">Подключено (Supabase)</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h3 className="text-slate-400 text-sm">Статус системы</h3>
            <p className="text-3xl font-bold text-cyan-400 mt-2">Active</p>
          </div>
        </div>
      </div>
    </div>
  );
}
