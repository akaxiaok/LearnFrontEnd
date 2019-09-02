import * as constants from '../constants';


export interface IIncrementEnthusiasm {
  type: constants.INCREMENT_ENTHUSIASM;
  num: number;
}

export interface IDecrementEnthusiasm {
  type: constants.DECREMENT_ENTHUSIASM;
  num: number;
}

export interface IChangeName {
  languageName: string,
  type: constants.CHANGE_NAME
}

export type EnthusiasmAction = IIncrementEnthusiasm | IDecrementEnthusiasm | IChangeName;

export function incrementEnthusiasm(num: number = 1): IIncrementEnthusiasm {
  return {
    num,
    type: constants.INCREMENT_ENTHUSIASM,
  }
}

export function decrementEnthusiasm(num: number = 1): IDecrementEnthusiasm {
  return {
    num,
    type: constants.DECREMENT_ENTHUSIASM
  }
}

export function changeName(languageName: string = ''): IChangeName {
  return {
    languageName,
    type: constants.CHANGE_NAME
  }
}

export function showData(json: string) {
  return {
    data: json,
    type: constants.SHOW_DATA,
  }
}

export function showLoading() {
  return {
    type: constants.LOADING
  }
}

export function loadData() {
  return (dispatch: any) => {
    dispatch(showLoading());
    return fetch('https://api.github.com/users/akaxiaok',
      {
        headers: new Headers({'Content-type': 'application/json'}),
        method: 'GET',
      }).then(res => res.json()).then(json => {
      setTimeout(() => {
        dispatch(showData(json.id));
      }, 1000)
    })
  }
}
