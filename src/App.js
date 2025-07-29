import React, { useState } from 'react';
import './App.css';
import HomeScreen from './components/HomeScreen';
import MemoryGame from './components/MemoryGame';
import StudyMode from './components/StudyMode';
import QuizGame from './components/QuizGame';
import CompositionGame from './components/CompositionGame';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    localStorage.getItem('menuGameHighScore') || 0
  );

  const updateScore = (newScore) => {
    setScore(newScore);
    if (newScore > highScore) {
      setHighScore(newScore);
      localStorage.setItem('menuGameHighScore', newScore.toString());
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'memory':
        return <MemoryGame onBack={() => setCurrentScreen('home')} onScoreUpdate={updateScore} />;
      case 'study':
        return <StudyMode onBack={() => setCurrentScreen('home')} />;
      case 'quiz':
        return <QuizGame onBack={() => setCurrentScreen('home')} onScoreUpdate={updateScore} />;
      case 'composition':
        return <CompositionGame onNavigate={setCurrentScreen} onScoreUpdate={updateScore} />;
      default:
        return (
          <HomeScreen 
            onNavigate={setCurrentScreen}
            score={score}
            highScore={highScore}
          />
        );
    }
  };

  return (
    <div className="App">
      {renderScreen()}
    </div>
  );
}

export default App; 