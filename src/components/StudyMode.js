import React, { useState } from 'react';
import { menuData } from '../data/menuData';
import './StudyMode.css';

const StudyMode = ({ onBack }) => {
  const [currentCategory, setCurrentCategory] = useState('PARA PICAR');
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  
  const categories = Object.keys(menuData);
  const menuItems = menuData[currentCategory] || [];

  const nextItem = () => {
    if (menuItems.length > 0) {
      setCurrentItemIndex((prev) => (prev + 1) % menuItems.length);
    }
  };

  const prevItem = () => {
    if (menuItems.length > 0) {
      setCurrentItemIndex((prev) => (prev - 1 + menuItems.length) % menuItems.length);
    }
  };

  const handleCategoryChange = (event) => {
    setCurrentCategory(event.target.value);
    setCurrentItemIndex(0); // Reset item index when category changes
  };

  const currentItem = menuItems[currentItemIndex] || menuItems[0] || null;

  const getAllergenIcons = (item) => {
    const icons = [];
    
    if (!item || !item.allergens) return icons;
    
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
    
    if (item.allergens.includes('dairy')) {
      icons.push(
        <div key="dairy" className="allergen-icon dairy" title="Contiene lácteos">
          🧀
        </div>
      );
    }
    
    if (item.allergens.includes('fish')) {
      icons.push(
        <div key="fish" className="allergen-icon fish" title="Contiene pescado">
          🐟
        </div>
      );
    }
    
    if (item.allergens.includes('meat')) {
      icons.push(
        <div key="meat" className="allergen-icon meat" title="Contiene carne">
          🥩
        </div>
      );
    }
    
    if (item.allergens.includes('poultry')) {
      icons.push(
        <div key="poultry" className="allergen-icon poultry" title="Contiene pollo">
          🍗
        </div>
      );
    }
    
    if (item.allergens.includes('pork')) {
      icons.push(
        <div key="pork" className="allergen-icon pork" title="Contiene cerdo">
          🐷
        </div>
      );
    }
    
    if (item.allergens.includes('nuts')) {
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
    }
    
    if (item.glutenFree) {
      icons.push(
        <div key="glutenFree" className="allergen-icon gluten-free" title="Sin gluten">
          ✅
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
          {menuItems.length > 0 ? `${currentItemIndex + 1} de ${menuItems.length}` : '0 de 0'}
        </div>
      </div>

      <div className="category-selector">
        <label htmlFor="category-select">Seleccionar Categoría:</label>
        <select 
          id="category-select" 
          value={currentCategory} 
          onChange={handleCategoryChange}
          className="category-select"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {currentItem ? (
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
      ) : (
        <div className="study-card">
          <div className="item-content">
            <h3>No hay elementos en esta categoría</h3>
          </div>
        </div>
      )}

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
          <li>Observa detenidamente la imagen del plato</li>
          <li>Lee el nombre y la descripción varias veces</li>
          <li>Presta atención a los alérgenos e iconos</li>
          <li>Asocia los ingredientes con la imagen</li>
          <li>Practica con los otros modos de juego</li>
        </ul>
      </div>
    </div>
  );
};

export default StudyMode; 