import React, { useState, useEffect } from 'react';
import { menuData } from '../data/menuData';
import './QuizGame.css';

const QuizGame = ({ onBack, onScoreUpdate }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [totalQuestions] = useState(10);

  const menuItems = menuData['Entrantes y aperitivos'];

  useEffect(() => {
    generateQuestions();
  }, []);

  const generateQuestions = () => {
    const questionTypes = [
      {
        type: 'price',
        generate: (item) => ({
          question: `¿Cuál es el precio de "${item.name}"?`,
          correctAnswer: item.price,
          options: generatePriceOptions(item.price),
          item: item
        })
      },
      {
        type: 'description',
        generate: (item) => ({
          question: `¿Qué plato es: "${item.description}"?`,
          correctAnswer: item.name,
          options: generateNameOptions(item.name),
          item: item
        })
      },
      {
        type: 'allergens',
        generate: (item) => ({
          question: `¿Cuál de estos alérgenos NO contiene "${item.name}"?`,
          correctAnswer: getMissingAllergen(item),
          options: generateAllergenOptions(item),
          item: item
        })
      },
      {
        type: 'vegetarian',
        generate: (item) => ({
          question: `¿Es "${item.name}" un plato vegetariano?`,
          correctAnswer: item.vegetarian ? 'Sí' : 'No',
          options: ['Sí', 'No'],
          item: item
        })
      }
    ];

    const generatedQuestions = [];
    const shuffledItems = [...menuItems].sort(() => Math.random() - 0.5);

    for (let i = 0; i < totalQuestions; i++) {
      const item = shuffledItems[i % shuffledItems.length];
      const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      generatedQuestions.push(questionType.generate(item));
    }

    setQuestions(generatedQuestions);
  };

  const generatePriceOptions = (correctPrice) => {
    const prices = menuItems.map(item => item.price);
    const options = [correctPrice];
    
    while (options.length < 4) {
      const randomPrice = prices[Math.floor(Math.random() * prices.length)];
      if (!options.includes(randomPrice)) {
        options.push(randomPrice);
      }
    }
    
    return options.sort(() => Math.random() - 0.5);
  };

  const generateNameOptions = (correctName) => {
    const names = menuItems.map(item => item.name);
    const options = [correctName];
    
    while (options.length < 4) {
      const randomName = names[Math.floor(Math.random() * names.length)];
      if (!options.includes(randomName)) {
        options.push(randomName);
      }
    }
    
    return options.sort(() => Math.random() - 0.5);
  };

  const generateAllergenOptions = (item) => {
    const allAllergens = ['gluten', 'frutos secos', 'lactosa', 'huevos'];
    const itemAllergens = item.allergens;
    const missingAllergen = allAllergens.find(allergen => !itemAllergens.includes(allergen));
    
    return [missingAllergen, ...itemAllergens].sort(() => Math.random() - 0.5);
  };

  const getMissingAllergen = (item) => {
    const allAllergens = ['gluten', 'frutos secos', 'lactosa', 'huevos'];
    return allAllergens.find(allergen => !item.allergens.includes(allergen));
  };

  const handleAnswerSelect = (answer) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const isCorrect = answer === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 10);
    }
    
    setTimeout(() => {
      setSelectedAnswer(null);
      setShowResult(false);
      
      if (currentQuestion + 1 < totalQuestions) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        setGameCompleted(true);
        onScoreUpdate(score + (isCorrect ? 10 : 0));
      }
    }, 2000);
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameCompleted(false);
    generateQuestions();
  };

  if (questions.length === 0) {
    return <div>Cargando...</div>;
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <button className="btn btn-secondary" onClick={onBack}>
          ← Volver
        </button>
        <h2>❓ Quiz Rápido</h2>
        <div className="quiz-stats">
          <span>Pregunta: {currentQuestion + 1}/{totalQuestions}</span>
          <span>Puntos: {score}</span>
        </div>
      </div>

      {gameCompleted ? (
        <div className="game-completed">
          <div className="card">
            <h3>🎉 ¡Quiz Completado!</h3>
            <p>Puntuación final: {score} de {totalQuestions * 10} puntos</p>
            <p>Porcentaje: {Math.round((score / (totalQuestions * 10)) * 100)}%</p>
            <button className="btn" onClick={restartGame}>
              Jugar de nuevo
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="question-card">
            <h3 className="question-text">{currentQ.question}</h3>
            
            <div className="options-grid">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  className={`option-btn ${
                    selectedAnswer === option
                      ? option === currentQ.correctAnswer
                        ? 'correct'
                        : 'incorrect'
                      : ''
                  } ${showResult && option === currentQ.correctAnswer ? 'correct' : ''}`}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </button>
              ))}
            </div>

            {showResult && (
              <div className={`result-message ${selectedAnswer === currentQ.correctAnswer ? 'correct' : 'incorrect'}`}>
                {selectedAnswer === currentQ.correctAnswer ? '✅ ¡Correcto!' : '❌ Incorrecto'}
                <p>Respuesta correcta: {currentQ.correctAnswer}</p>
              </div>
            )}
          </div>

          <div className="quiz-instructions">
            <h4>📋 Instrucciones:</h4>
            <p>Responde las preguntas sobre los platos del menú. Cada respuesta correcta vale 10 puntos.</p>
            <button className="btn btn-secondary" onClick={restartGame}>
              Reiniciar Quiz
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default QuizGame; 