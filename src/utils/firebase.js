// Firebase Configuration
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCxRjTUm8npYXjrVOaVGuzUo_PzSpXQEPw",
  authDomain: "formaos-bafad.firebaseapp.com",
  projectId: "formaos-bafad",
  storageBucket: "formaos-bafad.appspot.com",
  messagingSenderId: "631256789012",
  appId: "1:631256789012:web:abc123def456"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
