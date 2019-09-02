import {connect} from 'react-redux';
import * as actions from '../actions/';
import Hello from '../components/Hello';
import {IStoreState} from '../types';


export function mapStateToProps({data, enthusiasmLevel, languageName}: IStoreState) {
  return {
    data,
    enthusiasmLevel,
    name: languageName,
  }
}

export function mapDispatchToProps(dispatch: any) {
  return {
    changeName: (name: string) => dispatch(actions.changeName(name)),
    loadData: () => dispatch(actions.loadData()),
    onDecrement: (n: number) => dispatch(actions.decrementEnthusiasm(n)),
    onIncrement: (n: number) => dispatch(actions.incrementEnthusiasm(n)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello);
