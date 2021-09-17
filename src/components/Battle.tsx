import React from 'react';

const Battle = () => (
  <div className="battle-container">
    <section className="monster-info-section">
      <h1>Monster info section here</h1>
      <div className="l-monster-content">
        <div className="l-monster-name">Left monster name</div>
        <div className="l-monster-dmg">Left monster atk numbers</div>
      </div>
      <div className="r-monster-content">
        <div className="r-monster-name">Right monster name</div>
        <div className="r-monster-dmg">Right monster atk numbers</div>
      </div>
    </section>

    <section className="main-battle-section">
      <h1>Fight screen here!</h1>
    </section>

    <section className="player-info-section">
      <h1>Party info section</h1>
      <div className="main-party-menu">
        <p>p1&nbsp;</p>
        <div className="player-hp-text">
          <p>HP:&nbsp;20&nbsp;</p>
        </div>
        <div className="player-mp-text">
          <p>MP:&nbsp;35&nbsp;</p>
        </div>
      </div>
    </section>
  </div>
);

export default Battle;
