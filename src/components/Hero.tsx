import styled from 'styled-components';

import { EntityType } from '../types';
import Window from './Window';

const HeroContainer = styled(Window)`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 1 auto;
  width: 270px;
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
