import React, { Component } from 'react';
import Drawer from './Drawer';
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
        <Drawer theme={this.props.theme} />
      </div>
    );
  }
}

export default App;
