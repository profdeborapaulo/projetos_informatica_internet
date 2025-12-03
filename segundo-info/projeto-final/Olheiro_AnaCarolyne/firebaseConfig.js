// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxS-MHWB_PCENxyaiZxfMbun8bwjbRtzY",
  authDomain: "olheiroderotas.firebaseapp.com",
  projectId: "olheiroderotas",
  storageBucket: "olheiroderotas.firebasestorage.app",
  messagingSenderId: "422900994173",
  appId: "1:422900994173:web:ca953a736a2ed00b21a114"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
