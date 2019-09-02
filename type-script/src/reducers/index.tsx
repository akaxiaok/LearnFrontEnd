import {combineReducers} from 'redux';

import {EnthusiasmAction} from '../actions';
import * as constants from '../constants';

export function enthusiasmLevel(state: number = 0, action: EnthusiasmAction): number {
  switch (action.type) {
    case constants.INCREMENT_ENTHUSIASM:
      return state + action.num;
    case constants.DECREMENT_ENTHUSIASM:
      return Math.max(1, state - action.num);
  }
  return state;
}

export function languageName(state: string = '', action: EnthusiasmAction): string {
  switch (action.type) {
    case constants.CHANGE_NAME:
      return action.languageName;
  }
  return state;
}

function data(state: string = '', action: any): string {
  switch (action.type) {
    case constants.SHOW_DATA:
      return action.data;
    case constants.LOADING:
      return 'LOADING...';
  }
  return state;
}

export default combineReducers({languageName, enthusiasmLevel, data});
