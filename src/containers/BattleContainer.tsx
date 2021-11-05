import { useContext, useRef, useEffect } from 'react';

import { AppStateContext } from '../state';
import { actionCreators } from '../actions';
import { GameStatesEnum } from '../constants';
import { generateQueue, getActionXPosition } from '../utils';
import Battle from '../pages/Battle';

// TODO: fix name collisions
const { INIT, GAME_LOST, GAME_WON, PLAYER_INPUT, POST_EXECUTION } =
  GameStatesEnum;

const {
  startNewRound: startNewRoundAction,
  setQueueIndex,
  incrementQueueIndex,
  postExecutionThunk,
  gameWon,
  gameLost,
  setGameState,
  setPlayerInterrupt,
  attackThunk,
} = actionCreators;

const BattleContainer = () => {
  const [state, dispatch] = useContext(AppStateContext);
  const { gameState, groups, queue, queueIndex, playerInterrupt } = state;
  const prevQueueIndex = useRef(queueIndex);
  const prevGameState = useRef(gameState);

  useEffect(() => {
    if (queueIndex !== null && queueIndex !== prevQueueIndex.current) {
      console.log(
        `useEffect, queueIndex: ${queueIndex}, prevQueueIndex: ${prevQueueIndex.current}`
      );

      prevQueueIndex.current = queueIndex;

      if (queue[queueIndex]) {
        console.log(queue[queueIndex]);
        const { actionCreator, actor, target } = queue[queueIndex];
        console.log(actionCreator);

        // TODO: randomize target selection from target group (only pass target group in queue object, no target index needed)
        const { group: actorGroup, index: actorIndex } = actor;
        let { group: targetGroup, index: targetIndex } = target;

        if (groups[actorGroup].entities[actorIndex].hp <= 0) {
          dispatch(incrementQueueIndex());
          return;
        }

        // TODO: add support for no index passed (target entire group)
        // TODO: add support for array of groups

        if (targetGroup === 'player') {
          if (
            targetIndex !== undefined &&
            (!groups.player.entities[targetIndex] ||
              groups.player.entities[targetIndex].hp <= 0)
          ) {
            targetIndex = groups.player.entities.findIndex(({ hp }) => hp > 0);

            if (targetIndex === -1) {
              dispatch(gameLost());
              return;
            }
          }
        } else if (
          targetGroup !== undefined &&
          targetIndex !== undefined &&
          (!groups[targetGroup].entities[targetIndex] ||
            groups[targetGroup].entities[targetIndex].hp <= 0)
        ) {
          targetIndex = groups[targetGroup].entities.findIndex(
            ({ hp }) => hp > 0
          );
          if (targetIndex === -1) {
            targetGroup =
              targetGroup === 'leftEnemies' ? 'rightEnemies' : 'leftEnemies';
            targetIndex = groups[targetGroup].entities.findIndex(
              ({ hp }) => hp > 0
            );

            if (targetIndex === -1) {
              dispatch(gameWon());
              return;
            }
          }
        }

        // TODO: we need to look at actor/target(s) attributes, weapons/armor, etc. here to determine damage, success

        dispatch(
          attackThunk(actor, {
            group: targetGroup,
            index: targetIndex,
            xPosition: getActionXPosition(
              groups.leftEnemies.entities,
              groups.rightEnemies.entities,
              actor,
              { group: targetGroup, index: targetIndex }
            ),
          })
        );

        // TODO: ideally we would be able to wait for actionCreator to finish and then dispatch gameState: POST_EXECUTION here (should be doable since no new state is needed)
      } else {
        if (playerInterrupt) {
          // TODO: need to set hero animations to 'idle'
          // TODO: maybe combine into single action?
          dispatch(setGameState(PLAYER_INPUT));
          dispatch(setQueueIndex(null));
          dispatch(setPlayerInterrupt(false));
        } else {
          dispatch(setQueueIndex(0));
        }
      }
    }
  }, [queueIndex, gameState, queue, groups, playerInterrupt, dispatch]);

  useEffect(() => {
    if (gameState !== prevGameState.current) {
      console.log(
        `useEffect, gameState: ${gameState}, prevGameState: ${prevGameState.current}`
      );

      // enemy pre-emptive attack chance
      if (
        prevGameState.current === INIT ||
        prevGameState.current === GAME_WON ||
        prevGameState.current === GAME_LOST
      ) {
        // TODO: maybe check speed or luck or something
        if (Math.random() > 0.9) {
          const newQueue = generateQueue([
            ...groups.leftEnemies.entities,
            ...groups.rightEnemies.entities,
          ]);

          dispatch(startNewRoundAction(newQueue));
          dispatch(setPlayerInterrupt(true));
        } else {
          dispatch(setGameState(PLAYER_INPUT));
        }
      }

      prevGameState.current = gameState;

      if (gameState === POST_EXECUTION) {
        dispatch(
          postExecutionThunk(
            groups.player,
            groups.leftEnemies,
            groups.rightEnemies
          )
        );
      }
    }
  }, [gameState, groups, dispatch]);

  return <Battle />;
};

export default BattleContainer;
