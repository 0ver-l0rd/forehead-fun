import { useGameStore } from '@/store/gameStore';
import { GENRES, GENRE_EMOJIS, Genre } from '@/data/characters';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function GenreSelectView() {
  const { roomCode, setGenre, setView, resetGame } = useGameStore();

  const handleSelect = (genre: Genre) => {
    setGenre(genre);
    setView('player');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-6">
      <div className="absolute left-3 top-3">
        <Button variant="ghost" size="icon" onClick={resetGame} className="text-muted-foreground/40 h-8 w-8">
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-center animate-slide-up">
        <p className="font-display text-xs tracking-[0.3em] text-primary/60 mb-2">{roomCode}</p>
        <h3 className="font-display text-xl font-bold tracking-wider text-foreground">
          Pick a Category
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">Everyone puts phone on forehead</p>
      </div>

      <div className="grid w-full max-w-xs grid-cols-1 gap-3 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        {GENRES.map((genre) => (
          <Button
            key={genre}
            size="lg"
            variant="outline"
            onClick={() => handleSelect(genre)}
            className="h-16 justify-start gap-3 border-border/60 text-left font-body text-base hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            <span className="text-2xl">{GENRE_EMOJIS[genre]}</span>
            <span className="tracking-wide">{genre}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
