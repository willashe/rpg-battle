import React from 'react';
import styled from 'styled-components';

// TODO: this should be a global image/sprite modifier
const multiplier = 4;

const Container = styled.div`
  background: #000080;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  position: relative;
  padding: ${5 * multiplier}px ${7 * multiplier}px ${5 * multiplier}px
    ${8 * multiplier}px;
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
  height: ${3 * multiplier}px;
  width: 100%;
  background-size: ${5 * multiplier}px 100%;
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
          width: 4 * multiplier,
          backgroundImage: `url('./img/left.png')`,
        }}
      />
      <Side
        style={{
          top: 0,
          right: 0,
          width: 5 * multiplier,
          backgroundImage: `url('./img/right.png')`,
        }}
      />
      <TopBottom
        style={{ top: 0, left: 0, backgroundImage: `url('./img/top.png')` }}
      />
      <TopBottom
        style={{
          bottom: 0,
          left: 0,
          backgroundImage: `url('./img/bottom.png')`,
        }}
      />
      <Corner
        style={{
          top: 0,
          left: 0,
          width: 4 * multiplier,
          height: 3 * multiplier,
          backgroundImage: `url('./img/top-left.png')`,
        }}
      />
      <Corner
        style={{
          top: 0,
          right: 0,
          width: 5 * multiplier,
          height: 3 * multiplier,
          backgroundImage: `url('./img/top-right.png')`,
        }}
      />
      <Corner
        style={{
          bottom: 0,
          left: 0,
          width: 4 * multiplier,
          height: 3 * multiplier,
          backgroundImage: `url('./img/bottom-left.png')`,
        }}
      />
      <Corner
        style={{
          bottom: 0,
          right: 0,
          width: 5 * multiplier,
          height: 3 * multiplier,
          backgroundImage: `url('./img/bottom-right.png')`,
        }}
      />
    </Container>
  );
};

export default Window;
