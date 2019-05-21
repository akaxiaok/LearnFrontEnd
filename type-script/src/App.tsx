import * as React from 'react';
import './App.css';

import logo from './logo.svg';

const Memo = React.memo(function MyMemo(props: { value: number }) {

  // tslint:disable-next-line:no-console
  console.log('run memo');
  const value = props.value;
  return (<div>
    {value}
  </div>);
});


// import() is ECMAScript proposal. it returns a Promise
const Big = React.lazy(() => import('./components/Big'));
const Suspense = React.Suspense;


class App extends React.Component {
  public static value: number = 1;
  public state = {
    value: 1
  };

  public componentDidMount(): void {
    setInterval(() => {
      this.setState({value: 1});
    }, 1000);
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Memo value={this.state.value}/>
        <Suspense fallback={<div>Loading...</div>}>
          <Big/>
        </Suspense>
      </div>
    );
  }
}

export default App;
