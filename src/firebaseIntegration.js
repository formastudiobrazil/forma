// firebaseConfig.js
// Este arquivo será preenchido automaticamente pelo App.js

// Exportar um objeto vazio por enquanto
// O App.js vai inicializar o Firebase globalmente

export let db = null;
export let auth = null;

// Função para set o db (chamada do App.js)
export const setFirebaseInstances = (firestoreDb, firebaseAuth) => {
  db = firestoreDb;
  auth = firebaseAuth;
};
