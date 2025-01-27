// import { initializeApp } from 'firebase/app';

// import { getAuth, onAuthStateChanged} from 'firebase/auth';

// import { getFirestore} from 'firebase/firestore';

// const firebaseApp = initializeApp ({
//   apiKey: "AIzaSyDtB-g3WJRS2PigJUdEzj21CjfvxePM8ek",
//   authDomain: "dog-breeding-bdca0.firebaseapp.com",
//   projectId: "dog-breeding-bdca0",
//   storageBucket: "dog-breeding-bdca0.firebasestorage.app",
//   messagingSenderId: "263497118120",
//   appId: "1:263497118120:web:bdfed3e8a7e703dbc36d9d",
//   measurementId: "G-PYKSZNFLXN"
// });

// const auth = getAuth(firebaseApp);

// const db = getFirestore(firebaseApp);

//detect auth state
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { collection, addDoc, getDocs } from "firebase/firestore";
import { auth, db } from "./scripts/firebase";
onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("logged in!");
  } else {
    console.log("no user");
  }
});
// Sign Up
createUserWithEmailAndPassword(auth, "email@example.com", "password123")
  .then((userCredential) => {
    console.log("User signed up:", userCredential.user);
  })
  .catch((error) => {
    console.error("Error signing up:", error.message);
  });

// Sign In
signInWithEmailAndPassword(auth, "email@example.com", "password123")
  .then((userCredential) => {
    console.log("User signed in:", userCredential.user);
  })
  .catch((error) => {
    console.error("Error signing in:", error.message);
  });

// Add a document
async function addData() {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: "John Doe",
      email: "johndoe@example.com",
    });
    console.log("Document written with ID:", docRef.id);
  } catch (e) {
    console.error("Error adding document:", e);
  }
}

// Fetch all documents
async function fetchData() {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  });
}
