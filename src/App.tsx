import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import Home  from "./components/Home";
import battlePage from "./components/battlePage";
import Player from './components/player';
import monsterList from "./components/monsters";
import Credits from './components/About';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">New Game</Link>
          <Link to="/battlepage">Fight Screen</Link>
          <Link to="player">Player Stuff</Link>
          <Link to="/monsters">Monsters</Link>
          <Link to="credits">Credits</Link>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/battlepage" component={battlePage} />
          <Route exact path="/player" component={Player} />
          <Route exact path="/monsters" component={monsterList} />
          <Route exact path="/credits" component={Credits} />
        </Switch>
      </div>
    </Router>
  );
}