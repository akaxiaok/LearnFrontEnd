import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import * as actions from '../actions/';
import Hello from '../components/Hello';
import {IStoreState} from '../types';


export function mapStateToProps({enthusiasmLevel, languageName}: IStoreState) {
  return {
    enthusiasmLevel,
    name: languageName,
  }
}

export function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
  return {
    changeName: (name: string) => dispatch(actions.changeName(name)),
    onDecrement: (n: number) => dispatch(actions.decrementEnthusiasm(n)),
    onIncrement: (n: number) => dispatch(actions.incrementEnthusiasm(n)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello);
