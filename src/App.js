import React, { Component } from 'react';
import Drawer from './Drawer';
import Canvas from './Canvas';
import './App.scss';
import LogoImage from './logo.png';

import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import RepeatIcon from '@material-ui/icons/Repeat';
import StarIcon from '@material-ui/icons/StarBorder';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrowOutlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import Input from '@material-ui/core/Input';
import Avatar from './Avatar';
import ProjectAvatar from './ProjectAvatar';

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
      },
      project_details: {
        tab: 'discussion',
        data: ['hisotry item 1', 'hisotry item 2', 'hisotry item 3']
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
    this.setState({ ui_state: {is_logged_in: true} });
    this.setState({ which_page: 'home' });
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
      if (!this.isLoading) {
        this.fetchEvents();
      }
      return this.renderHomePage();
    } else if (page === 'user_profile') {
      if (this.isLoading) {
        this.fetchUserProfile('5c88b09a48cb84a541b9f917');
      }
      return this.renderUserProfilePage();
    } else if (page === 'project_list') {
      return this.renderProjectsListPage();
    } else if (page === 'project_detail') {
      if (!this.isLoading) {
        this.fetchProject('5c88b0ccf20e1f22db9174d8')
      }
      return this.renderProjectDetailPage();
    } else if (page === 'project_create') {
      return this.renderProjectCreatePage();
    }
  }

  renderLoginPage() {
    // intial ui-state
    let style = this.state.ui_state.is_logged_in ? { zIndex: -10 } : { zIndex: 1500 };
    return (
      <div style={style} id="Login-Page" className="Login-Page">
        <div className="Login-Form">
          <div className="logo">
            <img alt={'Octavio logo'} className="logo-img" src={LogoImage} height={100} width={100} />
          </div>
          <h1 className="logo-name">octavio</h1>
          <div className="form">
            <Input
              className="login-input"
              placeholder="first name"
              value="jromeem"
              inputProps={{
                'aria-label': 'Description',
              }}
            />
            <Input
              className="login-input"
              placeholder="last name"
              value="********"
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
            <label>
              <Button onClick={ this.handleLogin } className="login-button" component="span">
                login
              </Button>
            </label>
          </div>
        </div>
      </div>
    );
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
      <div className="section-1">
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
      <div className="ProjectList-contain">
        <section className="section-1">
          <div className="title-section">
            your projects
          </div>
          <div className="buttons">
            <Fab size="small" aria-label="Add" onClick={() => this.setState({ which_page: 'project_create' }) }>
              <AddIcon/>
            </Fab>
          </div>
        </section>
        <section className="section-4">
          <div className="details-content">
            <div className="social-feed">
              <div className="line-down"/>
              <div className="social-item" onClick={() => this.setState({ which_page: 'project_detail' })}>
                <div className="circle" />
                <ProjectAvatar src="https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/Adele_-_21.png/220px-Adele_-_21.png" />
                <div className="social-text">
                  <strong>Rolling in the Deep</strong><br /><em>Updated 1 days ago by <strong>Roxie Massey</strong></em>
                </div>
              </div>
              <div className="social-item" onClick={() => this.setState({ which_page: 'project_detail' })}>
                <div className="circle" />
                <ProjectAvatar src="https://upload.wikimedia.org/wikipedia/en/thumb/3/36/Lady_Gaga_-_Poker_Face.png/220px-Lady_Gaga_-_Poker_Face.png" />
                <div className="social-text">
                  <strong>Poker Face</strong><br /><em>Updated 2 days ago by <strong>Stefani Germanotta</strong></em>
                </div>
              </div>
              <div className="social-item" onClick={() => this.setState({ which_page: 'project_detail' })}>
                <div className="circle" />
                <ProjectAvatar src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/First_Day_of_My_Life.jpg/220px-First_Day_of_My_Life.jpg" />
                <div className="social-text">
                  <strong>First Day of My Life</strong><br /><em>Updated 2 days ago by <strong>George Harrison</strong></em>
                </div>
              </div>
              <div className="social-item" onClick={() => this.setState({ which_page: 'project_detail' })}>
                <div className="circle" />
                <ProjectAvatar src="https://m.media-amazon.com/images/I/91A1Y+bfQ+L._SS500_.jpg" />
                <div className="social-text">
                  <strong>A-Punk</strong><br /><em>Updated 7 days ago by <strong>Ryan Beatty</strong></em>
                </div>
              </div>
              <div className="social-item" onClick={() => this.setState({ which_page: 'project_detail' })}>
                <div className="circle" />
                <ProjectAvatar src="https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Franz_Ferdinand_-_Take_Me_Out.jpg/220px-Franz_Ferdinand_-_Take_Me_Out.jpgg" />
                <div className="social-text">
                  <strong>Take Me Out</strong><br /><em>Updated 9 days ago by <strong>Leon Fernandez</strong></em>
                </div>
              </div>
              <div className="social-item" onClick={() => this.setState({ which_page: 'project_detail' })}>
                <div className="circle" />
                <ProjectAvatar src="https://upload.wikimedia.org/wikipedia/en/thumb/7/77/PB%26Jyoung_folks.JPG/220px-PB%26Jyoung_folks.JPG" />
                <div className="social-text">
                  <strong>Young Folks</strong><br /><em>Updated 16 days ago by <strong>Luna Osborn</strong></em>
                </div>
              </div>
              <div className="social-item" onClick={() => this.setState({ which_page: 'project_detail' })}>
                <div className="circle" />
                <ProjectAvatar src="https://t2.genius.com/unsafe/300x300/https%3A%2F%2Fimages.genius.com%2F43c401bc0dab23d4711c38e529cab649.1000x1000x1.jpg" />
                <div className="social-text">
                  <strong>Bruise</strong><br /><em>Updated 23 days ago by <strong>Mark Mcguire</strong></em>
                </div>
              </div>
              <div className="social-item" onClick={() => this.setState({ which_page: 'project_detail' })}>
                <div className="circle" />
                <ProjectAvatar src="https://yt3.ggpht.com/a-/AAuE7mCRncce1E2uIbJbrlLEqhboixAZ_86TcrCEXw=s900-mo-c-c0xffffffff-rj-k-no" />
                <div className="social-text">
                  <strong>Camo</strong><br /><em>Updated 25 days ago by <strong>Melinda Goodman</strong></em>
                </div>
              </div>
            </div>
          </div>
        </section>
       </div>
    );
  }

  renderProjectDetailPage() {
    return (
      <div className="ProjectDetail-contain">
        <section className="section-1">
          <div className="title-section">
          aadkins / rolling in the deep
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
                <div className="circle" /><span><strong>Murphy Nolan</strong> added a <strong>file</strong></span>
              </div>
              <div className="social-item">
                <div className="circle" /><span><strong>Roxie Massey</strong> added a <strong>file</strong></span>

              </div>
              <div className="social-item">
                <div className="circle" /><span><strong>Roxie Massey</strong> made a <strong>comment</strong>:</span>
                <p>&nbsp;<i>wow this is great!</i></p>
              </div>
              <div className="social-item">
                <div className="circle" /><span><strong>Roxie Massey</strong> added a <strong>file</strong></span>
              </div>
            </div>

          </div>
        </section>
      </div>
    );
  }

  displayBars() {
    if (this.barEls) {
      return this.barEls;
    }
    let barElems = [];
    for (var i = 0; i < 300; i++) {
      let heightComputed = Math.floor(Math.random() * 35) + 25;
      if (i === 0 || i === 100) {
        heightComputed = 20;
      }
      let style = { height: heightComputed };
      barElems.push(<div style={style} className="single-bar"></div>);
    }
    this.barEls = (<div className="all-bars"> {barElems} </div>)
    return this.barEls
  }

  renderProjectCreatePage() {
    return (
      <div className="ProjectDetail-contain">
        <section className="section-1">
          <div className="title-section">
          username / <Input
            className=" "
            placeholder="project name"
            inputProps={{
              'aria-label': 'Description',
            }}
          />
          </div>

          <div className="buttons">
            <Fab size="small" aria-label="Add">
              <AddIcon onClick={() => this.setState({ which_page: 'project_create' }) }/>
            </Fab>
          </div>
        </section>
        <section className="section-2">
          <div className="playback-ui">
            <Fab size="xl" aria-label="Add" className="audio-button">
              <AddIcon />
              Upload audio
            </Fab>
          </div>
        </section>
      </div>
    );
  }

  componentDidMount() {

  }

  fetchEvents(user_id) {
    const url = 'api/events';
    this.isLoading = true;
    fetch(url)
    .then(response =>  response.json())
    .then((data) => {
        let social_feed = data;
        console.log("FETCH social feed", social_feed);
        this.setState({which_data: social_feed});
        this.isLoading = false;
    });
  }

  fetchCollaborators(project_id) {
    const url = `api/projects/${project_id}`;
    this.isLoading = true;
    fetch(url)
    .then(response =>  response.json())
    .then((data) => {
        let social_feed = data;
        console.log("FETCH social feed", social_feed);
        this.setState({which_data: social_feed});
        this.isLoading = false;
    });
  }

  fetchProject(project_id) {
    const url = 'api/events';
    this.isLoading = true;
    fetch(url)
    .then(response =>  response.json())
    .then((data) => {
        let social_feed = data;
        console.log("FETCH social feed", social_feed);
        this.setState({which_data: social_feed});
        this.isLoading = false;
    });
  }

  fetchProjectList(user_id) {
    const url = `api/projects?collaborators=${user_id}`;
    this.isLoading = true;
    fetch(url)
    .then(response =>  response.json())
    .then((data) => {
        let social_feed = data;
        console.log("FETCH social feed", social_feed);
        this.setState({which_data: social_feed});
        this.isLoading = false;
    });
  }

  fetchUserProfile(user_id) {
    const url = `api/collaborators/${user_id}`;
    this.isLoading = true;
    fetch(url)
    .then(response =>  response.json())
    .then((data) => {
        let social_feed = data;
        console.log("FETCH social feed", social_feed);
        this.setState({which_data: social_feed});
        this.isLoading = false;
    });
  }
}

export default App;
