import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import Home  from "./components/Home";
import battlePage from "./components/battlePage";
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/battlepage">Battle!</Link>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/battlepage" component={battlePage} />
        </Switch>
      </div>
    </Router>
  );
}