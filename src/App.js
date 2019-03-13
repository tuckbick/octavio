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
import HomeIcon from '@material-ui/icons/HomeOutlined';
import Avatar from './Avatar';

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
      this.fetchEvents();
      return this.renderHomePage();
    } else if (page === 'user_profile') {
      return this.renderUserProfilePage();
    } else if (page === 'project_list') {
      return this.renderProjectsListPage();
    } else if (page === 'project_detail') {
      return this.renderProjectDetailPage();
    }
  }

  getEventsMarkup() {
    return this.state.which_data.map((event) => {
      let eventText = '';
      const {feed_action, feed_user_id, following_user_id, followed_user, project} = event;
      if (feed_user_id) {
        eventText = `${feed_user_id.first_name} ${feed_user_id.last_name} ${feed_action} ${project.name}`;
        eventText = (
          <span>
            <Avatar name={`${feed_user_id.first_name} ${feed_user_id.last_name}`} src={feed_user_id.picture} />
            <strong>{`${feed_user_id.first_name} ${feed_user_id.last_name}`}</strong>
            {` ${feed_action} `}
            <strong>{project.name}</strong>
          </span>
        )
      } else if (following_user_id) {
        eventText = (
          <span>
            <Avatar name={`${following_user_id.first_name} ${following_user_id.last_name}`} src={following_user_id.picture} />
            <strong>{`${following_user_id.first_name} ${following_user_id.last_name}`}</strong>
            {` ${feed_action} `}
            <strong>{`${followed_user.first_name} ${followed_user.last_name}`}</strong>
          </span>
        )
      }
      return (
        <div className="social-item">
          <div className="circle" />
          <div class="social-text">
            { eventText }
          </div>
        </div>
      )
    })
  }

  renderHomePage() {
    return (
      <div class="section-1">
        <div className="title-section">
          social feed
        </div>
        <div className="details-content">
          <div className="social-feed">
            <div className="line-down"/>
            { this.getEventsMarkup() }
          </div>
        </div>
      </div>
    );
  }

  renderUserProfilePage() {
    return (
      <div class="section-1">
        <div className="title-section">
          user profile
        </div>
          <div className="details-content">
            <div className="social-feed">
              <div className="line-down"/>
              <div className="social-item">
                <div className="circle" />
                <div class="social-text">
                  user 1
                </div>
              </div>
              <div className="social-item">
                <div className="circle" />user 2
              </div>
              <div className="social-item">
                <div className="circle" />user 3
              </div>
            </div>
          </div>
      </div>
    );
  }

  renderProjectsListPage() {
    return (
      <div className="ProjectList-contain">
        <div class="section-1">
          <div className="title-section">
            project list
          </div>
          <div className="buttons">
            <Fab size="small" aria-label="Add" className="download-button">
              <SaveAltIcon />
            </Fab>
            <Fab size="small" aria-label="Add" className="download-button">
              <RepeatIcon />
            </Fab>
            <Fab size="small" aria-label="Add">
              <StarIcon />
            </Fab>
          </div>
          <div className="details-content">
            <div className="social-feed">
              <div className="line-down"/>
              <div className="social-item">
                <div className="circle" />
                <div class="social-text">
                  project 1
                </div>
              </div>
              <div className="social-item">
                <div className="circle" />project 2
              </div>
              <div className="social-item">
                <div className="circle" />project 3
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderProjectDetailPage() {
    return (
      <div className="ProjectDetail-contain">
        <section className="section-1">
          <div className="title-section">
          username / project-name
          </div>
          <div className="buttons">
            <Fab size="small" aria-label="Add" className="download-button">
              <SaveAltIcon />
            </Fab>
            <Fab size="small" aria-label="Add" className="download-button">
              <RepeatIcon />
            </Fab>
            <Fab size="small" aria-label="Add">
              <StarIcon />
            </Fab>
          </div>
        </section>
        <section className="section-2">
          <div className="playback-ui">
            <Fab size="xl" aria-label="Add" className="play-button">
              <PlayArrowIcon fontSize="large" />
            </Fab>
            { this.displayBars() }
          </div>
        </section>
        <section className="section-3">
          <div className="tabs">
            <div className="discuss-tab">
              discussion
            </div>
            <div className="collab-tab">
              collaborators
            </div>
            <div className="graph-tab">
              graph
            </div>
          </div>
        </section>
        <section className="section-4">
          <div className="details-content">
            <div className="social-feed">
              <div className="line-down"/>
              <div className="social-item">
                <div className="circle" />
                <div class="social-text">
                  hisotry item 1
                </div>
              </div>
              <div className="social-item">
                <div className="circle" />history item 2
              </div>
              <div className="social-item">
                <div className="circle" />history item 3
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  displayBars() {
    let barElems = [];
    for (var i = 0; i < 300; i++) {
      let heightComputed = Math.floor(Math.random() * 35) + 25;
      if (i === 0 || i === 100) {
        heightComputed = 20;
      }
      let style = { height: heightComputed };
      barElems.push(<div style={style} className="single-bar"></div>);
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
    const url = `api/projects/${project_id}`;
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
    const url = `api/projects?collaborators=${user_id}`;
    fetch(url)
    .then(response =>  response.json())
    .then((data) => {
        let social_feed = data;
        console.log("FETCH social feed", social_feed);
        this.setState({which_data: social_feed});
    });
  }

  fetchUserProfile(user_id) {
    const url = `api/collaborators/${user_id}`;
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
