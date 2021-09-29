import React from 'react';
import styled from 'styled-components';

const MainPartyInfo = styled.div`
  display: flex;
  justify-content: center;
`;

const PlayerHP = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.4rem;
  padding: 0 70px;
  margin: 0 1.1px;
  border: 10px solid darkgrey;
`;

const PlayerButton = styled.button`
  background-color: red;
  padding: 10px;
`;

const PlayerInfoSection = styled.section`
  background-color: purple;
  flex: 0 1 200px;
`;

interface PlayerProps {
  firstPlayerName: string;
  secondPlayerName: string;
  thirdPlayerName: string;
  fourthPlayerName: string;
  hp: number;
  tp: number;
}

const PlayerInfoMenu = (props: PlayerProps) => {
  const {
    firstPlayerName,
    secondPlayerName,
    thirdPlayerName,
    fourthPlayerName,
    hp,
    tp,
  } = props;

  return (
    <PlayerInfoSection>
      <MainPartyInfo>
        <PlayerHP>
          <p>HP: {hp}</p>
          <p>TP: {tp}</p>
          <p>{firstPlayerName}</p>
        </PlayerHP>
        <PlayerHP>
          <p>HP: ✞</p>
          <p>TP: 0</p>
          <p>{secondPlayerName}</p>
        </PlayerHP>
        <PlayerHP>
          <p>ATTK</p>
          <PlayerButton></PlayerButton>
          <p>ORDR</p>
          <PlayerButton></PlayerButton>
        </PlayerHP>
        <PlayerHP>
          <p>HP: 70</p>
          <p>TP: 0</p>
          <p>{thirdPlayerName}</p>
        </PlayerHP>
        <PlayerHP>
          <p>HP: 35</p>
          <p>TP: 28</p>
          <p>{fourthPlayerName}</p>
        </PlayerHP>
      </MainPartyInfo>
    </PlayerInfoSection>
  );
};

export default PlayerInfoMenu;
