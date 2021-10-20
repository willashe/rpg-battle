import React from 'react';
import styled from 'styled-components';
import Hero from './Hero';
import { EntityType } from '../types';
import Window from './Window';

const PlayerInfo = styled.section`
  display: flex;
  justify-content: center;
  background-color: midnightblue;
  flex: 0 1 200px;
`;

const PlayerMenu = styled(Window)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 9%;
  margin: 0 1.1px;
  order: 1;
`;

const PlayerButton = styled.button`
  background-color: red;
  padding: 10px;
`;

interface PlayerInfoSectionProps {
  heroes: Array<EntityType>;
}

const PlayerInfoSection = (props: PlayerInfoSectionProps) => {
  const { heroes } = props;

  return (
    <PlayerInfo>
      {heroes.map(({ hp, tp, name }, index) => (
        <Hero key={index} hp={hp} tp={tp} name={name} index={index} />
      ))}

      <PlayerMenu>
        <p>ATTK</p>
        <PlayerButton></PlayerButton>
        <p>ORDR</p>
        <PlayerButton></PlayerButton>
      </PlayerMenu>
    </PlayerInfo>
  );
};

export default PlayerInfoSection;
