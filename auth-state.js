// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const authLink = document.getElementById('auth-link');
const userInfoItem = document.getElementById('user-info-item');
const userNameDisplay = document.getElementById('user-name-display');
const userAvatar = document.getElementById('user-avatar');

onAuthStateChanged(auth, (user) => {
    if (user) {
        // Usuario logueado
        authLink.textContent = "Cerrar Sesión";
        authLink.href = "#";
        
        // Mostrar información del usuario
        userInfoItem.style.display = 'flex';
        const displayName = user.displayName || user.email.split('@')[0];
        userNameDisplay.textContent = displayName;
        
        if (user.photoURL) {
            userAvatar.src = user.photoURL;
            userAvatar.style.display = 'block';
        } else {
            userAvatar.style.display = 'none';
        }

        authLink.addEventListener('click', (e) => {
            e.preventDefault();
            signOut(auth).then(() => {
                // Redirigir a login al cerrar sesión
                window.location.href = "login.html";
            }).catch((error) => {
                console.error("Error al cerrar sesión", error);
            });
        });
    } else {
        // Usuario no logueado
        authLink.textContent = "Iniciar Sesión";
        authLink.href = "login.html";
        
        if (userInfoItem) {
            userInfoItem.style.display = 'none';
        }
    }
});
