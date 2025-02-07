import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { auth } from "./firebase.js";

const loginUser = async (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      throw new Error(err);
    });
};

const registerUser = async (
  email,
  password,
  petName,
  petBreed,
  petAge,
  userType
) => {
  try {
    // ====== first signing in to check from the email if it exist ==========
    await signInWithEmailAndPassword(auth, email, password);
    
    // Create user with email & password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Store user details in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: email,
      petName: petName,
      petBreed: petBreed,
      petAge: petAge,
      userType: userType, // Store account type
      createdAt: new Date(),
    });

    console.log("User registered and data saved:", userCredential);
    return userCredential;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export { loginUser, registerUser };
