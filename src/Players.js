import React from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from './firebase.js'
import { Row, Col, Card, Layout, Button } from 'antd';
import 'antd/dist/antd.css';
import Cards from "./components/Card";
import { deckArray } from "./utils/DeckArray.js";
import { Typography } from 'antd';
import { Redirect, Route } from "react-router-dom";
import ErrorPage from './ErrorPage'

const { Title, Text, Paragraph } = Typography;
const { Header, Content, Footer } = Layout;


class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [],
            str: 'This is an editable text.'
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
                    userId: players[player].id,
                    name: players[player].name,
                    point: players[player].point,
                    card1: deckArray.find((element) => {
                        return element.index === players[player].card1;
                    }),
                    card2: deckArray.find((element) => {
                        return element.index === players[player].card2;
                    }),
                    flip: players[player].flip
                })
            }
            this.setState({
                players: newState
            });
        });

    }

    pointsChange = (str, key) => {
        // console.log('Content change:', str, key);
        var playerRef = firebase.database().ref('users');
        let players;
        playerRef.on('value', (snapshot) => {
            players = snapshot.val();
        });

        var data = {
            point: str
        }
        playerRef.child(key)
            .update(data)
            .then(() => playerRef.once('value'))
            .then(snapshot => snapshot.val())
            .catch(error => ({
                errorCode: error.code,
                errorMessage: error.message
            }));


    };

    flipCard = (key) => {
        // console.log(key)
        var playerRef = firebase.database().ref('users');
        let players;
        playerRef.on('value', (snapshot) => {
            players = snapshot.val();
        });
        // console.log(players[key])
        var data = {
            flip: !players[key].flip
        }
        playerRef.child(key)
            .update(data)
            .then(() => playerRef.once('value'))
            .then(snapshot => snapshot.val())
            .catch(error => ({
                errorCode: error.code,
                errorMessage: error.message
            }));
    }
    render() {
        return (
            <div class="playersSection">
                <Row gutter={24} id="render-data">{this.state.players.map((player) => {
                    return (
                        <Col span={6} style={{ padding: "6px" }}>
                            <Card title={player.name}
                                extra={
                                    <span>
                                        <Text>Points: </Text>
                                        {
                                            (this.props.username === "98765") ?
                                                <Text editable={{ onChange: (str) => this.pointsChange(str, player.id) }}>{player.point}</Text>
                                                :
                                                <Text >{player.point}</Text>
                                        }
                                    </span>
                                } bordered={true} >

                                {
                                    (this.props.username === "98765") ?
                                        <Button type="primary" onClick={() => this.flipCard(player.id)}>{player.flip === false ? "Flip" : "Unflip"}</Button>

                                        :
                                        ""
                                }
                                {
                                    (player.card1 && player.card2) ?
                                        (
                                            <div class="playerCards" style={{ display: "inline-flex", justifyContent: "center" }}>

                                                <div className="animated slideInUp" key={player.card1}>
                                                    <Cards suits={player.card1.suits} card={player.card1.card} color={player.card1.color} front={(this.props.username === player.userId || this.props.username == "98765" || player.flip === true) ? true : false} />
                                                </div>
                                                <div className="animated slideInUp" key={player.card2}>
                                                    <Cards suits={player.card2.suits} card={player.card2.card} color={player.card2.color} front={(this.props.username === player.userId || this.props.username == "98765" || player.flip === true) ? true : false} />
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
            </div >
        );
    }
}

export default Player
