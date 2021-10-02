// Import the functions you need from the SDKs you need
import { initializeApp  } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
//import * as admin from "firebase-admin";
//import * as serviceAccount from "C:/voice-shopping-list-eeerock-firebase-adminsdk-h69yt-28810fb857.json";
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from './private.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const app = initializeApp(firebaseConfig());
const db = getFirestore(app);
const analytics = getAnalytics(app);
export default db;
/*
admin.initializeApp({ //add secure
  credential: admin.credential.cert(serviceAccount)
}); */