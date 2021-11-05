import { useContext } from 'react';
import styled from 'styled-components';

import { AppStateContext } from '../state';
import { GameStatesEnum } from '../constants';
import Window from './Window';
import NewGameMenu from './NewGameMenu';

const multiplier = 3;

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
  const { gameState, groups } = state;

  const combinedEnemies = [
    ...groups.leftEnemies.entities,
    ...groups.rightEnemies.entities,
  ];

  // TODO
  const active = false;

  return (
    <BattleSection>
      {combinedEnemies.map(({ name, status, hp, speed }, index) => (
        <div
          key={name}
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
                status === 'attacking'
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

      {groups.player.entities.map(({ name, status, position }, index) => {
        return (
          <div
            key={name}
            style={{
              position: 'absolute',
              top: position?.top,
              bottom: `${position?.bottom || 0}px`,
              // TODO: wtf...?
              // left: `${position?.left || index * 20 + 20}%`,
              left: position?.left || `${index * 20 + 20}%`,
              right: position?.right,
              height: 64 * multiplier,
              width: 32 * multiplier,
              transform: `translateX(-50%)`,
            }}
          >
            <div
              key={name}
              style={{
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
                backgroundImage: 'url("./assets/nei.png"',
                backgroundSize: `auto ${64 * multiplier}px`,
                backgroundPosition: `${
                  -32 *
                  multiplier *
                  (status === 'staged' || status === 'dead'
                    ? 0
                    : status === 'using'
                    ? 2
                    : status === 'attacking'
                    ? 5
                    : 1)
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
