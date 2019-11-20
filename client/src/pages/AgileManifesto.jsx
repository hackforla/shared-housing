import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItemText, Typography, Paper } from '@material-ui/core';
import { SectionContainer } from '../components/common';

const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(2),
        width: 800,
        maxWidth: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
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

export const AgileManifesto = () => {
    const classes = useStyles();
    return (
        <SectionContainer>
            <Paper className={classes.paper}>
                <Typography variant='h4' className={classes.center}>Manifesto for Agile Software Development</Typography>
                <Typography variant='body1'>We are uncovering better ways of developing
            software by doing it and helping others do it.
            Through this work we have come to value:</Typography>
                <List>
                    <ListItemText>1. Individuals and interactions over processes and tools</ListItemText>
                    <ListItemText>2. Working software over comprehensive documentation</ListItemText>
                    <ListItemText>3. Customer collaboration over contract negotiation</ListItemText>
                    <ListItemText>4. Responding to change over following a plan. That is, while there is value in the items on the right, we value the items on the left more.</ListItemText>
                </List>
            </Paper>
            <Paper className={classes.paper}>
                <Typography variant='h4' className={classes.center}>Principles behind the Agile Manifesto</Typography>
                <Typography variant='body1' className={classes.center}>We follow these principles:</Typography>
                <List>
                    <ListItemText>1. Our highest priority is to satisfy the customer through early and continuous delivery of valuable software.</ListItemText>
                    <ListItemText>2. Welcome changing requirements, even late in development. Agile processes harness change for the customer&#39;s competitive advantage.</ListItemText>
                    <ListItemText>3. Deliver working software frequently, from a couple of weeks to a couple of months, with a preference to the shorter timescale.</ListItemText>
                    <ListItemText>4. Business people and developers must work together daily throughout the project.</ListItemText>
                    <ListItemText>5. Build projects around motivated individuals. Give them the environment and support they need, and trust them to get the job done.</ListItemText>
                    <ListItemText>6. The most efficient and effective method of conveying information to and within a development team is face-to-face conversation.</ListItemText>
                    <ListItemText>7. Working software is the primary measure of progress.</ListItemText>
                    <ListItemText>8. Agile processes promote sustainable development. The sponsors, developers, and users should be able to maintain a constant pace indefinitely.</ListItemText>
                    <ListItemText>9. Continuous attention to technical excellence and good design enhances agility.</ListItemText>
                    <ListItemText>10. Simplicity--the art of maximizing the amount of work not done--is essential.</ListItemText>
                    <ListItemText>11. The best architectures, requirements, and designs emerge from self-organizing teams.</ListItemText>
                    <ListItemText>12. At regular intervals, the team reflects on how to become more effective, then tunes and adjusts its behavior accordingly.</ListItemText>
                </List>
            </Paper>
        </SectionContainer >
    );
};

export default AgileManifesto;