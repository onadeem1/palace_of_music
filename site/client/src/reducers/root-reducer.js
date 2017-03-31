import {combineReducers} from 'redux';
import composersReducer from './composers-reducer';

export default combineReducers({
  composers: require('./composers-reducer').default,
  members: require('./visitors-reducer').default
});
