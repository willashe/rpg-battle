import React from 'react';
import styled from 'styled-components';

const multiplier = 4;

const Container = styled.div`
  background: #000080;
  color: white;
  position: relative;
  padding: ${5 * multiplier}px ${8 * multiplier}px ${5 * multiplier}px
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
          width: 5 * multiplier,
          backgroundImage: 'url(./assets/left.png)',
        }}
      />
      <Side
        style={{
          top: 0,
          right: 0,
          width: 5 * multiplier,
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
          width: 5 * multiplier,
          height: 3 * multiplier,
          backgroundImage: 'url(./assets/top-left-corner.png)',
        }}
      />
      <Corner
        style={{
          top: 0,
          right: 0,
          width: 5 * multiplier,
          height: 3 * multiplier,
          backgroundImage: 'url(./assets/top-right-corner.png)',
        }}
      />
      <Corner
        style={{
          bottom: 0,
          left: 0,
          width: 5 * multiplier,
          height: 3 * multiplier,
          backgroundImage: 'url(./assets/bottom-left-corner.png)',
        }}
      />
      <Corner
        style={{
          bottom: 0,
          right: 0,
          width: 5 * multiplier,
          height: 3 * multiplier,
          backgroundImage: 'url(./assets/bottom-right-corner.png)',
        }}
      />
    </Container>
  );
};

export default Window;
