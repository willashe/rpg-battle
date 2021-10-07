// TODO: review interface vs. type
export interface EntityType {
  name: string;
  hp: number;
  maxHp: number;
  tp: number;
  maxTp: number;
  attack: number;
  defense: number;
  speed: number;
  inventory: object[];
}

export interface AppStateType {
  heroes: EntityType[];
  enemies: {
    left: {
      name: string;
      entities: EntityType[];
      dmg: number;
    };
    right: {
      name: string;
      entities: EntityType[];
      dmg: number;
    };
  };
}

export interface ActionType {
  type: string;
  payload?: any;
}
