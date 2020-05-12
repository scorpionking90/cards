import React from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from './firebase.js'
import { Row, Col, Card } from 'antd';
import 'antd/dist/antd.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dealer: {
        name: "",
        point: "",
        card: ""
      },

      players: []
    }
  }
  componentDidMount() {
    const dealerRef = firebase.database().ref('dealer');
    dealerRef.on('value', (snapshot) => {
      let dealers = snapshot.val();
      let newState = {};
      for (let dealer in dealers) {
        newState.id = dealer;
        newState.name = dealers[dealer].name;
        newState.point = dealers[dealer].point;
        newState.card = dealers[dealer].card;
      }
      this.setState({
        dealer: newState
      });
    });

    const playerRef = firebase.database().ref('users');
    playerRef.on('value', (snapshot) => {
      let players = snapshot.val();
      let newState = [];
      for (let player in players) {
        newState.push({
          id: player,
          name: players[player].name,
          point: players[player].point,
          card1: players[player].card1,
          card2: players[player].card2
        })
      }
      this.setState({
        players: newState
      });
    });
  }
  render() {
    // console.log(this.props.match.params.username);

    return (
      <div>

        <div class="dealerSection">
          <Row>
            <Col span={8}>
              <div class="dealerLeft">
                <h1>Pot Money</h1>
                <h6>{this.state.dealer.point}</h6>
              </div>
            </Col>
            <Col span={8}>
              <div class="dealerCenter">
                <p>Dealer</p>
                <img src={process.env.PUBLIC_URL + '/12-512.webp'} width="100px"></img>
                <div>
                  <p>{this.state.dealer.name}</p>
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div class="dealerRight">
                <h1>Dealer Card</h1>
                <h6>{this.state.dealer.card}</h6>
              </div>
            </Col>
          </Row>
        </div>

        <div class="playersSection">
          <Row gutter={24} id="render-data">{this.state.players.map((player) => {
            return (
              <Col span={4} style={{ width: 240 }}>
                <Card title={player.name} bordered={true} style={{ width: 300 }}>
                  <p>{player.point}</p>
                  <p>{player.card}</p>
                </Card>
              </Col>
            )
          })}
          </Row>
        </div>
      </div >
    );
  }
}

export default App
