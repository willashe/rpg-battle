import { EntityType } from './types';

export enum EntityTypesEnum {
  HERO = 'HERO',
  MONSTER = 'MONSTER',
  ROBOT = 'ROBOT',
}

export const HERO_NAMES = ['ROLF', 'NEI', 'RUDO', 'ANNA'];

export const NEI: EntityType = {
  name: 'NEI',
  hp: 10,
  maxHp: 10,
  tp: 5,
  maxTp: 5,
  attack: 10,
  defense: 5,
  speed: 3,
  inventory: [],
};
