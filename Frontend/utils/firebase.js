// utils/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "hmsystem-63cad.firebaseapp.com",
  projectId: "hmsystem-63cad",
  storageBucket: "hmsystem-63cad.firebasestorage.app",
  messagingSenderId: "100053112818",
  appId: "1:100053112818:web:e4a953895e6dba747e7d6b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
