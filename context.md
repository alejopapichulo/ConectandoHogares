# Contexto del Proyecto: ConectandoHogares

## Descripción General
**ConectandoHogares** es una plataforma web orientada a la comunidad (específicamente la comunidad de El Cuji) cuyo objetivo es dar a conocer los servicios que ofrecen los individuos locales. La misión principal es fomentar y apoyar la economía local permitiendo a los vecinos contratar y encontrar talento directamente en su área, abarcando desde electricistas hasta traductores o entrenadores personales.

### Stack Tecnológico Base
- **Frontend Estático:** HTML5 puro y semántico.
- **Estilos:** Vanilla CSS (`style.css`), utilizando variables CSS para un tema unificado (colores primarios oscuros, botones verdes, etc.) y un diseño adaptable mediante CSS Grid/Flexbox.
- **Backend / Autenticación:** Firebase v10 (ES Modules).

---

## Modificaciones y Mejoras Recientes

A continuación se detalla el historial de cambios principales realizados para integrar un sistema de cuentas de usuario:

### 1. Implementación de Firebase Authentication
Se configuró el proyecto para soportar el registro y acceso de usuarios mediante **Firebase Auth**, habilitando dos métodos de entrada:
- Correo Electrónico y Contraseña.
- Inicio de sesión con cuenta de Google (Pop-up).

### 2. Creación de la Página de Acceso (`login.html` y `login.css`)
- **Interfaz (UI):** Se desarrolló un formulario dual (que alterna entre "Iniciar Sesión" y "Registro") diseñado con un CSS minimalista (`login.css`). Se ajustaron los colores, botones y bordes para que coincidieran directamente con las "tarjetas de servicios" de la página de inicio, evitando diseños demasiado llamativos o dispares.
- **Lógica (`login.js`):** Se programó la conexión con Firebase Auth. Captura de errores (contraseña débil, correo en uso) y gestión del flujo hacia Google. Al iniciar sesión exitosamente, redirige al instante a la página principal (`index.html`). 
- *Nota técnica:* Se omitió intencionalmente el módulo de Firebase Analytics para evitar bloqueos de CORS al probar el sitio en entornos locales (localhost).

### 3. Estado Global de la Sesión (`auth-state.js`)
- Se implementó un script modular insertado en la página principal (`index.html`) para escuchar activamente si existe un usuario conectado usando `onAuthStateChanged`.

### 4. Actualizaciones a la Navegación Principal (`index.html`)
- **Botón Dinámico:** En el menú superior de navegación, el enlace de acceso cambia de "Iniciar Sesión" a "Cerrar Sesión" de manera automática si Firebase detecta credenciales válidas.
- **Perfil de Usuario (Esquina Superior Derecha):** Se añadió un contenedor dinámico posicionado al extremo derecho del menú. Una vez que el usuario accede, este componente se hace visible mostrando:
  - El nombre del usuario (o la primera parte de su correo electrónico).
  - La fotografía del usuario (extraída de su perfil de Google si se utilizó ese método).
  - Estos elementos están delineados por un separador sutil para integrarse con armonía en el "header".

---

## Instrucciones para Pruebas en Desarrollo
Debido a la seguridad nativa del navegador respecto al uso de Módulos ECMAScript y Firebase Auth, el proyecto **no** debe ejecutarse haciendo doble clic sobre los archivos HTML (`file:///...`). 
Para probar su funcionalidad íntegra localmente, es imprescindible levantar un servidor local, como por ejemplo:
- Extensión "Live Server" de VS Code.
- Comando de Python: `python -m http.server 8000`
