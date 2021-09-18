import { EntityTypesEnum } from './constants';

export interface Entity {
  name: string;
  type: EntityTypesEnum;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  inventory: object[];
}
