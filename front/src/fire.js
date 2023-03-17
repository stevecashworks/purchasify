// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import dotenv from 'dotenv'
dotenv.config()

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration



// configure my environment variables

const firebaseConfig = {
    apiKey:process.env.REACT_APP_API_KEY,
  authDomain: "purchasify-c180d.firebaseapp.com",
  projectId: "purchasify-c180d",
  storageBucket: "purchasify-c180d.appspot.com",
  messagingSenderId: "1085049497729",
  appId: "1:1085049497729:web:76039fa4471ad07f658580"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp