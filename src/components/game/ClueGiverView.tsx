import { useState, useEffect, useCallback } from 'react';
import { useGameStore } from '@/store/gameStore';
import { getRandomCharacter } from '@/data/characters';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Send, SkipForward, Info, ArrowLeft } from 'lucide-react';

export default function ClueGiverView() {
  const { roomCode, genre, currentCharacter, shownCharacters, setCurrentCharacter, addShownCharacter, setView, resetGame } = useGameStore();
  const [showInfo, setShowInfo] = useState(false);
  const [sent, setSent] = useState(false);

  const generateNext = useCallback(() => {
    if (!genre) return;
    const char = getRandomCharacter(genre, shownCharacters);
    setCurrentCharacter(char);
    setShowInfo(false);
    setSent(false);
  }, [genre, shownCharacters, setCurrentCharacter]);

  useEffect(() => {
    if (!currentCharacter) generateNext();
  }, [currentCharacter, generateNext]);

  const handleSend = async () => {
    if (!currentCharacter) return;
    const channel = supabase.channel(`room-${roomCode}`);
    await channel.send({
      type: 'broadcast',
      event: 'character',
      payload: { name: currentCharacter.name },
    });
    supabase.removeChannel(channel);
    setSent(true);
    addShownCharacter(currentCharacter.name);
  };

  const handleSkip = () => {
    if (currentCharacter) addShownCharacter(currentCharacter.name);
    generateNext();
  };

  if (!currentCharacter) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6">
        <p className="font-display text-lg text-muted-foreground">No more characters!</p>
        <Button variant="outline" onClick={resetGame} className="border-primary/30 text-primary">
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between px-6 py-8">
      {/* Header */}
      <div className="flex w-full max-w-sm items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => { resetGame(); }} className="text-muted-foreground">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="text-center">
          <p className="text-xs tracking-widest text-muted-foreground uppercase">{genre}</p>
          <p className="font-display text-xs tracking-[0.3em] text-primary/60">{roomCode}</p>
        </div>
        <div className="w-10" />
      </div>

      {/* Character */}
      <div className="flex flex-col items-center gap-6 text-center animate-slide-up w-full max-w-sm">
        <h1 className="font-display text-3xl font-black tracking-wider text-foreground leading-tight">
          {currentCharacter.name}
        </h1>

        {/* Info toggle */}
        <div className="w-full">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowInfo(!showInfo)}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <Info className="h-4 w-4" />
            {showInfo ? 'Hide Info' : 'Who is this?'}
          </Button>
          {showInfo && (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground bg-secondary/50 rounded-lg p-3 animate-slide-up">
              {currentCharacter.description}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex w-full max-w-sm flex-col gap-3">
        <Button
          size="lg"
          onClick={handleSend}
          disabled={sent}
          className="h-14 font-display text-base tracking-wider neon-box gap-2"
        >
          <Send className="h-5 w-5" />
          {sent ? 'Sent!' : 'Send to Guesser'}
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={handleSkip}
          className="h-12 font-body tracking-wide border-border/60 text-muted-foreground hover:text-foreground gap-2"
        >
          <SkipForward className="h-4 w-4" />
          Skip / Next
        </Button>
      </div>
    </div>
  );
}
