import * as React from 'react';
import './Hello.css';


export interface IProps {
  name: string;
  enthusiasmLevel: number;
  data?: string;
  loadData: () => void;
  onIncrement?: (n: number) => void;
  onDecrement?: (n: number) => void;
  changeName: (name: string) => void;
}

interface IState {
  currentEnthusiasm: number;
}

class Hello extends React.Component<IProps, IState> {
  public static defaultProps = {
    changeName: () => null,
    enthusiasmLevel: 1,
    loadData: () => null,
  };

  public render(): React.ReactNode {
    const {name, enthusiasmLevel, data} = this.props;

    return (
      <div className="hello">
        <div className="greeting">
          Hello {name + getExclamationMarks(enthusiasmLevel || 0)}
        </div>
        <button onClick={this.handleDecrement}>-</button>
        <button onClick={this.handleIncrement}>+</button>
        <button onClick={this.handleChangeName}>revers</button>
        <button onClick={this.handleLoad}>Load</button>
        <p>
          {data}
        </p>

      </div>
    )
  }

  private handleIncrement = () => {
    const {onIncrement} = this.props;
    if (onIncrement) {
      onIncrement(2);
    }
  };
  private handleDecrement = () => {
    const {onDecrement} = this.props;
    if (onDecrement) {
      onDecrement(2);
    }
  };
  private handleChangeName = () => {
    const {changeName, name} = this.props;
    changeName(name.split('').reverse().join(''));
  };
  private handleLoad = () => {
    this.props.loadData();
  };
}

// helpers

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!');
}

export default Hello;
