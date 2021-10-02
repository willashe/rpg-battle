import React from 'react';
import styled from 'styled-components';
import EnemyGroup from './EnemyGroup';
import { EntityType } from '../types';
const EnemySection = styled.section`
  flex: 0 1 200px;
  height: 100%;
  display: flex;
  top: 0;
  justify-content: space-around;
`;

interface EnemyGroupSectionProps {
  enemies: {
    left: { name: string; entities: EntityType[] };
    right: { name: string; entities: EntityType[] };
  };
}

const EnemyGroupSection = ({
  enemies: { left, right },
}: EnemyGroupSectionProps) => (
  <EnemySection>
    <EnemyGroup name={left.name} dmg={99} />
    <EnemyGroup name={right.name} dmg={20} />
  </EnemySection>
);

export default EnemyGroupSection;
