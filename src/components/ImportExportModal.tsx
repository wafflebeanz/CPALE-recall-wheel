import React, { useState } from 'react';
import { SubjectId, TopicItem, AppSettings } from '../types';
import { Download, Upload, Copy, Check, RotateCcw, X, AlertCircle } from 'lucide-react';
import { sounds } from '../utils/audio';

interface ImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  allTopics: Record<SubjectId, TopicItem[]>;
  settings: AppSettings;
  onImportData: (data: { topics: Record<SubjectId, TopicItem[]>; settings?: AppSettings }) => void;
  onResetAll: () => void;
}

export const ImportExportModal: React.FC<ImportExportModalProps> = ({
  isOpen,
  onClose,
  allTopics,
  settings,
  onImportData,
  onResetAll,
}) => {
  const [importJsonText, setImportJsonText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'export' | 'import' | 'reset'>('export');

  if (!isOpen) return null;

  // Prepare backup payload
  const backupData = {
    version: '1.0',
    exportDate: new Date().toISOString(),
    settings,
    topics: allTopics,
  };

  const backupJsonString = JSON.stringify(backupData, null, 2);

  const handleDownloadFile = () => {
    sounds.playPop();
    const blob = new Blob([backupJsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const dateStr = new Date().toISOString().split('T')[0];
    link.download = `cpa-review-wheel-progress-${dateStr}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyClipboard = () => {
    sounds.playPop();
    navigator.clipboard.writeText(backupJsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        setImportJsonText(content);
        validateAndImport(content);
      } catch {
        setErrorMsg('Invalid file format. Please upload a valid JSON backup.');
      }
    };
    reader.readAsText(file);
  };

  const validateAndImport = (jsonStr: string) => {
    try {
      setErrorMsg(null);
      const parsed = JSON.parse(jsonStr);

      if (!parsed.topics || typeof parsed.topics !== 'object') {
        throw new Error('Missing "topics" object in backup file.');
      }

      sounds.playCelebration();
      onImportData({
        topics: parsed.topics,
        settings: parsed.settings,
      });
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid JSON data';
      setErrorMsg(`Failed to import: ${msg}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-2 border-pink-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">💾</span>
            <div>
              <h2 className="font-cute font-bold text-xl">Import / Export Progress</h2>
              <p className="text-xs text-white/80">Backup, transfer, or reset your CPA review progress</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/20 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab switchers */}
        <div className="flex border-b border-slate-100 bg-slate-50 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              sounds.playPop();
              setActiveTab('export');
            }}
            className={`flex-1 py-3 text-center border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'export'
                ? 'border-pink-500 text-pink-600 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Download size={14} /> Export Backup
          </button>
          <button
            type="button"
            onClick={() => {
              sounds.playPop();
              setActiveTab('import');
            }}
            className={`flex-1 py-3 text-center border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'import'
                ? 'border-pink-500 text-pink-600 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Upload size={14} /> Import Backup
          </button>
          <button
            type="button"
            onClick={() => {
              sounds.playPop();
              setActiveTab('reset');
            }}
            className={`flex-1 py-3 text-center border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'reset'
                ? 'border-rose-500 text-rose-600 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <RotateCcw size={14} /> Reset
          </button>
        </div>

        {/* Tab content */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-200 flex items-start gap-2">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-slate-600">
                Download your study progress, mastered checklist items, custom topics, and notes as a file so you can restore them on any device!
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleDownloadFile}
                  className="flex-1 py-3 px-4 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-cute font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Download size={16} /> Download JSON File
                </button>
                <button
                  type="button"
                  onClick={handleCopyClipboard}
                  className="py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              <div className="mt-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Backup Data Preview:
                </span>
                <textarea
                  readOnly
                  value={backupJsonString}
                  rows={6}
                  className="w-full text-[11px] font-mono p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 select-all"
                />
              </div>
            </div>
          )}

          {activeTab === 'import' && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-slate-600">
                Upload a JSON file or paste your backup JSON code below to restore your review progress.
              </p>

              <div className="border-2 border-dashed border-pink-200 hover:border-pink-400 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-pink-50/30">
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="json-file-input"
                />
                <label htmlFor="json-file-input" className="cursor-pointer flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xl shadow-sm">
                    📁
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-pink-700 font-cute">
                    Click to select .json file
                  </span>
                  <span className="text-[11px] text-slate-400">or drag and drop here</span>
                </label>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Or Paste JSON Text:
                </span>
                <textarea
                  placeholder="Paste your JSON backup code here..."
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  rows={4}
                  className="w-full text-xs font-mono p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <button
                type="button"
                onClick={() => validateAndImport(importJsonText)}
                disabled={!importJsonText.trim()}
                className={`w-full py-3 rounded-xl font-cute font-bold text-sm text-white shadow-md transition-all ${
                  importJsonText.trim()
                    ? 'bg-pink-600 hover:bg-pink-700 active:scale-95'
                    : 'bg-slate-300 cursor-not-allowed shadow-none'
                }`}
              >
                Restore Progress Now ✨
              </button>
            </div>
          )}

          {activeTab === 'reset' && (
            <div className="space-y-4 text-center py-2">
              <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-2xl mx-auto shadow-inner">
                ⚠️
              </div>
              <h3 className="font-cute font-bold text-lg text-slate-800">
                Reset Review Topics to Default?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                This will reset all 6 subjects back to their complete original reviewer topics, clearing all mastered checkmarks and custom notes.
              </p>

              <div className="pt-2 flex gap-3 justify-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sounds.playPop();
                    onResetAll();
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-cute font-bold text-xs shadow-md transition-all active:scale-95"
                >
                  Yes, Reset Everything
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
