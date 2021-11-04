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
  active: boolean;
  handleSelect?: (index: number | undefined) => void;
}

const Hero = ({ hero, index, active, handleSelect }: HeroProps) => {
  const { hp, tp, name, queuedActionType } = hero;

  return (
    <HeroContainer style={{ order: index }}>
      <button
        onClick={() => {
          if (typeof handleSelect === 'function') {
            handleSelect(index);
          }
        }}
        style={{
          background: 'none',
          border: 'none',
          color: 'inherit',
          width: '100%',
          height: '100%',
        }}
      >
        <p>HP: {hp <= 0 ? '✞' : hp}</p>
        <p>TP: {tp}</p>
        <p>{name}</p>
        {active ? '*' : ''}
        {Boolean(queuedActionType) && queuedActionType}
      </button>
    </HeroContainer>
  );
};

export default Hero;
