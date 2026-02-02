
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import NewsCard from './components/NewsCard';
import NewsModal from './components/NewsModal';
import { newsData } from './data';
import { NewsItem } from './types';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewingNews, setViewingNews] = useState<NewsItem | null>(null);

  const categories = useMemo(() => {
    return Array.from(new Set(newsData.map(item => item.category)));
  }, []);

  const filteredNews = useMemo(() => {
    return newsData.filter(news => {
      const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           news.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? news.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Hero Section */}
        <section className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Yapay Zeka Dünyasından <span className="text-blue-600">Sıcak Gelişmeler</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl">
            Ajan sistemlerinden uzay veri merkezlerine kadar, geleceği şekillendiren teknolojileri yakından takip edin.
          </p>
        </section>

        {/* Filters & Search */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2 justify-center">
            <button 
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!selectedCategory ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
            >
              Hepsi
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-64">
            <input 
              type="text"
              placeholder="Haber ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg className="w-4 h-4 text-slate-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>

        {/* News Grid */}
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((news) => (
              <NewsCard 
                key={news.id} 
                news={news} 
                onReadMore={(n) => setViewingNews(n)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <svg className="w-12 h-12 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <h3 className="text-lg font-semibold text-slate-900">Sonuç Bulunamadı</h3>
            <p className="text-slate-500">Aramanıza veya filtrenize uygun haber mevcut değil.</p>
          </div>
        )}
      </main>

      {/* News Modal Overlay */}
      <NewsModal news={viewingNews} onClose={() => setViewingNews(null)} />

      <footer className="bg-white border-t border-slate-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">AI</span>
              </div>
              <span className="text-lg font-bold text-slate-900 tracking-tight">HABERPORTALI</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm text-center md:text-left">
              Teknolojinin nabzını tutan, tarafsız ve güncel yapay zeka haberleri platformu.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
