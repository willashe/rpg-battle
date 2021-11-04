import { useContext, useRef, useEffect } from 'react';

import { AppStateContext } from '../state';
import { actionCreators } from '../actions';
import { GameStatesEnum } from '../constants';
import { sortEntitiesBySpeed } from '../utils';
import Battle from '../pages/Battle';

const { INIT, NEW_GAME, PLAYER_INPUT, POST_EXECUTION } = GameStatesEnum;

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
        let { group: actorGroup, index: actorIndex } = actor;
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
        // TODO: determine number of attacks based on number of weapons equipped at time of queueing

        // TODO: pull this into util function?
        const leftCount = groups.leftEnemies.entities.length;
        const rightCount = groups.rightEnemies.entities.length;
        const totalCount = leftCount + rightCount;
        const increment = 100 / (totalCount + 1);
        const targetXPosition =
          actorGroup === 'player'
            ? targetGroup === undefined
              ? 50
              : targetIndex === undefined
              ? targetGroup === 'leftEnemies'
                ? ((leftCount + 1) / 2) * increment
                : (leftCount + (rightCount + 1) / 2) * increment
              : targetGroup === 'leftEnemies'
              ? (targetIndex + 1) * increment
              : (leftCount + targetIndex) * increment
            : undefined;

        dispatch(
          attackThunk(actor, {
            group: targetGroup,
            index: targetIndex,
            xPosition: targetXPosition,
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

      if (prevGameState.current === INIT && gameState === NEW_GAME) {
        // check for enemy pre-emptive attack
        if (Math.random() > 0.9) {
          const newQueue = [
            ...groups.leftEnemies.entities,
            ...groups.rightEnemies.entities,
          ]
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
