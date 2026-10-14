import React from 'react';
import { CATEGORIES } from '../data/articles';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categoryCounts: Record<string, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none py-1">
      {CATEGORIES.map((category) => {
        const isSelected = selectedCategory === category;
        const count = categoryCounts[category] ?? 0;

        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-2 ${
              isSelected
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 ring-2 ring-blue-600/20'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900'
            }`}
          >
            <span>{category}</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                isSelected
                  ? 'bg-blue-700 text-blue-100 font-bold'
                  : 'bg-white text-slate-500 font-medium'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
