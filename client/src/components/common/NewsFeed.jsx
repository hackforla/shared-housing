import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorIcon from '@material-ui/icons/Error';

import moment from 'moment';

import useAPI from '../../hooks/useAPI';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    display: 'grid',
  },
  avatarImage: {
    height: '100%',
    width: 'auto',
  },
  loader: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  error: {
    textAlign: 'center',
  },
}));

const githubCommitsURL = `
  https://api.github.com/repos/hackforla/shared-housing/commits
`;

export function NewsFeed() {
  const [commits, setCommits] = useState([]);
  const resp = useAPI(githubCommitsURL, {});
  const classes = useStyles();

  useEffect(() => {
    if (resp && resp.data) {
      setCommits(resp.data);
    }
  }, [resp.data]);

  const ErrorMessage = () => (
    <div className={classes.error}>
      <p>There was an error with the request</p>
      <ErrorIcon />
    </div>
  );

  return (
    <List className={classes.root}>
      {resp.error && <ErrorMessage />}
      {resp.loading && <CircularProgress className={classes.loader} />}
      {!resp.error &&
        resp.data &&
        commits.map(commit =>
          commit.author ? (
            <div key={commit.node_id}>
              <ListItem
                button
                onClick={() => window.open(commit.html_url, '_blank')}
              >
                <ListItemAvatar>
                  <Avatar>
                    <img
                      src={commit.author.avatar_url}
                      alt="avatar"
                      className={classes.avatarImage}
                    />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={commit.commit.message}
                  primaryTypographyProps={{ variant: 'body2' }}
                  secondary={moment(commit.commit.author.date).format('lll')}
                />
              </ListItem>
              <Divider />
            </div>
          ) : (
            ''
          ),
        )}
    </List>
  );
}

export default NewsFeed;
