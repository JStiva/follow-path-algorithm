import React, { useState } from "react";
import { pathFollowingAlgorithm } from "../utils/pathFollowingAlgorithm";

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import NavMenu from "../components/NavMenu";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(10)
    },
    marginTop: {
        marginTop: theme.spacing(10)
    },
    marginTop4: {
        marginTop: theme.spacing(4)
    },
}));

const HomePage = () => {
    const classes = useStyles();

    const [asciiMap, setAsciiMap] = useState("");
    const [letters, setLetters] = useState("");
    const [path, setPath] = useState("");
    const [error, setError] = useState("");

    const handleChange = (event) => {
        setAsciiMap(event.target.value);
        setLetters("");
        setPath("");
        setError("");
    };

    const handleGetPath = () => {
        try {
            const [collectedLetters, pathCharacters] = pathFollowingAlgorithm(asciiMap);
            setLetters(collectedLetters);
            setPath(pathCharacters)
        } catch (e) {
            setError(e.message)
        }
    };

    const handleClick = () => {
        handleGetPath();
    };

    return (
        <>
            <NavMenu />
            <Container maxWidth="lg">
                <div className={classes.root}>
                    <Typography variant="h4" gutterBottom>
                        Path following algorithm in ASCII Map
                    </Typography>

                    <Grid container className={classes.marginTop} spacing={2}>
                        <Grid item xs={12} lg={10}>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                label="ASCII map"
                                variant="outlined"
                                multiline
                                rows={10}
                                value={asciiMap}
                                onChange={handleChange} />
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.marginTop4}
                                onClick={handleClick}>
                                Get path
                        </Button>
                        </Grid>
                        <Grid item xs={12}>
                            {
                                error.length > 0 &&
                                <Typography variant="h6" gutterBottom color="secondary">
                                    {error}
                                </Typography>
                            }
                            <Typography variant="h5" gutterBottom>
                                {letters}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                {path}
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </>
    )
};

export default HomePage;
