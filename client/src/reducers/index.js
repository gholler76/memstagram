import { combineReducers } from 'redux';
import posts from './posts';
import auth from './auth';

// since key and val are both posts, only keep one and use that as single line
export default combineReducers({ posts, auth })