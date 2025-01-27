
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js'

import { getFirestore} from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js'

import { initializeApp} from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js'




export const firebaseApp = initializeApp({
  apiKey: "AIzaSyDtB-g3WJRS2PigJUdEzj21CjfvxePM8ek",
  authDomain: "dog-breeding-bdca0.firebaseapp.com",
  projectId: "dog-breeding-bdca0",
  storageBucket: "dog-breeding-bdca0.appspot.com", // Fixed typo in `storageBucket`
  messagingSenderId: "263497118120",
  appId: "1:263497118120:web:bdfed3e8a7e703dbc36d9d",
  measurementId: "G-PYKSZNFLXN",
});

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);











