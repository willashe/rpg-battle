import { EntityTypesEnum } from './constants';
// TODO: review interface vs. type

export interface AppStateType {
  message: string;
  heroes: EntityType[];
  enemies: { left: EntityType[]; right: EntityType[] };
  activeHero: number | null;
  targetType: EntityTypesEnum | null; // or array of type...
  target: number | string | null;
  queue: Array<HeroActionType>;
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
  action: ActionType | any; // TODO
  heroIndex: number;
  target: string;
}

export interface ActionType {
  type: string;
  payload?: any;
}
