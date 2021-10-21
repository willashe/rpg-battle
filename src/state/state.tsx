import { createContext, Dispatch, useReducer, useCallback } from 'react';

import { AppStateType, ActionType } from '../types';
import { GameStatesEnum } from '../constants';
import reducer from './reducer';

const { INIT } = GameStatesEnum;

export const initialState = {
  gameState: INIT,
  message: '',
  heroes: [],
  enemies: {},
  activeHero: null,
  queue: [],
  queueIndex: null,
  playerInterrupt: false,
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
