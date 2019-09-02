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
