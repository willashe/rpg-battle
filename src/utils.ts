import { EntityType } from './types';
import { EntityTypesEnum, HERO_NAMES } from './constants';
const { HERO, MONSTER } = EntityTypesEnum;

export const generateEntity = ({
  status,
  name,
  type,
  maxHp,
  hp,
  maxTp,
  tp,
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
  maxTp,
  tp,
  attack,
  defense,
  speed,
  inventory,
  queuedActions,
});

const generateHeroName = (id: number) => {
  return HERO_NAMES[id] || `Hero-${id}`;
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
        maxTp: 5,
        tp: 5,
        attack: 1,
        defense: 3,
        speed: 2,
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
        maxHp: type === MONSTER ? 10 : 20,
        hp: type === MONSTER ? 10 : 20,
        maxTp: type === MONSTER ? 5 : 0,
        tp: type === MONSTER ? 5 : 0,
        attack: 1,
        defense: 3,
        speed: type === MONSTER ? 2 : 3,
        inventory: [],
        queuedActions: [],
      })
    );
  }

  return enemies;
};

export const sortEntitiesBySpeed = (
  firstEntity: EntityType,
  secondEntity: EntityType
) => {
  const { speed: speedA } = firstEntity;
  const { speed: speedB } = secondEntity;

  if (speedA === speedB) {
    return Math.random() > 0.5 ? 1 : -1;
  } else {
    return speedA > speedB ? -1 : 1;
  }
};
