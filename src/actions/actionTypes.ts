// these should be more descriptions of what happened
export const START_NEW_GAME = 'START_NEW_GAME';
export const GAME_OVER = 'GAME_OVER';
export const SET_GAME_STATE = 'SET_GAME_STATE';

export const SET_MESSAGE = 'SET_MESSAGE';
export const SET_STATUS = 'SET_STATUS';
export const DAMAGE = 'DAMAGE';

export const SET_ACTIVE_HERO = 'SET_ACTIVE_HERO';
export const QUEUE_ACTION = 'QUEUE_ACTION';
export const SET_QUEUE_INDEX = 'SET_QUEUE_INDEX';
export const INCREMENT_QUEUE_INDEX = 'INCREMENT_QUEUE_INDEX';
export const SET_PREV_QUEUE_INDEX = 'SET_PREV_QUEUE_INDEX';
export const INCREMENT_PREV_QUEUE_INDEX = 'INCREMENT_PREV_QUEUE_INDEX';

/*

- user clicks start button
START_NEW_GAME
  - generate new game entities
  - initialize game state
START_NEW_ROUND
  - increment round number
  - set active team (player or enemy)
*Player Team
  - player interacts with menus:
    - view stats
    - queue up hero actions
      - select hero
        - set highlighted/active hero index
SET_ACTIVE_HERO
      - select action
        - attack
SET_TARGET_TYPE?
        - magic
          - select spell/technique
SET_TARGET_TYPE?
        - item
          - select item to use
SET_TARGET_TYPE?
      - select target (or determine automatically depending on type of action)
        - set highlighted/active enemy group/index
SET_TARGET
    - execute queued actions
executeQueuedActionsThunk
    - run
      - either just auto-quit or roll for escape success/failure, lose turn if failure and risk losing battle (consequences? just log losses for now)
*Enemy Team
ATTACK
USE_ITEM


*/
