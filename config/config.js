import firebase from 'firebase';

//Api details


  const config = {
    apiKey: "AIzaSyDq1sdfM-H08LgtTvV-8jlpsX67GWq6lV0",
    authDomain: "myfirstproject-cbf39.firebaseapp.com",
    databaseURL: "https://myfirstproject-cbf39.firebaseio.com",
    projectId: "myfirstproject-cbf39",
    storageBucket: "myfirstproject-cbf39.appspot.com",
    messagingSenderId: "181780268917"
  };
 
firebase.initializeApp(config)

export const f = firebase;
export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
