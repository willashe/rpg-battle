import React from 'react';

const Battle = () => (
  <div className="battle-container">
    <section className="monster-info-section">
      <div className="monster-content">
        <div className="monster-name">&nbsp;SUELO</div>
        <div className="monster-dmg">&nbsp;99</div>
      </div>
      <div className="monster-content">
        <div className="monster-name">ROBOT</div>
        <div className="monster-dmg">-</div>
      </div>
    </section>

    <section className="main-battle-section">
      <div className="ability-used-window">
        <p>NAFOI</p>
      </div>
    </section>

    <section className="player-info-section">
      <div className="main-party-menu">
        <p>p1&nbsp;</p>
        <div className="player-hp-text">
          <p>HP:&nbsp;45</p>
          <p>MP:&nbsp;33</p>
          <p>ROLF</p>
        </div>
        <div className="player-hp-text">
          <p>HP:&nbsp;✞</p>
          <p>MP:&nbsp;0</p>
          <p>NEI</p>
        </div>
        <div className="player-hp-text">
          <p>ATTK</p>
          <button className="player-button"></button>
          <p>ORDR</p>
          <button className="player-button"></button>
        </div>
        <div className="player-hp-text">
          <p>HP:&nbsp;70</p>
          <p>MP:&nbsp;0</p>
          <p>RUDO</p>
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
