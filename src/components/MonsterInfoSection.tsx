import React from 'react';
import styled from 'styled-components';
import MonsterContent from './MonsterContent';

const MonsterSection = styled.section`
  flex: 0 1 200px;
  height: 100%;
  display: flex;
  top: 0;
  justify-content: space-around;
`;
const MonsterInfoSection = () => {
  return (
    <MonsterSection>
      <MonsterContent name="SUELO" count={99} />
      <MonsterContent name="ROBOT" count={20} />
    </MonsterSection>
  );
};

export default MonsterInfoSection;
