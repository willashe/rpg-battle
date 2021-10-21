import { useContext } from 'react';
import { AppStateContext } from '../state';
// import { actionCreators } from '../actions';
import styled from 'styled-components';
import EnemyGroupSection from '../components/EnemyGroupSection';
import MainBattleSection from '../components/MainBattleSection';
import PlayerInfoSection from '../components/PlayerInfoSection';

// const BattleButton = styled.button`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 1.1rem;
//   border: 1px solid;
//   border-radius: 8px;
//   margin: 0 auto;
// `;

const BattleContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  top: 0;
  align-items: stretch;
  background: #000080;
`;

// const { startNewGame, gameOver } = actionCreators;

const Battle = () => {
  const [state] = useContext(AppStateContext);
  const { heroes, enemies } = state;

  return (
    <>
      <BattleContainer>
        <EnemyGroupSection enemies={enemies} />
        <MainBattleSection />
        <PlayerInfoSection heroes={heroes} />
        {/* <button onClick={() => dispatch(startNewGame())}>New Game</button>
        <button onClick={() => dispatch(gameOver())}>Game Over</button> */}
      </BattleContainer>
    </>
  );
};

export default Battle;
