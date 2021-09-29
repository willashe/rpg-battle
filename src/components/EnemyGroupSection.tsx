import React from 'react';
import styled from 'styled-components';
import EnemyGroup from './EnemyGroup';

const EnemySection = styled.section`
  flex: 0 1 200px;
  height: 100%;
  display: flex;
  top: 0;
  justify-content: space-around;
`;
const EnemyGroupSection = () => {
  return (
    <EnemySection>
      <EnemyGroup name="SUELO" dmg={99} />
      <EnemyGroup name="ROBOT" dmg={20} />
    </EnemySection>
  );
};

export default EnemyGroupSection;
