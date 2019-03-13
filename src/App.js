import React, { Component } from 'react';
import Drawer from './Drawer';
import './App.scss';
import LogoImage from './logo.png';

import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import RepeatIcon from '@material-ui/icons/Repeat';
import StarIcon from '@material-ui/icons/StarBorder';
import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrowOutlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import Input from '@material-ui/core/Input';

class App extends Component {
  constructor() {
    super();
    this.state = {
      which_page: 'login',
      which_data: [],
      which_user: 1,
      user_id: 1,
      project_id: 1,
      ui_state: {
        is_logged_in: false,
      }
    }
    this.whichPage = this.whichPage.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  whichPage(dataFromChild) {
    this.setState({ which_page: dataFromChild });
    console.log('Updated Parent State:', this.state)
  }

  handleLogin() {
    this.setState({ ui_state: {is_logged_in: true} })
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

  // ROUTER
  renderPage(page) {
    if (page === 'login') {
      return this.renderLoginPage();
    } else if (page === 'home') {
      return this.renderHomePage();
    } else if (page === 'user_profile') {
      return this.renderUserProfilePage();
    } else if (page === 'project_list') {
      return this.renderProjectsListPage();
    } else if (page === 'project_detail') {
      return this.renderProjectDetailPage();
    }
  }

  renderLoginPage() {
    // intial ui-state
    let style = this.state.ui_state.is_logged_in ? { zIndex: -10 } : { zIndex: 1500 };
    return (
      <div style={style} id="Login-Page" className="Login-Page">
        <div className="Login-Form">
          <div className="logo">
            <img className="logo-img" src={LogoImage} height={100} width={100} />
          </div>
          <h1 className="logo-name">octavio</h1>
          <div className="form">
            <Input
              className="login-input"
              placeholder="first name"
              inputProps={{
                'aria-label': 'Description',
              }}
            />
            <Input
              className="login-input"
              placeholder="last name"
              inputProps={{
                'aria-label': 'Description',
              }}
            />
            <input
              accept="image/*"
              id="text-button-file"
              multiple
              type="file"
              className="hidden"
            />
            <label htmlFor="text-button-file">
              <Button className="upload-picture-button" component="span">
                picture
              </Button>
            </label>
            <Button onClick={ this.handleLogin } className="login-button" component="span">
              login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  renderHomePage() {
    return (
      <div className="section-1">
        <div className="title-section">
          social feed
        </div>
        <div className="details-content">
          <div className="social-feed">
            <div className="line-down"/>
            <div className="social-item">
              <div className="circle" />
              <div className="social-text">
                Someone followed Someone Else
              </div>
            </div>
            <div className="social-item">
              <div className="circle" />Someone starred This Project
            </div>
            <div className="social-item">
              <div className="circle" />Someone contributed to This Project
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderUserProfilePage() {
    return (
      <div className="section-1">
        <div className="title-section">
          user profile
        </div>
          <div className="details-content">
            <div className="social-feed">
              <div className="line-down"/>
              <div className="social-item">
                <div className="circle" />
                <div className="social-text">
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
      <div className="section-1">
        <div className="title-section">
          project list
        </div>
        <div className="details-content">
          <div className="social-feed">
            <div className="line-down"/>
            <div className="social-item">
              <div className="circle" />
              <div className="social-text">
                project 1
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
                <div className="social-text">
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
