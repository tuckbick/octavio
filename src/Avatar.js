import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = {
  avatar: {
    display: 'inline-block',
    marginBottom: '-20px',
    marginRight: '10px',
    top: '-5px'
  }
};

function ImageAvatars(props) {
  const { classes, name, src } = props;
  return (
    <Avatar alt={name} src={src} className={classes.avatar} />
  );
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageAvatars);
