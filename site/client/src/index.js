import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

//Containers
import Home from './containers/Home';
import Homepage from './containers/Homepage';
import ComposersContainer from "./containers/ComposersContainer";
import Composers from './components/Composers';
import Tickets from './components/Tickets';
import MuseumMap from './components/Map';
import Music from './components/Music';
import Members from './components/Members';

import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRedirect, IndexRoute, hashHistory } from 'react-router';
import store from './store.js';

import { getComposersByPeriod } from './reducers/composers-reducer'

const onPeriodEnter = (nextRouterState) => {
  store.dispatch(
    getComposersByPeriod(nextRouterState.params.period)
  )
}

ReactDOM.render(
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={hashHistory}>
      <Route path="/" component={ Home }>
        <IndexRedirect to="/palace-of-music" />
        <Route path="/palace-of-music" component={ Homepage }/>
        <Route path="/period" component={ ComposersContainer } />
        <Route path="/period/:period" component={ ComposersContainer } onEnter={onPeriodEnter}/>
        <Route path="museum/tickets" component={ Tickets } />
        <Route path="museum/map" component={ MuseumMap } />
        <Route path="museum/music" component={ Music } />
        <Route path="museum/members" component={ Members } />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
