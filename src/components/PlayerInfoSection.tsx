import { useContext } from 'react';
import styled from 'styled-components';

import { AppStateContext } from '../state';
import { actionCreators } from '../actions';
import { GameStatesEnum } from '../constants';
import { sortEntitiesBySpeed } from '../utils';
import Window from './Window';
import Hero from './Hero';

const { startNewRound: startNewRoundAction, setPlayerInterrupt } =
  actionCreators;
const { INIT, EXECUTING, GAME_WON, GAME_LOST } = GameStatesEnum;

const PlayerInfo = styled.section`
  display: flex;
  justify-content: center;
  background-color: #000080;
  flex: 0 1 200px;
`;

const PlayerMenu = styled(Window)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 9%;
  margin: 0 1.1px;
  order: 1;
`;

const PlayerButton = styled.button`
  background-color: red;
  padding: 10px;
`;

const PlayerInfoSection = () => {
  const [state, dispatch] = useContext(AppStateContext);
  const { gameState, queueIndex, groups } = state;

  const startNewRound = () => {
    const newQueue = [
      ...groups.player.entities,
      ...groups.leftEnemies.entities,
      ...groups.rightEnemies.entities,
    ]
      .sort(sortEntitiesBySpeed)
      .map((entity) => entity.queuedActions)
      .reduce((prev, curr) => [...prev, ...curr], []);

    dispatch(startNewRoundAction(newQueue));
  };

  return (
    <PlayerInfo>
      {groups.player.entities.map((hero, index) => (
        <Hero key={hero.name} hero={hero} index={index} />
      ))}

      <PlayerMenu>
        <p>ATTK</p>
        <PlayerButton
          disabled={
            queueIndex !== null ||
            gameState === INIT ||
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
