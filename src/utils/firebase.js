// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLoOt_B1hg3RItuK2Jp9t2pCaknhpBfOs",
  authDomain: "badbank-13824.firebaseapp.com",
  projectId: "badbank-13824",
  storageBucket: "badbank-13824.appspot.com",
  messagingSenderId: "734436194243",
  appId: "1:734436194243:web:83f8fdb829b276f1abaf76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);