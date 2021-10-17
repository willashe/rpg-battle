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
  queue: EntityActionType[];
  queueIndex: number | null;
  prevQueueIndex: number | null;
  playerInterrupt: boolean;
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
