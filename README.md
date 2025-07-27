# 🍽️ Memoriza el Menú - Aplicación de Aprendizaje

Una aplicación web interactiva para ayudar a los camareros a memorizar el menú del restaurante de forma divertida y efectiva.

## 🎯 Características

### 📖 Modo Estudio
- Revisa todos los platos del menú con calma
- Navega entre platos con botones de anterior/siguiente
- Visualiza imágenes, descripciones, precios y alérgenos
- Consejos para mejorar la memorización

### 🎯 Juego de Memoria
- Encuentra las parejas de platos y precios
- Tarjetas que se voltean con animaciones suaves
- Sistema de puntuación basado en movimientos
- Feedback visual para respuestas correctas/incorrectas

### ❓ Quiz Rápido
- Preguntas de opción múltiple sobre el menú
- Diferentes tipos de preguntas: precios, descripciones, alérgenos, vegetarianismo
- Sistema de puntuación con porcentaje de acierto
- Feedback inmediato con respuestas correctas

## 🚀 Cómo usar

### Instalación
1. Asegúrate de tener Node.js instalado
2. Abre una terminal en la carpeta del proyecto
3. Ejecuta: `npm install`

### Ejecutar la aplicación
```bash
npm start
```

La aplicación se abrirá automáticamente en tu navegador en `http://localhost:3000`

### Construir para producción
```bash
npm run build
```

## 📱 Diseño Responsive

La aplicación está optimizada para:
- **Móviles**: Interfaz táctil con botones grandes
- **Tablets**: Diseño adaptativo con grid flexible
- **Desktop**: Experiencia completa con todas las funciones

## 🎮 Cómo jugar

### Modo Estudio
1. Selecciona "Modo Estudio" en la pantalla principal
2. Usa los botones "Anterior" y "Siguiente" para navegar
3. Lee atentamente nombres, descripciones y precios
4. Presta atención a los iconos de alérgenos

### Juego de Memoria
1. Selecciona "Juego de Memoria"
2. Haz clic en las tarjetas para voltearlas
3. Encuentra las parejas de platos y precios
4. Intenta completar el juego con el menor número de movimientos

### Quiz Rápido
1. Selecciona "Quiz Rápido"
2. Lee cada pregunta cuidadosamente
3. Selecciona la respuesta correcta
4. Revisa tu puntuación final

## 🏆 Sistema de Puntuación

- **Juego de Memoria**: 10 puntos por pareja encontrada
- **Quiz Rápido**: 10 puntos por respuesta correcta
- **Puntuación máxima**: Se guarda automáticamente en el navegador

## 🛠️ Tecnologías utilizadas

- **React 18**: Framework de JavaScript
- **CSS3**: Estilos modernos con gradientes y animaciones
- **LocalStorage**: Guardado de puntuaciones
- **Responsive Design**: Adaptable a todos los dispositivos

## 📝 Personalización

Para agregar más platos al menú, edita el archivo `src/data/menuData.js`:

```javascript
{
  id: 10,
  name: "NUEVO PLATO",
  description: "Descripción del nuevo plato",
  price: "5.00€",
  image: "URL_de_la_imagen",
  allergens: ["gluten"],
  spicy: false,
  vegetarian: true,
  glutenFree: false
}
```

## 🎨 Características visuales

- **Gradientes modernos**: Fondo con degradado púrpura-azul
- **Efectos glassmorphism**: Tarjetas con efecto de cristal
- **Animaciones suaves**: Transiciones y hover effects
- **Iconos intuitivos**: Emojis para mejor comprensión
- **Tipografía clara**: Fuente Inter para mejor legibilidad

## 📱 Uso en móvil

La aplicación es perfecta para usar durante descansos en el trabajo:
- Interfaz táctil optimizada
- Botones grandes y fáciles de tocar
- Navegación intuitiva
- Carga rápida sin conexión a internet

¡Disfruta aprendiendo el menú de forma divertida! 🎉 