import React from 'react';
import styled, { css, keyframes } from 'styled-components';

import { SPRITE_MULTIPLIER } from '../constants';

// TODO: ts
const spriteAnimation = (frames: any) => keyframes`
  ${frames.map(
    (frame: number, index: number) => `
    ${(index * (100 / frames.length)).toFixed(2)}% {
      background-position: ${-64 * SPRITE_MULTIPLIER * frame}px;
    }
  `
  )}
`;

// TODO: ts
const SpriteContainer: React.FC<any> = styled.div`
  background: url('./assets/${({ spriteImg }: any) => spriteImg}.png');
  background-size: auto ${({ width }: any) => width * SPRITE_MULTIPLIER}px;
  ${({ frames, duration }: any) => {
    if (!Array.isArray(frames)) {
      return css`
        background-position: ${-64 * SPRITE_MULTIPLIER * frames}px;
      `;
    } else if (frames.length === 1) {
      return css`
        background-position: ${-64 * SPRITE_MULTIPLIER * frames[0]}px;
      `;
    } else {
      return css`
        animation: ${spriteAnimation(frames)} ${duration / 1000}s steps(1)
          infinite;
      `;
    }
  }}
`;

const AnimatedSprite: React.FC<any> = (props) => <SpriteContainer {...props} />;

export default AnimatedSprite;

/*

...usage:
<AnimatedSprite
  spriteImg={}
  frames={[]}
  duration={}
  height={}
  width={}
  style={}
/>

...implementation:
const SpriteContainer = styled.div`

`

const Sprite: React.FC<any> = styled.div`
  width: 100%
  animation: ${(props: any) => spriteAnimation(props.frames)}
    ${(props: any) => props.duration}s
    steps(${(props: any) => props.frames.length}, jump-none) infinite alternate;
  background: url('./assets/${({ spriteImg }: any) => spriteImg}.png');
  background-size: auto ${64 * SPRITE_MULTIPLIER}px;
`;

const AnimatedSprite: React.FC<any> = (props) => {
  const { style, height, width } = props;
  
  return (
    <SpriteContainer style={...style, height, width}>
      <Sprite { ...{ ...props, style: undefined, height: undefined, width: undefined } } />
    </SpriteContainer>
  );
};

*/
