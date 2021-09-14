import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Home from './components/Home';
import Battle from './components/Battle';
import Player from './components/Player';
import Monsters from './components/Monsters';
import About from './components/About';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">New Game</Link>
          <Link to="/battle">Fight Screen</Link>
          <Link to="/player">Player Stuff</Link>
          <Link to="/monsters">Monsters</Link>
          <Link to="about">About</Link>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/battle" component={Battle} />
          <Route exact path="/player" component={Player} />
          <Route exact path="/monsters" component={Monsters} />
          <Route exact path="/about" component={About} />
        </Switch>
      </div>
    </Router>
  );
}
