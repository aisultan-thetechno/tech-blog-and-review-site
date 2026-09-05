'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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

  // Состояние для создания
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('SMARTPHONES');
  const [readTime, setReadTime] = useState('5 min read');
  const [excerpt, setExcerpt] = useState('');

  // Состояние для редактирования
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

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
      localStorage.setItem('circuit_articles', JSON.stringify(initialArticles));
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
    alert('Статья успешно опубликована!');
  };

  const handleStartEdit = (article: Article) => {
    setEditingArticle({ ...article });
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;
    const updated = articles.map(a => a.id === editingArticle.id ? editingArticle : a);
    saveArticles(updated);
    setEditingArticle(null);
    alert('Изменения сохранены!');
  };

  const handleDelete = (id: string) => {
    if (confirm('Удалить эту статью?')) {
      saveArticles(articles.filter(a => a.id !== id));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-slate-900 border border-slate-800 p-8 rounded-xl max-w-md w-full space-y-4">
          <h1 className="text-2xl font-bold text-cyan-400">Вход в Админ-панель</h1>
          <p className="text-slate-400 text-sm">Введите пароль для доступа к CIRCUIT</p>
          <input
            type="password"
            placeholder="Пароль (admin123)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500"
          />
          <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-semibold p-3 rounded-lg transition cursor-pointer">
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
          <div>
            <h1 className="text-3xl font-bold text-cyan-400">Панель управления CIRCUIT</h1>
            <p className="text-slate-400 text-sm mt-1">Редактирование, создание и удаление публикаций</p>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="/" className="text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg transition">
              ← На главный сайт
            </Link>
            <button onClick={() => setIsAuthenticated(false)} className="text-sm bg-red-950 hover:bg-red-900 text-red-300 border border-red-800 px-4 py-2 rounded-lg transition cursor-pointer">
              Выйти
            </button>
          </div>
        </div>

        {/* Модальное окно редактирования */}
        {editingArticle && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-cyan-500/50 p-6 rounded-xl max-w-2xl w-full space-y-4 shadow-2xl">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h2 className="text-xl font-bold text-cyan-400">Редактирование статьи</h2>
                <button onClick={() => setEditingArticle(null)} className="text-slate-400 hover:text-white">✕</button>
              </div>
              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div>
                  <label className="block text-slate-400 text-sm mb-1">Заголовок</label>
                  <input
                    type="text"
                    value={editingArticle.title}
                    onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                    required
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">Категория</label>
                    <select
                      value={editingArticle.category}
                      onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="SMARTPHONES">SMARTPHONES</option>
                      <option value="PC HARDWARE">PC HARDWARE</option>
                      <option value="LAPTOPS">LAPTOPS</option>
                      <option value="REVIEWS">REVIEWS</option>
                      <option value="NEWS">NEWS</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">Время чтения</label>
                    <input
                      type="text"
                      value={editingArticle.readTime}
                      onChange={(e) => setEditingArticle({ ...editingArticle, readTime: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-1">Краткое описание (анонс)</label>
                  <textarea
                    value={editingArticle.excerpt}
                    onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                    rows={3}
                    required
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="flex space-x-3 pt-2">
                  <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-6 py-2 rounded-lg transition cursor-pointer">
                    Сохранить изменения
                  </button>
                  <button type="button" onClick={() => setEditingArticle(null)} className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-lg transition">
                    Отмена
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Форма создания статьи */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-bold text-cyan-400">+ Добавить новую статью</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-slate-400 text-sm mb-1">Заголовок статьи</label>
              <input
                type="text"
                placeholder="например: Обзор Samsung Galaxy S26 Ultra"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 text-sm mb-1">Категория</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="SMARTPHONES">SMARTPHONES</option>
                  <option value="PC HARDWARE">PC HARDWARE</option>
                  <option value="LAPTOPS">LAPTOPS</option>
                  <option value="REVIEWS">REVIEWS</option>
                  <option value="NEWS">NEWS</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-400 text-sm mb-1">Время чтения</label>
                <input
                  type="text"
                  placeholder="5 min read"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-1">Краткое описание (анонс)</label>
              <textarea
                placeholder="Краткий анонс статьи..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                required
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-6 py-3 rounded-lg transition cursor-pointer">
              Опубликовать статью
            </button>
          </form>
        </div>

        {/* Список статей */}
        <div>
          <h2 className="text-xl font-bold mb-4">Управление публикациями ({articles.length})</h2>
          <div className="space-y-3">
            {articles.map((art) => (
              <div key={art.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-cyan-400 text-xs font-bold tracking-wider uppercase">{art.category}</span>
                    <span className="text-slate-500 text-xs">• {art.date}</span>
                  </div>
                  <h3 className="text-lg font-bold mt-1">{art.title}</h3>
                  <p className="text-slate-400 text-sm mt-1">{art.excerpt}</p>
                </div>
                <div className="flex items-center space-x-2 w-full md:w-auto">
                  <button onClick={() => handleStartEdit(art)} className="flex-1 md:flex-none bg-slate-800 hover:bg-slate-700 text-cyan-400 text-sm px-4 py-2 rounded-lg transition border border-slate-700 cursor-pointer">
                    ✏️ Редактировать
                  </button>
                  <button onClick={() => handleDelete(art.id)} className="flex-1 md:flex-none bg-red-950 hover:bg-red-900 text-red-300 text-sm px-4 py-2 rounded-lg transition border border-red-800 cursor-pointer">
                    🗑️ Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
