import React, { useState } from 'react';
import { menuData } from '../data/menuData';
import './StudyMode.css';

const StudyMode = ({ onBack }) => {
  const [currentCategory] = useState('Entrantes y aperitivos');
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  
  const menuItems = menuData[currentCategory];

  const nextItem = () => {
    setCurrentItemIndex((prev) => (prev + 1) % menuItems.length);
  };

  const prevItem = () => {
    setCurrentItemIndex((prev) => (prev - 1 + menuItems.length) % menuItems.length);
  };

  const currentItem = menuItems[currentItemIndex];

  const getAllergenIcons = (item) => {
    const icons = [];
    
    if (item.spicy) {
      icons.push(
        <div key="spicy" className="allergen-icon spicy" title="Picante">
          🔥
        </div>
      );
    }
    
    if (item.allergens.includes('gluten')) {
      icons.push(
        <div key="gluten" className="allergen-icon gluten" title="Contiene gluten">
          🌾
        </div>
      );
    }
    
    if (item.allergens.includes('frutos secos')) {
      icons.push(
        <div key="nuts" className="allergen-icon nuts" title="Contiene frutos secos">
          🥜
        </div>
      );
    }
    
    if (item.vegetarian) {
      icons.push(
        <div key="vegetarian" className="allergen-icon vegetarian" title="Vegetariano">
          🌱
        </div>
      );
    } else {
      icons.push(
        <div key="non-vegetarian" className="allergen-icon non-vegetarian" title="No vegetariano">
          🥩
        </div>
      );
    }
    
    return icons;
  };

  return (
    <div className="study-container">
      <div className="study-header">
        <button className="btn btn-secondary" onClick={onBack}>
          ← Volver
        </button>
        <h2>📖 Modo Estudio - {currentCategory}</h2>
        <div className="progress">
          {currentItemIndex + 1} de {menuItems.length}
        </div>
      </div>

      <div className="study-card">
        <div className="item-image">
          <img src={currentItem.image} alt={currentItem.name} />
        </div>
        
        <div className="item-content">
          <h3 className="item-name">{currentItem.name}</h3>
          <p className="item-description">{currentItem.description}</p>
          <div className="item-price">{currentItem.price}</div>
          
          <div className="allergen-icons">
            {getAllergenIcons(currentItem)}
          </div>
        </div>
      </div>

      <div className="study-controls">
        <button className="btn btn-secondary" onClick={prevItem}>
          ← Anterior
        </button>
        <button className="btn" onClick={nextItem}>
          Siguiente →
        </button>
      </div>

      <div className="study-tips">
        <h4>💡 Consejos para memorizar:</h4>
        <ul>
          <li>Lee el nombre y la descripción varias veces</li>
          <li>Asocia el precio con algo que te ayude a recordarlo</li>
          <li>Presta atención a los alérgenos e iconos</li>
          <li>Practica con los otros modos de juego</li>
        </ul>
      </div>
    </div>
  );
};

export default StudyMode; 