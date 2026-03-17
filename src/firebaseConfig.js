// ═══════════════════════════════════════════════════════════════════════════════
// 🔥 FIREBASE CONFIGURATION - FormaStudio
// ═══════════════════════════════════════════════════════════════════════════════
// Arquivo: src/firebaseConfig.js
// Este arquivo inicializa o Firebase com suas credenciais

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCxRjTUm8npYXjrV0aVGuzUo_PzSpXQEPw",
  authDomain: "formaos-bafad.firebaseapp.com",
  projectId: "formaos-bafad",
  storageBucket: "formaos-bafad.firebasestorage.app",
  messagingSenderId: "219418656334",
  appId: "1:219418656334:web:432ac272547d9e85950d1f"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore (banco de dados)
export const db = getFirestore(app);

// Inicializar Auth (autenticação)
export const auth = getAuth(app);

// Status de inicialização
console.log('✅ Firebase inicializado com sucesso!');
console.log('📱 Projeto:', firebaseConfig.projectId);
