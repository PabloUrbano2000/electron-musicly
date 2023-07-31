// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-s1iK12Quzyml7JYx4jCULqUIlGbvUzk",
  authDomain: "musicfy-electron-dev.firebaseapp.com",
  projectId: "musicfy-electron-dev",
  storageBucket: "musicfy-electron-dev.appspot.com",
  messagingSenderId: "918737393200",
  appId: "1:918737393200:web:da3c513415115c4ecafff5",
};

// Initialize Firebase
export const initFirebase = initializeApp(firebaseConfig);

export const db = getFirestore(initFirebase);
