import { useGameStore } from '@/store/gameStore';
import HomeView from '@/components/game/HomeView';
import GenreSelectView from '@/components/game/GenreSelectView';
import PlayerView from '@/components/game/PlayerView';

const Index = () => {
  const view = useGameStore((s) => s.view);

  switch (view) {
    case 'home':
      return <HomeView />;
    case 'genre-select':
      return <GenreSelectView />;
    case 'player':
      return <PlayerView />;
    default:
      return <HomeView />;
  }
};

export default Index;
