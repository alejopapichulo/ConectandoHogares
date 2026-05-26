// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeAmwUkNPzCuu_B8U_kazxFE2Df6xxnGc",
  authDomain: "conectandohogares-d4cb5.firebaseapp.com",
  projectId: "conectandohogares-d4cb5",
  storageBucket: "conectandohogares-d4cb5.firebasestorage.app",
  messagingSenderId: "893010091357",
  appId: "1:893010091357:web:8b53d6824e0d89c90b9cb4",
  measurementId: "G-MM9NPZWQ74"
};

// Initialize Firebase
let app;
let auth;
let googleProvider;

try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
} catch(error) {
    console.error("Error inicializando Firebase", error);
    alert("Error inicializando Firebase. Revisa la consola.");
}

// Verificar si el usuario ya está logueado para redirigirlo a index.html
onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = "index.html";
    }
});

// Referencias a los elementos del DOM
const form = document.getElementById('auth-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');
const submitBtn = document.getElementById('submit-btn');
const googleBtn = document.getElementById('google-login-btn');
const toggleLink = document.getElementById('toggle-link');
const toggleText = document.getElementById('toggle-text');
const formTitle = document.getElementById('form-title');

let isLogin = true;

// Cambiar entre Login y Registro
toggleLink.addEventListener('click', (e) => {
    e.preventDefault();
    isLogin = !isLogin;
    
    if (isLogin) {
        formTitle.textContent = "Iniciar Sesión";
        submitBtn.textContent = "Entrar";
        toggleText.textContent = "¿No tienes cuenta?";
        toggleLink.textContent = "Regístrate aquí";
    } else {
        formTitle.textContent = "Crear Cuenta";
        submitBtn.textContent = "Registrarse";
        toggleText.textContent = "¿Ya tienes cuenta?";
        toggleLink.textContent = "Inicia sesión";
    }
    errorMessage.textContent = "";
});

// Manejar el submit del formulario (Email / Password)
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    
    errorMessage.textContent = "";
    submitBtn.disabled = true;
    submitBtn.textContent = "Cargando...";

    try {
        if (isLogin) {
            // Iniciar sesión
            await signInWithEmailAndPassword(auth, email, password);
            // La redirección la hace el onAuthStateChanged
        } else {
            // Registro
            await createUserWithEmailAndPassword(auth, email, password);
            // La redirección la hace el onAuthStateChanged
        }
    } catch (error) {
        console.error(error);
        if (error.code === 'auth/email-already-in-use') {
            errorMessage.textContent = "El correo ya está en uso.";
        } else if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
            errorMessage.textContent = "Credenciales incorrectas.";
        } else if (error.code === 'auth/weak-password') {
            errorMessage.textContent = "La contraseña debe tener al menos 6 caracteres.";
        } else {
            errorMessage.textContent = "Ocurrió un error. Intenta de nuevo.";
        }
        submitBtn.disabled = false;
        submitBtn.textContent = isLogin ? "Entrar" : "Registrarse";
    }
});

// Manejar login con Google
googleBtn.addEventListener('click', async () => {
    try {
        await signInWithPopup(auth, googleProvider);
        // La redirección la hace el onAuthStateChanged
    } catch (error) {
        console.error(error);
        errorMessage.textContent = "Error al iniciar sesión con Google.";
    }
});
