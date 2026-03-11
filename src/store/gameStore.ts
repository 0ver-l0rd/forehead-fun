import { create } from 'zustand';
import { Genre, Character } from '@/data/characters';

export type GameView = 'home' | 'genre-select' | 'player';

interface GameState {
  view: GameView;
  roomCode: string;
  genre: Genre | null;
  currentCharacter: Character | null;
  shownCharacters: string[];
  countdownDuration: number;
  showSettings: boolean;
  customCharacters: Character[]; // AI Generated Stack
  isGenerating: boolean;

  setView: (view: GameView) => void;
  setRoomCode: (code: string) => void;
  setGenre: (genre: Genre) => void;
  setCurrentCharacter: (char: Character | null) => void;
  addShownCharacter: (name: string) => void;
  setCountdownDuration: (seconds: number) => void;
  setShowSettings: (show: boolean) => void;
  setCustomCharacters: (chars: Character[]) => void;
  setIsGenerating: (is: boolean) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  view: 'home',
  roomCode: '',
  genre: null,
  currentCharacter: null,
  shownCharacters: [],
  countdownDuration: 3,
  showSettings: false,
  customCharacters: [],
  isGenerating: false,

  setView: (view) => set({ view }),
  setRoomCode: (roomCode) => set({ roomCode }),
  setGenre: (genre) => set({ genre }),
  setCurrentCharacter: (currentCharacter) => set({ currentCharacter }),
  addShownCharacter: (name) => set((s) => ({ shownCharacters: [...s.shownCharacters, name] })),
  setCountdownDuration: (countdownDuration) => set({ countdownDuration }),
  setShowSettings: (showSettings) => set({ showSettings }),
  setCustomCharacters: (customCharacters) => set({ customCharacters }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  resetGame: () => set({ view: 'home', roomCode: '', genre: null, currentCharacter: null, shownCharacters: [], customCharacters: [], isGenerating: false }),
}));

export function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}
