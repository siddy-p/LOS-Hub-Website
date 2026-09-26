'use client';

import React, { useState } from 'react';
import { FAQ_DATA, FAQItem } from '@/lib/data/faq';
import { ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export function FAQAccordion() {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Airport', 'Booking', 'Payments', 'Safety', 'Refunds', 'Verification'];

  const filteredFAQs = FAQ_DATA.filter((item: FAQItem) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            id="faq-search-query"
            name="faqSearch"
            type="text"
            aria-label="Search airport FAQs"
            placeholder="Search airport FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-brand-navy-600 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'rounded-full px-3 py-1 text-xs font-semibold transition-colors',
                selectedCategory === cat
                  ? 'bg-brand-navy-800 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-8 text-sm text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
            No matching questions found. Contact support@loshub.com for direct assistance.
          </div>
        ) : (
          filteredFAQs.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-xl border border-slate-200 bg-white shadow-subtle overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-bold text-brand-navy-800 hover:bg-slate-50"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xs text-brand-gold-600 font-semibold uppercase tracking-wider">
                      [{item.category}]
                    </span>
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 text-slate-400 transition-transform duration-200 flex-shrink-0',
                      isOpen && 'transform rotate-180 text-brand-navy-800'
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
