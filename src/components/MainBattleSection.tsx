import React from 'react';
import styled from 'styled-components';

const BattleSection = styled.div`
  display: flex;
  flex: 0 1 100%;
  background-color: darkblue;
`;

const MessageBox = styled.div`
  width: 10%;
  font-size: 1.4rem;
  border: 10px solid silver;
  margin: 0 auto;
  align-self: flex-end;
  padding: 15px;
  margin-bottom: 4px;
  color: silver;
`;

const MainBattleSection = () => {
  return (
    <BattleSection>
      <MessageBox>GIFOI</MessageBox>
    </BattleSection>
  );
};

export default MainBattleSection;
