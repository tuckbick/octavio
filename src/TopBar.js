import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FolderIcon from '@material-ui/icons/FolderSpecial';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountIcon from '@material-ui/icons/AccountCircle';
import HelpIcon from '@material-ui/icons/HelpOutline';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
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
  state = {
    open: false,
  };

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
          onMouseEnter={this.handleDrawerOpen}
          onMouseLeave={this.handleDrawerClose}
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
          <List>
            <ListItem button key={'Home'}>
                <ListItemIcon><DashboardIcon /></ListItemIcon>
                <ListItemText primary={'Home'} />
            </ListItem>
            <ListItem button key={'Projects'}>
                <ListItemIcon><FolderIcon /></ListItemIcon>
                <ListItemText primary={'Projects'} />
            </ListItem>
            <ListItem button key={'Community'}>
                <ListItemIcon><PeopleIcon /></ListItemIcon>
                <ListItemText primary={'Community'} />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button key={'Settings'}>
                <ListItemIcon><SettingsIcon /></ListItemIcon>
                <ListItemText primary={'Settings'} />
            </ListItem>
            <ListItem button key={'Account'}>
                <ListItemIcon><AccountIcon /></ListItemIcon>
                <ListItemText primary={'Account'} />
            </ListItem>
            <ListItem button key={'Help'}>
                <ListItemIcon><HelpIcon /></ListItemIcon>
                <ListItemText primary={'Help'} />
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

export default withStyles(styles, { withTheme: true })(MiniDrawer);
