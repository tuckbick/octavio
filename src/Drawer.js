import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FolderIcon from '@material-ui/icons/FolderSpecialOutlined';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountIcon from '@material-ui/icons/AccountCircle';
import HelpIcon from '@material-ui/icons/HelpOutline';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/HomeOutlined';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
    fontFamily: "Spectral"
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class MiniDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          theme={theme}
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
        >
          <List disablePadding="true">
            <ListItem className="list-item" button key={'Home'} onClick={ () => this.props.message('home') }>
                <ListItemIcon><HomeIcon className="side-icon" fontSize='large'/></ListItemIcon>
                <ListItemText className="side-nav-text" primary={'home'} />
            </ListItem>
            <ListItem className="list-item" button key={'Projects List'} onClick={ () => this.props.message('project_list') }>
                <ListItemIcon><FolderIcon className="side-icon" fontSize='large'/></ListItemIcon>
                <ListItemText className="side-nav-text" primary={'projects List'} />
            </ListItem>
            <ListItem className="list-item" button key={'Projects Detail'} onClick={ () => this.props.message('project_detail') }>
                <ListItemIcon><FolderIcon className="side-icon" fontSize='large'/></ListItemIcon>
                <ListItemText className="side-nav-text" primary={'projects Detail'} />
            </ListItem>
            <ListItem className="list-item" button key={'Community'} onClick={ () => this.props.message('user_profile') }>
                <ListItemIcon><PeopleIcon className="side-icon" fontSize='large'/></ListItemIcon>
                <ListItemText className="side-nav-text" primary={'community'} />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
        </main>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer)
