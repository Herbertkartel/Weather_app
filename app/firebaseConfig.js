// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAYSlmiyO2Ms_CIGBZh3RtsZGDT8p8GLA",
  authDomain: "weather-app-a406d.firebaseapp.com",
  projectId: "weather-app-a406d",
  storageBucket: "weather-app-a406d.appspot.com",
  messagingSenderId: "895344823397",
  appId: "1:895344823397:web:9147ced7e37e1fbdf1ca8c",
  measurementId: "G-7NGFYC1DNK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);