/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { SubjectId, TopicItem, AppSettings } from './types';
import { SUBJECT_CONFIGS, INITIAL_TOPICS, MOTIVATIONAL_QUOTES } from './data/reviewerData';
import { WheelCanvas } from './components/WheelCanvas';
import { TopicListDrawer } from './components/TopicListDrawer';
import { TopicModal } from './components/TopicModal';
import { ImportExportModal } from './components/ImportExportModal';
import { sounds } from './utils/audio';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Zap, 
  Save, 
  RotateCcw, 
  BookOpen, 
  Trophy, 
  CheckCircle,
  HelpCircle,
  Heart,
  Share2
} from 'lucide-react';

const STORAGE_KEY = 'CPA_REVIEW_WHEEL_STATE_V1';
const SETTINGS_KEY = 'CPA_REVIEW_WHEEL_SETTINGS_V1';

export default function App() {
  // Current active subject tab
  const [activeSubjectId, setActiveSubjectId] = useState<SubjectId>('FAR');

  // All topics state keyed by SubjectId
  const [allTopics, setAllTopics] = useState<Record<SubjectId, TopicItem[]>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === 'object') {
            return parsed;
          }
        }
      } catch {
        // use default
      }
    }
    return INITIAL_TOPICS;
  });

  // Global settings
  const [settings, setSettings] = useState<AppSettings>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(SETTINGS_KEY);
        if (saved) {
          return JSON.parse(saved);
        }
      } catch {
        // use default
      }
    }
    return {
      soundEnabled: true,
      skipAnimation: false,
      confettiEnabled: true,
      spinDurationSeconds: 4.8,
    };
  });

  // Spinning state
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  // Selected topic when landed or when clicking info
  const [selectedTopic, setSelectedTopic] = useState<TopicItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Import/Export Modal
  const [isImportExportOpen, setIsImportExportOpen] = useState<boolean>(false);

  // Random quote of the session
  const [quoteIndex, setQuoteIndex] = useState<number>(0);

  // Persist topics to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allTopics));
    } catch {
      // ignore
    }
  }, [allTopics]);

  // Persist settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings]);

  // Active Subject Config
  const activeSubject = useMemo(() => {
    return SUBJECT_CONFIGS.find(s => s.id === activeSubjectId) || SUBJECT_CONFIGS[0];
  }, [activeSubjectId]);

  // Current Subject Topics
  const currentSubjectTopics = useMemo(() => {
    return allTopics[activeSubjectId] || [];
  }, [allTopics, activeSubjectId]);

  // Active Topics (Not Mastered, which appear on the wheel)
  const activeWheelTopics = useMemo(() => {
    return currentSubjectTopics.filter(t => !t.mastered);
  }, [currentSubjectTopics]);

  // Overall CPA review progress statistics
  const overallStats = useMemo(() => {
    let total = 0;
    let mastered = 0;
    let critical = 0;

    Object.values(allTopics).forEach(list => {
      list.forEach(t => {
        total++;
        if (t.mastered) mastered++;
        if (t.label === 'critical') critical++;
      });
    });

    const percent = total > 0 ? Math.round((mastered / total) * 100) : 0;
    return { total, mastered, critical, percent };
  }, [allTopics]);

  // Handle wheel landing on a topic
  const handleSpinEnd = useCallback((topic: TopicItem) => {
    setSelectedTopic(topic);
    setIsModalOpen(true);
  }, []);

  // Update a single topic
  const handleUpdateTopic = useCallback((updated: TopicItem) => {
    setAllTopics(prev => ({
      ...prev,
      [activeSubjectId]: prev[activeSubjectId].map(t => 
        t.id === updated.id ? updated : t
      ),
    }));
    // Also update selectedTopic in modal if currently open
    setSelectedTopic(updated);
  }, [activeSubjectId]);

  // Toggle mastered status for a topic
  const handleToggleMastered = useCallback((id: string) => {
    setAllTopics(prev => ({
      ...prev,
      [activeSubjectId]: prev[activeSubjectId].map(t => {
        if (t.id === id) {
          return { ...t, mastered: !t.mastered };
        }
        return t;
      }),
    }));
  }, [activeSubjectId]);

  // Add new custom topic to the current subject
  const handleAddTopic = useCallback((newTopic: Partial<TopicItem>) => {
    const item: TopicItem = {
      id: `${activeSubjectId.toLowerCase()}-custom-${Date.now()}`,
      title: newTopic.title || 'New Topic',
      category: newTopic.category || 'Custom Topic',
      mastered: false,
      label: newTopic.label || 'none',
      notes: newTopic.notes || '',
      keyPoints: newTopic.keyPoints || ['Custom topic added for review.'],
      addedByUser: true,
    };

    setAllTopics(prev => ({
      ...prev,
      [activeSubjectId]: [item, ...prev[activeSubjectId]],
    }));
  }, [activeSubjectId]);

  // Delete a topic
  const handleDeleteTopic = useCallback((id: string) => {
    setAllTopics(prev => ({
      ...prev,
      [activeSubjectId]: prev[activeSubjectId].filter(t => t.id !== id),
    }));
  }, [activeSubjectId]);

  // Bulk set mastered
  const handleBulkMastered = useCallback((mastered: boolean) => {
    sounds.playPop();
    setAllTopics(prev => ({
      ...prev,
      [activeSubjectId]: prev[activeSubjectId].map(t => ({
        ...t,
        mastered,
      })),
    }));
  }, [activeSubjectId]);

  // Import backup data
  const handleImportData = useCallback((data: { topics: Record<SubjectId, TopicItem[]>; settings?: AppSettings }) => {
    setAllTopics(data.topics);
    if (data.settings) {
      setSettings(data.settings);
    }
  }, []);

  // Reset all to default reviewer
  const handleResetAll = useCallback(() => {
    setAllTopics(INITIAL_TOPICS);
  }, []);

  // Cycle quote
  const nextQuote = () => {
    sounds.playPop();
    setQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-slate-800 flex flex-col font-sans pb-12 selection:bg-pink-200 selection:text-pink-900">
      {/* Cutesy Header & Navigation */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b border-pink-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
          {/* Logo & CPA Mascot Title */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-pink-400 via-rose-400 to-purple-500 text-white flex items-center justify-center text-2xl shadow-md transform -rotate-3 hover:rotate-0 transition-transform">
              🌸
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-cute font-bold text-xl sm:text-2xl text-slate-800 tracking-tight">
                  CPA Review Wheel
                </h1>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 border border-pink-200">
                  CPALE 2026 Ready
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Comprehensive topic wheel picker for all 6 board exam subjects ✨
              </p>
            </div>
          </div>

          {/* Quick Settings & Tools Toolbar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Skip Animation Toggle (Requested by user) */}
            <button
              type="button"
              onClick={() => {
                sounds.playPop();
                setSettings(s => ({ ...s, skipAnimation: !s.skipAnimation }));
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                settings.skipAnimation
                  ? 'bg-amber-100 text-amber-800 border-amber-300 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
              title={settings.skipAnimation ? 'Fast Mode ON (Skips spin animation)' : 'Fast Mode OFF (Animates spin)'}
            >
              <Zap size={14} className={settings.skipAnimation ? 'text-amber-600 fill-amber-500' : 'text-slate-400'} />
              <span className="hidden xs:inline">Fast Spin</span>
            </button>

            {/* Sound Toggle (Requested by user) */}
            <button
              type="button"
              onClick={() => {
                const nextState = !settings.soundEnabled;
                setSettings(s => ({ ...s, soundEnabled: nextState }));
                if (nextState) sounds.playPop();
              }}
              className={`p-2 rounded-xl text-xs font-bold transition-all border ${
                settings.soundEnabled
                  ? 'bg-pink-50 text-pink-700 border-pink-200'
                  : 'bg-slate-100 text-slate-400 border-slate-200'
              }`}
              title={settings.soundEnabled ? 'Mute Sounds' : 'Enable Wheel Sounds'}
            >
              {settings.soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {/* Import / Export Progress Button (Requested by user) */}
            <button
              type="button"
              onClick={() => {
                sounds.playPop();
                setIsImportExportOpen(true);
              }}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm flex items-center gap-1.5 transition-colors"
              title="Import or Export Progress"
            >
              <Save size={14} className="text-purple-500" />
              <span>Backup</span>
            </button>
          </div>
        </div>

        {/* 6 Accounting Subject Tabs (The Core Request!) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-1 pb-2">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {SUBJECT_CONFIGS.map((sub) => {
              const isActive = sub.id === activeSubjectId;
              const subTopics = allTopics[sub.id] || [];
              const mastered = subTopics.filter(t => t.mastered).length;
              const total = subTopics.length;
              const activeOnWheel = total - mastered;

              return (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => {
                    sounds.playPop();
                    setActiveSubjectId(sub.id);
                  }}
                  className={`flex-shrink-0 px-4 py-2.5 rounded-2xl font-bold transition-all duration-200 flex items-center gap-2.5 text-xs sm:text-sm border-2 ${
                    isActive
                      ? 'bg-white shadow-md transform -translate-y-0.5'
                      : 'bg-white/60 hover:bg-white text-slate-600 border-transparent hover:border-slate-200'
                  }`}
                  style={{
                    borderColor: isActive ? sub.accentColor : 'transparent',
                    color: isActive ? sub.accentColor : undefined,
                  }}
                >
                  <span className="text-base sm:text-lg">{sub.icon}</span>
                  <div className="text-left">
                    <div className="font-cute font-bold leading-tight flex items-center gap-1.5">
                      <span>{sub.name}</span>
                      {isActive && (
                        <span 
                          className="w-2 h-2 rounded-full inline-block animate-ping"
                          style={{ backgroundColor: sub.accentColor }}
                        />
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 font-normal">
                      {activeOnWheel} in wheel ({mastered}/{total})
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full space-y-6">
        {/* Cute Subject Banner & Motivational Quote */}
        <div 
          className="rounded-3xl p-5 sm:p-6 text-white shadow-xl relative overflow-hidden transition-all duration-300"
          style={{
            background: `linear-gradient(135deg, ${activeSubject.accentColor}, ${activeSubject.accentColor}cc, #A855F7)`
          }}
        >
          {/* Decorative cute background elements */}
          <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="absolute right-1/4 -bottom-10 w-36 h-36 rounded-full bg-white/10 blur-lg pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold text-white uppercase tracking-wider">
                  Subject {SUBJECT_CONFIGS.findIndex(s => s.id === activeSubjectId) + 1} of 6
                </span>
                <span className="text-xs text-white/90 font-medium">
                  • Based on Uploaded CPALE Reviewer Notes
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-cute font-bold tracking-tight">
                {activeSubject.name} — {activeSubject.fullName}
              </h2>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
                {activeSubject.description}
              </p>
            </div>

            {/* Motivational Quote Card */}
            <div 
              onClick={nextQuote}
              className="bg-white/15 hover:bg-white/25 backdrop-blur-md p-3.5 rounded-2xl border border-white/30 text-xs text-white/95 max-w-sm cursor-pointer transition-colors shadow-inner flex items-start gap-2.5"
              title="Click for another motivational CPA quote!"
            >
              <Heart size={16} className="text-pink-200 shrink-0 mt-0.5 fill-pink-300" />
              <div>
                <p className="italic leading-relaxed font-medium">
                  {MOTIVATIONAL_QUOTES[quoteIndex]}
                </p>
                <span className="text-[10px] text-white/70 block mt-1 font-bold">
                  ✨ Tap for encouragement!
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Progress Bar Strip */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-pink-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-9 h-9 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center text-lg">
              🎯
            </div>
            <div>
              <div className="text-xs font-bold text-slate-700">
                Overall Board Exam Topics Mastered
              </div>
              <div className="text-xs text-slate-500">
                {overallStats.mastered} of {overallStats.total} Total Topics ({overallStats.percent}%)
                {overallStats.critical > 0 && (
                  <span className="ml-2 text-rose-600 font-bold">
                    • {overallStats.critical} marked Critical 🚨
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-72">
            <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-pink-400 via-rose-500 to-purple-500 transition-all duration-500 shadow-sm"
                style={{ width: `${overallStats.percent}%` }}
              />
            </div>
            <span className="text-xs font-bold text-pink-600 font-cute w-10 text-right">
              {overallStats.percent}%
            </span>
          </div>
        </div>

        {/* Main Grid: Wheel on Left/Center, Reviewer Topic Checklist on Right/Bottom */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Wheel Section (5 or 6 cols on desktop) */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-pink-100 flex flex-col items-center relative overflow-hidden">
              {/* Cute corner badge */}
              <div 
                className="absolute -top-10 -left-10 w-28 h-28 rounded-full pointer-events-none"
                style={{ backgroundColor: `${activeSubject.accentColor}10` }}
              />

              <div className="w-full flex items-center justify-between mb-2 px-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="text-base">{activeSubject.icon}</span>
                  <span>{activeSubject.name} Topic Wheel</span>
                </span>

                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                  <span className="px-2.5 py-1 rounded-full bg-slate-100">
                    {activeWheelTopics.length} / {currentSubjectTopics.length} in play
                  </span>
                </div>
              </div>

              {/* The Spinning Wheel Canvas */}
              <WheelCanvas
                topics={activeWheelTopics}
                subject={activeSubject}
                onSpinEnd={handleSpinEnd}
                isSpinning={isSpinning}
                setIsSpinning={setIsSpinning}
                soundEnabled={settings.soundEnabled}
                skipAnimation={settings.skipAnimation}
              />

              {/* Quick instructions below wheel */}
              <div className="mt-2 text-center text-xs text-slate-400 max-w-xs">
                {activeWheelTopics.length === 0 ? (
                  <span className="text-pink-600 font-bold">
                    Amazing job! You mastered all topics in {activeSubject.name}! 🎓
                  </span>
                ) : (
                  <span>
                    Spin to randomly pick a review topic. Mastered topics are automatically removed from the wheel!
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Checklist Drawer Section (6 or 7 cols on desktop) */}
          <div className="lg:col-span-6 space-y-4">
            <TopicListDrawer
              topics={currentSubjectTopics}
              subject={activeSubject}
              onToggleMastered={handleToggleMastered}
              onAddTopic={handleAddTopic}
              onDeleteTopic={handleDeleteTopic}
              onSelectTopic={(t) => {
                setSelectedTopic(t);
                setIsModalOpen(true);
              }}
              onBulkMastered={handleBulkMastered}
            />

            {/* Quick Helper Review Cards */}
            <div className="bg-gradient-to-br from-pink-50/50 to-purple-50/50 rounded-3xl p-5 border border-pink-100 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-900">
                <BookOpen size={15} className="text-purple-600" />
                <span>How This CPA Study Wheel Works:</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 font-bold">1.</span>
                  <span><strong>Spin the Wheel</strong> to get a random topic to test your knowledge or focus your study session.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 font-bold">2.</span>
                  <span>When it stops, confetti fires! Check the <strong>Reviewer Cheat Sheet</strong> for key formulas and rules.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 font-bold">3.</span>
                  <span>Tick the checkbox to mark it as <strong>Mastered</strong> (instantly removed from wheel so you don't repeat it!).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 font-bold">4.</span>
                  <span>Or tag it <strong>Critical 🚨</strong> or <strong>Comfortable 🌿</strong> to keep practicing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 font-bold">5.</span>
                  <span>Use <strong>Backup</strong> anytime to download or restore your full progress across all 6 subjects!</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Celebratory Landed Topic Modal with Confetti & Labels */}
      <TopicModal
        isOpen={isModalOpen}
        topic={selectedTopic}
        subject={activeSubject}
        onClose={() => setIsModalOpen(false)}
        onUpdateTopic={handleUpdateTopic}
        confettiEnabled={settings.confettiEnabled}
        onSpinAgain={() => {
          // Trigger spin again if active topics exist
          const canvas = document.querySelector('canvas');
          if (canvas) {
            canvas.dispatchEvent(new MouseEvent('click', { bubbles: true }));
          }
        }}
      />

      {/* Import / Export Progress Modal */}
      <ImportExportModal
        isOpen={isImportExportOpen}
        onClose={() => setIsImportExportOpen(false)}
        allTopics={allTopics}
        settings={settings}
        onImportData={handleImportData}
        onResetAll={handleResetAll}
      />

      {/* Cutesy Footer */}
      <footer className="mt-auto pt-8 border-t border-pink-100 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 font-medium">
            <span>Made with</span>
            <span className="text-rose-500">💖</span>
            <span>for aspiring CPAs & Accounting Students</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Covers FAR • AFAR • RFBT • TAX • MAS • AUD • All progress saved locally ✨
          </div>
        </div>
      </footer>
    </div>
  );
}
