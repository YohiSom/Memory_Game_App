import { useState, useEffect } from 'react';
import "../pages/GamePage.css"
import SingleCard from '../components/SingleCard';

const cardImg = [
  {"src":"./img/helmet-1.png", matched: false},
  {"src":"./img/potion-1.png", matched: false},
  {"src":"./img/ring-1.png", matched: false},
  {"src":"./img/scroll-1.png", matched: false},
  {"src":"./img/shield-1.png", matched: false},
  {"src":"./img/sword-1.png", matched: false}
];

function GamePage() {

  const[cards, setCards] = useState([]);
  const[turns, setTurns] = useState(0);
  const[userChoise1, setuserChoise1] = useState(null);
  const[userChoise2, setuserChoise2] = useState(null);
  const[disabled,setDisabled] = useState(false)
  
  const shuffle = () =>{
    const shuffledCards = [...cardImg,...cardImg]
      .sort(()=> Math.random()-0.5)
      .map((card)=>({...card, id:Math.random()}));
      setCards(shuffledCards);
      setTurns(0);
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
      } else {
        resetTurn();
      }
  }
  },[userChoise2]);

  useEffect(()=>{
    shuffle();
  },[])

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
      <h1>Magic Match</h1>
      <button onClick={shuffle}>New Game</button>

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