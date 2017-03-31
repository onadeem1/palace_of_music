import axios from 'axios';

const SELECT_COMPOSERS = 'SELECT_COMPOSERS';

const initialState = {
  selectComposers: [],
};

/* Reducer */

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case SELECT_COMPOSERS:
      newState.selectComposers = action.selectedComposers;
      break;

    default:
      return state;
  }
  return newState;
};

/* Action Creators */
export const getComposers = selectedComposers => ({
    type: SELECT_COMPOSERS,
    selectedComposers
})

/* Action Dispatchers */
export const getComposersByPeriod = periodName => {
  console.log('dispatched period', periodName);
  return dispatch => {
    axios.get(`/period/${periodName}`)
      .then(composers => {
        console.log('axios get composers:', composers);
        dispatch(getComposers(composers.data))
      })
  }
}
