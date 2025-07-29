# 🚀 Guía de Despliegue - Restaurant Menu Game

## Opción 1: Vercel (Recomendado - Gratis y Fácil)

### Paso 1: Crear cuenta en Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Regístrate con tu cuenta de GitHub, GitLab o Bitbucket
3. Es completamente gratuito

### Paso 2: Conectar tu repositorio
1. En Vercel, haz clic en "New Project"
2. Conecta tu repositorio de GitHub (si no lo tienes, súbelo primero)
3. Selecciona el repositorio `restaurant-menu-game`

### Paso 3: Configurar el proyecto
- **Framework Preset**: Create React App
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`

### Paso 4: Desplegar
1. Haz clic en "Deploy"
2. Espera 2-3 minutos
3. ¡Tu app estará online!

### Paso 5: Configurar acceso restringido (Opcional)
Para que solo tú puedas acceder:

1. Ve a tu proyecto en Vercel
2. Ve a "Settings" → "Password Protection"
3. Activa "Password Protection"
4. Establece una contraseña
5. Solo tú tendrás acceso con la contraseña

## Opción 2: Netlify (Alternativa gratuita)

### Paso 1: Crear cuenta en Netlify
1. Ve a [netlify.com](https://netlify.com)
2. Regístrate con GitHub

### Paso 2: Desplegar
1. Arrastra la carpeta `build` (después de ejecutar `npm run build`)
2. O conecta tu repositorio de GitHub
3. Configura:
   - Build command: `npm run build`
   - Publish directory: `build`

### Paso 3: Proteger con contraseña
1. Ve a "Site settings" → "Access control"
2. Activa "Password protection"
3. Establece una contraseña

## Opción 3: GitHub Pages (Gratis)

### Paso 1: Preparar el proyecto
```bash
npm install --save-dev gh-pages
```

### Paso 2: Agregar scripts al package.json
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
  "homepage": "https://tuusuario.github.io/restaurant-menu-game"
}
```

### Paso 3: Desplegar
```bash
npm run deploy
```

## 🔒 Protección de Acceso

### Método 1: Contraseña (Recomendado)
- Usa la protección por contraseña de Vercel/Netlify
- Solo tú tendrás acceso

### Método 2: Dominio personalizado
- Compra un dominio barato ($10-15/año)
- Configúralo en Vercel/Netlify
- Solo tú sabrás la URL

### Método 3: Subdominio secreto
- Usa un subdominio difícil de adivinar
- Ejemplo: `restaurant-game-xyz123.vercel.app`

## 📱 Acceso desde móvil y computadora

Una vez desplegado:
- **Computadora**: Ve a la URL de tu app
- **Móvil**: Abre el navegador y ve a la misma URL
- **PWA**: La app funciona como una aplicación nativa

## 🎯 Recomendación Final

**Usa Vercel** porque:
- ✅ Completamente gratuito
- ✅ Muy fácil de configurar
- ✅ Despliegue automático
- ✅ Protección por contraseña incluida
- ✅ Excelente rendimiento
- ✅ Soporte para PWA

¿Necesitas ayuda con algún paso específico?