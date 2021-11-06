import { createContext, Dispatch, useReducer, useCallback } from 'react';

import { AppStateType, ActionType } from '../types';
import {
  INIT,
  LEFT_ENEMY_GROUP,
  PLAYER_GROUP,
  RIGHT_ENEMY_GROUP,
} from '../constants';
import reducer from './reducer';

export const initialState = {
  gameState: INIT,
  queue: [],
  queueIndex: null,
  playerInterrupt: false,
  groups: {
    [PLAYER_GROUP]: {
      entities: [],
      message: '',
    },
    [LEFT_ENEMY_GROUP]: {
      entities: [],
      message: '',
    },
    [RIGHT_ENEMY_GROUP]: {
      entities: [],
      message: '',
    },
  },
};

export const AppStateContext = createContext<[AppStateType, Dispatch<any>]>([
  initialState,
  () => null,
]);

// TODO
export const AppStateProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  let customDispatch = useCallback((action: ActionType | void) => {
    if (typeof action === 'function') {
      // @ts-ignore
      action(customDispatch);
    } else {
      // @ts-ignore
      dispatch(action);
    }
  }, []);

  return (
    <AppStateContext.Provider value={[state, customDispatch]}>
      {children}
    </AppStateContext.Provider>
  );
};
