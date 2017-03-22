import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

//Containers
import Layout from './containers/layout';

import {Provider} from 'react-redux';
import{ Router, Route, browserHistory, IndexRoute } from 'react-router';
import store from './store.js';


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
       {/*children*/}
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
