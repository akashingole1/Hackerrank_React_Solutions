import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import FootballMatchesData from './components/football-data/index.js';

const title = "Football Comptetions";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="app-header layout-row align-items-center justify-content-center">
          <div className="layout-row align-items-center">
            <img alt="" src={logo} className="logo" />
            <h4 id="app-title" data-testid="app-title" className="app-title">{title}</h4>
          </div>
        </nav>
        <FootballMatchesData />
      </div>
    );
  }
}

export default App;
