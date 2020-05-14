import React from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from './firebase.js'
import { Row, Col, Card } from 'antd';
import 'antd/dist/antd.css';
import Cards from "./components/Card";
import ActionsButtons from "./components/ActionsButtons";
import { deckArray } from "./utils/DeckArray.js";
import { Typography } from 'antd';

const { Title, Text } = Typography;

class Dealer extends React.Component {
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
                newState.card = deckArray.find((element) => {
                    return element.index === dealers[dealer].card;
                });
            }
            this.setState({
                dealer: newState
            });
        });
    }
    render() {
        // console.log(this.props.match.params.username);
        console.log(this.props.cardsArray);

        return (
            <div>
                {/* <div style={{ width: "100%" }}>
                    <div style={{ display: "flex", justifyContent: "center", margin: "40px auto 0px 180px", height: 282 }}>
                        {this.props.cardsArray && this.props.cardsArray.map((card, index) => {
                            return (
                                <div className="animated slideInDown" key={index}>
                                    <Cards suits={card.suits} card={card.card} color={card.color} front={this.state.front} />
                                </div>
                            );
                        })}
                    </div>
                </div> */}
                <div class="dealerSection">

                    <Title level={4}>Pot Points</Title>
                    <Title level={4} style={{ color: "#da5353" }}>{this.state.dealer.point}</Title>
                    {/* <Title level={5}>{this.state.dealer.point}</Title> */}

                    <ActionsButtons username={this.props.username} shuffle={this.props.shuffle} dealOneCard={this.props.dealOneCard} betOneCard={this.props.betOneCard} flip={this.props.flip} deckArray={this.props.deckArray} />

                    <div class="dealerCenter">
                        <img src={process.env.PUBLIC_URL + '/12-512.webp'} width="100px"></img>
                        <div>
                            <p>{this.state.dealer.name}</p>
                        </div>
                    </div>

                    <div class="dealerRight">
                        <h1>Dealer Card</h1>
                        {
                            (this.state.dealer.card) ?
                                (<div style={{ display: "inline-flex", justifyContent: "center", margin: "0px auto 0px 239px" }}>

                                    <div className="animated slideInUp" key={this.state.dealer.card.index}>
                                        <Cards suits={this.state.dealer.card.suits} card={this.state.dealer.card.card} color={this.state.dealer.card.color} front={true} />
                                    </div>

                                </div>)
                                : (<div></div>)
                        }
                    </div>

                </div>
            </div>
        );
    }
}

export default Dealer
