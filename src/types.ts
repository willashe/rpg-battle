import { GameStatesEnum, EntityTypesEnum } from './constants';

// TODO: review interface vs. type
export interface AppStateType {
  gameState: GameStatesEnum;
  message: string;
  heroes: EntityType[];
  enemies: {
    [key: string]: {
      name: string;
      message: string | number;
      entities: EntityType[];
    };
  };
  activeHero: number | null;
  queue: HeroActionType[];
  queueIndex: number | null;
  prevQueueIndex: number | null;
}

export interface EntityType {
  status: string;
  name: string;
  type: EntityTypesEnum;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  inventory: object[];
}

export interface HeroActionType {
  actor: TargetType;
  target: TargetType;
  actionCreator: any; // TODO
}

export interface ActionType {
  type: string;
  payload?: any; // TODO
}

export interface TargetType {
  group: string;
  index: number;
}
