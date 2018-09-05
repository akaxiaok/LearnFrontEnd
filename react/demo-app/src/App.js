import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ErrorBoundary from './ErrorBoundary';
import ForceUpdate from './ForceUpdate';
import axios from 'axios';

class App extends Component {

  async componentDidMount() {
    //load data here

    let data = await axios.get('https://api.github.com/users/octocat/orgs');
    console.log(data);
  }

  render() {
    return (
      <div className="App" >
        <header className="App-header" >
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title" >Welcome to React</h1 >
        </header >
        <p className="App-intro" >
          To get started, edit <code >src/App.js</code > and save to reload.
        </p >
        <ErrorBoundary >
          <ForceUpdate />
        </ErrorBoundary >
      </div >
    );
  }
}

export default App;
