// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUo13V1GSpzdgxo3onp9suNZZU_kiCUP8",
  authDomain: "todo-app-3c5a9.firebaseapp.com",
  projectId: "todo-app-3c5a9",
  storageBucket: "todo-app-3c5a9.appspot.com",
  messagingSenderId: "850622538550",
  appId: "1:850622538550:web:89b54af958f98c95ba8997"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db=getFirestore(app)