import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCvHniUXKpQTlMUdBdEarIZLrFUBG_oqeo",
    authDomain: "tik-tok-clone-3d4ff.firebaseapp.com",
    projectId: "tik-tok-clone-3d4ff",
    storageBucket: "tik-tok-clone-3d4ff.appspot.com",
    messagingSenderId: "789153873626",
    appId: "1:789153873626:web:6e131ee5e56420291cefe3",
    measurementId: "G-3GKE97JJTS"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


export default db;