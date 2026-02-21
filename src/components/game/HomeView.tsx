import { useState } from 'react';
import { useGameStore, generateRoomCode } from '@/store/gameStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function HomeView() {
  const { setView, setRoomCode } = useGameStore();
  const [joinCode, setJoinCode] = useState('');
  const [mode, setMode] = useState<'idle' | 'join'>('idle');

  const handleCreate = () => {
    const code = generateRoomCode();
    setRoomCode(code);
    setView('role-select');
  };

  const handleJoin = () => {
    if (joinCode.length === 4) {
      setRoomCode(joinCode.toUpperCase());
      setView('role-select');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-6">
      <div className="animate-slide-up text-center">
        <h1 className="font-display text-5xl font-black tracking-wider text-primary neon-text-strong">
          HEADS UP
        </h1>
        <p className="mt-2 text-sm tracking-widest text-muted-foreground uppercase">
          The Party Game
        </p>
      </div>

      <div className="flex w-full max-w-xs flex-col gap-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <Button
          size="lg"
          onClick={handleCreate}
          className="h-14 font-display text-lg tracking-wider neon-box"
        >
          Create Room
        </Button>

        {mode === 'idle' ? (
          <Button
            size="lg"
            variant="outline"
            onClick={() => setMode('join')}
            className="h-14 font-display text-lg tracking-wider border-primary/30 text-primary hover:bg-primary/10"
          >
            Join Room
          </Button>
        ) : (
          <div className="flex gap-2">
            <Input
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase().slice(0, 4))}
              placeholder="CODE"
              maxLength={4}
              className="h-14 text-center font-display text-2xl tracking-[0.5em] uppercase bg-secondary border-primary/30 text-foreground placeholder:text-muted-foreground"
              autoFocus
            />
            <Button
              size="lg"
              onClick={handleJoin}
              disabled={joinCode.length !== 4}
              className="h-14 px-6 font-display neon-box"
            >
              GO
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
