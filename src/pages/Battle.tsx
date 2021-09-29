import React from 'react';

const Battle = () => (
  <div className="battle-container">
    <section className="monster-info-section">
      <div className="monster-content">
        <div className="monster-name">SUELO</div>
        <div className="monster-dmg">99</div>
      </div>
      <div className="monster-content">
        <div className="monster-name">ROBOT</div>
        <div className="monster-dmg">20</div>
      </div>
    </section>

    <section className="main-battle-section">
      <div className="ability-used-window">GIFOI</div>
    </section>

    <section className="player-info-section">
      <div className="main-party-menu">
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
          <p>STGY</p>
          <button className="player-button"></button>
        </div>
        <div className="player-hp-text">
          <p>HP:&nbsp;70</p>
          <p>MP:&nbsp;0</p>
          <p>RUDO</p>
        </div>
        <div className="player-hp-text">
          <p>HP:&nbsp;35</p>
          <p>MP:&nbsp;28</p>
          <p>ANNA</p>
        </div>
      </div>
    </section>
  </div>
);

export default Battle;
