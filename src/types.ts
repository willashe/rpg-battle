import {
  GameStatesEnum,
  EntityTypesEnum,
  EntityActionTypesEnum,
} from './constants';

// TODO: review interface vs. type
export interface AppStateType {
  gameState: GameStatesEnum;
  queue: EntityActionType[];
  queueIndex: number | null;
  playerInterrupt: boolean;
  groups: {
    player: EntityGroupType;
    leftEnemies: EntityGroupType;
    rightEnemies: EntityGroupType;
  };
}

export interface EntityType {
  id: number;
  group: 'player' | 'leftEnemies' | 'rightEnemies';
  type: EntityTypesEnum;
  name: string;
  status: string;
  hp: number;
  maxHp: number;
  tp: number;
  maxTp: number;
  attack: number;
  defense: number;
  speed: number;
  inventory: ItemType[];
  // equipment: EntityEquipmentType;
  queuedAction: {
    type: EntityActionTypesEnum;
    target: TargetType;
  };
  animations?: {
    idle: AnimationType;
  };
  position?: any;
}

export interface EntityGroupType {
  type?: EntityTypesEnum;
  entities: EntityType[];
  message: string;
}

export interface AnimationType {
  frames: string[];
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

export interface ActionType {
  type: string;
  payload?: any;
}

export interface EntityActionType {
  actionCreator: any; // TODO
  // action: EntityActionsEnum;
  actor: ActorType;
  target: TargetType;
}

export interface ActorType {
  group: 'player' | 'leftEnemies' | 'rightEnemies';
  index: number;
}

export interface TargetType {
  group: 'player' | 'leftEnemies' | 'rightEnemies';
  // | Array<'player' | 'leftEnemies' | 'rightEnemies'>;
  index?: number;
  xPosition?: number | string;
}
