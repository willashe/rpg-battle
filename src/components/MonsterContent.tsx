import React from 'react';
import styled from 'styled-components';

const MonsterContentContainer = styled.div`
  width: 30%;
  display: flex;
  justify-content: flex-end;
  border: 8px solid darkgrey;
`;

const MonsterDmg = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  padding: 0 40px;
  border: 3px solid darkgrey;
  border-bottom-width: 1px;
  border-top-width: 1px;
  border-left-width: 9px;
`;

const MonsterName = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  width: 50%;
`;

interface MonsterContentProps {
  name: string;
  count: number;
}

const MonsterContent = (props: MonsterContentProps) => {
  const { name, count } = props;

  return (
    <MonsterContentContainer>
      <MonsterName>{name}</MonsterName>
      <MonsterDmg>{count}</MonsterDmg>
    </MonsterContentContainer>
  );
};

export default MonsterContent;
