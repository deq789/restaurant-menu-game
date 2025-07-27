import React, { useState, useEffect } from 'react';
import { menuData } from '../data/menuData';
import './MemoryGame.css';

const MemoryGame = ({ onBack, onScoreUpdate }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const menuItems = menuData['Entrantes y aperitivos'];

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    // Create pairs of cards: dish names and prices
    const cardPairs = [];
    menuItems.forEach((item, index) => {
      cardPairs.push({
        id: `name-${index}`,
        type: 'name',
        content: item.name,
        pairId: index,
        item: item
      });
      cardPairs.push({
        id: `price-${index}`,
        type: 'price',
        content: item.price,
        pairId: index,
        item: item
      });
    });

    // Shuffle the cards
    const shuffledCards = cardPairs.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setScore(0);
    setMoves(0);
    setGameCompleted(false);
    setGameStarted(false);
  };

  const handleCardClick = (cardId) => {
    if (!gameStarted) setGameStarted(true);
    
    const card = cards.find(c => c.id === cardId);
    
    // Don't allow clicking if card is already flipped or matched
    if (flippedCards.includes(cardId) || matchedPairs.includes(card.pairId)) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    // If two cards are flipped, check for a match
    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = cards.find(c => c.id === firstCardId);
      const secondCard = cards.find(c => c.id === secondCardId);

      if (firstCard.pairId === secondCard.pairId) {
        // Match found!
        setMatchedPairs(prev => [...prev, firstCard.pairId]);
        setScore(prev => prev + 10);
        setFlippedCards([]);
        
        // Check if game is completed
        if (matchedPairs.length + 1 === menuItems.length) {
          setGameCompleted(true);
          onScoreUpdate(score + 10);
        }
      } else {
        // No match, flip cards back after a delay
        setTimeout(() => {
          setFlippedCards([]);
        }, 1500);
      }
    }
  };

  const isCardFlipped = (cardId) => {
    return flippedCards.includes(cardId);
  };

  const isCardMatched = (cardId) => {
    const card = cards.find(c => c.id === cardId);
    return matchedPairs.includes(card.pairId);
  };

  return (
    <div className="memory-container">
      <div className="memory-header">
        <button className="btn btn-secondary" onClick={onBack}>
          ← Volver
        </button>
        <h2>🎯 Juego de Memoria</h2>
        <div className="game-stats">
          <span>Puntos: {score}</span>
          <span>Movimientos: {moves}</span>
        </div>
      </div>

      {gameCompleted && (
        <div className="game-completed">
          <div className="card">
            <h3>🎉 ¡Felicidades!</h3>
            <p>Has completado el juego en {moves} movimientos</p>
            <p>Puntuación final: {score} puntos</p>
            <button className="btn" onClick={initializeGame}>
              Jugar de nuevo
            </button>
          </div>
        </div>
      )}

      <div className="memory-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`memory-card ${
              isCardFlipped(card.id) || isCardMatched(card.id) ? 'flipped' : ''
            } ${isCardMatched(card.id) ? 'matched' : ''}`}
            onClick={() => handleCardClick(card.id)}
          >
            <div className="card-inner">
              <div className="card-front">
                <div className="card-back-content">🍽️</div>
              </div>
              <div className="card-back">
                <div className="card-content">
                  {card.type === 'name' ? (
                    <div className="dish-name">{card.content}</div>
                  ) : (
                    <div className="dish-price">{card.content}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="game-instructions">
        <h4>📋 Instrucciones:</h4>
        <p>Encuentra las parejas de platos y precios. Haz clic en las tarjetas para voltearlas.</p>
        <button className="btn btn-secondary" onClick={initializeGame}>
          Reiniciar Juego
        </button>
      </div>
    </div>
  );
};

export default MemoryGame; 