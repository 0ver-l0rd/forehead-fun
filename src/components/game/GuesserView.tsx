import { useEffect, useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function GuesserView() {
  const { roomCode, resetGame } = useGameStore();
  const [characterName, setCharacterName] = useState<string | null>(null);

  useEffect(() => {
    const channel = supabase
      .channel(`room-${roomCode}`)
      .on('broadcast', { event: 'character' }, (payload) => {
        setCharacterName(payload.payload.name);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomCode]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background p-4">
      {/* Tiny back button */}
      <div className="absolute left-3 top-3">
        <Button variant="ghost" size="icon" onClick={resetGame} className="text-muted-foreground/40 h-8 w-8">
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>

      {characterName ? (
        <div className="animate-slide-up text-center px-4" key={characterName}>
          <h1 className="font-display text-5xl sm:text-7xl font-black tracking-wider text-primary neon-text-strong uppercase leading-tight break-words">
            {characterName}
          </h1>
        </div>
      ) : (
        <div className="text-center">
          <p className="font-display text-lg text-muted-foreground animate-pulse-neon tracking-wider">
            Waiting...
          </p>
          <p className="mt-4 font-display text-sm tracking-[0.3em] text-primary/40">
            Room: {roomCode}
          </p>
          <p className="mt-2 text-xs text-muted-foreground/60">
            Put phone on your forehead
          </p>
        </div>
      )}
    </div>
  );
}
