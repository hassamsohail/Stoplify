// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,} from 'firebase/auth'
import {getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';
import {getMessaging,} from 'firebase/messaging'
import firebase from 'firebase/compat/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqtH647fnZ48XixzfblEkcou04k_3CBSY",
  authDomain: "stoplify.firebaseapp.com",
  databaseURL: "https://stoplify-default-rtdb.firebaseio.com",
  projectId: "stoplify",
  storageBucket: "stoplify.appspot.com",
  messagingSenderId: "980636741523",
  appId: "1:980636741523:web:5b375adc0ab93c41a04266",
  measurementId: "G-X4PS8ST8S1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const firestore=getFirestore(app)
const storage=getStorage(app);
if(!firebase.app.length){
  firebase.initializeApp(firebaseConfig)
}
export {auth,firestore,storage,firebase}