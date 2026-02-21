import { create } from 'zustand';
import { Genre, Character } from '@/data/characters';

export type GameView = 'home' | 'role-select' | 'genre-select' | 'clue-giver' | 'guesser';
export type Role = 'guesser' | 'clue-giver';

interface GameState {
  view: GameView;
  roomCode: string;
  role: Role | null;
  genre: Genre | null;
  currentCharacter: Character | null;
  shownCharacters: string[];

  setView: (view: GameView) => void;
  setRoomCode: (code: string) => void;
  setRole: (role: Role) => void;
  setGenre: (genre: Genre) => void;
  setCurrentCharacter: (char: Character | null) => void;
  addShownCharacter: (name: string) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  view: 'home',
  roomCode: '',
  role: null,
  genre: null,
  currentCharacter: null,
  shownCharacters: [],

  setView: (view) => set({ view }),
  setRoomCode: (roomCode) => set({ roomCode }),
  setRole: (role) => set({ role }),
  setGenre: (genre) => set({ genre }),
  setCurrentCharacter: (currentCharacter) => set({ currentCharacter }),
  addShownCharacter: (name) => set((s) => ({ shownCharacters: [...s.shownCharacters, name] })),
  resetGame: () => set({ view: 'home', roomCode: '', role: null, genre: null, currentCharacter: null, shownCharacters: [] }),
}));

export function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}
