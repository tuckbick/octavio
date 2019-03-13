import React, { Component } from 'react';
import TopBar from './TopBar';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
    }
  }

  render() {
    return (
      <div className="App">
        <TopBar />
      </div>
    );
  }
}

export default App;
