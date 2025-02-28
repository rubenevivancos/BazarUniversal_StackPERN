// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA14WbvRP6fYd8bKMloE54a_rIxy5EQIqo",
  authDomain: "libremercado-d1cd6.firebaseapp.com",
  projectId: "libremercado-d1cd6",
  storageBucket: "libremercado-d1cd6.firebasestorage.app",
  messagingSenderId: "414572571224",
  appId: "1:414572571224:web:1f96bb868943e24fcef82d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;