import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button, Chip, Icon } from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import Pagination from '../Pagination';
import { useHistory, useLocation } from 'react-router-dom';
import useStyles from './styles';

function useQuery () {
    return new URLSearchParams( useLocation().search );
}

const Home = () => {
    const [ currentId, setCurrentId ] = useState( 0 );
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get( 'page' ) || 1;
    const searchQuery = query.get( 'searchQuery' );
    const classes = useStyles();
    const [ search, setSearch ] = useState( "" );
    const [ tags, setTags ] = useState( [] );

    // used to dispatch actions
    useEffect( () => {
        dispatch( getPosts() );
    }, [ currentId, dispatch ] );

    const searchPost = () => {
        if ( search.trim() )
        {
            dispatch( getPostsBySearch( { search, tags: tags.join( ',' ) } ) );
        } else
        {
            history.push( '/' );
        }
    };
    const handleKeyPress = ( e ) => {
        if ( e.keycode === 13 )
        {
            searchPost();
        }
    };

    const handleAdd = ( tag ) => setTags( [ ...tags, tag ] );

    const handleDelete = ( tagToDelete ) => setTags( tags.filter( ( tag ) => tag !== tagToDelete ) );

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justify="space-between" alignItems="stretch" spacing={ 3 } className={ classes.gridContainer }>
                    <Grid item xs={ 12 } md={ 9 } sm={ 6 }>
                        <Posts setCurrentId={ setCurrentId } />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 } md={ 3 }>
                        <AppBar className={ classes.appBarSearch } position="static" color="inherit">
                            <TextField
                                name="search"
                                variant="outlined"
                                label="Search"
                                fullWidth
                                onKeyPress={ handleKeyPress }
                                value={ search }
                                onChange={ ( e ) => setSearch( e.target.value ) }
                            />
                            {/* <TextField
                                className={ classes.chipInput }
                                label="Search Tags"
                                onDelete={ handleDelete }
                                onAdd={ handleAdd }
                                value={ tags }
                                {
                                ...tags.map( ( tag, idx ) => {
                                    return (
                                        <Chip key={ idx }
                                            className={ classes.chip }
                                        />
                                    );
                                } )
                                } }
                            /> */}
                            <Button onClick={ searchPost } classname={ classes.searchButton } variant="contained" color="primary">Search</Button>
                        </AppBar>
                        <Form currentId={ currentId } setCurrentId={ setCurrentId } />
                        <Paper elevation={ 6 }>
                            <Pagination />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow >
    );
};

export default Home;