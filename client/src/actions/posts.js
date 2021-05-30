// import everything as an api from the folder, in this case all the posts 
import * as api from '../api'

// action creators for functions that will return actions
// in this case, type is followed by payload, which is the data specified
// because action is async, thunk is used to call the additional function
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        // with thunk, dispatch is the actual return of the action in a function call 
        dispatch({ type: 'FETCH_ALL', payload: data });
    }
    catch (error) {
        console.log(error)
    }

}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: 'CREATE', payload: data });
    }
    catch {
        console.log('error');
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({ type: 'UPDATE', payload: data });
    }
    catch (error) {
        console.log(error);

    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: 'DELETE', payload: id });
    }
    catch (error) {
        console.log(error);

    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({ type: 'LIKE', payload: data });
    }
    catch (error) {
        console.log(error);

    }
}
