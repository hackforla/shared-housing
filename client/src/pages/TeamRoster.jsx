import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Link,
  Paper,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SectionContainer } from '../components/common';

const STYLES = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  center: {
    textAlign: 'center',
  },
}));

const ROSTER = {
  management: {
    groupName: 'Management Team',
    members: [
      { name: 'Kimme Buranasombati', title: 'Project Manager', linkedin: '#' },
      { name: 'Derek Chu', title: 'Project Manager', linkedin: '#' },
      { name: 'Dean Church', title: 'Product Owner', linkedin: 'deanchurch' },
      { name: 'Carolanne Fuchs', title: 'Project Manager', linkedin: '#' },
      { name: 'Brandon Mann', title: 'Project Manager', linkedin: '#' },
      { name: 'Martyna S.', title: 'Project Co-lead', linkedin: '#' },
      { name: 'Sebastian Walsh', title: 'Project Manager', linkedin: '#' },
      {
        name: 'Bonnie Wolfe',
        title: 'Client Relationship Manager',
        linkedin: '#',
      },
    ],
  },
  design: {
    groupName: 'UI / UX Team',
    members: [
      { name: 'Alex Chhuon', title: 'UX Designer', linkedin: '#' },
      { name: 'Jose Lopez', title: 'Product Designer', linkedin: '#' },
      { name: 'Domonic Moore', title: 'UX Designer', linkedin: '#' },
      { name: 'Aaron Thomas', title: 'Design Lead', linkedin: '#' },
      { name: 'Steve', title: 'UX Designer', linkedin: '#' },
    ],
  },
  development: {
    groupName: 'Software Development Team',
    members: [
      { name: 'Roland Abregorivas', title: 'Tech Lead', linkedin: '#' },
      { name: 'Wiliam Buck', title: 'Software Developer', linkedin: 'wsbuck' },
      { name: 'Albert Chavez', title: 'Software Developer', linkedin: '#' },
      { name: 'Kirk Chu', title: 'Software Developer', linkedin: '#' },
      { name: 'Luis Garcia', title: 'Software Developer', linkedin: '#' },
      { name: 'Joel Henderson', title: 'Software Developer', linkedin: '#' },
      {
        name: 'Ken Lee',
        title: 'Software Developer',
        linkedin: 'ken-lee-7a600b110',
      },
      { name: 'Eva Lieu', title: 'Software Developer', linkedin: '#' },
      { name: 'Alex Marmalichi', title: 'Software Developer', linkedin: '#' },
      { name: 'Cat McLoughlin', title: 'Software Developer', linkedin: '#' },
      { name: 'Linda Mejia', title: 'Software Developer', linkedin: '#' },
      { name: 'Karl Puzon', title: 'Software Developer', linkedin: '#' },
      { name: 'Joshua Ramirez', title: 'Software Developer', linkedin: '#' },
      { name: 'Lamar Robinson', title: 'Software Developer', linkedin: '#' },
      {
        name: 'Karlen Shahinyan',
        title: 'Software Developer',
        linkedin: 'karlens',
      },
      { name: 'Louis Spencer', title: 'Software Developer', linkedin: '#' },
      { name: 'Tyler Thome', title: 'Software Developer', linkedin: '#' },
      { name: 'Peter Tran', title: 'Software Developer', linkedin: '#' },
      { name: 'Dean Truong', title: 'Software Developer', linkedin: '#' },
      { name: 'Julian Ubaldo', title: 'Software Developer', linkedin: '#' },
    ],
  },
  alumni: {
    groupName: 'Alumni',
    members: [
      { name: 'Marcel Hovsepian', title: 'Project Manager', linkedin: '#' },
      { name: "Owen O'Malley", title: 'Project Manager', linkedin: '#' },
      { name: 'Jiaxi (JC) Zhang', title: 'Project Manager', linkedin: '#' },
    ],
  },
  other: {
    groupName: 'Other Collaborators',
    members: [
      { name: 'Marie-Aimee Brajeux', title: '', linkedin: '#' },
      { name: 'Diana Quach', title: '', linkedin: '#' },
      { name: 'Wes Rowe', title: 'Consulting Engineer', linkedin: '#' },
    ],
  },
};

export default () => {
  const CLASSES = STYLES();
  const [team] = useState(ROSTER);
  const { management, design, development, alumni, other } = team;
  const URL_BASE_LINKEDIN = 'https://www.linkedin.com/in/';
  const RENDER_GROUP = group => {
    return (
      <Paper className={CLASSES.paper}>
        <Typography variant="h4" className={CLASSES.center}>
          {group.groupName}
        </Typography>
        <List aria-label="members">
          {group.members.map(member => {
            return (
              <Link
                href={`${URL_BASE_LINKEDIN}${member.linkedin}`}
                alt={`${member.name}'s linkedin profile`}
              >
                <ListItem button>
                  <ListItemText
                    primary={`
                      ${member.name}
                      ${member.title ? `-- ${member.title}` : ''}
                    `}
                  />
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Paper>
    );
  };

  return (
    <SectionContainer>
      <Typography variant="h3" className={CLASSES.center}>
        TEAM ROSTER
      </Typography>
      {RENDER_GROUP(management)}
      {RENDER_GROUP(design)}
      {RENDER_GROUP(development)}
      {RENDER_GROUP(alumni)}
      {RENDER_GROUP(other)}
    </SectionContainer>
  );
};
