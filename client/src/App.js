import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

export default class App extends Component {
  state = {
    value: '',
  }

  handleInputChange = (e) => {
    this.setState({ value: e.target.value });
  }

  handleSubmit = () => {
    fetch('/api/values', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        value: this.state.value,
      })
    });
    this.setState({ value: '' });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Input a number value to post to the database.
          </p>
          <p>
            Navigate to localhost:4000/api/values/all to view.
          </p>
          <input
            value={ this.state.value }
            onChange={ this.handleInputChange }
          />
          <button onClick={ this.handleSubmit }>Submit</button>
        </header>
      </div>
    );
  }
}
