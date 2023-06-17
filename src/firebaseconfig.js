import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCHrF3lbiNucVNl6znnFM4P8n-IoGKXS2Q",
  authDomain: "prismmvp.firebaseapp.com",
  projectId: "prismmvp",
  storageBucket: "prismmvp.appspot.com",
  messagingSenderId: "53524700392",
  appId: "1:53524700392:web:9b9f25405824747b87bd5d",
  measurementId: "G-CT109HH8BD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
