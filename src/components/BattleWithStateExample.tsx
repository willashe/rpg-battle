import { useContext, useEffect } from 'react';

import { AppStateContext } from '../state';
import { actionsCreators } from '../actions';
import { EntityType } from '../types';
import { EntityTypesEnum } from '../constants';
import Hero from './Hero';
import Enemy from './Enemy';
const { MONSTER, ROBOT } = EntityTypesEnum;

const { startNewGame, attackThunk, deathThunk, setActiveHero, queueAction } =
  actionsCreators;

const Battle = () => {
  const [state, dispatch] = useContext(AppStateContext);
  const { message, heroes, enemies, activeHero, targetType, queue } = state;

  useEffect(() => {
    enemies.left.forEach(({ status, hp }, i) => {
      if (status !== 'dying' && status !== 'dead' && hp <= 0) {
        dispatch(deathThunk('left', i));
      }
    });
    enemies.right.forEach(({ status, hp }, i) => {
      if (status !== 'dying' && status !== 'dead' && hp <= 0) {
        dispatch(deathThunk('right', i));
      }
    });
  }, [enemies, dispatch]);

  console.log(queue);

  return (
    <>
      <h1>Battle!</h1>

      <button onClick={() => dispatch(startNewGame())}>New Game</button>
      <br />

      <h3>{message}</h3>

      <div style={{ display: 'flex' }}>
        {Boolean(heroes.length) && (
          <>
            {heroes.map((data: EntityType, index) => (
              <Hero
                key={index}
                index={index}
                active={activeHero === index}
                handleClick={() => dispatch(setActiveHero(index))}
                {...data}
              />
            ))}
          </>
        )}
      </div>

      {!!activeHero && !targetType && (
        <>
          <button
            onClick={() =>
              dispatch(
                queueAction({
                  heroIndex: activeHero,
                  target: MONSTER,
                  action: attackThunk(
                    'left',
                    enemies.left.findIndex(({ hp }) => hp >= 0)
                  ),
                })
              )
            }
          >
            Left
          </button>
          <button
            onClick={() =>
              dispatch(
                queueAction({
                  heroIndex: activeHero,
                  target: ROBOT,
                  action: attackThunk(
                    'right',
                    enemies.right.findIndex(({ hp }) => hp >= 0)
                  ),
                })
              )
            }
          >
            Right
          </button>
        </>
      )}

      {Boolean(queue.length) && (
        <button onClick={() => dispatch(queue[0].action)}>Execute!</button>
      )}

      <div style={{ display: 'flex' }}>
        {Boolean(enemies.left.length) && (
          <>
            {enemies.left.map((data: EntityType, index) => (
              <Enemy
                key={index}
                index={index}
                handleClick={() => dispatch(attackThunk('left', index))}
                {...data}
              />
            ))}
          </>
        )}
        {Boolean(enemies.right.length) && (
          <>
            {enemies.right.map((data: EntityType, index) => (
              <Enemy
                key={index}
                index={index}
                handleClick={() => dispatch(attackThunk('right', index))}
                {...data}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Battle;
