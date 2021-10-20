import styled from 'styled-components';

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
  index: number;
  name: string;
  hp: number;
  tp: number;
}

const Hero = ({ hp, tp, name, index }: HeroProps) => (
  <HeroContainer style={{ order: index }}>
    <p>HP: {hp <= 0 ? '✞' : hp}</p>
    <p>TP: {tp}</p>
    <p>{name}</p>
  </HeroContainer>
);

export default Hero;
