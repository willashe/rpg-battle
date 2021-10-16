import { EntityTypesEnum } from './constants';

// TODO: review interface vs. type
export interface AppStateType {
  gameState: string;
  message: string;
  heroes: EntityType[];
  enemies: { left: EntityType[]; right: EntityType[] };
  activeHero: number | null;
  queue: Array<HeroActionType>;
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
  target: TargetType;
  actionCreator: any; // TODO
}

export interface ActionType {
  type: string;
  payload?: any; // TODO
}

export interface TargetType {
  group: string; // TODO: EntityTypesEnum
  index: number;
}
