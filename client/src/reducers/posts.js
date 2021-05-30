// accept state and action and perform logic
import { FETCH_ALL, DELETE, CREATE, UPDATE, LIKE } from '../constants/actionTypes';
// state must be something, in this case empty array for posts to be stored
export default (posts = [], action) => {
    switch (action.type) {
        case DELETE:
            return posts.filter((post) => post._id != action.payload);
        case UPDATE:
        case LIKE:
            return posts.map((post) => post._id == action.payload._id ? action.payload : post);
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...posts, action.payload];
        default:
            return posts;
    }
}