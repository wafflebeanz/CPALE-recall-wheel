import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { TopicItem, SubjectConfig, TopicLabel } from '../types';
import { CheckCircle2, AlertTriangle, Sparkles, BookOpen, X, Edit3, Save } from 'lucide-react';
import { sounds } from '../utils/audio';

interface TopicModalProps {
  topic: TopicItem | null;
  subject: SubjectConfig;
  isOpen: boolean;
  onClose: () => void;
  onUpdateTopic: (updatedTopic: TopicItem) => void;
  confettiEnabled: boolean;
  onSpinAgain?: () => void;
}

export const TopicModal: React.FC<TopicModalProps> = ({
  topic,
  subject,
  isOpen,
  onClose,
  onUpdateTopic,
  confettiEnabled,
  onSpinAgain,
}) => {
  const [currentNotes, setCurrentNotes] = useState<string>('');
  const [isEditingNotes, setIsEditingNotes] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && topic) {
      setCurrentNotes(topic.notes || '');
      setIsEditingNotes(false);

      if (confettiEnabled) {
        // Fire celebration confetti
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#F43F5E', '#8B5CF6', '#10B981', '#F59E0B', '#3B82F6', '#EC4899'],
          });
        } catch {
          // ignore
        }
      }
    }
  }, [isOpen, topic, confettiEnabled]);

  if (!isOpen || !topic) return null;

  const handleSetMastered = (mastered: boolean) => {
    sounds.playPop();
    const updated: TopicItem = {
      ...topic,
      mastered,
      notes: currentNotes,
    };
    onUpdateTopic(updated);
    if (mastered) {
      // Extra burst if marked mastered!
      if (confettiEnabled) {
        try {
          confetti({
            particleCount: 50,
            spread: 90,
            origin: { y: 0.5 },
          });
        } catch {
          // ignore
        }
      }
      onClose();
    }
  };

  const handleSetLabel = (label: TopicLabel) => {
    sounds.playPop();
    const updated: TopicItem = {
      ...topic,
      label,
      notes: currentNotes,
    };
    onUpdateTopic(updated);
  };

  const handleSaveNotes = () => {
    sounds.playPop();
    setIsEditingNotes(false);
    onUpdateTopic({
      ...topic,
      notes: currentNotes,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-4 overflow-hidden transform transition-all duration-300 scale-100"
        style={{ borderColor: subject.accentColor }}
      >
        {/* Cute Top Banner */}
        <div 
          className="p-5 text-white flex items-center justify-between relative overflow-hidden"
          style={{ backgroundColor: subject.accentColor }}
        >
          <div className="flex items-center gap-3 z-10">
            <span className="text-3xl p-2 bg-white/20 rounded-2xl backdrop-blur-sm shadow-inner">
              {subject.icon}
            </span>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-white/90">
                Landed on {subject.name}! 🎉
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-cute leading-tight">
                {topic.title}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="z-10 p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors"
            title="Close"
          >
            <X size={22} />
          </button>

          {/* Decorative cute circles in background */}
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute right-14 -top-8 w-16 h-16 rounded-full bg-white/10 pointer-events-none" />
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Status Badge Strip */}
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${subject.badgeBg} ${subject.badgeText}`}>
              {subject.name} • {topic.category || 'Core Reviewer'}
            </span>
            {topic.mastered ? (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 flex items-center gap-1">
                <CheckCircle2 size={13} /> Mastered (Off Wheel)
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
                🎡 Active on Wheel
              </span>
            )}

            {topic.label === 'critical' && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700 border border-rose-300 flex items-center gap-1">
                <AlertTriangle size={13} /> Critical Topic 🚨
              </span>
            )}
            {topic.label === 'comfortable' && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-700 border border-teal-300 flex items-center gap-1">
                🌿 Comfortable
              </span>
            )}
            {topic.label === 'reviewing' && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 border border-purple-300 flex items-center gap-1">
                📖 Needs Review
              </span>
            )}
          </div>

          {/* Reviewer Key Highlights Card */}
          {topic.keyPoints && topic.keyPoints.length > 0 && (
            <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200 shadow-sm space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider">
                <Sparkles size={14} className="text-amber-500" />
                <span>Reviewer Cheat Sheet & Key Rules:</span>
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                {topic.keyPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold mt-0.5">•</span>
                    <span className="leading-relaxed font-medium">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* User Review Notes Section */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                <BookOpen size={14} className="text-pink-500" />
                <span>My Review Notes & Formulas:</span>
              </span>
              {!isEditingNotes ? (
                <button
                  type="button"
                  onClick={() => setIsEditingNotes(true)}
                  className="text-xs text-pink-600 hover:text-pink-700 font-bold flex items-center gap-1"
                >
                  <Edit3 size={12} /> Edit Notes
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="text-xs bg-pink-500 text-white px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 hover:bg-pink-600 shadow-sm"
                >
                  <Save size={12} /> Save
                </button>
              )}
            </div>

            {isEditingNotes ? (
              <textarea
                value={currentNotes}
                onChange={(e) => setCurrentNotes(e.target.value)}
                placeholder="Write your mnemonics, quick reminders, formulas, or reviewer page references here..."
                rows={3}
                className="w-full text-xs sm:text-sm p-2.5 bg-white border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            ) : (
              <p className="text-xs sm:text-sm text-slate-600 italic">
                {currentNotes ? currentNotes : 'No personal notes added yet. Click edit to jot down your study cues!'}
              </p>
            )}
          </div>

          {/* Options Requested by User: Tick Mastered OR Label as Critical / Comfortable */}
          <div className="space-y-3 pt-1">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Update Topic Status for the Wheel:
            </div>

            {/* Option 1: Mastered Checkbox Button (Removes from Wheel) */}
            <button
              type="button"
              onClick={() => handleSetMastered(!topic.mastered)}
              className={`w-full p-3.5 rounded-2xl font-bold flex items-center justify-between transition-all duration-200 shadow-sm ${
                topic.mastered
                  ? 'bg-emerald-50 text-emerald-800 border-2 border-emerald-400'
                  : 'bg-white hover:bg-emerald-50 text-slate-700 border-2 border-slate-200 hover:border-emerald-300'
              }`}
            >
              <div className="flex items-center gap-2.5 text-sm sm:text-base">
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold ${topic.mastered ? 'bg-emerald-500 text-white' : 'border-2 border-slate-300'}`}>
                  {topic.mastered ? '✓' : ''}
                </span>
                <span className="font-cute">Mark as Mastered (Remove from Wheel)</span>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                {topic.mastered ? 'Ticked! ✨' : 'Unticked'}
              </span>
            </button>

            {/* Option 2: Label as Critical or Comfortable (Kept in Wheel) */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleSetLabel(topic.label === 'critical' ? 'none' : 'critical')}
                className={`p-2.5 rounded-2xl text-xs sm:text-sm font-bold flex flex-col items-center justify-center gap-1 border-2 transition-all ${
                  topic.label === 'critical'
                    ? 'bg-rose-100 text-rose-800 border-rose-400 shadow-md ring-2 ring-rose-200'
                    : 'bg-white hover:bg-rose-50 text-slate-700 border-slate-200'
                }`}
              >
                <span className="text-lg">🚨</span>
                <span>Critical</span>
                <span className="text-[10px] font-normal text-slate-500">Needs review</span>
              </button>

              <button
                type="button"
                onClick={() => handleSetLabel(topic.label === 'comfortable' ? 'none' : 'comfortable')}
                className={`p-2.5 rounded-2xl text-xs sm:text-sm font-bold flex flex-col items-center justify-center gap-1 border-2 transition-all ${
                  topic.label === 'comfortable'
                    ? 'bg-teal-100 text-teal-800 border-teal-400 shadow-md ring-2 ring-teal-200'
                    : 'bg-white hover:bg-teal-50 text-slate-700 border-slate-200'
                }`}
              >
                <span className="text-lg">🌿</span>
                <span>Comfortable</span>
                <span className="text-[10px] font-normal text-slate-500">Feels confident</span>
              </button>

              <button
                type="button"
                onClick={() => handleSetLabel(topic.label === 'reviewing' ? 'none' : 'reviewing')}
                className={`p-2.5 rounded-2xl text-xs sm:text-sm font-bold flex flex-col items-center justify-center gap-1 border-2 transition-all ${
                  topic.label === 'reviewing'
                    ? 'bg-purple-100 text-purple-800 border-purple-400 shadow-md ring-2 ring-purple-200'
                    : 'bg-white hover:bg-purple-50 text-slate-700 border-slate-200'
                }`}
              >
                <span className="text-lg">📖</span>
                <span>Reviewing</span>
                <span className="text-[10px] font-normal text-slate-500">In-progress</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-white text-sm font-bold transition-colors"
          >
            Done
          </button>

          {onSpinAgain && (
            <button
              type="button"
              onClick={() => {
                onClose();
                setTimeout(() => onSpinAgain(), 100);
              }}
              className="px-6 py-2.5 rounded-xl text-white font-cute font-bold text-sm shadow-md hover:shadow-lg transition-transform active:scale-95 flex items-center gap-2"
              style={{ backgroundColor: subject.accentColor }}
            >
              <span>🎡</span>
              <span>Spin Again!</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
