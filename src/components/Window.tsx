import React from 'react';
import styled from 'styled-components';

import { SPRITE_MULTIPLIER } from '../constants';

const Container = styled.div`
  background: #000080;
  color: white;
  position: relative;
  padding: ${5 * SPRITE_MULTIPLIER}px ${8 * SPRITE_MULTIPLIER}px
    ${5 * SPRITE_MULTIPLIER}px ${8 * SPRITE_MULTIPLIER}px;
`;

const Corner = styled.div`
  position: absolute;
  background-size: cover;
  background-repeat: none;
`;

const Side = styled.div`
  position: absolute;
  height: 100%;
  background-size: 100%;
  background-repeat: repeat-y;
`;

const TopBottom = styled.div`
  position: absolute;
  height: ${3 * SPRITE_MULTIPLIER}px;
  width: 100%;
  background-size: ${5 * SPRITE_MULTIPLIER}px 100%;
  background-repeat: repeat-x;
`;

interface WindowProps {
  style?: object;
}

const Window: React.FunctionComponent<WindowProps> = (props) => {
  const { children } = props;

  return (
    <Container {...props}>
      {children}

      <Side
        style={{
          top: 0,
          left: 0,
          width: 5 * SPRITE_MULTIPLIER,
          backgroundImage: 'url(./assets/left.png)',
        }}
      />
      <Side
        style={{
          top: 0,
          right: 0,
          width: 5 * SPRITE_MULTIPLIER,
          backgroundImage: 'url(./assets/right.png)',
        }}
      />
      <TopBottom
        style={{ top: 0, left: 0, backgroundImage: 'url(./assets/top.png)' }}
      />
      <TopBottom
        style={{
          bottom: 0,
          left: 0,
          backgroundImage: 'url(./assets/bottom.png)',
        }}
      />
      <Corner
        style={{
          top: 0,
          left: 0,
          width: 5 * SPRITE_MULTIPLIER,
          height: 3 * SPRITE_MULTIPLIER,
          backgroundImage: 'url(./assets/top-left-corner.png)',
        }}
      />
      <Corner
        style={{
          top: 0,
          right: 0,
          width: 5 * SPRITE_MULTIPLIER,
          height: 3 * SPRITE_MULTIPLIER,
          backgroundImage: 'url(./assets/top-right-corner.png)',
        }}
      />
      <Corner
        style={{
          bottom: 0,
          left: 0,
          width: 5 * SPRITE_MULTIPLIER,
          height: 3 * SPRITE_MULTIPLIER,
          backgroundImage: 'url(./assets/bottom-left-corner.png)',
        }}
      />
      <Corner
        style={{
          bottom: 0,
          right: 0,
          width: 5 * SPRITE_MULTIPLIER,
          height: 3 * SPRITE_MULTIPLIER,
          backgroundImage: 'url(./assets/bottom-right-corner.png)',
        }}
      />
    </Container>
  );
};

export default Window;
