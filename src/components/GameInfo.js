import React from "react";
import Dialog from '@mui/material/Dialog';
import { DialogContent } from "@mui/material";

function GameInfo(props){
    const [open, setOpen] = React.useState(false);
    console.log(props);
    let isArb = Object.keys(props.arbInfo).length !== 0;

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = (value) => {
        setOpen(false);
    };
    return (
        <div className="game-info">
            {props.time.split("T")[0]}
            <div className="team-info">
                <div className={props.outcomes['tieBooky'] ? "outcome-info-three": "outcome-info-two"}>
                    <img className="team-logo" src={process.env.PUBLIC_URL + `/${props.sport}Logos/${props.away}.png`} ></img>
                    <p>{props.away}</p>
                    <p>{props.outcomes['maxAwayWinOdds']}</p>
                </div>
                {props.outcomes['tieBooky'] && <div className="outcome-info-three">
                        <img className="tie-logo" src={process.env.PUBLIC_URL + `/tie.png`} ></img>
                        <p>Tie</p>
                        <p>{props.outcomes['maxTieOdds']}</p>
                    </div>}
                <div className={props.outcomes['tieBooky'] ? "outcome-info-three": "outcome-info-two"}>
                    <img className="team-logo" src={process.env.PUBLIC_URL + `/${props.sport}Logos/${props.home}.png`} ></img>
                    <p>{props.home}</p>
                    <p>{props.outcomes['maxHomeWinOdds']}</p>
                </div>
            </div>
            <button className="detail-button" onClick={handleClickOpen}>Details</button>
            <Dialog onClose={handleClose} open={open}>
                <DialogContent>
                    <div className="modal">
                        <div className="header"> 
                            {props.time.split("T")[0]}
                            <div className="team-info">
                                <div className={props.outcomes['tieBooky'] ? "outcome-info-three": "outcome-info-two"}>
                                    <img className="team-logo" src={process.env.PUBLIC_URL + `/${props.sport}Logos/${props.away}.png`} ></img>
                                    <p>{props.away}</p>
                                </div>
                                {props.outcomes['tieBooky'] && <div className="outcome-info-three">
                                        <img className="tie-logo" src={process.env.PUBLIC_URL + `/tie.png`} ></img>
                                        <p>Tie</p>
                                    </div>}
                                <div className={props.outcomes['tieBooky'] ? "outcome-info-three": "outcome-info-two"}>
                                    <img className="team-logo" src={process.env.PUBLIC_URL + `/${props.sport}Logos/${props.home}.png`} ></img>
                                    <p>{props.home}</p>
                                </div>
                            </div>
                        </div>
                        <div className="content">
                            Max Away Team Odds: {props.outcomes['maxAwayWinOdds']}
                            <br></br>
                            Away Team Sportsbook: {props.outcomes['awayWinBooky']}
                            <br></br>
                            Max Home Team Odds: {props.outcomes['maxHomeWinOdds']}
                            <br></br>
                            Home Team Sportsbook: {props.outcomes['homeWinBooky']}
                            <br></br>
                            {props.outcomes['tieBooky'] ? `Max Tie Odds: ${props.outcomes['maxTieOdds']}` : ""}
                            {props.outcomes['tieBooky'] && <br></br>}
                            {props.outcomes['tieBooky'] ? `Tie Sportsbook: ${props.outcomes['tieBooky']}` : ""}
                            {props.outcomes['tieBooky'] && <br></br>}
                            {isArb ? `Total Bet: $${props.arbInfo['totalBet']}` : ""}
                            {isArb && <br></br>}
                            {isArb ? `Unbias Bet On Home: $${props.arbInfo['unbiasBetHome']}` : ""}
                            {isArb && <br></br>}
                            {isArb ? `Unbias Bet On Away: $${props.arbInfo['unbiasBetAway']}` : ""}
                            {isArb && props.outcomes['tieBooky'] && <br></br>}
                            {isArb && props.outcomes['tieBooky'] ? `Unbias Bet On Tie: $${props.arbInfo['unbiasBetTie']}` : ""}
                            {isArb && <br></br>}
                            {isArb ? `Unbias Earnings: $${props.arbInfo['unbiasEarnings']}` : ""}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default GameInfo;