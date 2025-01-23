import { initializeApp } from 'firebase/app';

import { getAuth, onAuthStateChanged} from 'firebase/auth';

import { getFirestore} from 'firebase/firestore';

const firebaseApp = initializeApp ({
  apiKey: "AIzaSyDtB-g3WJRS2PigJUdEzj21CjfvxePM8ek",
  authDomain: "dog-breeding-bdca0.firebaseapp.com",
  projectId: "dog-breeding-bdca0",
  storageBucket: "dog-breeding-bdca0.firebasestorage.app",
  messagingSenderId: "263497118120",
  appId: "1:263497118120:web:bdfed3e8a7e703dbc36d9d",
  measurementId: "G-PYKSZNFLXN"
});

const auth = getAuth(firebaseApp);

const db = getFirestore(firebaseApp);

//detect auth state
onAuthStateChanged(auth, user => {
    if(user != null ){
        console.log('logged in!');
    } else {
        console.log('no user');
    }
});
