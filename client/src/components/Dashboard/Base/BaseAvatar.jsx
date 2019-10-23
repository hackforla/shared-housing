import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
}));

export const BaseAvatar = () => {
  const classes = useStyles();
  // const [state, setState] = useState({
  //   alt,
  //   src
  // })
  return (
    <Avatar className={classes.avatar}>
      <FolderIcon />
    </Avatar>
  );
};

BaseAvatar.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string,
};