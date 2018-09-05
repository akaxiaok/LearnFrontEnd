import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, info) {
    this.setState({
      error,
      info,
    });
  }

  render() {
    if (this.state.error) {
      return (
        <React.Fragment >
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.info.componentStack}
          </details>
        </ React.Fragment >
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
