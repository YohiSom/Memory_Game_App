import { useState, useEffect, useContext} from 'react';
import "../pages/GamePage.css"
import SingleCard from '../components/SingleCard';
import AuthContext from "../contexes/AuthContext.jsx";
import { sendScore } from "../services/server.js";

const cardImg = [
  {"src":"./img/helmet-1.png", matched: false},
  {"src":"./img/potion-1.png", matched: false},
  {"src":"./img/ring-1.png", matched: false},
  {"src":"./img/scroll-1.png", matched: false},
  {"src":"./img/shield-1.png", matched: false},
  {"src":"./img/sword-1.png", matched: false}
];

function GamePage() {

  const { activeUser, email, setlastScore, lastScore, highestScore} = useContext(AuthContext);

  const[cards, setCards] = useState([]);
  const[turns, setTurns] = useState(0);
  const[userChoise1, setuserChoise1] = useState(null);
  const[userChoise2, setuserChoise2] = useState(null);
  const[disabled,setDisabled] = useState(false)
  const[pairFound, setpairFound] = useState(0)
  
  const shuffle = () =>{
    const shuffledCards = [...cardImg,...cardImg]
      .sort(()=> Math.random()-0.5)
      .map((card)=>({...card, id:Math.random()}));
      setCards(shuffledCards);
      setTurns(0);
      setpairFound(0);
      setuserChoise1(null);
      setuserChoise2(null);
  }

  useEffect(()=>{
    if (userChoise2) {
      setDisabled(true);
    }
    if(userChoise1 && userChoise2){
      if(userChoise1.src===userChoise2.src){
   
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === userChoise1.src){
              return {...card, matched:true};
            } else {
              return card;
            }
          })
        });
        resetTurn();
        //console.log(pairFound);
        let x= pairFound;
        x++;
        //console.log(x);
        setpairFound(x);
      } else {
        resetTurn();
      }
  }
  },[userChoise2]);

  useEffect(()=>{
    shuffle();
  },[])

  useEffect(async ()=>{
    console.log(pairFound);
    if(pairFound==6){
      console.log("you got it");
      setlastScore(turns);
      //const response = await sendScore(email, turns);
    }
  },[pairFound])

  function handleClick(card){
    console.log(card, userChoise1, userChoise2, card.matched);
    userChoise1 ? setuserChoise2(card) : setuserChoise1(card);
  }

  function resetTurn (){
    setTimeout(
      ()=>{
      setuserChoise1(null);
      setuserChoise2(null);
      let turnNo = turns;
      setTurns(++turnNo);
      setDisabled(false)
    }
    , 600)
  }

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="player-details">
          <h2>Player: {activeUser}</h2>
          <h3>Last score: {lastScore}</h3>
          <h3>Best score: {highestScore}</h3>
        </div>
        <div className="game-ctrl">
          <h1>Magic Match</h1>
          <button onClick={shuffle}>New Game</button>
        </div>
      </div>

      <div className="card-grid">
        {cards.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              handleClick={handleClick}
              flipped={card===userChoise1 || card===userChoise2 || card.matched}
              disabled={disabled}
            />
          ))}
      </div>
      <p>Number of turns: {turns}</p>
    </div>
  );
}

export default GamePage