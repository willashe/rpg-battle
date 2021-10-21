import { useContext } from 'react';
import styled from 'styled-components';

import { AppStateContext } from '../state';
import { GameStatesEnum } from '../constants';
import Window from './Window';
import NewGameMenu from './NewGameMenu';

const { INIT, GAME_WON, GAME_LOST } = GameStatesEnum;

const BattleSection = styled.section`
  position: relative;
  flex: 0 1 100%;
`;

const MessageBox = styled(Window)`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 14px;
`;

const MainBattleSection = () => {
  const [state] = useContext(AppStateContext);
  const { gameState, message, enemies, heroes } = state;

  const combinedEnemies = [
    ...(enemies?.left?.entities || []),
    ...(enemies?.right?.entities || []),
  ];

  // TODO
  const active = false;

  return (
    <BattleSection>
      {combinedEnemies.map(({ name, status, hp, speed }, index) => (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: `${index * 20 + 20}%`,
            height: 130,
            width: 100,
            transform: `translateX(-50%)`,
          }}
        >
          <div
            key={name}
            style={{
              height: '100%',
              width: '100%',
              color: 'black',
              background:
                status === 'acting'
                  ? 'green'
                  : status === 'hurt'
                  ? 'red'
                  : status === 'dead'
                  ? 'black'
                  : 'white',
              border: '1px solid black',
              transformOrigin: 'bottom right',
              transform: `rotate(${status === 'dead' ? 90 : 0}deg)`,
              animation:
                status === 'hurt' || status === 'dying'
                  ? 'shake 0.5s'
                  : undefined,
              animationIterationCount:
                status === 'hurt' || status === 'dying'
                  ? 'infinite'
                  : undefined,
              outline: active ? '3px solid blue' : 'none',
            }}
          >
            <div>{name}</div>
            <div>HP: {hp}</div>
            <div>Speed: {speed}</div>
          </div>
        </div>
      ))}

      {heroes.map(({ name, status, hp, speed }, index) => (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: `${index * 20 + 20}%`,
            height: 130,
            width: 100,
            transform: `translateX(-50%)`,
          }}
        >
          <div
            key={name}
            style={{
              height: '100%',
              width: '100%',
              color: 'black',
              background:
                status === 'acting'
                  ? 'green'
                  : status === 'hurt'
                  ? 'red'
                  : status === 'dead'
                  ? 'black'
                  : 'white',
              border: '1px solid black',
              transformOrigin: 'bottom right',
              transform: `rotate(${status === 'dead' ? 90 : 0}deg)`,
              animation:
                status === 'hurt' || status === 'dying'
                  ? 'shake 0.5s'
                  : undefined,
              animationIterationCount:
                status === 'hurt' || status === 'dying'
                  ? 'infinite'
                  : undefined,
              outline: active ? '3px solid blue' : 'none',
            }}
          >
            <div>{name}</div>
            <div>HP: {hp}</div>
            <div>Speed: {speed}</div>
          </div>
        </div>
      ))}

      {Boolean(message) && <MessageBox>{message}</MessageBox>}

      {(gameState === INIT ||
        gameState === GAME_WON ||
        gameState === GAME_LOST) && <NewGameMenu />}
    </BattleSection>
  );
};

export default MainBattleSection;
