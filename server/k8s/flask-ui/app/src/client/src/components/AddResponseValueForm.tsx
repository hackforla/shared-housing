import * as React from 'react';
import { Grid, TextField, Fab, Theme, makeStyles, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
// import { useStyles } from '../util';
import { AddCircleOutline } from '@material-ui/icons';


export const useStyles = makeStyles((theme: Theme) => ({
    fab: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
}));

export interface ResponseValueFormProps {
    submitResponseValue: (value: string) => void;
}

export const AddResponseValueForm = (props: ResponseValueFormProps) => {

    const [value, setValue] = React.useState('');
    const classes = useStyles({});

    return <React.Fragment>
        <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                Add Response
            </DialogContentText>
            <TextField
                required
                id="responseText"
                label="Response Value"
                helperText="Response value"
                value={value}
                onChange={
                    (event: React.ChangeEvent<HTMLInputElement>) => {
                        setValue(event.target.value);
                    }
                }
            />
        </DialogContent>
        <DialogActions>
            <Fab
                color="primary"
                aria-label="add"
                className={classes.fab}

                onClick={
                    () => {
                        props.submitResponseValue(value);
                        setValue('');
                    }
                }
            >
                <AddCircleOutline
                />
            </Fab>
        </DialogActions>
    </React.Fragment>;

}