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
    groups: { leftEnemies, rightEnemies },
  } = state;

  return (
    <EnemySection>
      <EnemyGroup type={leftEnemies.type} message={leftEnemies.message} />
      <EnemyGroup type={rightEnemies.type} message={rightEnemies.message} />
    </EnemySection>
  );
};

export default EnemyGroupSection;
