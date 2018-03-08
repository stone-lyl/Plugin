import React, { Component } from 'react';
import logo from './logo.svg';
import { Button } from 'antd';
import Login from './login/login';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Login></Login>
      </div>
    );
  }
}

export default App;
