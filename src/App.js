import React, { Component } from 'react';
import Drawer from './Drawer';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      social_feed: []
    }
  }

  render() {
    return (
      <div className="App">
        <Drawer theme={this.props.theme} />
      </div>
    );
  }

  componentDidMount() {
    const url = 'api/socialfeed/1';
    fetch(url)
    .then(response =>  response.json())
    .then((data) => {
        let social_feed = data;
        console.log("FETCH social feed", social_feed);
        this.setState({social_feed: social_feed});
    })
  }
}

export default App;
