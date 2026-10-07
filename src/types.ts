export type SubjectId = 'FAR' | 'AFAR' | 'RFBT' | 'TAX' | 'MAS' | 'AUD';

export type TopicLabel = 'none' | 'critical' | 'comfortable' | 'reviewing';

export interface TopicItem {
  id: string;
  title: string;
  category?: string;
  mastered: boolean; // if true, ticked and excluded from active wheel
  label: TopicLabel; // 'critical' | 'comfortable' | 'reviewing' | 'none'
  notes?: string;
  keyPoints?: string[]; // reviewer highlights from uploaded notes
  addedByUser?: boolean;
}

export interface SubjectConfig {
  id: SubjectId;
  name: string;
  fullName: string;
  description: string;
  icon: string; // Emoji
  accentColor: string; // Tailwind hex
  lightColor: string;
  borderColor: string;
  badgeBg: string;
  badgeText: string;
}

export interface AppSettings {
  soundEnabled: boolean;
  skipAnimation: boolean;
  confettiEnabled: boolean;
  spinDurationSeconds: number;
}
