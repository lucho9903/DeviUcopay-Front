// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTNz_FMCEpyMJkizPHpk3g3stYWdFI7tk",
  authDomain: "front-doo.firebaseapp.com",
  projectId: "front-doo",
  storageBucket: "front-doo.appspot.com",
  messagingSenderId: "1066816143814",
  appId: "1:1066816143814:web:82280b6c075c9880c732c7"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;
