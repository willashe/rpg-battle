interface HeroProps {
  index: number;
  active: boolean;
  handleClick: () => void;
  name: string;
  status: string;
  hp: number;
}

const Hero = ({ index, active, name, status, hp, handleClick }: HeroProps) => (
  <button
    // disabled={hp <= 0}
    disabled
    onClick={() => handleClick()}
    style={{
      margin: '0 auto',
      height: 130,
      width: 100,
      color: 'black',
      background:
        status === 'acting'
          ? 'green'
          : status === 'hurt'
          ? 'red'
          : status === 'dead'
          ? 'black'
          : 'white',
      transformOrigin: 'bottom right',
      transform: `rotate(${status === 'dead' ? 90 : 0}deg)`,
      animation:
        status === 'hurt' || status === 'dying' ? 'shake 0.5s' : undefined,
      animationIterationCount:
        status === 'hurt' || status === 'dying' ? 'infinite' : undefined,
      border: 'none',
      outline: active ? '3px solid blue' : 'none',
    }}
  >
    <div>{name}</div>
    <div>HP: {hp}</div>
  </button>
);

export default Hero;
