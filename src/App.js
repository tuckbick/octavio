import React, { Component } from 'react';
import Drawer from './Drawer';
import './App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      which_page: 'home',
      which_data: [],
      which_user: 1
    }
    this.whichPage = this.whichPage.bind(this)
  }

  whichPage(dataFromChild) {
    this.setState({ which_page: dataFromChild });
    console.log('Updated Parent State:', this.state)
  }

  render() {
    return (
      <div className="App">
        <Drawer message={this.whichPage} theme={this.props.theme} />
        <div className="App-Content">
          <div className="content-container">
            { this.renderPage(this.state.which_page) }
          </div>
        </div>
      </div>
    );
  }

  renderPage(page) {
    if (page === 'home') {
      return this.renderHomePage();
    } else if (page === 'user_profile') {
      return this.renderUserProfilePage();
    } else if (page === 'project_list') {
      return this.renderProjectsListPage();
    } else if (page === 'project_detail') {
      return this.renderProjectDetailPage();
    }
  }

  renderHomePage() {
    return (
      <div>
        this is home social feed
      </div>
    );
  }

  renderUserProfilePage() {
    return (
      <div>
        this is user profile page
      </div>
    );
  }

  renderProjectsListPage() {
    return (
      <div>
        this is projects list page
      </div>
    );
  }

  renderProjectDetailPage() {
    return (
      <div className="ProjectDetail-contain">
        <section className="section-1">
          username / project-name download stem
        </section>
        <section className="section-2">
          playback ui
        </section>
        <section className="section-3">
          discussion collaborators graph
        </section>
        <section className="section-4">
          discussion discussion discussion 
        </section>
      </div>
    );
  }

  // fetch all social feed data
  componentDidMount() {
    const url = 'api/socialfeed';
    fetch(url)
    .then(response =>  response.json())
    .then((data) => {
        let social_feed = data;
        console.log("FETCH social feed", social_feed);
        this.setState({which_data: social_feed});
    })
  }
}

export default App;
