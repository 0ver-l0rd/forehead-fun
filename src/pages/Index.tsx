import { useGameStore } from '@/store/gameStore';
import HomeView from '@/components/game/HomeView';
import RoleSelectView from '@/components/game/RoleSelectView';
import GenreSelectView from '@/components/game/GenreSelectView';
import ClueGiverView from '@/components/game/ClueGiverView';
import GuesserView from '@/components/game/GuesserView';

const Index = () => {
  const view = useGameStore((s) => s.view);

  switch (view) {
    case 'home':
      return <HomeView />;
    case 'role-select':
      return <RoleSelectView />;
    case 'genre-select':
      return <GenreSelectView />;
    case 'clue-giver':
      return <ClueGiverView />;
    case 'guesser':
      return <GuesserView />;
    default:
      return <HomeView />;
  }
};

export default Index;
