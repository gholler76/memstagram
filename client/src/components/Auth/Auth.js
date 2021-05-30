import React, { useState } from 'react'
import { Avatar, Paper, Button, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedicon from 'material-ui/icon/LockOutlined';
import useStyles from './styles'
import Input from './Input';

export const Auth = () => {
    const classes = useStyles();

    const isSignup = false;

    const handleSubmit = () => {

    }

    const handleChange = () => {

    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedicon />
                </Avatar>
                <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type="password" />
                    </Grid>
                </form>
            </Paper>


        </Container>

    )
}

export default Auth;
