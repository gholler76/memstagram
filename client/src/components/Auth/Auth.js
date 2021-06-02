import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar, Paper, Button, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import Icon from './icon';
import { useDispatch } from 'react-redux';
import { signIn, signUp } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const classes = useStyles();
    const [ showPassword, setShowPassword ] = useState( false );
    const [ isSignup, setIsSignup ] = useState( false );
    const dispatch = useDispatch();
    const history = useHistory();
    const [ formData, setFormData ] = useState( initialState );

    const handleShowPassword = () => setShowPassword( ( prevShowPassword ) => !prevShowPassword );

    const handleSubmit = ( e ) => {
        e.preventDefault();
        console.log( formData );

        if ( isSignup )
        {
            dispatch( signUp( formData, history ) );
        }
        else
        {
            dispatch( signIn( formData, history ) );
        }
    };

    const handleChange = ( e ) => {
        setFormData( { ...formData, [ e.target.name ]: e.target.value } );
    };

    const switchMode = () => {
        setIsSignup( ( prevIsSignup ) => !prevIsSignup );
        setShowPassword( false );
    };

    const googleSuccess = async ( res ) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try
        {
            dispatch( { type: 'AUTH', data: { result, token } } );

            history.push( '/' );
        } catch ( error )
        {
            console.log( error );

        }

    };
    const googleFailure = ( error ) => {
        console.log( error );

        console.log( 'Google sign-in was unssuccessful. Try again later.' );

    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={ classes.paper } elevation={ 3 }>
                <Avatar className={ classes.avatar }>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{ isSignup ? "Sign Up" : "Sign In" }</Typography>
                <form className={ classes.form } onSubmit={ handleSubmit }>
                    <Grid container spacing={ 2 }>
                        { isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={ handleChange } autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={ handleChange } half />
                            </>
                        ) }
                        <Input name="email" label="Email Address" handleChange={ handleChange } type="email" />
                        <Input name="password" label="Password" handleChange={ handleChange } type={ showPassword ? "text" : "password" } handleShowPassword={ handleShowPassword } />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={ handleChange } type={ showPassword ? "text" : "password" } /> }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={ classes.submit }>{ isSignup ? 'Sign Up' : 'Sign In' }</Button>
                    <Grid container justify="flex-end">
                        <GoogleLogin
                            clientId="712526397564-e0f8s6a799ep0nvs4d9lnmo76ltja28o.apps.googleusercontent.com"
                            render={ ( renderProps ) => (
                                <Button
                                    className={ classes.googleButton }
                                    color="primary"
                                    fullWidth
                                    onClick={ renderProps.onClick }
                                    disabled={ renderProps.disabled }
                                    startIcon={ <Icon /> }
                                    variant="contained"
                                >
                                    Google Sign-in
                                </Button>
                            ) }
                            onSuccess={ googleSuccess }
                            onFailure={ googleFailure }
                            cookiePolicy="single_host_origin"
                        />
                        <Grid item>
                            <Button onClick={ switchMode }>
                                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up?" }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>


        </Container>

    );
};

export default Auth;
