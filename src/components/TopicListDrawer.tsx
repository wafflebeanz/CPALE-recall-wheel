import React, { useState, useMemo } from 'react';
import { TopicItem, SubjectConfig, TopicLabel } from '../types';
import { 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Trash2, 
  Edit3, 
  Info,
  Filter
} from 'lucide-react';
import { sounds } from '../utils/audio';

interface TopicListDrawerProps {
  topics: TopicItem[];
  subject: SubjectConfig;
  onToggleMastered: (id: string) => void;
  onAddTopic: (topic: Partial<TopicItem>) => void;
  onDeleteTopic: (id: string) => void;
  onSelectTopic: (topic: TopicItem) => void;
  onBulkMastered?: (mastered: boolean) => void;
}

export const TopicListDrawer: React.FC<TopicListDrawerProps> = ({
  topics,
  subject,
  onToggleMastered,
  onAddTopic,
  onDeleteTopic,
  onSelectTopic,
  onBulkMastered,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<'all' | 'in-wheel' | 'mastered' | 'critical' | 'comfortable'>('all');
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<string>('');
  const [newLabel, setNewLabel] = useState<TopicLabel>('none');

  // Stats
  const totalCount = topics.length;
  const masteredCount = topics.filter(t => t.mastered).length;
  const activeCount = totalCount - masteredCount;
  const progressPercent = totalCount > 0 ? Math.round((masteredCount / totalCount) * 100) : 0;

  // Filtered topics
  const filteredTopics = useMemo(() => {
    return topics.filter(t => {
      // Search
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.category && t.category.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      // Filter
      if (filterType === 'in-wheel') return !t.mastered;
      if (filterType === 'mastered') return t.mastered;
      if (filterType === 'critical') return t.label === 'critical';
      if (filterType === 'comfortable') return t.label === 'comfortable';
      return true;
    });
  }, [topics, searchQuery, filterType]);

  const handleAddNewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    sounds.playPop();
    onAddTopic({
      title: newTitle.trim(),
      category: newCategory.trim() || 'Custom Added',
      label: newLabel,
      mastered: false,
      addedByUser: true,
      keyPoints: ['Custom study topic added by reviewee.']
    });

    setNewTitle('');
    setNewCategory('');
    setNewLabel('none');
    setIsAddingNew(false);
  };

  return (
    <div className="w-full bg-white rounded-3xl shadow-xl border border-pink-100 overflow-hidden transition-all duration-300">
      {/* Header bar - Clickable to collapse/expand */}
      <div 
        className="p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none bg-gradient-to-r from-pink-50/60 via-purple-50/40 to-white hover:bg-pink-50/80 transition-colors"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg shadow-sm"
            style={{ backgroundColor: `${subject.accentColor}22`, color: subject.accentColor }}
          >
            📋
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-cute font-bold text-base sm:text-lg text-slate-800">
                {subject.name} Topics & Review Checklist
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-pink-100 text-pink-700">
                {activeCount} on wheel
              </span>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
              <span>Progress: {masteredCount}/{totalCount} Mastered ({progressPercent}%)</span>
              <div className="w-16 sm:w-24 bg-slate-200 rounded-full h-1.5 overflow-hidden inline-block align-middle">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%`, backgroundColor: subject.accentColor }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-white/80 transition-colors"
            title={isCollapsed ? 'Expand Menu' : 'Collapse Menu'}
          >
            {isCollapsed ? <ChevronDown size={22} /> : <ChevronUp size={22} />}
          </button>
        </div>
      </div>

      {/* Collapsible Content */}
      {!isCollapsed && (
        <div className="p-4 sm:p-5 border-t border-slate-100 space-y-4">
          {/* Controls row: Search, Filters, Add Button */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={`Search ${subject.name} topics, laws, formulas...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Action: Add Topic */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAddingNew(!isAddingNew)}
                className="px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl text-white shadow-sm flex items-center gap-1.5 transition-transform active:scale-95"
                style={{ backgroundColor: subject.accentColor }}
              >
                <Plus size={16} />
                <span>Add Topic</span>
              </button>

              {onBulkMastered && (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onBulkMastered(false)}
                    className="px-2.5 py-2 text-xs font-bold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
                    title="Put all topics back on the wheel"
                  >
                    Reset Wheel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-semibold mr-1 flex items-center gap-1">
              <Filter size={12} /> Filter:
            </span>
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-full font-bold transition-colors ${
                filterType === 'all'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All ({totalCount})
            </button>
            <button
              type="button"
              onClick={() => setFilterType('in-wheel')}
              className={`px-3 py-1 rounded-full font-bold transition-colors ${
                filterType === 'in-wheel'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
              }`}
            >
              🎡 In Wheel ({activeCount})
            </button>
            <button
              type="button"
              onClick={() => setFilterType('mastered')}
              className={`px-3 py-1 rounded-full font-bold transition-colors ${
                filterType === 'mastered'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              ✨ Mastered ({masteredCount})
            </button>
            <button
              type="button"
              onClick={() => setFilterType('critical')}
              className={`px-3 py-1 rounded-full font-bold transition-colors ${
                filterType === 'critical'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
              }`}
            >
              🚨 Critical ({topics.filter(t => t.label === 'critical').length})
            </button>
            <button
              type="button"
              onClick={() => setFilterType('comfortable')}
              className={`px-3 py-1 rounded-full font-bold transition-colors ${
                filterType === 'comfortable'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
              }`}
            >
              🌿 Comfortable ({topics.filter(t => t.label === 'comfortable').length})
            </button>
          </div>

          {/* Inline Add Topic Form */}
          {isAddingNew && (
            <form 
              onSubmit={handleAddNewSubmit}
              className="p-4 bg-pink-50/60 rounded-2xl border-2 border-dashed border-pink-300 space-y-3 animate-fadeIn"
            >
              <div className="font-cute font-bold text-sm text-pink-900 flex items-center justify-between">
                <span>Add Custom Topic to {subject.name} Wheel:</span>
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="text-slate-400 hover:text-slate-600 text-xs"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Topic Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Leases under PFRS 16, BIR Form 1701Q..."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full p-2 text-xs bg-white border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Category (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Tax Remedies, Liabilities..."
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full p-2 text-xs bg-white border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-600 font-semibold text-[11px]">Initial Status:</span>
                  <button
                    type="button"
                    onClick={() => setNewLabel('none')}
                    className={`px-2.5 py-0.5 rounded-lg text-xs font-bold ${newLabel === 'none' ? 'bg-slate-700 text-white' : 'bg-white border text-slate-600'}`}
                  >
                    Normal
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewLabel('critical')}
                    className={`px-2.5 py-0.5 rounded-lg text-xs font-bold ${newLabel === 'critical' ? 'bg-rose-500 text-white' : 'bg-white border text-rose-600'}`}
                  >
                    🚨 Critical
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewLabel('comfortable')}
                    className={`px-2.5 py-0.5 rounded-lg text-xs font-bold ${newLabel === 'comfortable' ? 'bg-teal-600 text-white' : 'bg-white border text-teal-600'}`}
                  >
                    🌿 Comfortable
                  </button>
                </div>

                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-cute font-bold text-xs shadow-md transition-all active:scale-95"
                >
                  Save to Wheel ✨
                </button>
              </div>
            </form>
          )}

          {/* Topics List Table / Rows */}
          <div className="divide-y divide-slate-100 max-h-[380px] overflow-y-auto pr-1">
            {filteredTopics.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs sm:text-sm">
                <span>No topics found matching your criteria. Try adjusting the search or filter!</span>
              </div>
            ) : (
              filteredTopics.map((topic) => (
                <div
                  key={topic.id}
                  className={`py-2.5 px-2 flex items-center justify-between gap-3 rounded-xl transition-colors hover:bg-slate-50 ${
                    topic.mastered ? 'opacity-60 bg-slate-50/50' : ''
                  }`}
                >
                  {/* Left: Checkbox & Title */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* The requested checkbox: ticking removes from wheel, unticking returns to wheel */}
                    <label 
                      className="relative flex items-center cursor-pointer select-none"
                      title={topic.mastered ? 'Uncheck to add back to wheel' : 'Check to mark as mastered (removes from wheel)'}
                    >
                      <input
                        type="checkbox"
                        checked={topic.mastered}
                        onChange={() => {
                          sounds.playPop();
                          onToggleMastered(topic.id);
                        }}
                        className="w-5 h-5 rounded-lg text-pink-600 border-2 border-slate-300 focus:ring-pink-400 cursor-pointer transition-colors accent-pink-500"
                      />
                    </label>

                    <div 
                      className="flex-1 min-w-0 cursor-pointer"
                      onClick={() => onSelectTopic(topic)}
                    >
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs sm:text-sm font-bold truncate ${topic.mastered ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                          {topic.title}
                        </span>

                        {/* Labels */}
                        {topic.label === 'critical' && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-rose-100 text-rose-700 border border-rose-200">
                            🚨 Critical
                          </span>
                        )}
                        {topic.label === 'comfortable' && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-teal-100 text-teal-700 border border-teal-200">
                            🌿 Comfortable
                          </span>
                        )}
                        {topic.label === 'reviewing' && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-purple-100 text-purple-700 border border-purple-200">
                            📖 Reviewing
                          </span>
                        )}
                        {topic.notes && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-md font-medium bg-amber-50 text-amber-600 border border-amber-200">
                            📝 Note
                          </span>
                        )}
                      </div>

                      {topic.category && (
                        <div className="text-[11px] text-slate-400">
                          {topic.category}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* View Details / Reviewer note */}
                    <button
                      type="button"
                      onClick={() => onSelectTopic(topic)}
                      className="p-1.5 text-slate-400 hover:text-pink-600 rounded-lg hover:bg-pink-50 transition-colors"
                      title="View Key Points & Edit Notes"
                    >
                      <Info size={16} />
                    </button>

                    {/* Delete button (especially for custom items) */}
                    {topic.addedByUser && (
                      <button
                        type="button"
                        onClick={() => {
                          sounds.playPop();
                          onDeleteTopic(topic.id);
                        }}
                        className="p-1.5 text-slate-300 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Delete topic"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Quick Helpful Instruction */}
          <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between">
            <span>💡 <strong>Tip:</strong> Ticked items are mastered and excluded from spins. Untick to spin them again!</span>
            <span className="text-pink-600 font-bold">{activeCount} available in wheel</span>
          </div>
        </div>
      )}
    </div>
  );
};
