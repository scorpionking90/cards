import React from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from './firebase.js'
import { Row, Col, Card } from 'antd';
import 'antd/dist/antd.css';
import Dealer from './Dealer';
import Players from './Players';

class App extends React.Component {

  render() {
    // console.log(this.props.match.params.username);

    return (
      <div>

        <Dealer />

        <Players />
      </div >
    );
  }
}

export default App
