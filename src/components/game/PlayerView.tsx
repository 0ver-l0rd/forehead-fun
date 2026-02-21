import { useEffect, useState, useCallback } from 'react';
import { useGameStore } from '@/store/gameStore';
import { getRandomCharacter } from '@/data/characters';
import { fetchCharacterImage } from '@/lib/fetchCharacterImage';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Info, RefreshCw } from 'lucide-react';

type Phase = 'idle' | 'countdown' | 'reveal';

export default function PlayerView() {
  const { genre, roomCode, currentCharacter, shownCharacters, countdownDuration, setCurrentCharacter, addShownCharacter, resetGame } = useGameStore();
  const [phase, setPhase] = useState<Phase>('idle');
  const [count, setCount] = useState(countdownDuration);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const pickCharacter = useCallback(() => {
    if (!genre) return;
    const char = getRandomCharacter(genre, shownCharacters);
    setCurrentCharacter(char);
    setShowInfo(false);
    setImageUrl(null);
    if (char) {
      setImageLoading(true);
      fetchCharacterImage(char.name).then((url) => {
        setImageUrl(url);
        setImageLoading(false);
      });
    }
  }, [genre, shownCharacters, setCurrentCharacter]);

  // Start countdown
  const startCountdown = () => {
    pickCharacter();
    setPhase('countdown');
    setCount(countdownDuration);
  };

  // Countdown tick
  useEffect(() => {
    if (phase !== 'countdown') return;
    if (count <= 0) {
      setPhase('reveal');
      if (currentCharacter) addShownCharacter(currentCharacter.name);
      return;
    }
    const timer = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [phase, count, currentCharacter, addShownCharacter]);

  const handleNext = () => {
    setPhase('idle');
    setCurrentCharacter(null);
  };

  // IDLE - tap to start
  if (phase === 'idle') {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-background p-6">
        <div className="absolute left-3 top-3">
          <Button variant="ghost" size="icon" onClick={resetGame} className="text-muted-foreground/40 h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-center animate-slide-up">
          <p className="font-display text-xs tracking-[0.3em] text-primary/60 mb-2">{roomCode}</p>
          <p className="font-display text-sm tracking-widest text-muted-foreground uppercase mb-1">{genre}</p>
          <p className="text-xs text-muted-foreground/60 mb-8">Put your phone on your forehead</p>

          <Button
            size="lg"
            onClick={startCountdown}
            className="h-20 w-48 font-display text-xl tracking-wider neon-box"
          >
            TAP TO START
          </Button>

          <p className="mt-6 text-xs text-muted-foreground/40">
            Countdown: {countdownDuration}s
          </p>
        </div>
      </div>
    );
  }

  // COUNTDOWN
  if (phase === 'countdown') {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-background">
        <div className="animate-pulse-neon text-center">
          <p className="font-display text-[10rem] font-black text-primary neon-text-strong leading-none">
            {count}
          </p>
          <p className="mt-4 font-display text-sm tracking-widest text-muted-foreground uppercase">
            Get ready...
          </p>
        </div>
      </div>
    );
  }

  // REVEAL - character on forehead
  if (!currentCharacter) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-background p-6">
        <p className="font-display text-lg text-muted-foreground">No more characters!</p>
        <Button variant="outline" onClick={resetGame} className="mt-4 border-primary/30 text-primary">
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-between bg-background p-4">
      {/* Top bar - tiny, minimal */}
      <div className="flex w-full items-center justify-between pt-1">
        <Button variant="ghost" size="icon" onClick={resetGame} className="text-muted-foreground/30 h-7 w-7">
          <ArrowLeft className="h-3 w-3" />
        </Button>
        <p className="font-display text-[10px] tracking-[0.3em] text-primary/30">{roomCode}</p>
        <div className="w-7" />
      </div>

      {/* Character display - designed for forehead viewing */}
      <div className="flex flex-1 flex-col items-center justify-center gap-4 animate-slide-up w-full max-w-sm">
        {/* Image */}
        {imageLoading ? (
          <div className="h-36 w-36 rounded-xl bg-secondary/50 animate-pulse" />
        ) : imageUrl ? (
          <img
            src={imageUrl}
            alt={currentCharacter.name}
            className="h-36 w-36 rounded-xl object-cover border-2 border-primary/30 neon-box"
          />
        ) : (
          <div className="h-36 w-36 rounded-xl bg-secondary/30 flex items-center justify-center border border-border/30">
            <span className="text-4xl">🎭</span>
          </div>
        )}

        {/* Name - BIG for forehead */}
        <h1 className="font-display text-4xl sm:text-6xl font-black tracking-wider text-primary neon-text-strong uppercase text-center leading-tight break-words px-2">
          {currentCharacter.name}
        </h1>

        {/* Info toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowInfo(!showInfo)}
          className="gap-2 text-muted-foreground/50 hover:text-muted-foreground text-xs"
        >
          <Info className="h-3 w-3" />
          {showInfo ? 'Hide' : 'Who?'}
        </Button>
        {showInfo && (
          <p className="text-sm leading-relaxed text-muted-foreground bg-secondary/50 rounded-lg p-3 animate-slide-up text-center">
            {currentCharacter.description}
          </p>
        )}
      </div>

      {/* Next button */}
      <div className="w-full max-w-sm pb-4">
        <Button
          size="lg"
          onClick={handleNext}
          className="w-full h-14 font-display text-base tracking-wider neon-box gap-2"
        >
          <RefreshCw className="h-5 w-5" />
          Next Character
        </Button>
      </div>
    </div>
  );
}
