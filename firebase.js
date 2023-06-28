
import { initializeApp, getApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAtkFLXb0BbP3_sFenysjVijctQn-kZ4gk",
  authDomain: "gifted-chat-app-96dab.firebaseapp.com",
  projectId: "gifted-chat-app-96dab",
  storageBucket: "gifted-chat-app-96dab.appspot.com",
  messagingSenderId: "454306441493",
  appId: "1:454306441493:web:ecd2af4eae736fc662611c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = initializeFirestore(app, {experimentalForceLongPolling: true})

export { db, auth };