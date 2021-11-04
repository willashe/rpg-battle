import { EntityType, ActorType, TargetType } from './types';
import { EntityTypesEnum, HERO_NAMES } from './constants';
import { actionCreators } from './actions';
const { HERO, MONSTER } = EntityTypesEnum;
const { attackThunk } = actionCreators;

export const generateEntity = ({
  type,
  name,
  status,
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
  type,
  name,
  status,
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

// TODO: ts any
export const generateEntityAction = (
  actionCreator: any,
  actor: ActorType,
  target: TargetType
) => ({
  actionCreator,
  actor,
  target,
});

// TODO: attributes should be driven by 'type', NEI, ROLF, ROBOT, MONSTER, etc. and a default generic fallback
export const generateHeroes = (count: number) => {
  const heroes: EntityType[] = [];

  for (let index = 0; index < count; index++) {
    heroes.push(
      generateEntity({
        type: HERO,
        name: generateHeroName(index),
        status: 'idle',
        maxHp: 10,
        hp: 10,
        maxTp: 5,
        tp: 5,
        attack: 1,
        defense: 3,
        speed: 2,
        inventory: [],
        queuedActions: [
          generateEntityAction(
            attackThunk,
            { group: 'player', index },
            { group: 'leftEnemies', index: 0 }
          ),
        ],
      })
    );
  }

  return heroes;
};

export const generateEnemies = (
  count: number,
  type: EntityTypesEnum,
  group: 'leftEnemies' | 'rightEnemies'
) => {
  const enemies: EntityType[] = [];

  for (let index = 0; index < count; index++) {
    enemies.push(
      generateEntity({
        type: type,
        name: generateEnemyName(type, index),
        status: 'idle',
        maxHp: type === MONSTER ? 10 : 20,
        hp: type === MONSTER ? 10 : 20,
        maxTp: type === MONSTER ? 5 : 0,
        tp: type === MONSTER ? 5 : 0,
        attack: 1,
        defense: 3,
        speed: type === MONSTER ? 2 : 3,
        inventory: [],
        queuedActions: [
          generateEntityAction(
            attackThunk,
            { group, index },
            { group: 'player', index: 0 }
          ),
        ],
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
