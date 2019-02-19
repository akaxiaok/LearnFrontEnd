import * as React from 'react';
import './Hello.css';


export interface IProps {
    name: string;
    enthusiasmLevel?: number;
    onIncrement?: () => void;
    onDecrement?: () => void;
}

interface IState {
    currentEnthusiasm: number;
}

class Hello extends React.Component<IProps, IState> {
    public render(): React.ReactNode {
        const {name, onDecrement, onIncrement, enthusiasmLevel} = this.props;

        return (
            <div className="hello">
                <div className="greeting">
                    Hello {name + getExclamationMarks(enthusiasmLevel || 0)}
                </div>
                <button onClick={onDecrement}>-</button>
                <button onClick={onIncrement}>+</button>
            </div>
        )
    }


}

// helpers

function getExclamationMarks(numChars: number) {
    return Array(numChars + 1).join('!');
}

export default Hello;
