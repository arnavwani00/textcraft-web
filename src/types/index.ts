export type SituationId = 
  | 'flirting' 
  | 'argument' 
  | 'professional' 
  | 'dry-texter' 
  | 'apology' 
  | 'friendship-drama';

export type VibeId = 
  | 'casual' 
  | 'funny' 
  | 'cold' 
  | 'flirty' 
  | 'direct' 
  | 'polite'
  | 'savage'
  | 'dry';

export type ReplyLength = 'short' | 'medium' | 'detailed';

export interface Situation {
  id: SituationId;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  badge: string;
  placeholderText: string;
  defaultContext: string;
  exampleIncoming: string;
}

export interface Vibe {
  id: VibeId;
  name: string;
  tagline: string;
  description: string;
  emoji: string;
  colorClass: string;
}

export interface GeneratedReply {
  id: string;
  situationId: SituationId;
  vibeId: VibeId;
  text: string;
  explanation: string;
  toneScore: number; // 0 (soft) to 100 (direct)
  lengthType: ReplyLength;
  isCustomEdited?: boolean;
}

export interface StoredReply {
  id: string;
  originalMessage: string;
  situationId: SituationId;
  vibeId: VibeId;
  text: string;
  explanation: string;
  timestamp: number;
}

export interface GenerateRequestPayload {
  message: string;
  situation: SituationId;
  vibe: VibeId;
  toneIntensity: number; // 0 (soft) to 100 (direct)
  length: ReplyLength;
  context?: string;
}
