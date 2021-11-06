import { EntityType } from './types';
import {
  EntityTypesEnum,
  HERO_NAMES,
  ATTACK,
  HUMAN,
  FROGGY,
  IDLE,
  SLASH,
  SHOOT,
  USE,
  TARGETED,
  HURT,
  DYING,
  OK,
  GroupsEnum,
  PLAYER_GROUP,
  LEFT_ENEMY_GROUP,
  RIGHT_ENEMY_GROUP,
} from './constants';

export const generateEntity = ({
  id,
  group,
  type,
  status,
  name,
  maxHp,
  hp,
  maxTp,
  tp,
  attack,
  defense,
  speed,
  inventory,
  leftPosition,
  queuedAction,
  currentAnimation,
  animations,
}: EntityType) => ({
  id,
  group,
  type,
  status,
  name,
  maxHp,
  hp,
  maxTp,
  tp,
  attack,
  defense,
  speed,
  inventory,
  leftPosition,
  queuedAction,
  currentAnimation,
  animations,
});

const generateHeroName = (id: number) => {
  return HERO_NAMES[id] || `Hero-${id}`;
};

const generateEnemyName = (type: EntityTypesEnum, index: number) => {
  return `${type}-${index}`;
};

// TODO: ts
const generateEntityAnimations = (isEnemy: boolean) => ({
  [IDLE]: {
    frames: isEnemy ? [0, 1] : 0,
    duration: isEnemy ? 600 : 0,
    top: isEnemy ? 0 : undefined,
    bottom: isEnemy ? undefined : 0,
  },
  [SLASH]: {
    frames: isEnemy ? [2, 3] : [3, 3, 4, 5, 6, 6],
    duration: 600,
    top: isEnemy ? 0 : 64,
    bottom: isEnemy ? undefined : 0,
  },
  [SHOOT]: {
    frames: [0, 2, 2],
    duration: 1,
    top: isEnemy ? 0 : undefined,
    bottom: isEnemy ? undefined : 0,
  },
  [USE]: {
    frames: 1,
    duration: 1,
    top: isEnemy ? 0 : undefined,
    bottom: isEnemy ? undefined : 0,
  },
  [TARGETED]: {
    frames: isEnemy ? [0, 1] : 0,
    duration: isEnemy ? 600 : 0,
    top: isEnemy ? 0 : undefined,
    bottom: isEnemy ? undefined : 0,
  },
  [HURT]: {
    frames: 0,
    duration: 500,
    top: isEnemy ? 0 : undefined,
    bottom: isEnemy ? undefined : 0,
  },
  [DYING]: {
    frames: 0,
    duration: 500,
    top: isEnemy ? 0 : undefined,
    bottom: isEnemy ? undefined : 0,
  },
});

// TODO: attributes should be driven by 'type', NEI, ROLF, ROBOT, FROGGY, etc. and a default generic fallback
export const generateHeroes = (count: number) => {
  const heroes: EntityType[] = [];

  for (let index = 0; index < count; index++) {
    heroes.push(
      generateEntity({
        id: index,
        group: PLAYER_GROUP,
        type: HUMAN,
        status: OK,
        name: generateHeroName(index),
        maxHp: 10,
        hp: 10,
        maxTp: 5,
        tp: 5,
        attack: 1,
        defense: 3,
        speed: 2,
        inventory: [],
        leftPosition: `${
          index === 0 ? 40 : index === 1 ? 60 : index === 2 ? 20 : 80
        }%`,
        queuedAction: {
          type: ATTACK,
          target: { group: LEFT_ENEMY_GROUP, index: 0 },
        },
        currentAnimation: IDLE,
        animations: generateEntityAnimations(false),
      })
    );
  }

  return heroes;
};

export const generateEnemies = (
  count: number,
  type: EntityTypesEnum,
  group: Exclude<GroupsEnum, GroupsEnum.PLAYER_GROUP>,
  totalGroupSize: number,
  offset?: number
) => {
  const enemies: EntityType[] = [];

  // need total group size
  // need "real" index relative to entire group

  for (let index = 0; index < count; index++) {
    const realIndex = offset ? index + offset : index;

    enemies.push(
      generateEntity({
        id: index,
        group,
        type,
        status: OK,
        name: generateEnemyName(type, index),
        maxHp: type === FROGGY ? 10 : 20,
        hp: type === FROGGY ? 10 : 20,
        maxTp: type === FROGGY ? 5 : 0,
        tp: type === FROGGY ? 5 : 0,
        attack: 1,
        defense: 3,
        speed: type === FROGGY ? 2 : 3,
        inventory: [],
        leftPosition: `${
          (group === RIGHT_ENEMY_GROUP ? realIndex + 1 : realIndex + 1) *
          (100 / (totalGroupSize + 1))
        }%`,
        queuedAction: {
          type: ATTACK,
          target: { group: PLAYER_GROUP, index: 0 },
        },
        currentAnimation: IDLE,
        animations: generateEntityAnimations(true),
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
      const { type, target } = queuedAction;

      // TODO: check equipped weapons, etc. determine what kind of action or actions to queue

      const action = {
        type,
        actor: { group, index: id },
        target,
      };
      return [action];
    })
    .reduce((prev, curr) => [...prev, ...curr], []);
};

// TODO: we should only have to determine enemy x positions once, store them with each enemy, then pass it along with TargetType
// TODO: we will als
// TODO: probably still will need some of the logic here to get average position based on entire group or sets of groups
// export const getActionXPosition = (
//   leftGroup: EntityType[],
//   rightGroup: EntityType[],
//   actor: ActorType,
//   target: TargetType
// ) => {
//   const { group: actorGroup } = actor;
//   const { group: targetGroup, index: targetIndex } = target;

//   const leftCount = leftGroup.length;
//   const rightCount = rightGroup.length;
//   const totalCount = leftCount + rightCount;
//   const increment = 100 / (totalCount + 1);
//   const targetXPosition =
//     actorGroup === PLAYER_GROUP
//       ? targetGroup === undefined
//         ? 50
//         : targetIndex === undefined
//         ? targetGroup === LEFT_ENEMY_GROUP
//           ? ((leftCount + 1) / 2) * increment
//           : (leftCount + (rightCount + 1) / 2) * increment
//         : targetGroup === LEFT_ENEMY_GROUP
//         ? (targetIndex + 1) * increment
//         : (leftCount + targetIndex + 1) * increment
//       : undefined;

//   return `${targetXPosition}%`;
// };
