import { GameStatesEnum, EntityTypesEnum } from './constants';

// TODO: review interface vs. type
export interface AppStateType {
  gameState: GameStatesEnum;
  queue: EntityActionType[];
  queueIndex: number | null;
  playerInterrupt: boolean;
  activeHero: number | null;
  message: string;
  heroes: EntityType[];
  enemies: EnemyGroupsType;
}

export interface EntityType {
  status: string;
  name: string;
  type: EntityTypesEnum;
  hp: number;
  maxHp: number;
  tp: number;
  maxTp: number;
  attack: number;
  defense: number;
  speed: number;
  inventory: ItemType[];
  // equipment: EntityEquipmentType;
  queuedActions: EntityActionType[];
}

export interface ItemType {}

export interface EntityEquipmentType {
  // head: EquippableItemType | null;
  // leftHand: EquippableItemType | null;
  // rightHand: EquippableItemType | null;
  // body: EquippableItemType | null;
  // legs: EquippableItemType | null;
}

export interface EquippableItemType {
  twoHanded: boolean;
}

export interface EntityActionType {
  actionCreator: any; // TODO
  actor: TargetType;
  target: TargetType;
}

export interface ActionType {
  type: string;
  payload?: any;
}

export interface TargetType {
  group: string;
  index: number;
}

export interface EnemyGroupsType {
  [key: string]: {
    name: string;
    message: string | number;
    entities: EntityType[];
  };
}
