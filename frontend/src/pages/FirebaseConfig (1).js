import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDPv1EZSEeGc95Ae8LeSFBqCzeI1JkqqWA",
  authDomain: "myecom-35403.firebaseapp.com",
  projectId: "myecom-35403",
  storageBucket: "myecom-35403.appspot.com",
  messagingSenderId: "791156849459",
  appId: "1:791156849459:web:24f0e307f74efe23a79c46"
};

const app = initializeApp(firebaseConfig);

const database = getAuth(app)
const txtDB = getFirestore(app)

export {database,txtDB} 