import { useGameStore } from '@/store/gameStore';
import { Button } from '@/components/ui/button';
import { Eye, MessageCircle } from 'lucide-react';

export default function RoleSelectView() {
  const { roomCode, setRole, setView } = useGameStore();

  const handleGuesser = () => {
    setRole('guesser');
    setView('guesser');
  };

  const handleClueGiver = () => {
    setRole('clue-giver');
    setView('genre-select');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-6">
      <div className="text-center animate-slide-up">
        <p className="text-sm tracking-widest text-muted-foreground uppercase mb-1">Room Code</p>
        <h2 className="font-display text-4xl font-black tracking-[0.4em] text-primary neon-text">
          {roomCode}
        </h2>
      </div>

      <div className="text-center animate-slide-up" style={{ animationDelay: '0.05s' }}>
        <h3 className="font-display text-xl font-bold tracking-wider text-foreground">
          Choose Your Role
        </h3>
      </div>

      <div className="flex w-full max-w-xs flex-col gap-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <Button
          size="lg"
          onClick={handleGuesser}
          className="h-20 flex-col gap-1 font-display text-base tracking-wider neon-box"
        >
          <Eye className="h-6 w-6" />
          I'm the Guesser
          <span className="text-xs font-body opacity-70 tracking-normal font-normal">Phone on Forehead</span>
        </Button>

        <Button
          size="lg"
          variant="outline"
          onClick={handleClueGiver}
          className="h-20 flex-col gap-1 font-display text-base tracking-wider border-accent/50 text-accent hover:bg-accent/10"
        >
          <MessageCircle className="h-6 w-6" />
          I'm the Clue Giver
          <span className="text-xs font-body opacity-70 tracking-normal font-normal">Give hints to the guesser</span>
        </Button>
      </div>
    </div>
  );
}
