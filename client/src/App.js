import React from 'react';
import { Container } from '@material-ui/core';
import Navbar from './components/navbar/navbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const App = () => {


    return (
        <Container maxWidth="lg">
            <Navbar />
            <Home />
        </Container>
    );
}

export default App;