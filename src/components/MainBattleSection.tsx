import React from 'react';
import styled from 'styled-components';
import Window from './Window';

const BattleSection = styled.section`
  display: flex;
  flex: 0 1 100%;
  background-color: #000080;
`;

const MessageBox = styled(Window)`
  width: 17%;
  margin: 0 auto;
  align-self: flex-end;
  margin-bottom: 14px;
`;

const MainBattleSection = () => {
  return (
    <BattleSection>
      <MessageBox>MEGID</MessageBox>
    </BattleSection>
  );
};

export default MainBattleSection;
