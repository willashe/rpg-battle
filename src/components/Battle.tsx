import React from 'react';

const Battle = () => (
  <div className="battle-container">
    <section className="monster-info-section">
      <div className="monster-content">
        <div className="monster-name">&nbsp;SUELO</div>
        <div className="monster-dmg">&nbsp;99</div>
      </div>
      <div className="monster-content">
        <div className="monster-name">&nbsp;ROBOT</div>
        <div className="monster-dmg">&nbsp;20</div>
      </div>
    </section>

    <section className="main-battle-section">
      <h1>Fight screen here!</h1>
    </section>

    <section className="player-info-section">
      <div className="main-party-menu">
        <p>p1&nbsp;</p>
        <div className="player-hp-text">
          <p>HP:&nbsp;20&nbsp;</p>
        </div>
        <div className="player-mp-text">
          <p>MP:&nbsp;35&nbsp;</p>
        </div>
        <div className="fight-menu"></div>
      </div>
    </section>
  </div>
);

export default Battle;
