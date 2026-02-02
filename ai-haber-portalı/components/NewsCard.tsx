
import React from 'react';
import { NewsItem } from '../types';

interface NewsCardProps {
  news: NewsItem;
  onReadMore: (news: NewsItem) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, onReadMore }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center mb-3">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full uppercase tracking-wider">
            {news.category}
          </span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-3 leading-tight hover:text-blue-600 transition-colors">
          {news.title}
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-4 flex-grow">
          {news.content}
        </p>
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">
            Kaynak: <span className="text-slate-500">{news.source}</span>
          </span>
          <button 
            onClick={() => onReadMore(news)}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 group"
          >
            Devamını Oku <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
