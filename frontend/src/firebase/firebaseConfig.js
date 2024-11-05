// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApjOKTmNGpFHKN0T9Begyxg8lR0e7uYBc",
  authDomain: "polimovie-5428a.firebaseapp.com",
  projectId: "polimovie-5428a",
  storageBucket: "polimovie-5428a.firebasestorage.app",
  messagingSenderId: "359284284702",
  appId: "1:359284284702:web:e9088a0f177fefcabdfd0f",
  measurementId: "G-0TWV6NY4KE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);