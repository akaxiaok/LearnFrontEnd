import React, { Component } from 'react';

class ForceUpdate extends Component {
  // attention the use of => function, otherwise need bind
  forceUpdateHandler = () => {
    this.forceUpdate(() => {
      console.log(this.random.innerText);
    });
  };
  forceError = () => {
    this.setState({ err: 'force err' })
  };

  constructor(props) {
    super(props);
    this.state = {
      err: ''
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    console.log('render run');
    if (this.state.err) {
      throw new Error(this.state.err);
    }
    return (
      <div >
        <button onClick={this.forceUpdateHandler} >force update</button >
        <br />
        <button onClick={this.forceError} >force error</button >
        <div ref={ref => this.random = ref} >{Math.random()}</div >
      </div >
    )
  }
}

export default ForceUpdate;