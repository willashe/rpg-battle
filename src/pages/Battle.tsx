import React, { useContext } from 'react';
import { AppStateContext } from '../state';
import { actions } from '../actions';
import styled from 'styled-components';
import EnemyGroupSection from '../components/EnemyGroupSection';
import MainBattleSection from '../components/MainBattleSection';
import PlayerInfoSection from '../components/PlayerInfoSection';

const BattleButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  border-radius: 10px;
  width: 96px;
  height: 36px;
  margin: 0 auto;
`;

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

  return (
    <>
      <BattleContainer>
        <EnemyGroupSection enemies={enemies} />
        <MainBattleSection />
        <PlayerInfoSection heroes={heroes} />
        <BattleButton onClick={() => dispatch(startNewGame())}>
          New Game
        </BattleButton>
        <BattleButton onClick={() => dispatch(gameOver())}>
          Game Over
        </BattleButton>
      </BattleContainer>
    </>
  );
};

export default Battle;
