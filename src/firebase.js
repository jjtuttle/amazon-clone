import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBKc14sijlekNA6_e-qJvcPYP7KRTvpDUk",
    authDomain: "clone-e8984.firebaseapp.com",
    projectId: "clone-e8984",
    storageBucket: "clone-e8984.appspot.com",
    messagingSenderId: "151318214873",
    appId: "1:151318214873:web:9c5c0f9e3d69a6f87466c8",
    measurementId: "G-ZKH8ZCHVX7"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export  {auth, db};