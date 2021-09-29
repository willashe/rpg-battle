import React from 'react';
import styled from 'styled-components';

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.4rem;
  padding: 0 70px;
  margin: 0 1.1px;
  border: 10px solid silver;
`;

interface HeroProps {
  name: string;
  hp: number;
  tp: number;
}

const Hero = ({ hp, tp, name }: HeroProps) => (
  <HeroContainer>
    <p>HP: {hp <= 0 ? '✞' : hp}</p>
    <p>TP: {tp}</p>
    <p>{name}</p>
  </HeroContainer>
);

export default Hero;
