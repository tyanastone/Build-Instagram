import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBIH4jc7tLRVXUjx4RLD0dRDiYkGMSyzTk",
    authDomain: "photo-feed-2b514.firebaseapp.com",
    databaseURL: "https://photo-feed-2b514.firebaseio.com",
    projectId: "photo-feed-2b514",
    storageBucket: "photo-feed-2b514.appspot.com",
    messagingSenderId: "889097135236",
    appId: "1:889097135236:web:165ecc085dc47dc2"
  };
  // Initialize Firebase
  firebase.initializeApp(config);

  export const f = firebase;
  export const database = firebase.database();
  export const auth = firebase.auth();
  export const storage = firebase.storage();