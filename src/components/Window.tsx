import React from 'react';

const multiplier = 4;

const Window = (props: any) => {
  const { style, children } = props;

  return (
    <div
      {...props}
      style={{
        ...style,
        padding: 30,
        background: '#000080',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          height: 3 * multiplier,
          width: '100%',
          top: 0,
          left: 0,
          backgroundImage: 'url(./assets/top.png)',
          backgroundRepeat: 'repeat-x',
          backgroundSize: `${3 * multiplier}px 100%`,
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          right: 0,
          height: '100%',
          width: 5 * multiplier,
          top: 0,
          backgroundImage: 'url(./assets/right.png)',
          backgroundRepeat: 'repeat-y',
          backgroundSize: '100%',
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 3 * multiplier,
          width: '100%',
          backgroundImage: 'url(./assets/bottom.png)',
          backgroundRepeat: 'repeat-x',
          backgroundSize: `${3 * multiplier}px 100%`,
        }}
      ></div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 5 * multiplier,
          height: '100%',
          backgroundImage: 'url(./assets/left.png)',
          backgroundRepeat: 'repeat-y',
          backgroundSize: '100%',
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: 3 * multiplier,
          width: 5 * multiplier,
          backgroundImage: 'url(./assets/top-left-corner.png)',
          backgroundSize: '100%',
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 3 * multiplier,
          width: 5 * multiplier,
          backgroundImage: 'url(./assets/bottom-left-corner.png)',
          backgroundSize: '100%',
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          height: 3 * multiplier,
          width: 5 * multiplier,
          backgroundImage: 'url(./assets/top-right-corner.png)',
          backgroundSize: '100%',
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          height: 3 * multiplier,
          width: 5 * multiplier,
          backgroundImage: 'url(./assets/bottom-right-corner.png)',
          backgroundSize: '100%',
        }}
      ></div>
      {children}
    </div>
  );
};

export default Window;
