import { useGameStore } from '@/store/gameStore';
import { GENRES, GENRE_EMOJIS, Genre } from '@/data/characters';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { generateCharacterStack } from '@/lib/openai';

export default function GenreSelectView() {
  const { roomCode, setGenre, setView, resetGame, setCustomCharacters, setIsGenerating, isGenerating } = useGameStore();
  const [prompt, setPrompt] = useState('');

  const handleSelect = (genre: Genre) => {
    setGenre(genre);
    setView('player');
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      const chars = await generateCharacterStack(prompt);
      setCustomCharacters(chars);
      setGenre(prompt); // Set genre to the prompt name
      setView('player');
    } catch (error) {
      console.error("AI Generation failed:", error);
      alert("Failed to generate AI stack. Please check your API key.");
    } finally {
      setIsGenerating(false);
    }
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
        <div className="flex flex-col gap-2 mb-4 p-4 rounded-2xl bg-primary/5 border border-primary/20 shadow-inner">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-xs font-display tracking-widest text-primary/80 uppercase">AI Power Pack</span>
          </div>
          <input
            type="text"
            placeholder="e.g. 90s Cartoon Villains"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating}
            className="w-full bg-background border border-primary/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/30"
          />
          <Button
            size="lg"
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="w-full mt-2 h-12 rounded-xl font-display text-xs tracking-widest neon-box gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                SUMMONING SOULS...
              </>
            ) : (
              'GENERATE DYNAMIC STACK'
            )}
          </Button>
        </div>

        <div className="flex items-center gap-4 my-2">
          <div className="h-px flex-1 bg-border/40" />
          <span className="text-[10px] font-display text-muted-foreground/40 tracking-widest uppercase">Or Classic</span>
          <div className="h-px flex-1 bg-border/40" />
        </div>

        {GENRES.map((genre) => (
          <Button
            key={genre}
            size="lg"
            variant="outline"
            onClick={() => handleSelect(genre)}
            disabled={isGenerating}
            className="h-16 justify-start gap-3 border-border/60 text-left font-body text-base hover:border-primary/50 hover:bg-primary/5 transition-all rounded-2xl group"
          >
            <span className="text-2xl transition-transform group-hover:scale-110 duration-300">{GENRE_EMOJIS[genre]}</span>
            <span className="tracking-wide">{genre}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
