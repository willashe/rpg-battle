import { useContext } from 'react';
import styled from 'styled-components';

import { AppStateContext } from '../state';
import { GameStatesEnum } from '../constants';
import Window from './Window';
import NewGameMenu from './NewGameMenu';

const multiplier = 3;

const { INIT, PLAYER_INPUT, GAME_WON, GAME_LOST } = GameStatesEnum;

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
  const { gameState, groups } = state;

  const combinedEnemies = [
    ...groups.leftEnemies.entities,
    ...groups.rightEnemies.entities,
  ];

  return (
    <BattleSection>
      {combinedEnemies.map(({ name, type, status, hp, speed }, index) => (
        <div
          key={name}
          style={{
            position: 'absolute',
            top: 0,
            left: `${(index + 1) * (100 / (combinedEnemies.length + 1))}%`,
            height: 64 * multiplier,
            width: 64 * multiplier,
            transform: `translateX(-50%)`,
          }}
        >
          <div
            key={name}
            style={{
              visibility: status === 'dead' ? 'hidden' : undefined,
              height: '100%',
              width: '100%',
              color: 'black',
              transformOrigin: 'bottom right',
              animation:
                status === 'hurt' || status === 'dying'
                  ? 'shake 0.5s'
                  : undefined,
              animationIterationCount:
                status === 'hurt' || status === 'dying'
                  ? 'infinite'
                  : undefined,
              background: `url("./assets/${
                type ? String(type).toLowerCase() : 'froggy'
              }.png"`,
              backgroundSize: `auto ${64 * multiplier}px`,
              backgroundPosition: `${
                -64 *
                multiplier *
                (status === 'using'
                  ? 0
                  : status === 'shooting'
                  ? 0
                  : status === 'attacking'
                  ? 0
                  : 0)
              }px`,
              backgroundColor:
                status === 'attacking'
                  ? 'green'
                  : status === 'hurt'
                  ? 'red'
                  : 'transparent',
            }}
          ></div>
        </div>
      ))}

      {groups.player.entities.map(({ name, status, position }, index) => {
        const defaultXPosition = `${
          index === 0 ? 40 : index === 1 ? 60 : index === 2 ? 20 : 80
        }%`;

        return (
          <div
            key={name}
            style={{
              position: 'absolute',
              top: position?.top,
              bottom: `${position?.bottom || 0}px`,
              left: position?.left || defaultXPosition,
              right: position?.right,
              height: 64 * multiplier,
              width: 64 * multiplier,
              transform: `translateX(-50%)`,
            }}
          >
            <div
              key={name}
              style={{
                visibility:
                  status === 'dead' ||
                  (gameState !== PLAYER_INPUT && status === 'idle')
                    ? 'hidden'
                    : undefined,
                height: '100%',
                width: '100%',
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
                backgroundImage: `url("./assets/${
                  index === 0
                    ? 'rolf'
                    : index === 1
                    ? 'rudo'
                    : index === 2
                    ? 'nei'
                    : 'amy'
                }.png"`,
                backgroundSize: `auto ${64 * multiplier}px`,
                backgroundPosition: `${
                  -64 *
                  multiplier *
                  (status === 'using'
                    ? 1
                    : status === 'shooting'
                    ? 2
                    : status === 'attacking'
                    ? 3
                    : 0)
                }px`,
              }}
            ></div>
          </div>
        );
      })}

      {Boolean(groups.player.message) && (
        <MessageBox>{groups.player.message}</MessageBox>
      )}

      {(gameState === INIT ||
        gameState === GAME_WON ||
        gameState === GAME_LOST) && <NewGameMenu />}
    </BattleSection>
  );
};

export default MainBattleSection;
