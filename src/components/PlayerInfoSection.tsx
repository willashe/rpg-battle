import React from 'react';
import styled from 'styled-components';
import Hero from './Hero';

const PlayerInfo = styled.section`
  display: flex;
  justify-content: center;
  background-color: purple;
  flex: 0 1 200px;
`;

const PlayerMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.4rem;
  padding: 0 70px;
  margin: 0 1.1px;
  border: 10px solid silver;
`;

const PlayerButton = styled.button`
  background-color: red;
  padding: 10px;
`;

interface PlayerInfoSectionProps {
  firstHeroName: string;
  secondHeroName: string;
  thirdHeroName: string;
  fourthHeroName: string;
}

const PlayerInfoSection = (props: PlayerInfoSectionProps) => {
  const { firstHeroName, secondHeroName, thirdHeroName, fourthHeroName } =
    props;

  return (
    <PlayerInfo>
      <Hero hp={35} tp={28} name={firstHeroName} />
      <Hero hp={0} tp={0} name={secondHeroName} />
      <PlayerMenu>
        <p>ATTK</p>
        <PlayerButton></PlayerButton>
        <p>ORDR</p>
        <PlayerButton></PlayerButton>
      </PlayerMenu>
      <Hero hp={70} tp={0} name={thirdHeroName} />
      <Hero hp={35} tp={28} name={fourthHeroName} />
    </PlayerInfo>
  );
};

export default PlayerInfoSection;
