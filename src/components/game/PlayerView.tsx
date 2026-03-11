import { useEffect, useState, useCallback } from 'react';
import { useGameStore } from '@/store/gameStore';
import { getRandomCharacter } from '@/data/characters';
import { fetchCharacterImage } from '@/lib/fetchCharacterImage';
import { generateCharacterImage } from '@/lib/openai';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Info, RefreshCw } from 'lucide-react';

type Phase = 'idle' | 'countdown' | 'reveal';

export default function PlayerView() {
  const { genre, roomCode, currentCharacter, shownCharacters, countdownDuration, setCurrentCharacter, addShownCharacter, resetGame, customCharacters } = useGameStore();
  const [phase, setPhase] = useState<Phase>('idle');
  const [count, setCount] = useState(countdownDuration);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const pickCharacter = useCallback(() => {
    if (!genre) return;
    // Use customPool if we are in AI mode (genre matches custom characters)
    const char = getRandomCharacter(genre, shownCharacters, customCharacters);
    setCurrentCharacter(char);
    setShowInfo(false);
    setImageUrl(null);
    if (char) {
      setImageLoading(true);

      // 1. If we already have a hardcoded URL, use it
      if (char.image) {
        setImageUrl(char.image);
        setImageLoading(false);
      }
      // 2. If it's a custom character (from AI stack), generate an image via DALL-E
      else if (customCharacters.some(c => c.name === char.name)) {
        generateCharacterImage(char.name, char.description)
          .then((url) => {
            setImageUrl(url);
            setImageLoading(false);
          })
          .catch(() => {
            // Fallback to standard fetch if DALL-E fails
            fetchCharacterImage(char.name, genre).then((url) => {
              setImageUrl(url);
              setImageLoading(false);
            });
          });
      }
      // 3. Otherwise use standard fetching (Wikipedia/Jikan)
      else {
        fetchCharacterImage(char.name, genre).then((url) => {
          setImageUrl(url);
          setImageLoading(false);
        });
      }
    }
  }, [genre, shownCharacters, setCurrentCharacter, customCharacters]);

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
    <div className="fixed inset-0 flex items-center justify-center bg-background sm:p-4 overflow-hidden">
      {/* Container: Fullscreen on mobile, centered card on desktop */}
      <div className="relative w-full h-full sm:max-w-md sm:h-[85vh] sm:rounded-[2.5rem] sm:aspect-[9/16] bg-background sm:shadow-2xl sm:border border-primary/10 overflow-hidden flex flex-col animate-slide-up">

        {/* Top bar - floating over image */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 pt-4 sm:px-6 sm:pt-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={resetGame}
            className="text-white/40 hover:text-white/100 h-10 w-10 backdrop-blur-md bg-black/30 rounded-full border border-white/10 transition-all active:scale-95"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex flex-col items-center">
            <p className="font-display text-[10px] tracking-[0.3em] text-white/50 uppercase">{roomCode}</p>
            <p className="font-display text-[8px] tracking-widest text-primary/60 uppercase">{genre}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowInfo(!showInfo)}
            className={`h-10 w-10 backdrop-blur-md rounded-full border border-white/10 transition-all active:scale-95 ${showInfo ? 'bg-primary/40 text-white' : 'bg-black/30 text-white/40'
              }`}
          >
            <Info className="h-5 w-5" />
          </Button>
        </div>

        {/* Giant image area */}
        <div className="relative flex-1 w-full overflow-hidden">
          {imageLoading ? (
            <div className="absolute inset-0 bg-secondary/30 animate-pulse flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <span className="text-7xl animate-bounce">🎭</span>
                <p className="font-display text-xs tracking-widest text-primary/40 animate-pulse">FINDING CHARACTER...</p>
              </div>
            </div>
          ) : imageUrl ? (
            <div className="absolute inset-0 w-full h-full">
              <img
                src={imageUrl}
                alt={currentCharacter.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              {/* Artistic overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/40" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/40 via-background to-background flex items-center justify-center">
              <span className="text-[10rem] opacity-20">🎭</span>
            </div>
          )}

          {/* Character Info Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col items-center gap-4">
            <div className="flex flex-col items-center text-center space-y-2">
              <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tighter text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] uppercase leading-[0.9] break-words px-2">
                {currentCharacter.name}
              </h1>
              <div className="h-1 w-12 bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
            </div>

            {/* Description Tooltip */}
            {showInfo && (
              <div className="w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
                <p className="text-sm leading-relaxed text-zinc-200 bg-black/80 backdrop-blur-xl rounded-2xl p-4 border border-white/10 text-center shadow-2xl">
                  {currentCharacter.description}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Control Area */}
        <div className="w-full px-6 py-6 sm:pb-8 shrink-0 bg-gradient-to-t from-background to-transparent">
          <Button
            size="lg"
            onClick={handleNext}
            className="w-full h-16 rounded-2xl font-display text-lg tracking-widest neon-box gap-3 group transition-all"
          >
            <RefreshCw className="h-6 w-6 transition-transform group-active:rotate-180 duration-500" />
            NEXT SOUL
          </Button>
        </div>
      </div>
    </div>
  );
}
