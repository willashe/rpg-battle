import { useContext, useRef, useEffect, useState } from 'react';

import { AppStateContext } from '../state';
import { actionCreators } from '../actions';
import { EntityType } from '../types';
import { EntityTypesEnum, GameStatesEnum } from '../constants';
import { generateHeroes, generateEnemies, sortEntitiesBySpeed } from '../utils';
import Window from './Window';
import Hero from './Hero';
import Enemy from './Enemy';
const { HERO, MONSTER, ROBOT } = EntityTypesEnum;
const {
  INIT,
  NEW_GAME,
  PLAYER_INPUT,
  EXECUTING,
  POST_EXECUTION,
  GAME_WON,
  GAME_LOST,
} = GameStatesEnum;

const {
  startNewGame: startNewGameAction,
  startNewRound: startNewRoundAction,
  attackThunk,
  setActiveHero,
  queueAction,
  setQueueIndex,
  incrementQueueIndex,
  deathCycleThunk,
  gameWon,
  gameLost,
  setGameState,
  setPlayerInterrupt,
} = actionCreators;

const Battle = () => {
  const [state, dispatch] = useContext(AppStateContext);
  const {
    gameState,
    message,
    heroes,
    enemies,
    activeHero,
    queue,
    queueIndex,
    playerInterrupt,
  } = state;
  const [numHeroes, setNumHeroes] = useState(4);
  const [numLeftEnemies, setNumLeftEnemies] = useState(3);
  const [numRightEnemies, setNumRightEnemies] = useState(1);

  const prevQueueIndex = useRef(queueIndex);
  const prevGameState = useRef(gameState);

  useEffect(() => {
    if (queueIndex !== null && queueIndex !== prevQueueIndex.current) {
      console.log(
        `useEffect, queueIndex: ${queueIndex}, prevQueueIndex: ${prevQueueIndex.current}`
      );
      console.log(queue);

      prevQueueIndex.current = queueIndex;

      if (queue[queueIndex]) {
        console.log(queue[queueIndex]);
        const { actor, target, actionCreator } = queue[queueIndex];

        // TODO: randomize target selection from target group (only pass target group in queue object, no target index needed)
        let { group: targetGroup, index: targetIndex } = target;

        // TODO: clean this code up
        if (
          (actor.group === HERO && heroes[actor.index].hp <= 0) ||
          (actor.group !== HERO &&
            enemies[actor.group] &&
            enemies[actor.group].entities &&
            enemies[actor.group].entities[actor.index] &&
            enemies[actor.group].entities[actor.index].hp <= 0)
        ) {
          dispatch(incrementQueueIndex());
          return;
        }

        if (targetGroup === HERO) {
          if (!heroes[targetIndex] || heroes[targetIndex].hp <= 0) {
            targetIndex = heroes.findIndex(({ hp }) => hp > 0);

            if (targetIndex === -1) {
              dispatch(gameLost());
              return;
            }
          }
        } else if (
          !enemies[targetGroup] ||
          !enemies[targetGroup].entities ||
          !enemies[targetGroup].entities[targetIndex] ||
          enemies[targetGroup].entities[targetIndex].hp <= 0
        ) {
          targetIndex = enemies[targetGroup].entities.findIndex(
            ({ hp }) => hp > 0
          );
          if (targetIndex === -1) {
            targetGroup = targetGroup === 'left' ? 'right' : 'left';
            targetIndex = enemies[targetGroup].entities.findIndex(
              ({ hp }) => hp > 0
            );

            if (targetIndex === -1) {
              dispatch(gameWon());
              return;
            }
          }
        }

        dispatch(
          actionCreator(actor, { group: targetGroup, index: targetIndex })
        );

        // TODO: ideally we would be able to wait for actionCreator to finish and then dispatch gameState: POST_EXECUTION here (should be doable since no new state is needed)
      } else {
        if (playerInterrupt) {
          // TODO: maybe combine into single action?
          dispatch(setGameState(PLAYER_INPUT));
          dispatch(setQueueIndex(null));
          dispatch(setPlayerInterrupt(false));
        } else {
          dispatch(setQueueIndex(0));
        }
      }
    }
  }, [
    queueIndex,
    gameState,
    queue,
    enemies,
    heroes,
    playerInterrupt,
    dispatch,
  ]);

  useEffect(() => {
    if (gameState !== prevGameState.current) {
      console.log(
        `useEffect, gameState: ${gameState}, prevGameState: ${prevGameState.current}`
      );

      if (prevGameState.current === INIT && gameState === NEW_GAME) {
        console.log('useEffect process new game');

        // check for enemy pre-emptive attack
        if (Math.random() > 0.9) {
          console.log('trigger enemy pre-emptive attack');

          const newQueue = [...enemies.left.entities, ...enemies.right.entities]
            .sort(sortEntitiesBySpeed)
            .map((entity) => entity.queuedActions)
            .reduce((prev, curr) => [...prev, ...curr], []);

          dispatch(startNewRoundAction(newQueue));
          dispatch(setPlayerInterrupt(true));
        } else {
          dispatch(setGameState(PLAYER_INPUT));
        }
      }

      prevGameState.current = gameState;

      if (gameState === POST_EXECUTION) {
        dispatch(deathCycleThunk(heroes, enemies));
      }
    }
  }, [gameState, enemies, heroes, dispatch]);

  const startNewGame = () => {
    // TODO: abstract building of queuedActions into reusable util function (check equipped weapons)
    const newHeroes = generateHeroes(numHeroes).map((hero, index) => ({
      ...hero,
      queuedActions: [
        {
          actionCreator: attackThunk,
          actor: { group: HERO, index },
          target: { group: 'left', index: 0 },
        },
      ],
    }));
    const leftEnemies = generateEnemies(numLeftEnemies, MONSTER).map(
      (enemy, index) => ({
        ...enemy,
        queuedActions: [
          {
            actionCreator: attackThunk,
            actor: { group: 'left', index },
            target: { group: HERO, index: 0 },
          },
        ],
      })
    );
    const rightEnemies = generateEnemies(numRightEnemies, ROBOT).map(
      (enemy, index) => ({
        ...enemy,
        queuedActions: [
          {
            actionCreator: attackThunk,
            actor: { group: 'right', index },
            target: { group: HERO, index: 0 },
          },
        ],
      })
    );

    // TODO: figure out where best to compose all this...
    const newGameData = {
      gameState: NEW_GAME,
      message: '',
      heroes: newHeroes,
      enemies: {
        left: { name: 'Monster', message: '', entities: leftEnemies },
        right: { name: 'Robot', message: '', entities: rightEnemies },
      },
      activeHero: null,
      queue: [],
      queueIndex: null,
      playerInterrupt: false,
    };

    dispatch(startNewGameAction(newGameData));
  };

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
    <>
      <h1>Battle!</h1>

      <Window>
        <label htmlFor="numHeroes">Heroes: </label>
        <input
          type="number"
          id="numHeroes"
          name="numHeroes"
          value={numHeroes}
          onChange={(e: any) => {
            setNumHeroes(e.target.value);
          }}
          min="1"
          max="10"
          disabled={
            numLeftEnemies + numRightEnemies <= 0 ||
            gameState === EXECUTING ||
            gameState === POST_EXECUTION
          }
        />
        <label htmlFor="numLeftEnemies">Monsters: </label>
        <input
          type="number"
          id="numLeftEnemies"
          name="numLeftEnemies"
          value={numLeftEnemies}
          onChange={(e: any) => {
            setNumLeftEnemies(e.target.value);
          }}
          min="0"
          max="10"
          disabled={
            numLeftEnemies + numRightEnemies <= 0 ||
            gameState === EXECUTING ||
            gameState === POST_EXECUTION
          }
        />
        <label htmlFor="numRightEnemies">Robots: </label>
        <input
          type="number"
          id="numRightEnemies"
          name="numRightEnemies"
          value={numRightEnemies}
          onChange={(e: any) => {
            setNumRightEnemies(e.target.value);
          }}
          min="0"
          max="10"
          disabled={
            numLeftEnemies + numRightEnemies <= 0 ||
            gameState === EXECUTING ||
            gameState === POST_EXECUTION
          }
        />
        <br />
        <button
          onClick={startNewGame}
          disabled={
            numLeftEnemies + numRightEnemies <= 0 ||
            gameState === EXECUTING ||
            gameState === POST_EXECUTION
          }
        >
          New Game
        </button>
      </Window>

      <div>Game State: {gameState}</div>
      <div>Player Interrupt: {String(playerInterrupt)}</div>

      {Boolean(
        enemies?.left?.entities?.length || enemies?.right?.entities?.length
      ) && (
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Window
            style={{
              color: 'white',
              height: 100,
              width: 400,
            }}
          >
            <div>{enemies?.left?.name || ''}</div>
            <div>{enemies?.left?.message || ''}</div>
          </Window>
          <Window
            style={{
              color: 'white',
              height: 100,
              width: 400,
            }}
          >
            <div>{enemies?.right?.name || ''}</div>
            <div>{enemies?.right?.message || ''}</div>
          </Window>
        </div>
      )}

      <div style={{ display: 'flex' }}>
        {Boolean(enemies?.left?.entities?.length) && (
          <>
            {enemies.left.entities.map((data: EntityType, index) => (
              <Enemy
                key={index}
                index={index}
                handleClick={() =>
                  dispatch(
                    attackThunk(
                      { group: HERO, index },
                      { group: 'left', index }
                    )
                  )
                }
                {...data}
              />
            ))}
          </>
        )}
        {Boolean(enemies?.right?.entities?.length) && (
          <>
            {enemies.right.entities.map((data: EntityType, index) => (
              <Enemy
                key={index}
                index={index}
                handleClick={() =>
                  dispatch(
                    attackThunk(
                      { group: HERO, index },
                      { group: 'right', index }
                    )
                  )
                }
                {...data}
              />
            ))}
          </>
        )}
      </div>

      <div
        style={{
          height: 100,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-evenly',
        }}
      >
        <h3>{message}</h3>
      </div>

      {activeHero !== null && (
        <div>
          <button
            onClick={() =>
              dispatch(
                queueAction({
                  heroIndex: activeHero,
                  target: { group: 'left', index: 0 },
                  actionCreator: attackThunk,
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
                  target: { group: 'right', index: 0 },
                  actionCreator: attackThunk,
                })
              )
            }
          >
            Right
          </button>
        </div>
      )}

      {gameState !== INIT && (
        <>
          <button
            disabled={
              queueIndex !== null ||
              gameState === GAME_WON ||
              gameState === GAME_LOST
            }
            onClick={startNewRound}
          >
            Execute!
          </button>
          <button
            disabled={queueIndex === null || gameState !== EXECUTING}
            onClick={() => {
              dispatch(setPlayerInterrupt(true));
            }}
          >
            Interrupt
          </button>
        </>
      )}

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
    </>
  );
};

export default Battle;
