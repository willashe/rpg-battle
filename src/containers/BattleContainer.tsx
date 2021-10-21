import { useContext, useRef, useEffect } from 'react';

import { AppStateContext } from '../state';
import { actionCreators } from '../actions';
import { EntityTypesEnum, GameStatesEnum } from '../constants';
import { sortEntitiesBySpeed } from '../utils';
import Battle from '../pages/Battle';

const { HERO } = EntityTypesEnum;
const { INIT, NEW_GAME, PLAYER_INPUT, POST_EXECUTION } = GameStatesEnum;

const {
  startNewRound: startNewRoundAction,
  setQueueIndex,
  incrementQueueIndex,
  deathCycleThunk,
  gameWon,
  gameLost,
  setGameState,
  setPlayerInterrupt,
} = actionCreators;

const BattleContainer = () => {
  const [state, dispatch] = useContext(AppStateContext);
  const { gameState, heroes, enemies, queue, queueIndex, playerInterrupt } =
    state;
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

  return <Battle />;
};

export default BattleContainer;
