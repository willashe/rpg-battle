import { EntityType } from './types';
import { HERO_NAMES } from './constants';

export const generateEntity = (
  name: string,
  maxHp: number,
  maxTp: number,
  attack: number,
  defense: number,
  speed: number,
  inventory: object[]
) => ({
  name,
  maxHp: maxHp,
  hp: maxHp,
  maxTp: maxTp,
  tp: maxTp,
  attack: attack,
  defense: defense,
  speed: speed,
  inventory: inventory,
});

export const generateHeroes = (count: number) => {
  const heroes: EntityType[] = [];

  for (let i = 0; i < count; i++) {
    heroes.push(
      generateEntity(HERO_NAMES[i] || `hero-${i}`, 10, 10, 1, 3, 1, [])
    );
  }

  return heroes;
};

export const generateEnemies = (count: number) => {
  const enemies: EntityType[] = [];

  for (let i = 0; i < count; i++) {
    enemies.push(generateEntity(`monster-${i}`, 10, 10, 1, 3, 1, []));
  }

  return enemies;
};
