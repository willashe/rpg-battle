import styled from 'styled-components';
import EnemyGroup from './EnemyGroup';
import { EnemyGroupsType } from '../types';

const EnemySection = styled.section`
  flex: 0 1 200px;
  height: 100%;
  display: flex;
  top: 0;
  justify-content: space-around;
`;

interface EnemyGroupSectionProps {
  enemies: EnemyGroupsType;
}

const EnemyGroupSection = ({
  enemies: { left, right },
}: EnemyGroupSectionProps) => (
  <EnemySection>
    <EnemyGroup name={left?.name} message={left?.message} />
    <EnemyGroup name={right?.name} message={right?.message} />
  </EnemySection>
);

export default EnemyGroupSection;
