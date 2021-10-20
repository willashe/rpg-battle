import React from 'react';
import styled from 'styled-components';
import Window from './Window';

const HeroContainer = styled(Window)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 1.1px;
  flex: 0 1 auto;
  width: 250px;
`;

interface HeroProps {
  name: string;
  hp: number;
  tp: number;
  index: number;
}

const Hero = ({ hp, tp, name, index }: HeroProps) => (
  <HeroContainer style={{ order: index }}>
    <p>HP: {hp <= 0 ? '✞' : hp}</p>
    <p>TP: {tp}</p>
    <p>{name}</p>
  </HeroContainer>
);

export default Hero;
