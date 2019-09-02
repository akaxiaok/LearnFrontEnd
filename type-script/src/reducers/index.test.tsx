import {decrementEnthusiasm, incrementEnthusiasm} from '../actions';
import {IStoreState} from "../types";
import enthusiasm from './index';


it('return the correct ', () => {
  const store: IStoreState = {
    data: '',
    enthusiasmLevel: 3,
    languageName: 'en',
  };

  expect(enthusiasm(store, decrementEnthusiasm()).enthusiasmLevel).toEqual(2);

  expect(enthusiasm(store, incrementEnthusiasm()).enthusiasmLevel).toEqual(4);

});
