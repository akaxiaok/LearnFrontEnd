import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import Hello from './containers/Hello';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import {Provider} from "react-redux";
import {createStore} from 'redux';
import {EnthusiasmAction} from "./actions";
import {enthusiasm} from './reducers';
import {IStoreState} from './types';

const store = createStore<IStoreState, EnthusiasmAction, null, null>(enthusiasm, {
    enthusiasmLevel: 1,
    languageName: 'TypeScript',
});

ReactDOM.render(
    <Provider store={store}>
        <Hello/>
        <App/>
    </Provider>
    ,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
