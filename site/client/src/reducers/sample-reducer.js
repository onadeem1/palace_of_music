import axios from 'axios';
import R from 'ramda';

const initialState = {
  allPlayers: [],
};

/* Reducer */

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case LOAD_PLAYERS:
      newState.allPlayers = action.allPlayers;
      break;

    default:
      return state;
  }
  return newState;
};

/* Action Types */
const LOAD_PLAYERS = 'LOAD_PLAYERS';

/* Action Creators */
// export const loadMessage = message => ({ type: CHANGE_MESSAGE, message });

/* Action Dispatchers */
// export const fetchPlayers = () => dispatch => {
//   return axios.get('/players')
//   .then(response => response.data)
//   .then(players => dispatch(loadPlayers(players)))
// };
