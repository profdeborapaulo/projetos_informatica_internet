import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDiKG5FJ4GoOPkzcdOqVAe74TYXIbLH4QI",
  authDomain: "projeto-petmap.firebaseapp.com",
  projectId: "projeto-petmap",
  storageBucket: "projeto-petmap.firebasestorage.app",
  messagingSenderId: "249876975042",
  appId: "1:249876975042:web:da5b795e9a33186b325a5b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);