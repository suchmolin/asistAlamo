// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDuayt47gdBv0tymOIrsxSO0YiJEk5Xcc",
  authDomain: "asistalamo.firebaseapp.com",
  projectId: "asistalamo",
  storageBucket: "asistalamo.appspot.com",
  messagingSenderId: "971363088909",
  appId: "1:971363088909:web:f49b7c7263443bc1bab344",
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;
