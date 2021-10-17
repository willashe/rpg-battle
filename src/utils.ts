import { EntityType } from './types';
import { EntityTypesEnum } from './constants';
const { HERO } = EntityTypesEnum;

export const generateEntity = ({
  status,
  name,
  type,
  maxHp,
  hp,
  attack,
  defense,
  speed,
  inventory,
  queuedActions,
}: EntityType) => ({
  status,
  name,
  type,
  maxHp,
  hp,
  attack,
  defense,
  speed,
  inventory,
  queuedActions,
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
      generateEntity({
        status: 'idle',
        name: generateHeroName(i),
        type: HERO,
        maxHp: 10,
        hp: 10,
        attack: 1,
        defense: 3,
        speed: 1,
        inventory: [],
        queuedActions: [],
      })
    );
  }

  return heroes;
};

export const generateEnemies = (count: number, type: EntityTypesEnum) => {
  const enemies: EntityType[] = [];

  for (let i = 0; i < count; i++) {
    enemies.push(
      generateEntity({
        status: 'idle',
        name: generateEnemyName(type, i),
        type: type,
        maxHp: 10,
        hp: 10,
        attack: 1,
        defense: 3,
        speed: 1,
        inventory: [],
        queuedActions: [],
      })
    );
  }

  return enemies;
};
