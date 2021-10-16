import { useEffect } from 'react';

interface EnemyProps {
  index: number;
  name: string;
  status: string;
  hp: number;
  handleClick: () => void;
}

const Enemy = ({ index, name, status, hp, handleClick }: EnemyProps) => {
  useEffect(() => {
    console.log('hp useEffect');
  }, [hp]);

  useEffect(() => {
    console.log('status useEffect');
  }, [status]);

  return (
    <button
      // disabled={hp <= 0}
      disabled
      onClick={() => handleClick()}
      style={{
        margin: '0 auto',
        height: 130,
        width: 90,
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
      }}
    >
      <div>{name}</div>
      <div>HP: {hp}</div>
    </button>
  );
};

export default Enemy;
