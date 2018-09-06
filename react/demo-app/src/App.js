import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ErrorBoundary from './ErrorBoundary';
import ForceUpdate from './ForceUpdate';
import axios from 'axios';

class App extends Component {

  handleChange = event => {
    axios.get(`https://api.github.com/users/${event.target.value}`).then(response => {
      if (response.status = 200) {
        this.setState({
          userData: response.data,
          error: {}
        })
      }
    }).catch(error => {
      this.setState({
        error: error
      })
    });
  };

  // If you don’t initialize state and you don’t bind methods,
  // you don’t need to implement a constructor for your React component.
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      error: null,
      time: Date.now(),
    }
  }

  // getDerivedStateFromProps exists for only one purpose.
  // It enables a component to update its internal state as the result of changes in props.
  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }

  // 组件挂载后调用
  // 可以在该函数中进行请求或者订阅
  async componentDidMount() {

    this.interval = setInterval(() => {
      this.setState({
        time: Date.now(),
      })
    }, 10000);

    //load data here
    try {
      let response = await axios.get('https://api.github.com/users/akaxiaok');
      this.setState({
        userData: response.data
      })
    } catch (error) {
      this.setState({
        error
      })
    }
  }

  // 判断是否需要更新组件，多用于组件性能优化
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  // 用于获得最新的 DOM 数据
  // 滚动条位置
  getSnapshotBeforeUpdate(prevProps, prevState) {
    return null;
  }

  // 组件即将销毁
  // 可以在此处移除订阅，定时器等等
  // Perform any necessary cleanup in this method, such as invalidating timers,
  // canceling network requests, or cleaning up any subscriptions that were created in componentDidMount().
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // 组件更新后调用
  // Use this as an opportunity to operate on the DOM when the component has been updated.
  // This is also a good place to do network requests as long as you compare the current props to previous props
  // If your component implements the getSnapshotBeforeUpdate() lifecycle (which is rare),
  // the value it returns will be passed as a third “snapshot” parameter to componentDidUpdate().
  componentDidUpdate(prevProps, prevState, snapshot) {

  }

  render() {
    const { userData, error } = this.state;
    const name = userData.name || 'unknown';
    return (
      <div className="App" >
        <header className="App-header" >
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title" >Welcome to React</h1 >
        </header >
        <input type="text" onChange={this.handleChange} />
        <p >
          {error ? error.toString() : `hello, ${name}`}
        </p >
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
