import axios from 'axios';

const CREATE_VISITOR = 'CREATE_VISITOR';
const RETRIEVE_VISITORS = 'RETRIEVE_VISITORS';

const initialState = {
  visitor: [],
  allVisitors: []
};

/* Reducer */

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case CREATE_VISITOR:
      newState.visitor = action.createdVisitor;
      break;
    case RETRIEVE_VISITORS:
      newState.allVisitors = action.allVisitors;
      break;
    default:
      return state;
  }
  return newState;
};

/* Action Creators */
export const newVisitor = createdVisitor => ({
  type: CREATE_VISITOR,
  createdVisitor
})

export const getAllVistors = allVisitors => ({
  type: RETRIEVE_VISITORS,
  allVisitors
})

/* Action Dispatchers */
export const checkVisitor = (firstName, lastName) => {
  return dispatch => {
    axios.post(`/museum/members/${firstName}/${lastName}`)
      .then(visitor => {
        dispatch(newVisitor(visitor.data))
      })
  }
}

export const retrieveVisitors = () => {
  return dispatch => {
    axios.get(`/museum/members`)
      .then(visitors => {
        dispatch(getAllVistors(visitors.data))
      })
      .catch(console.error)
  }
}
