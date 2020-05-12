import React from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from './firebase.js'
import { Row, Col, Card } from 'antd';
import 'antd/dist/antd.css';

class Dealer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            players: []
        }
    }
    componentDidMount() {
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
            </div>
        );
    }
}

export default Dealer
