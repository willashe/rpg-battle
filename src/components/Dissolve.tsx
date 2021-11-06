import React from 'react';
import styled, { keyframes } from 'styled-components';

import { SPRITE_MULTIPLIER } from '../constants';

const dissolveAnimation = keyframes`
  from {
    mask-position: 0 0px;
  }
  to {
    mask-position: 0 -${1216 * SPRITE_MULTIPLIER}px;
  }
`;

const DissolveContainer = styled((props) => <div {...props} />)`
  width: ${({ width }) => width * SPRITE_MULTIPLIER}px;
  mask: url(./assets/gradient-mask.png);
  mask-size: ${128 * SPRITE_MULTIPLIER}px auto;
  animation: ${dissolveAnimation} 3s steps(20) forwards
    ${({ infinite }) => (infinite ? ' infinite' : '')}
    ${({ reverse }) => (reverse ? '' : ' reverse')};
`;

interface DissolveProps {
  reverse?: boolean;
  infinite?: boolean;
  width?: number;
  style?: object;
}

const Dissolve: React.FC<DissolveProps> = ({
  children,
  reverse,
  infinite,
  width,
  style,
}) => (
  <DissolveContainer
    reverse={reverse}
    infinite={infinite}
    width={width}
    style={style}
  >
    {children}
  </DissolveContainer>
);

export default Dissolve;
