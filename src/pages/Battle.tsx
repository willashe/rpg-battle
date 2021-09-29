import React from 'react';
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
`;

const Battle = () => (
  <BattleContainer>
    <EnemyGroupSection />
    <MainBattleSection />
    <PlayerInfoSection
      firstHeroName="ROLF"
      secondHeroName="NEI"
      thirdHeroName="ODIN"
      fourthHeroName="ANNA"
    />
  </BattleContainer>
);

export default Battle;
