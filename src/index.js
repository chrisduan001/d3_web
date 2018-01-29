import 'rxjs';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import { EventEmitter } from 'fbemitter';

import App from './components/app';
import rootEpic from './handlers';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epicMiddleware = createEpicMiddleware(rootEpic);
const middleware = composeEnhancers(applyMiddleware(epicMiddleware));
const store = createStore(reducers, {}, middleware);

export const _emitter = new EventEmitter();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.querySelector('.container'));

