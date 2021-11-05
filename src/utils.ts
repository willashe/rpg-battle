import { EntityType, ActorType, TargetType } from './types';
import { EntityTypesEnum, HERO_NAMES, ATTACK } from './constants';
import { actionCreators } from './actions';

const { HERO, FROGGY } = EntityTypesEnum;
const { attackThunk } = actionCreators;

export const generateEntity = ({
  id,
  group,
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
  queuedAction,
}: EntityType) => ({
  id,
  group,
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
  queuedAction,
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

// TODO: attributes should be driven by 'type', NEI, ROLF, ROBOT, FROGGY, etc. and a default generic fallback
export const generateHeroes = (count: number) => {
  const heroes: EntityType[] = [];

  for (let index = 0; index < count; index++) {
    heroes.push(
      generateEntity({
        id: index,
        group: 'player',
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
        queuedAction: {
          type: ATTACK,
          target: { group: 'leftEnemies', index: 0 },
        },
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
        id: index,
        group,
        type,
        name: generateEnemyName(type, index),
        status: 'idle',
        maxHp: type === FROGGY ? 10 : 20,
        hp: type === FROGGY ? 10 : 20,
        maxTp: type === FROGGY ? 5 : 0,
        tp: type === FROGGY ? 5 : 0,
        attack: 1,
        defense: 3,
        speed: type === FROGGY ? 2 : 3,
        inventory: [],
        queuedAction: {
          type: ATTACK,
          target: { group: 'player', index: 0 },
        },
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

export const generateQueue = (entities: EntityType[]) => {
  return [...entities]
    .sort(sortEntitiesBySpeed)
    .map((entity) => {
      const { id, group, queuedAction } = entity;
      const {
        // type,
        target,
      } = queuedAction;

      // TODO: check equipped weapons, etc. determine what kind of action or actions to queue

      const action = {
        actionCreator: attackThunk, // TODO: use 'type' to determine which actionCreator to use
        actor: { group, index: id },
        target,
      };
      return [action];
    })
    .reduce((prev, curr) => [...prev, ...curr], []);
};

// TODO: we should only have to determine enemy x positions once, store them with each enemy, then pass it along with TargetType
export const getActionXPosition = (
  leftGroup: EntityType[],
  rightGroup: EntityType[],
  actor: ActorType,
  target: TargetType
) => {
  const { group: actorGroup } = actor;
  const { group: targetGroup, index: targetIndex } = target;

  const leftCount = leftGroup.length;
  const rightCount = rightGroup.length;
  const totalCount = leftCount + rightCount;
  const increment = 100 / (totalCount + 1);
  const targetXPosition =
    actorGroup === 'player'
      ? targetGroup === undefined
        ? 50
        : targetIndex === undefined
        ? targetGroup === 'leftEnemies'
          ? ((leftCount + 1) / 2) * increment
          : (leftCount + (rightCount + 1) / 2) * increment
        : targetGroup === 'leftEnemies'
        ? (targetIndex + 1) * increment
        : (leftCount + targetIndex + 1) * increment
      : undefined;

  return `${targetXPosition}%`;
};
