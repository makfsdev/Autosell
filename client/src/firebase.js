import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDD7AdQ54wj2nOyhzhof6PpZ7COFX60dCg",
  authDomain: "autosell-41621.firebaseapp.com",
  projectId: "autosell-41621",
  storageBucket: "autosell-41621.appspot.com",
  messagingSenderId: "1087708280157",
  appId: "1:1087708280157:web:a57a1c36f8d79fc771a4b4",
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;
