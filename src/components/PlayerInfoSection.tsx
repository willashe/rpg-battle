import { useContext } from 'react';
import styled from 'styled-components';

import { AppStateContext } from '../state';
import { actionCreators } from '../actions';
import { GameStatesEnum } from '../constants';
import { sortEntitiesBySpeed } from '../utils';
import Hero from './Hero';

const { startNewRound: startNewRoundAction, setPlayerInterrupt } =
  actionCreators;
const { EXECUTING, GAME_WON, GAME_LOST } = GameStatesEnum;

const PlayerInfo = styled.section`
  display: flex;
  justify-content: center;
  background-color: midnightblue;
  flex: 0 1 200px;
`;

const PlayerMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.4rem;
  padding: 0 70px;
  margin: 0 1.1px;
  border: 10px solid #e5e4e2;
  order: 1;
`;

const PlayerButton = styled.button`
  background-color: red;
  padding: 10px;
`;

const PlayerInfoSection = () => {
  const [state, dispatch] = useContext(AppStateContext);
  const { gameState, queueIndex, heroes, enemies } = state;

  const startNewRound = () => {
    const newQueue = [
      ...heroes,
      ...enemies.left.entities,
      ...enemies.right.entities,
    ]
      .sort(sortEntitiesBySpeed)
      .map((entity) => entity.queuedActions)
      .reduce((prev, curr) => [...prev, ...curr], []);

    dispatch(startNewRoundAction(newQueue));
  };

  return (
    <PlayerInfo>
      {heroes.map((hero, index) => (
        <Hero hero={hero} index={index} />
      ))}

      <PlayerMenu>
        <p>ATTK</p>
        <PlayerButton
          disabled={
            queueIndex !== null ||
            gameState === GAME_WON ||
            gameState === GAME_LOST
          }
          onClick={startNewRound}
        ></PlayerButton>
        <p>ORDR</p>
        <PlayerButton
          disabled={queueIndex === null || gameState !== EXECUTING}
          onClick={() => {
            dispatch(setPlayerInterrupt(true));
          }}
        ></PlayerButton>
      </PlayerMenu>
    </PlayerInfo>
  );
};

export default PlayerInfoSection;
