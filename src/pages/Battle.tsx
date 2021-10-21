import styled from 'styled-components';

import EnemyGroupSection from '../components/EnemyGroupSection';
import MainBattleSection from '../components/MainBattleSection';
import PlayerInfoSection from '../components/PlayerInfoSection';

const BattleContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  top: 0;
  align-items: stretch;
  background: #000080;
`;

const Battle = () => (
  <>
    <BattleContainer>
      <EnemyGroupSection />
      <MainBattleSection />
      <PlayerInfoSection />
    </BattleContainer>
  </>
);

export default Battle;
