import { useContext } from 'react';
import styled from 'styled-components';

import EnemyGroup from './EnemyGroup';
import { AppStateContext } from '../state';

const EnemySection = styled.section`
  flex: 0 1 200px;
  height: 100%;
  display: flex;
  top: 0;
  justify-content: space-around;
`;

const EnemyGroupSection = () => {
  const [state] = useContext(AppStateContext);
  const {
    enemies: { left, right },
  } = state;

  return (
    <EnemySection>
      <EnemyGroup name={left?.name} message={left?.message} />
      <EnemyGroup name={right?.name} message={right?.message} />
    </EnemySection>
  );
};

export default EnemyGroupSection;
