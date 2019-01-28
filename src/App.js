import React, { Component } from 'react';
import './App.css';
import Pets from './modules/Pets';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Pets/>
      </div>
    );
  }
}

export default App;
