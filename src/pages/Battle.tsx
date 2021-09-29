import React from 'react';
import MonsterInfoSection from '../components/MonsterInfoSection';
import MainBattleSection from '../components/MainBattleSection';
import PlayerInfoMenu from '../components/PlayerInfoMenu';
import styled from 'styled-components';

const BattleContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  top: 0;
  align-items: stretch;
`;

const Battle = () => (
  <BattleContainer>
    <MonsterInfoSection />
    <MainBattleSection />
    <PlayerInfoMenu
      firstPlayerName="ROLF"
      secondPlayerName="NEI"
      thirdPlayerName="ODIN"
      fourthPlayerName="ANNA"
      hp={20}
      tp={5}
    />
  </BattleContainer>
);

export default Battle;
