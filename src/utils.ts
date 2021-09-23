import { EntityType } from './types';
import { EntityTypesEnum } from './constants';
const { HERO } = EntityTypesEnum;

export const generateEntity = (
  status: string,
  name: string,
  type: EntityTypesEnum,
  maxHp: number,
  attack: number,
  defense: number,
  speed: number,
  inventory: object[]
) => ({
  status,
  name,
  type,
  maxHp,
  hp: maxHp,
  attack,
  defense,
  speed,
  inventory,
});

const generateHeroName = (index: number) => {
  return `Hero-${index}`;
};

const generateEnemyName = (type: EntityTypesEnum, index: number) => {
  return `${type}-${index}`;
};

export const generateHeroes = (count: number) => {
  const heroes: EntityType[] = [];

  for (let i = 0; i < count; i++) {
    heroes.push(
      generateEntity('idle', generateHeroName(i), HERO, 10, 1, 3, 1, [])
    );
  }

  return heroes;
};

export const generateEnemies = (count: number, type: EntityTypesEnum) => {
  const enemies: EntityType[] = [];

  for (let i = 0; i < count; i++) {
    enemies.push(
      generateEntity('idle', generateEnemyName(type, i), type, 10, 1, 3, 1, [])
    );
  }

  return enemies;
};
