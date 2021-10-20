import React from 'react';
import styled from 'styled-components';

const BattleSection = styled.section`
  display: flex;
  flex: 0 1 100%;
  background-color: midnightblue;
`;

const MessageBox = styled.div`
  width: 10%;
  font-size: 1.4rem;
  border: 10px solid #e5e4e2;
  margin: 0 auto;
  align-self: flex-end;
  padding: 15px;
  margin-bottom: 14px;
  color: #e5e4e2;
`;

const MainBattleSection = () => {
  return (
    <BattleSection>
      <MessageBox>GIFOI</MessageBox>
    </BattleSection>
  );
};

export default MainBattleSection;
