import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCQlXSzmWqCEbMlYfrnpXN94SSptqLN1Vw",
    authDomain: "cards-a38e1.firebaseapp.com",
    databaseURL: "https://cards-a38e1.firebaseio.com",
    projectId: "cards-a38e1",
    storageBucket: "cards-a38e1.appspot.com",
    messagingSenderId: "174794250733",
    appId: "1:174794250733:web:250ecb555d4347528d2fe4",
    measurementId: "G-3BD13RS5K5"
};

firebase.initializeApp(firebaseConfig);
export default firebase;