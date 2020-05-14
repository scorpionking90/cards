import React from "react";
import PropTypes from "prop-types";
import { Button } from 'antd';

const ActionsButtons = (props) => {
    console.log(props)
    return (
        <div>
            {
                (props.username === "98765") ?
                    (
                        <div>
                            <div style={{ margin: "40px 20px", textAlign: "center" }}>
                                <Button type="primary" onClick={() => props.shuffle(props.deckArray)} block>Play</Button>
                            </div>
                            <div style={{ margin: "40px 10px", textAlign: "center" }}>
                                <Button type="primary" onClick={() => props.shuffle(props.deckArray)} style={{ marginLeft: "20px" }}>Shuffle</Button>
                                <Button type="primary" onClick={() => props.dealOneCard()} style={{ marginLeft: "20px" }}>Deal</Button>
                                {/* <Button type="primary" onClick={() => props.flip()}>Flip</Button> */}
                            </div>
                            <div style={{ margin: "40px 20px", textAlign: "center" }}>
                                <Button type="primary" onClick={() => props.betOneCard()} block>Bet</Button>
                            </div>
                        </div>
                    )
                    : (<div></div>)
            }
        </div >
    );
};

ActionsButtons.propTypes = {
    shuffle: PropTypes.func,
    dealOneCard: PropTypes.func,
    flip: PropTypes.func,
    deckArray: PropTypes.array,
    betOneCard: PropTypes.func,

};

export default ActionsButtons;