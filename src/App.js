import GameCarousel from "./components/GameCarousel";
import { ColorRing } from "react-loader-spinner";
import React from "react";

function App() {
/*   const [eplInfo, setEplInfo] = React.useState([{'sport':"epl",'time': "2023-10-24T00:15:00Z", 'arbInfo': {}, 'away': "Fulham", 'home': 
  "Brighton and Hove Albion", 'outcomes': {'awayWinBooky': "TwinSpires", 'homeWinBooky': "Caesars", 'maxAwayWinOdds': 6.25, 'maxHomeWinOdds': 
  1.51, 'tieBooky': "Bovada", 'maxTieOdds': 4.8}}]);
  const [nflInfo, setNflInfo] = React.useState([{'sport':"nfl", 'time': "2023-10-24T00:15:00Z", 'arbInfo': {'totalBet': 1000, 'unbiasBetHome': 500, 'unbiasBetAway': 500, 'unbiasEarnings': 33, 'biasHomeBet': {'biasedBetAmt': 700, 'otherBetAmt': 300},
          'biasAwayBet': {'biasedBetAmt': 900, 'otherBetAmt': 500}}, 'away': "San Francisco 49ers", 'home': 
  "Minnesota Vikings", 'outcomes': {'awayWinBooky': "FanDuel", 'homeWinBooky': "BetRivers", 'maxAwayWinOdds': 3.95, 'maxHomeWinOdds': 1.28}},
  {'sport':"nfl", 'time': "2023-10-24T00:15:00Z", 'arbInfo': {'totalBet': 1000, 'unbiasBetHome': 500, 'unbiasBetAway': 500, 'unbiasEarnings': 33, 'biasHomeBet': {'biasedBetAmt': 700, 'otherBetAmt': 300},
  'biasAwayBet': {'biasedBetAmt': 900, 'otherBetAmt': 500}}, 'away': "San Francisco 49ers", 'home': 
"Minnesota Vikings", 'outcomes': {'awayWinBooky': "FanDuel", 'homeWinBooky': "BetRivers", 'maxAwayWinOdds': 3.95, 'maxHomeWinOdds': 1.28}}]);
  const [nhlInfo, setNhlInfo] = React.useState([]);
  const [nbaInfo, setNbaInfo] = React.useState([]);
  const [arbInfo, setArbInfo] = React.useState([{'sport':"nfl", 'time': "2023-10-24T00:15:00Z", 'arbInfo': {'totalBet': 1000, 'unbiasBetHome': 500, 'unbiasBetAway': 500, 'unbiasEarnings': 33, 'biasHomeBet': {'biasedBetAmt': 700, 'otherBetAmt': 300},
  'biasAwayBet': {'biasedBetAmt': 900, 'otherBetAmt': 500}}, 'away': "San Francisco 49ers", 'home': 
"Minnesota Vikings", 'outcomes': {'awayWinBooky': "FanDuel", 'homeWinBooky': "BetRivers", 'maxAwayWinOdds': 3.95, 'maxHomeWinOdds': 1.28}}]); */

  const [eplInfo, setEplInfo] = React.useState([]);
  const [nflInfo, setNflInfo] = React.useState([]);
  const [nhlInfo, setNhlInfo] = React.useState([]);
  const [nbaInfo, setNbaInfo] = React.useState([]);
  const [mlbInfo, setMlbInfo] = React.useState([]);
  const [arbInfo, setArbInfo] = React.useState([]);
  const [loading, setLoading] = React.useState(true)

  // Use effect once on load up to get a list of the game objects that we need
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const responsesJSON = await Promise.all([
          fetch('https://odds.p.rapidapi.com/v4/sports/soccer_epl/odds?regions=us&oddsFormat=decimal&markets=h2h&dateFormat=iso', {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '76fe66a335msh8b2d9ac803072f2p1cad14jsn3b295dcdecb6',
                'X-RapidAPI-Host': 'odds.p.rapidapi.com'
          }}),
            fetch('https://odds.p.rapidapi.com/v4/sports/americanfootball_nfl/odds?regions=us&oddsFormat=decimal&markets=h2h&dateFormat=iso', {
              method: 'GET',
              headers: {
                  'X-RapidAPI-Key': '76fe66a335msh8b2d9ac803072f2p1cad14jsn3b295dcdecb6',
                  'X-RapidAPI-Host': 'odds.p.rapidapi.com'
          }}),
          fetch('https://odds.p.rapidapi.com/v4/sports/icehockey_nhl/odds?regions=us&oddsFormat=decimal&markets=h2h&dateFormat=iso', {
              method: 'GET',
              headers: {
                  'X-RapidAPI-Key': '76fe66a335msh8b2d9ac803072f2p1cad14jsn3b295dcdecb6',
                  'X-RapidAPI-Host': 'odds.p.rapidapi.com'
          }}),
          fetch('https://odds.p.rapidapi.com/v4/sports/basketball_nba/odds?regions=us&oddsFormat=decimal&markets=h2h&dateFormat=iso', {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '76fe66a335msh8b2d9ac803072f2p1cad14jsn3b295dcdecb6',
                'X-RapidAPI-Host': 'odds.p.rapidapi.com'
          }}),
          fetch('https://odds.p.rapidapi.com/v4/sports/baseball_mlb/odds?regions=us&oddsFormat=decimal&markets=h2h&dateFormat=iso', {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '76fe66a335msh8b2d9ac803072f2p1cad14jsn3b295dcdecb6',
                'X-RapidAPI-Host': 'odds.p.rapidapi.com'
          }})
        ]);
        const [epl, nfl, nhl, nba, mlb] = await Promise.all(responsesJSON.map(r => r.json()));
        let arbs = [];
        let finalEpl = checkThreeOutcomeOdds(epl, "epl")
        finalEpl.forEach(game =>  {
          if (checkThreeOutcomeArb(game)){
            arbs.push(game);
          }
        });
        let finalNfl = checkTwoOutcomeOdds(nfl, "nfl")
        finalNfl.forEach(game =>  {
          if (checkTwoOutcomeArb(game)){
            arbs.push(game);
          }
        });
        let finalNhl = checkTwoOutcomeOdds(nhl, "nhl")
        finalNhl.forEach(game =>  {
          if (checkTwoOutcomeArb(game)){
            arbs.push(game);
          }
        });
        let finalNba = checkTwoOutcomeOdds(nba, "nba")
        finalNba.forEach(game =>  {
          if (checkTwoOutcomeArb(game)){
            arbs.push(game);
          }
        });
        let finalMlb = checkTwoOutcomeOdds(mlb, "mlb")
        finalMlb.forEach(game =>  {
          if (checkTwoOutcomeArb(game)){
            arbs.push(game);
          }
        });
        // console.log(finalEpl, 'epl');
        // console.log(finalNfl, 'nfl');
        // console.log(finalNhl, 'nfl');
        // console.log(finalNba, 'nba');
        // console.log(arbs, 'arbs');
        setEplInfo(finalEpl);
        setNflInfo(finalNfl);
        setNhlInfo(finalNhl);
        setNbaInfo(finalNba);
        setMlbInfo(finalMlb);
        setArbInfo(arbs);
        setLoading(false);
      } catch (err) {
        throw err;
      }
    };
    
    fetchData();
},[]);

  return (
    <div className="App">
      <div className="title">ARB FINDER</div>
      {loading ? <div  style={{display: "flex", justifyContent: "center", alignItems: "flex-start", height: "50vh", marginTop:"100px"}}> <ColorRing colors={['#888888', '#888888', '#888888', '#888888', '#888888']}  /> </div> : <>
        <GameCarousel header="ARB OPPORTUNITIES" info={arbInfo} emptyMessage="There Are Currently No Arb Opportunities"/>
        <GameCarousel header="NFL BEST ODDS" info={nflInfo} emptyMessage="No NFL Info Could Be Found"/>
        <GameCarousel header="NHL BEST ODDS" info={nhlInfo} emptyMessage="No NHL Info Could Be Found"/>
        <GameCarousel header="EPL BEST ODDS" info={eplInfo} emptyMessage="No EPL Info Could Be Found"/>
        <GameCarousel header="MLB BEST ODDS" info={mlbInfo} emptyMessage="No MLB Info Could Be Found"/>
        <GameCarousel header="NBA BEST ODDS" info={nbaInfo} emptyMessage="No NBA Info Could Be Found"/>
      </>}
      
    </div>
  );
}

function checkThreeOutcomeOdds(matchDetails, sport){
    let gameSummaries = [];
    //console.log(`Why error ${matchDetails}, ${sport}`);
    matchDetails.forEach(game => {
        let bookmakers = game['bookmakers'];
        if (bookmakers.length){
            let homeTeam = game['home_team'];
            let awayTeam = game['away_team'];
            let maxTieOdds = bookmakers.reduce((max, game) => (max['markets'][0]['outcomes'].find(obj => obj.name === 'Draw')?.price ?? 0) > (game['markets'][0]['outcomes'].find(obj => obj.name === 'Draw')?.price ?? 0) ? max : game);
            let maxAwayWinOdds = bookmakers.reduce((max, game) => (max['markets'][0]['outcomes'].find(obj => obj.name === awayTeam)?.price ?? 0) > (game['markets'][0]['outcomes'].find(obj => obj.name === awayTeam)?.price ?? 0) ? max : game);
            let maxHomeWinOdds = bookmakers.reduce((max, game) => (max['markets'][0]['outcomes'].find(obj => obj.name === homeTeam)?.price ?? 0) > (game['markets'][0]['outcomes'].find(obj => obj.name === homeTeam)?.price ?? 0) ? max : game);

            let gameSummary = {'sport': sport, 'away' : awayTeam, 'home': homeTeam, 'time': game['commence_time'], 'arbInfo': {}, 'outcomes': {'maxHomeWinOdds' : maxHomeWinOdds['markets'][0]['outcomes'].find(obj => obj.name === homeTeam)['price'],
                'homeWinBooky': maxHomeWinOdds['title'], 'maxAwayWinOdds' : maxAwayWinOdds['markets'][0]['outcomes'].find(obj => obj.name === awayTeam)['price'], 'awayWinBooky' : maxAwayWinOdds['title'], 
                'tieBooky' : maxTieOdds['title'], 'maxTieOdds' : maxTieOdds['markets'][0]['outcomes'].find(obj => obj.name === 'Draw')['price']
            }};

            gameSummaries.push(gameSummary);

            // console.log(`Best Tie odds for ${gameSummary['home']} (H) vs ${gameSummary['away']} (A) : ${gameSummary['outcomes']['tieBooky']} ${gameSummary['outcomes']['maxTieOdds']}`);
            // console.log(`Best Away Win odds for ${gameSummary['home']} (H) vs ${gameSummary['away']} (A) : ${gameSummary['outcomes']['awayWinBooky']} ${gameSummary['outcomes']['maxAwayWinOdds']}`);
            // console.log(`Best Home Win odds for ${gameSummary['home']} (H) vs ${gameSummary['away']} (A) : ${gameSummary['outcomes']['homeWinBooky']} ${gameSummary['outcomes']['maxHomeWinOdds']}`);
        }
    });
    return gameSummaries;
}

function checkThreeOutcomeArb(gameSummary){
  // Now do the arbitrage calc
  let oddsMargin = 1/gameSummary['outcomes']['maxTieOdds'] + 1/gameSummary['outcomes']['maxAwayWinOdds'] + 1/gameSummary['outcomes']['maxHomeWinOdds'];

  //console.log(`Odds Margin for ${gameSummary['away']} vs ${gameSummary['home']} : ${oddsMargin}`);

  if (oddsMargin < 1) {
      console.log("ARBITRAGE OPPURTUNITY DETECTED");
      // calculate the bets to make based on a 1000 total
      let totalBet = 1000;

      let unbiasBetOnHomeTeam = Math.round((totalBet / (1 + gameSummary['outcomes']['maxHomeWinOdds']/gameSummary['outcomes']['maxTieOdds'] + gameSummary['outcomes']['maxHomeWinOdds']/gameSummary['outcomes']['maxAwayWinOdds']))*100) /100;
      let unbiasBetOnAwayTeam = Math.round((totalBet / (1 + gameSummary['outcomes']['maxAwayWinOdds']/gameSummary['outcomes']['maxTieOdds'] + gameSummary['outcomes']['maxAwayWinOdds']/gameSummary['outcomes']['maxHomeWinOdds']))*100) /100;
      let unbiasBetOnTie = totalBet - unbiasBetOnHomeTeam - unbiasBetOnAwayTeam;
      let earnings = Math.round((unbiasBetOnHomeTeam * gameSummary['outcomes']['maxHomeWinOdds'] - totalBet)*100)/100;

      console.log(`Unbias Bet Summary: 
                  Bet ${unbiasBetOnHomeTeam} on ${gameSummary['home']} using ${gameSummary['outcomes']['homeWinBooky']} (${gameSummary['outcomes']['maxHomeWinOdds']}) to win the game \n
                  Bet ${unbiasBetOnAwayTeam} on ${gameSummary['away']} using ${gameSummary['outcomes']['awayWinBooky']} (${gameSummary['outcomes']['maxAwayWinOdds']}) to win the game \n
                  Bet ${unbiasBetOnTie} on tie using ${gameSummary['outcomes']['tieBooky']} (${gameSummary['outcomes']['maxTieOdds']}) \n
                  Earnings will be $${earnings}`);

      let biasedHomeBet = threeOutcomeBiasedBetCalc(totalBet, gameSummary['outcomes']['maxTieOdds'], gameSummary['outcomes']['maxAwayWinOdds']);
      let biasedAwayBet = threeOutcomeBiasedBetCalc(totalBet, gameSummary['outcomes']['maxTieOdds'], gameSummary['outcomes']['maxHomeWinOdds']);
      let biasedTieBet = threeOutcomeBiasedBetCalc(totalBet, gameSummary['outcomes']['maxHomeWinOdds'], gameSummary['outcomes']['maxAwayWinOdds']);

      gameSummary.arbInfo = {'totalBet': totalBet, 'unbiasBetHome': unbiasBetOnHomeTeam, 'unbiasBetAway': unbiasBetOnAwayTeam, 'unbiasBetTie': unbiasBetOnTie, 'unbiasEarnings': earnings, 'biasHomeBet': biasedHomeBet,
       'biasAwayBet': biasedAwayBet, 'biasTieBet': biasedTieBet};
      
      return true;
  } else {
    return false;
  }
}

function checkTwoOutcomeOdds(matchDetails, sport){
  let gameSummaries = [];
  //console.log(`Why error ${matchDetails}, ${sport}`);
  matchDetails.forEach(game => {
      let homeTeam = game['home_team'];
      let awayTeam = game['away_team'];
      let bookmakers = game['bookmakers'];
      if (bookmakers.length){
          let maxAwayWinOdds = bookmakers.reduce((max, game) => max['markets'][0]['outcomes'].find(obj => obj.name === awayTeam)?.price ?? 0 > game['markets'][0]['outcomes'].find(obj => obj.name === awayTeam)?.price ?? 0 ? max : game);
          let maxHomeWinOdds = bookmakers.reduce((max, game) => max['markets'][0]['outcomes'].find(obj => obj.name === homeTeam)?.price ?? 0 > game['markets'][0]['outcomes'].find(obj => obj.name === homeTeam)?.price ?? 0 ? max : game);

          let gameSummary = {'sport': sport, 'away' : awayTeam, 'home': homeTeam, 'time': game['commence_time'], 'arbInfo': {}, 'outcomes': {'maxHomeWinOdds' : maxHomeWinOdds['markets'][0]['outcomes'].find(obj => obj.name === homeTeam)['price'],
              'homeWinBooky': maxHomeWinOdds['title'], 'maxAwayWinOdds' : maxAwayWinOdds['markets'][0]['outcomes'].find(obj => obj.name === awayTeam)['price'], 'awayWinBooky' : maxAwayWinOdds['title']
          }};

          gameSummaries.push(gameSummary);

          // console.log(`Best Away Win odds for ${gameSummary['home']} (H) vs ${gameSummary['away']} (A) : ${gameSummary['outcomes']['awayWinBooky']} ${gameSummary['outcomes']['maxAwayWinOdds']}`);
          // console.log(`Best Home Win odds for ${gameSummary['home']} (H) vs ${gameSummary['away']} (A) : ${gameSummary['outcomes']['homeWinBooky']} ${gameSummary['outcomes']['maxHomeWinOdds']}`);
      }
  });

  return gameSummaries;
}

function checkTwoOutcomeArb(gameSummary){
  // Now do the arbitrage calc
  let oddsMargin = 1/gameSummary['outcomes']['maxAwayWinOdds'] + 1/gameSummary['outcomes']['maxHomeWinOdds'];

  //console.log(`Odds Margin for ${gameSummary['away']} vs ${gameSummary['home']} : ${oddsMargin}`);

  if (oddsMargin < 1) {
      console.log("ARBITRAGE OPPURTUNITY DETECTED");
      // calculate the bets to make based on a 1000 total
      let totalBet = 1000;

      let unbiasBetOnHomeTeam = Math.round((totalBet / (1 + gameSummary['outcomes']['maxHomeWinOdds']/gameSummary['outcomes']['maxAwayWinOdds']))*100) /100;
      let unbiasBetOnAwayTeam = totalBet - unbiasBetOnHomeTeam;
      let earnings = Math.round((unbiasBetOnHomeTeam * gameSummary['outcomes']['maxHomeWinOdds'] - totalBet)*100)/100;

      console.log(`Unbaised Bet Summary: 
      Bet ${unbiasBetOnHomeTeam} on ${gameSummary['home']} using ${gameSummary['outcomes']['homeWinBooky']} (${gameSummary['outcomes']['maxHomeWinOdds']}) to win the game \n
      Bet ${unbiasBetOnAwayTeam} on ${gameSummary['away']} using ${gameSummary['outcomes']['awayWinBooky']} (${gameSummary['outcomes']['maxAwayWinOdds']}) to win the game \n
      Earnings will be $${earnings}`);

      let biasedHomeBet = twoOutcomeBiasedBetCalc(totalBet, gameSummary['outcomes']['maxAwayWinOdds']);
      let biasedAwayBet = twoOutcomeBiasedBetCalc(totalBet, gameSummary['outcomes']['maxHomeWinOdds']);

      gameSummary.arbInfo = {'totalBet': totalBet, 'unbiasBetHome': unbiasBetOnHomeTeam, 'unbiasBetAway': unbiasBetOnAwayTeam, 'unbiasEarnings': earnings, 'biasHomeBet': biasedHomeBet,
       'biasAwayBet': biasedAwayBet};
      
       return true;
  } else {
    return false;
  }
}

function twoOutcomeBiasedBetCalc(betAmt, otherOdds){
  // TODO: find earnings
  let otherBetAmt = betAmt/otherOdds;
  return {'biasedBetAmt': betAmt - otherBetAmt, 'otherBetAmt': otherBetAmt}
}

function threeOutcomeBiasedBetCalc(betAmt, otherOdds1, otherOdds2){
  let otherBetAmt1 = betAmt/otherOdds1;
  let otherBetAmt2 = betAmt/otherOdds2
  return {'biasedBetAmt': betAmt - otherBetAmt1 - otherBetAmt2, 'otherBetAmt1': otherBetAmt1, 'otherBetAmt2': otherBetAmt2}
}

export default App;


/* TODO:
- could add biased bet info too
*/