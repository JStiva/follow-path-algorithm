import React from 'react';
import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },

    },
    textDecor: {
        textDecoration: "none",
        color: "#fff"
    }
}));

export default function PrimarySearchAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <Link to="/" className={classes.textDecor}>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Home
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
};
