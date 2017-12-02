import React from 'react';
import { hashHistory } from 'react-router';
import { Link } from 'react-router-dom'

export default class Hello1 extends React.Component {
  constructor() {
    super();
    this.state = {
      message: 'Hello1!',
      welcome: true
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillUnmount() {
    this.setState({
      welcome: false
    });
  }

  handleClick() {
    hashHistory.push('/emoji');
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to About</h2>
        </div>
        <p className="App-intro">
          Hello Electron!
        </p>
        <Link to="/">Home</Link>
      </div>
    );
  }
}