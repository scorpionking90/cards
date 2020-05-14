import React from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from './firebase.js'
import { Row, Col, Card, Layout } from 'antd';
import 'antd/dist/antd.css';
import Cards from "./components/Card";
import { deckArray } from "./utils/DeckArray.js";

const { Header, Content, Footer } = Layout;

class Player extends React.Component {
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
            // console.log(players)
            let newState = [];
            for (let player in players) {
                newState.push({
                    id: player,
                    name: players[player].name,
                    point: players[player].point,
                    card1: deckArray.find((element) => {
                        return element.index === players[player].card1;
                    }),
                    card2: deckArray.find((element) => {
                        return element.index === players[player].card2;
                    }),
                })
            }
            this.setState({
                players: newState
            });
        });
    }
    render() {
        // console.log(this.props.match.params.username);
        // console.log(this.props)
        return (
            <div class="playersSection">
                <Row gutter={24} id="render-data">{this.state.players.map((player) => {
                    return (
                        <Col span={6} style={{ padding: "6px" }}>
                            <Card title={player.name} extra={<span>Points: {player.point}</span>} bordered={true} >


                                <p>{player.card}</p>
                                {
                                    (player.card1 && player.card2) ?
                                        (
                                            <div style={{ display: "inline-flex", justifyContent: "center", margin: "0px auto 0px 194px" }}>

                                                <div className="animated slideInUp" key={player.card1}>
                                                    <Cards suits={player.card1.suits} card={player.card1.card} color={player.card1.color} front={true} />
                                                </div>
                                                <div className="animated slideInUp" key={player.card2}>
                                                    <Cards suits={player.card2.suits} card={player.card2.card} color={player.card2.color} front={true} />
                                                </div>


                                            </div>
                                        )
                                        : (<div></div>)
                                }

                            </Card>
                        </Col>
                    )
                })}
                </Row>
            </div>
        );
    }
}

export default Player
