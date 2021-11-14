// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBBpD-ZQuN9rinh9dPZNg7YCC4oUUujPYY',
    authDomain: 'hackout-3b7b5.firebaseapp.com',
    databaseURL: 'https://hackout-3b7b5-default-rtdb.firebaseio.com',
    projectId: 'hackout-3b7b5',
    storageBucket: 'hackout-3b7b5.appspot.com',
    messagingSenderId: '900939092335',
    appId: '1:900939092335:web:7c167e924fbd3f1193189a',
    measurementId: 'G-EJL61G1M30',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export default db;

