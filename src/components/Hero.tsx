import styled from 'styled-components';
import { EntityType } from '../types';

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.4rem;
  padding: 0 70px;
  margin: 0 1.1px;
  border: 10px solid #e5e4e2;
  flex: 0 1 auto;
`;

interface HeroProps {
  hero: EntityType;
  index: number;
}

const Hero = ({ hero, index }: HeroProps) => {
  const { hp, tp, name } = hero;

  return (
    <HeroContainer style={{ order: index }}>
      <p>HP: {hp <= 0 ? '✞' : hp}</p>
      <p>TP: {tp}</p>
      <p>{name}</p>
    </HeroContainer>
  );
};

export default Hero;
