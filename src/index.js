import 'rxjs';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import { EventEmitter } from 'fbemitter';
import {BrowserRouter} from 'react-router-dom';

import App from './components/app';
import rootEpic from './handlers';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epicMiddleware = createEpicMiddleware(rootEpic);
const middleware = composeEnhancers(applyMiddleware(epicMiddleware));
const store = createStore(reducers, {}, middleware);

export const _emitter = new EventEmitter();

const appConfig = {
    prod: {
        mode: "prod",
        baseUrl: "https://digit3.me"
    },

    dev: {
        mode: "dev",
        baseUrl: "http://localhost:1337"
    }
};

window.config = process.env.NODE_ENV === "production" ? appConfig.prod : appConfig.dev;

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));

