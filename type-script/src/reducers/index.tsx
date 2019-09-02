import {combineReducers} from 'redux';

import {EnthusiasmAction} from '../actions';
import {CHANGE_NAME, DECREMENT_ENTHUSIASM, INCREMENT_ENTHUSIASM} from '../constants';

export function enthusiasmLevel(state: number = 0, action: EnthusiasmAction): number {
  switch (action.type) {
    case INCREMENT_ENTHUSIASM:
      return state + action.num;
    case DECREMENT_ENTHUSIASM:
      return Math.max(1, state - action.num);
  }
  return state;
}

export function languageName(state: string = '', action: EnthusiasmAction): string {
  switch (action.type) {
    case CHANGE_NAME:
      return action.languageName;
  }
  return state;
}


export default combineReducers({languageName, enthusiasmLevel});
