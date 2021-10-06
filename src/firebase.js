import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDvj1Bj1Cb0bM8hPyauvtSxqLeeaFPBJiA",
    authDomain: "whatsappclone-bddda.firebaseapp.com",
    projectId: "whatsappclone-bddda",
    storageBucket: "whatsappclone-bddda.appspot.com",
    messagingSenderId: "462938359185",
    appId: "1:462938359185:web:4a9eeeea93d581e817c630",
    measurementId: "G-Y50V2Q2NFC"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider()
  export { auth, provider }
  export default db