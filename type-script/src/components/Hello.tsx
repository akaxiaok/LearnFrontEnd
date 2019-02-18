import * as React from 'react';
import './Hello.css';

export interface IProps {
    name: string;
    enthusiasmLevel?: number;
}

interface IState {
    currentEnthusiasm: number;
}

class Hello extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        const {enthusiasmLevel} = props;
        let currentEnthusiasm = 0;
        if (enthusiasmLevel) {
            currentEnthusiasm = enthusiasmLevel;
        } else if (enthusiasmLevel === 0) {
            currentEnthusiasm = 0
        } else {
            currentEnthusiasm = 1;
        }
        this.state = {currentEnthusiasm};
    }

    public render(): React.ReactNode {
        const {name} = this.props;
        if (this.state.currentEnthusiasm <= 0) {
            throw new Error('You could be a little more enthusiastic. :D');
        }
        return (
            <div className="hello">
                <div className="greeting">
                    Hello {name + getExclamationMarks(this.state.currentEnthusiasm)}
                </div>
                <button onClick={this.onDecrement}>-</button>
                <button onClick={this.onIncrement}>+</button>
            </div>
        )
    }

    protected onIncrement = () => this.updateEnthusiasm(this.state.currentEnthusiasm + 1);
    protected onDecrement = () => this.updateEnthusiasm(this.state.currentEnthusiasm - 1);


    private updateEnthusiasm(currentEnthusiasm: number) {
        this.setState({currentEnthusiasm});
    }
}

// helpers

function getExclamationMarks(numChars: number) {
    return Array(numChars + 1).join('!');
}

export default Hello;
