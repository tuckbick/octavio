import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  avatar: {
    marginRight: '20px',
    width: 60,
    height: 60
  }
};

function ImageAvatars(props) {
  const { classes, name, src } = props;
  return (
    <img src={src} alt={name} className={classes.avatar} />
  );
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageAvatars);
