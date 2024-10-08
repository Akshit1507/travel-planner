// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-o_kMecK09G1Uh7ykSsrdzXpTYooSHzY",
  authDomain: "trip-planner-d9d43.firebaseapp.com",
  projectId: "trip-planner-d9d43",
  storageBucket: "trip-planner-d9d43.appspot.com",
  messagingSenderId: "824676684400",
  appId: "1:824676684400:web:785f0c1842d8ffe80edab5",
  measurementId: "G-1M24Z7X0TH",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
