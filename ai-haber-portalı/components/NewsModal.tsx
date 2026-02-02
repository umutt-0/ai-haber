
import React, { useEffect } from 'react';
import { NewsItem } from '../types';

interface NewsModalProps {
  news: NewsItem | null;
  onClose: () => void;
}

const NewsModal: React.FC<NewsModalProps> = ({ news, onClose }) => {
  useEffect(() => {
    if (news) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [news]);

  if (!news) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl transition-all scale-100 opacity-100">
        <div className="sticky top-0 right-0 p-4 flex justify-end bg-white/80 backdrop-blur-md z-10">
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-8 pb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full uppercase tracking-wider">
              {news.category}
            </span>
          </div>

          <h2 className="text-3xl font-extrabold text-slate-900 mb-6 leading-tight">
            {news.title}
          </h2>

          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-wrap">
              {news.content}
            </p>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between text-slate-400 text-sm">
            <span>Kaynak: <span className="font-semibold text-slate-600">{news.source}</span></span>
            <span>Haber ID: #{news.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsModal;
