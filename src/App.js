import React from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from './firebase.js'
import { Row, Col, Card } from 'antd';
import 'antd/dist/antd.css';
import Dealer from './Dealer';
import Players from './Players';

import Cards from "./components/Card";
import ActionsButtons from "./components/ActionsButtons";
import { deckArray } from "./utils/DeckArray.js";
import { Layout } from 'antd';
import logo1 from "./style/images/logo_transparent.png";


const { Header, Footer, Sider, Content } = Layout;

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      cardsArray: deckArray,
      cardPicked: [],
      front: true
    };
  };

  shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    };
    this.setState({ cardsArray: array, cardPicked: [] });

    var playerRef = firebase.database().ref('users');
    let players;
    playerRef.on('value', (snapshot) => {
      players = snapshot.val();
    });
    for (var player = 0; player < players.length; player++) {
      var data = {
        card1: "",
        card2: ""
      }
      playerRef.child(player)
        .update(data)
        .then(() => playerRef.once('value'))
        .then(snapshot => snapshot.val())
        .catch(error => ({
          errorCode: error.code,
          errorMessage: error.message
        }));
    }

    var dealerRef = firebase.database().ref('dealer');
    let dealers;
    dealerRef.on('value', (snapshot) => {
      dealers = snapshot.val();
    });
    for (var dealer = 0; dealer < dealers.length; dealer++) {
      var data = {
        card: ""
      }
      dealerRef.child(dealer)
        .update(data)
        .then(() => dealerRef.once('value'))
        .then(snapshot => snapshot.val())
        .catch(error => ({
          errorCode: error.code,
          errorMessage: error.message
        }));
    }
    return array;
  };

  dealOneCard = () => {
    var playerRef = firebase.database().ref('users');
    let cardsArray = this.state.cardsArray;
    let cardsPickedArray = this.state.cardPicked;
    let players;
    playerRef.on('value', (snapshot) => {
      players = snapshot.val();
    });
    console.log(cardsArray)
    for (var player = 0; player < players.length; player++) {
      const randomItem = cardsArray[Math.floor(Math.random() * cardsArray.length)];
      var newCardsArray = cardsArray.filter(element => element.index !== randomItem.index)
      cardsArray = newCardsArray;
      const randomItem1 = cardsArray[Math.floor(Math.random() * cardsArray.length)];
      newCardsArray = cardsArray.filter(element => element.index !== randomItem1.index)
      cardsArray = newCardsArray;

      if (cardsPickedArray.length < 104) {
        cardsPickedArray.push(randomItem);
        cardsPickedArray.push(randomItem1);
      }
      var data = {
        card1: randomItem.index,
        card2: randomItem1.index
      }
      playerRef.child(player)
        .update(data)
        .then(() => playerRef.once('value'))
        .then(snapshot => snapshot.val())
        .catch(error => ({
          errorCode: error.code,
          errorMessage: error.message
        }));
    }
    this.setState({ cardsArray: cardsArray })
    this.setState({ cardPicked: cardsPickedArray })

  };

  betOneCard = () => {

    let cardsArray = this.state.cardsArray;
    console.log(cardsArray)
    const randomItem = cardsArray[Math.floor(Math.random() * cardsArray.length)];
    const newCardsArray = cardsArray.filter(element => element.index !== randomItem.index)
    this.setState({ cardsArray: newCardsArray })
    let cardsPickedArray = this.state.cardPicked;
    cardsPickedArray.length < 104 &&
      cardsPickedArray.push(randomItem);
    this.setState({ cardPicked: cardsPickedArray })

    var dealerRef = firebase.database().ref('dealer');
    let dealers;
    dealerRef.on('value', (snapshot) => {
      dealers = snapshot.val();
    });
    for (var dealer = 0; dealer < dealers.length; dealer++) {
      var data = {
        card: randomItem.index
      }
      dealerRef.child(dealer)
        .update(data)
        .then(() => dealerRef.once('value'))
        .then(snapshot => snapshot.val())
        .catch(error => ({
          errorCode: error.code,
          errorMessage: error.message
        }));
    }
  }

  newGame = () => {
    var playerRef = firebase.database().ref('users');
    let players;
    playerRef.on('value', (snapshot) => {
      players = snapshot.val();
    });
    for (let player in players) {
      var data = {
        point: players[player].point - 10
      }
      playerRef.child(player)
        .update(data)
        .then(() => playerRef.once('value'))
        .then(snapshot => snapshot.val())
        .catch(error => ({
          errorCode: error.code,
          errorMessage: error.message
        }));
    }

    var dealerRef = firebase.database().ref('dealer');
    let dealers;
    dealerRef.on('value', (snapshot) => {
      dealers = snapshot.val();
    });
    for (var dealer = 0; dealer < dealers.length; dealer++) {
      var data = {
        point: players.length * 10
      }
      dealerRef.child(dealer)
        .update(data)
        .then(() => dealerRef.once('value'))
        .then(snapshot => snapshot.val())
        .catch(error => ({
          errorCode: error.code,
          errorMessage: error.message
        }));
    }
  }

  flip = () => {
    this.setState({ front: !this.state.front })
  };
  render() {
    const cardsArray = this.state.cardsArray;
    const cardsPickedArray = this.state.cardPicked;
    return (
      <Layout>

        <Sider style={{
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}>
          <img src={logo1} alt="logo-symbol" style={{ maxWidth: "100%" }} />
          <Dealer newGame={this.newGame} username={this.props.match.params.username} cardsArray={this.state.cardsArray} shuffle={this.shuffle} dealOneCard={this.dealOneCard} betOneCard={this.betOneCard} flip={this.flip} deckArray={deckArray} />
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200, overflow: 'hidden' }}>

          <Content style={{ margin: '24px 16px 0', overflow: 'initial', }}>
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
              <Players cardsPickedArray={this.state.cardPicked} username={this.props.match.params.username} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Between Card Game ©2020 Created by Kiran Kumar S</Footer>
        </Layout>

      </Layout>
    );
  }
}

export default App
