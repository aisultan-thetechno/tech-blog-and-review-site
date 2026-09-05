'use client';

import React, { useState, useEffect } from 'react';

interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  date: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('SMARTPHONES');
  const [readTime, setReadTime] = useState('5 min read');
  const [excerpt, setExcerpt] = useState('');

  const initialArticles: Article[] = [
    {
      id: '1',
      title: 'The foldable future is finally here — and it actually works',
      category: 'SMARTPHONES',
      readTime: '8 min read',
      excerpt: 'We spent three weeks living with the most ambitious foldable yet.',
      date: '2026-09-05',
    },
    {
      id: '2',
      title: 'iPhone 17 Pro review: the most refined phone Apple has ever shipped',
      category: 'SMARTPHONES',
      readTime: '12 min read',
      excerpt: 'Apple refines its design and cameras further.',
      date: '2026-09-04',
    },
    {
      id: '3',
      title: 'RTX 5090 review: absurd power, absurd price',
      category: 'PC HARDWARE',
      readTime: '15 min read',
      excerpt: 'NVIDIA releases its next flagship GPU.',
      date: '2026-09-03',
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('circuit_articles');
    if (saved) {
      try {
        setArticles(JSON.parse(saved));
      } catch (e) {
        setArticles(initialArticles);
      }
    } else {
      setArticles(initialArticles);
    }
  }, []);

  const saveArticles = (newArticles: Article[]) => {
    setArticles(newArticles);
    localStorage.setItem('circuit_articles', JSON.stringify(newArticles));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Неверный пароль');
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !excerpt) return;
    const newArt: Article = {
      id: Date.now().toString(),
      title,
      category,
      readTime,
      excerpt,
      date: new Date().toISOString().split('T')[0],
    };
    saveArticles([newArt, ...articles]);
    setTitle('');
    setExcerpt('');
    alert('Статья успешно добавлена!');
  };

  const handleDelete = (id: string) => {
    if (confirm('Удалить эту статью?')) {
      saveArticles(articles.filter(a => a.id !== id));
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#fff', display: 'flex', itemsCenter: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
        <form onSubmit={handleLogin} style={{ backgroundColor: '#0f172a', padding: '2rem', borderRadius: '1rem', border: '1px solid #1e293b', width: '100%', maxWidth: '400px' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#22d3ee', marginBottom: '0.5rem' }}>Вход в Админ-панель</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Введите пароль для доступа к CIRCUIT</p>
          <input
            type="password"
            placeholder="Пароль (admin123)"
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
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '1rem', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#22d3ee' }}>Панель управления CIRCUIT</h1>
          <button onClick={() => setIsAuthenticated(false)} style={{ backgroundColor: '#1e293b', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer' }}>
            Выйти
          </button>
        </div>

        {/* Форма создания статьи */}
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '1.5rem', borderRadius: '0.75rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#22d3ee' }}>Опубликовать новую статью</h2>
          <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Заголовок статьи</label>
              <input
                type="text"
                placeholder="например: Обзор Samsung Galaxy S26 Ultra"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{ width: '100%', padding: '0.75rem', backgroundColor: '#020617', border: '1px solid #334155', borderRadius: '0.5rem', color: '#fff', outline: 'none' }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Категория</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', backgroundColor: '#020617', border: '1px solid #334155', borderRadius: '0.5rem', color: '#fff', outline: 'none' }}
                >
                  <option value="SMARTPHONES">SMARTPHONES</option>
                  <option value="PC HARDWARE">PC HARDWARE</option>
                  <option value="LAPTOPS">LAPTOPS</option>
                  <option value="REVIEWS">REVIEWS</option>
                  <option value="NEWS">NEWS</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Время чтения</label>
                <input
                  type="text"
                  placeholder="5 min read"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', backgroundColor: '#020617', border: '1px solid #334155', borderRadius: '0.5rem', color: '#fff', outline: 'none' }}
                />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Краткое описание (анонс)</label>
              <textarea
                placeholder="Краткий анонс статьи для главной страницы..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                required
                style={{ width: '100%', padding: '0.75rem', backgroundColor: '#020617', border: '1px solid #334155', borderRadius: '0.5rem', color: '#fff', outline: 'none' }}
              />
            </div>
            <button type="submit" style={{ alignSelf: 'flex-start', padding: '0.75rem 1.5rem', backgroundColor: '#06b6d4', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}>
              + Опубликовать статью
            </button>
          </form>
        </div>

        {/* Список статей */}
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Управление публикациями ({articles.length})</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {articles.map((art) => (
              <div key={art.id} style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '1rem 1.5rem', borderRadius: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ color: '#22d3ee', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px' }}>{art.category}</span>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0.25rem 0' }}>{art.title}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: 0 }}>{art.excerpt}</p>
                </div>
                <button onClick={() => handleDelete(art.id)} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', marginLeft: '1rem', whiteSpace: 'nowrap' }}>
                  Удалить
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
