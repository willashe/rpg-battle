import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import { AppStateProvider } from './state';
import Home from './pages/Home';
import Battle from './pages/Battle';
// import Battle from './components/BattleWithStateExample';
import About from './pages/About';
import './Reset.css';
import './App.css';

export default function App() {
  return (
    <AppStateProvider>
      <Router>
        <div className="App">
          <nav>
            <Link to="/">New Games</Link>
            <Link to="/battle">Fight Screen</Link>
            <Link to="about">About</Link>
          </nav>
          <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/battle" component={Battle} />
              <Route exact path="/about" component={About} />
            </Switch>
          </main>
        </div>
      </Router>
    </AppStateProvider>
  );
}
