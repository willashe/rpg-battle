import { Entity } from './types';
import { EntityTypesEnum } from './constants';

export const generateEntity = (
  name: string,
  type: EntityTypesEnum,
  maxHp: number,
  attack: number,
  defense: number,
  speed: number,
  inventory: object[]
) => ({
  name,
  type: type,
  maxHp: maxHp,
  hp: maxHp,
  attack: attack,
  defense: defense,
  speed: speed,
  inventory: inventory,
});

export const generateHeroes = (count: number) => {
  const heroes: Entity[] = [];

  for (let i = 0; i < count; i++) {
    heroes.push(
      generateEntity(
        `hero-${Math.random()}`,
        EntityTypesEnum.HERO,
        10,
        1,
        3,
        1,
        []
      )
    );
  }

  return heroes;
};

export const generateEnemies = (count: number, type: EntityTypesEnum) => {
  const enemies: Entity[] = [];

  for (let i = 0; i < count; i++) {
    enemies.push(
      generateEntity(`monster-${Math.random()}`, type, 10, 1, 3, 1, [])
    );
  }

  return enemies;
};
