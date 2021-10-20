import React from 'react';
import styled from 'styled-components';
import Window from './Window';

const EnemyGroupContainer = styled.div`
  width: 35%;
  display: flex;
  justify-content: flex-end;
`;

const EnemyDmg = styled(Window)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
`;

const EnemyName = styled(Window)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
`;

interface EnemyGroupProps {
  name: string;
  dmg: number;
}

const EnemyGroup = (props: EnemyGroupProps) => {
  const { name, dmg } = props;

  return (
    <EnemyGroupContainer>
      <EnemyName>{name}</EnemyName>
      <EnemyDmg>{dmg}</EnemyDmg>
    </EnemyGroupContainer>
  );
};

export default EnemyGroup;
