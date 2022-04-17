import React from 'react';
import "../components/SingleCard.css";

function SingleCard({card, handleClick, flipped, disabled}) {
  
  function chooseCard(){
    if(!disabled){
      handleClick(card)
    }
  }
    
  return (
        <div className="card">
            <div className = {flipped ? "flipped" : ""}>
              <img className="front" key={card.id} src={card.src} alt="card front"/>
              <img 
                className="back"
                src="./img/cover.png"
                onClick={chooseCard}
                alt="card back"
              />
            </div>
        </div>
  );
}

export default SingleCard;