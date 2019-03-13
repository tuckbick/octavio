import React, { Component } from 'react';
import Drawer from './Drawer';
import './App.scss';

import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import RepeatIcon from '@material-ui/icons/Repeat';
import StarIcon from '@material-ui/icons/StarBorder';
import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrowOutlined';

class App extends Component {
  constructor() {
    super();
    this.state = {
      which_page: 'home',
      which_data: [],
      which_user: 1,
      user_id: 1,
      project_id: 1,
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
          <div className="username-projectname">
          username / project-name
          </div>
          <div className="buttons">
            <Fab size="small" color="primary" aria-label="Add" className="download-button">
              <SaveAltIcon />
            </Fab>
            <Fab size="small" color="secondary" aria-label="Add" className="download-button">
              <RepeatIcon />
            </Fab>
            <Fab size="small" color="secondary" aria-label="Add">
              <StarIcon />
            </Fab>
          </div>
        </section>
        <section className="section-2">
          <div className="playback-ui">
            <Fab size="xl" color="primary" aria-label="Add" className="play-button">
              <PlayArrowIcon />
            </Fab>
            { this.displayBars() }
          </div>
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

  displayBars() {
    let barElems = [];
    for (var i = 0; i < 100; i++) {
      barElems.push(<div className="single-bar"></div>);
    }
    return (<div className="all-bars"> {barElems} </div>)
  }

  // fetch all social feed data
  componentDidMount() {
    const url = 'api/events';
    fetch(url)
    .then(response =>  response.json())
    .then((data) => {
        let social_feed = data;
        console.log("FETCH social feed", social_feed);
        this.setState({which_data: social_feed});
    });
  }

  fetchEvents(user_id) {
    const url = 'api/events';
    fetch(url)
    .then(response =>  response.json())
    .then((data) => {
        let social_feed = data;
        console.log("FETCH social feed", social_feed);
        this.setState({which_data: social_feed});
    });
  }

  fetchCollaborators(project_id) {
    const url = 'api/events';
    fetch(url)
    .then(response =>  response.json())
    .then((data) => {
        let social_feed = data;
        console.log("FETCH social feed", social_feed);
        this.setState({which_data: social_feed});
    });
  }

  fetchProject(project_id) {
    const url = 'api/events';
    fetch(url)
    .then(response =>  response.json())
    .then((data) => {
        let social_feed = data;
        console.log("FETCH social feed", social_feed);
        this.setState({which_data: social_feed});
    });
  }

  fetchProjectList(user_id) {
    const url = 'api/events';
    fetch(url)
    .then(response =>  response.json())
    .then((data) => {
        let social_feed = data;
        console.log("FETCH social feed", social_feed);
        this.setState({which_data: social_feed});
    });
  }

  fetchUserProfile(user_id) {
    const url = 'api/events';
    fetch(url)
    .then(response =>  response.json())
    .then((data) => {
        let social_feed = data;
        console.log("FETCH social feed", social_feed);
        this.setState({which_data: social_feed});
    });
  }
}

export default App;
