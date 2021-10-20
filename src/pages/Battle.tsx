import { useContext } from 'react';
import styled from 'styled-components';
import { AppStateContext } from '../state';
import EnemyGroupSection from '../components/EnemyGroupSection';
import MainBattleSection from '../components/MainBattleSection';
import PlayerInfoSection from '../components/PlayerInfoSection';

const BattleContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  top: 0;
  align-items: stretch;
`;

const Battle = () => {
  const [state] = useContext(AppStateContext);
  const { heroes, enemies } = state;

  return (
    <>
      <BattleContainer>
        <EnemyGroupSection enemies={enemies} />
        <MainBattleSection />
        <PlayerInfoSection heroes={heroes} />
      </BattleContainer>
    </>
  );
};

export default Battle;
