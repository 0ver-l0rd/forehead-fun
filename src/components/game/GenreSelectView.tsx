import { useGameStore } from '@/store/gameStore';
import { GENRES, GENRE_EMOJIS, Genre } from '@/data/characters';
import { Button } from '@/components/ui/button';

export default function GenreSelectView() {
  const { setGenre, setView } = useGameStore();

  const handleSelect = (genre: Genre) => {
    setGenre(genre);
    setView('clue-giver');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-6">
      <div className="text-center animate-slide-up">
        <h3 className="font-display text-xl font-bold tracking-wider text-foreground">
          Pick a Category
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">Choose wisely, clue giver</p>
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
