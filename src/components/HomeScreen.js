import React from 'react';
import './HomeScreen.css';

const HomeScreen = ({ onNavigate, score, highScore }) => {
  return (
    <div className="game-container">
      <div className="header">
        <h1>🍽️ Memoriza el Menú</h1>
        <p>¡Aprende todos los platos del restaurante de forma divertida!</p>
        
        <div className="score-display">
          <h3>🏆 Puntuación</h3>
          <p>Actual: {score} puntos | Mejor: {highScore} puntos</p>
        </div>
      </div>

      <div className="menu-options">
        <div className="menu-card" onClick={() => onNavigate('study')}>
          <div className="menu-icon">📖</div>
          <h3>Modo Estudio</h3>
          <p>Revisa todos los platos del menú con calma</p>
        </div>

        <div className="menu-card" onClick={() => onNavigate('memory')}>
          <div className="menu-icon">🎯</div>
          <h3>Juego de Memoria</h3>
          <p>Encuentra las parejas de nombres e imágenes de platos</p>
        </div>

        <div className="menu-card" onClick={() => onNavigate('quiz')}>
          <div className="menu-icon">❓</div>
          <h3>Quiz Rápido</h3>
          <p>Responde preguntas sobre ingredientes y características</p>
        </div>

        <div className="menu-card" onClick={() => onNavigate('composition')}>
          <div className="menu-icon">🧪</div>
          <h3>Composición de Platos</h3>
          <p>Identifica qué ingredientes contiene cada plato</p>
        </div>
      </div>

      <div className="footer">
        <p>¡Perfecto para aprender mientras trabajas!</p>
      </div>
    </div>
  );
};

export default HomeScreen; 