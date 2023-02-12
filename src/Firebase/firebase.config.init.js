// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCegz6VY2zd-SP2bkFUnd7oGnUrffUO_cI",
  authDomain: "expensetracker-dce86.firebaseapp.com",
  projectId: "expensetracker-dce86",
  storageBucket: "expensetracker-dce86.appspot.com",
  messagingSenderId: "1018509882011",
  appId: "1:1018509882011:web:e7062c2d0e3bac236f8c3e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app