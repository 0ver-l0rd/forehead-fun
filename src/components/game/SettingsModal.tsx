import { useGameStore } from '@/store/gameStore';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';

export default function SettingsModal() {
  const { showSettings, setShowSettings, countdownDuration, setCountdownDuration } = useGameStore();

  return (
    <Dialog open={showSettings} onOpenChange={setShowSettings}>
      <DialogContent className="max-w-xs bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display tracking-wider text-foreground">Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <label className="text-sm text-muted-foreground mb-3 block">
              Countdown Timer: <span className="text-primary font-display font-bold">{countdownDuration}s</span>
            </label>
            <Slider
              value={[countdownDuration]}
              onValueChange={([v]) => setCountdownDuration(v)}
              min={1}
              max={10}
              step={1}
            />
            <div className="flex justify-between mt-1 text-[10px] text-muted-foreground/40">
              <span>1s</span>
              <span>10s</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
