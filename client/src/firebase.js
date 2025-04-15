// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBiCyOFuMUEQqfnuzQsVKLXplmN-5cnT4",
  authDomain: "mern-estate-cd818.firebaseapp.com",
  projectId: "mern-estate-cd818",
  storageBucket: "mern-estate-cd818.firebasestorage.app",
  messagingSenderId: "3387558007",
  appId: "1:3387558007:web:ac8d9c1d665584101bde72"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);