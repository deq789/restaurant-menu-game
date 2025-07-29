import React, { useState, useEffect } from 'react';
import { menuData } from '../data/menuData';
import './CompositionGame.css';

const CompositionGame = ({ onNavigate, onScoreUpdate }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  // Flatten all menu items from all categories
  const allMenuItems = Object.values(menuData).flat();

  // Common ingredients that appear in the menu
  const commonIngredients = [
    'mozzarella', 'tomate', 'jamón', 'queso', 'pollo', 'carne', 'bacon', 'salame',
    'atún', 'aceitunas', 'champiñones', 'cebolla', 'albahaca', 'orégano', 'parmesano',
    'provolone', 'ricotta', 'gorgonzola', 'mortadella', 'panceta', 'chorizo',
    'pimientos', 'berenjena', 'rúcula', 'lechuga', 'maíz', 'pasta', 'patatas',
    'focaccia', 'pesto', 'salsa de tomate', 'mayonesa', 'ketchup', 'trufa'
  ];

  const [currentDish, setCurrentDish] = useState(null);
  const [availableIngredients, setAvailableIngredients] = useState([]);

  useEffect(() => {
    if (gameStarted && !gameEnded) {
      generateQuestion();
    }
  }, [currentQuestion, gameStarted]);

  const generateQuestion = () => {
    const randomDish = allMenuItems[Math.floor(Math.random() * allMenuItems.length)];
    setCurrentDish(randomDish);

    // Extract ingredients from dish description
    const description = randomDish.description.toLowerCase();
    const dishIngredients = commonIngredients.filter(ingredient => 
      description.includes(ingredient)
    );

    // Add some random ingredients that are NOT in the dish
    const notInDish = commonIngredients.filter(ingredient => 
      !description.includes(ingredient)
    );
    
    const randomFalseIngredients = notInDish
      .sort(() => 0.5 - Math.random())
      .slice(0, 6 - dishIngredients.length);

    const allOptions = [...dishIngredients, ...randomFalseIngredients]
      .sort(() => 0.5 - Math.random());

    setAvailableIngredients(allOptions);
    setSelectedIngredients([]);
    setFeedback('');
    setShowFeedback(false);
  };

  const handleIngredientClick = (ingredient) => {
    if (ingredient === 'ninguno') {
      // If "ninguno" is clicked, clear all other selections
      setSelectedIngredients(['ninguno']);
    } else {
      // If another ingredient is clicked, remove "ninguno" if it was selected
      let newSelection = selectedIngredients.filter(i => i !== 'ninguno');
      
      if (selectedIngredients.includes(ingredient)) {
        setSelectedIngredients(newSelection.filter(i => i !== ingredient));
      } else {
        setSelectedIngredients([...newSelection, ingredient]);
      }
    }
  };

  const checkAnswer = () => {
    const description = currentDish.description.toLowerCase();
    const correctIngredients = commonIngredients.filter(ingredient => 
      description.includes(ingredient)
    );

    let points = 0;
    let feedbackText = '';

    // Check if "ninguno" was selected
    if (selectedIngredients.includes('ninguno')) {
      if (correctIngredients.length === 0) {
        // Correct: dish has no ingredients from the list
        points = 30;
        feedbackText = '¡Correcto! Este plato no contiene ninguno de los ingredientes de la lista. +30 puntos!';
      } else {
        // Incorrect: dish has ingredients but "ninguno" was selected
        points = -10;
        feedbackText = `Incorrecto. Este plato contiene: ${correctIngredients.join(', ')}`;
      }
    } else {
      // Normal ingredient selection logic
      const correctSelected = selectedIngredients.filter(ingredient => 
        correctIngredients.includes(ingredient)
      );
      
      const incorrectSelected = selectedIngredients.filter(ingredient => 
        !correctIngredients.includes(ingredient)
      );

      const missedIngredients = correctIngredients.filter(ingredient => 
        !selectedIngredients.includes(ingredient)
      );

      // Points for correct selections
      points += correctSelected.length * 10;
      
      // Penalty for incorrect selections
      points -= incorrectSelected.length * 5;
      
      // Bonus for getting all correct
      if (correctSelected.length === correctIngredients.length && incorrectSelected.length === 0) {
        points += 20;
        feedbackText = '¡Perfecto! Has identificado todos los ingredientes correctamente. +20 puntos extra!';
      } else {
        feedbackText = `Correctos: ${correctSelected.length}, Incorrectos: ${incorrectSelected.length}`;
        if (missedIngredients.length > 0) {
          feedbackText += `, Faltaron: ${missedIngredients.join(', ')}`;
        }
      }
    }

    setScore(score + Math.max(0, points));
    setFeedback(feedbackText);
    setShowFeedback(true);

    setTimeout(() => {
      if (currentQuestion < 9) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setGameEnded(true);
        onScoreUpdate(score + Math.max(0, points));
      }
    }, 5000);
  };

  const startGame = () => {
    setGameStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setGameEnded(false);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameEnded(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedIngredients([]);
    setFeedback('');
    setShowFeedback(false);
  };

  if (!gameStarted) {
    return (
      <div className="composition-game">
        <div className="game-header">
          <h1>🧪 Composición de Platos</h1>
          <p>Identifica qué ingredientes contiene cada plato</p>
        </div>
        
        <div className="game-instructions">
          <h3>📋 Instrucciones:</h3>
          <ul>
            <li>Observa la imagen del plato</li>
            <li>Selecciona todos los ingredientes que contiene</li>
            <li>Si no contiene ninguno, selecciona "Ninguno"</li>
            <li>+10 puntos por ingrediente correcto</li>
            <li>-5 puntos por ingrediente incorrecto</li>
            <li>+20 puntos extra si aciertas todos</li>
            <li>+30 puntos si seleccionas "Ninguno" correctamente</li>
          </ul>
        </div>

        <div className="game-controls">
          <button className="start-btn" onClick={startGame}>
            🚀 Comenzar Juego
          </button>
          <button className="back-btn" onClick={() => onNavigate('home')}>
            ← Volver al Menú
          </button>
        </div>
      </div>
    );
  }

  if (gameEnded) {
    return (
      <div className="composition-game">
        <div className="game-header">
          <h1>🏁 ¡Juego Terminado!</h1>
          <p>Puntuación final: {score} puntos</p>
        </div>

        <div className="game-controls">
          <button className="start-btn" onClick={resetGame}>
            🔄 Jugar de Nuevo
          </button>
          <button className="back-btn" onClick={() => onNavigate('home')}>
            ← Volver al Menú
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="composition-game">
      <div className="game-header">
        <h2>🧪 Composición de Platos</h2>
        <div className="game-info">
          <span>Pregunta {currentQuestion + 1}/10</span>
          <span>Puntuación: {score}</span>
        </div>
        <button className="menu-btn" onClick={() => onNavigate('home')}>
          🏠 Menú Principal
        </button>
      </div>

      {currentDish && (
        <div className="question-container">
          <div className="dish-info">
            <h3>{currentDish.name}</h3>
            <div className="dish-image">
              <img src={currentDish.image} alt={currentDish.name} />
            </div>
          </div>

          <div className="ingredients-section">
            <h4>¿Qué ingredientes contiene este plato?</h4>
            <div className="ingredients-grid">
              {availableIngredients.map((ingredient, index) => (
                <button
                  key={index}
                  className={`ingredient-btn ${
                    selectedIngredients.includes(ingredient) ? 'selected' : ''
                  }`}
                  onClick={() => handleIngredientClick(ingredient)}
                >
                  {ingredient}
                </button>
              ))}
              <button
                className={`ingredient-btn ${
                  selectedIngredients.includes('ninguno') ? 'selected' : ''
                }`}
                onClick={() => handleIngredientClick('ninguno')}
              >
                Ninguno
              </button>
            </div>
          </div>

          <div className="game-controls">
            <button 
              className="check-btn" 
              onClick={checkAnswer}
              disabled={selectedIngredients.length === 0}
            >
              ✅ Verificar Respuesta
            </button>
          </div>

          {showFeedback && (
            <div className="feedback">
              <p>{feedback}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CompositionGame;