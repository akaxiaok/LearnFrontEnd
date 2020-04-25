import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import Hello from './containers/Hello';
import './index.css';
import logger from './middleware/logger';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';


const store = createStore(reducers, {
  enthusiasmLevel: 1,
  languageName: 'TypeScript',
}, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <Hello/>
    <App/>
  </Provider>
  ,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
