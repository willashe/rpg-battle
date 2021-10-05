import React, { useContext } from 'react';
import { AppStateContext } from '../state';
import { actions } from '../actions';
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

const { startNewGame, gameOver } = actions;

const Battle = () => {
  const [state, dispatch] = useContext(AppStateContext);
  const { heroes, enemies } = state;

  console.log(heroes);
  console.log(enemies);

  return (
    <>
      <BattleContainer>
        <EnemyGroupSection enemies={enemies} />
        <MainBattleSection />
        <PlayerInfoSection heroes={heroes} />
        <button onClick={() => dispatch(startNewGame())}>New Game</button>
        <button onClick={() => dispatch(gameOver())}>Game Over</button>
      </BattleContainer>
    </>
  );
};

export default Battle;
