import { EntityTypesEnum } from './constants';

// TODO: review interface vs. type
export interface EntityType {
  name: string;
  type: EntityTypesEnum;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  inventory: object[];
}

export interface AppStateType {
  heroes: EntityType[];
  enemies: { left: EntityType[]; right: EntityType[] };
}

export interface ActionType {
  type: string;
  payload?: any;
}
