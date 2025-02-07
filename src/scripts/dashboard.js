import { auth, db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Function to fetch user details
const fetchUserDetails = async (userId) => {
    try {
        console.log("Fetching data for user:", userId);
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data();
            console.log("User details:", userData);

            document.getElementById("user-name").innerText = userData.fullName;
            document.getElementById("user-email").innerText = userData.email;
        } else {
            alert("No user details found. Redirecting to login...");
            window.location.href = "login.html"; // ✅ Redirect if user data is missing
        }
    } catch (error) {
        console.error("Error fetching user details:", error);
    }
};

// Function to check authentication and fetch user data
const checkAuthAndFetchUser = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("User authenticated:", user.uid);
            fetchUserDetails(user.uid);
        } else {
            console.warn("No user logged in. Redirecting to login...");
            window.location.href = "login.html"; // ✅ Redirect if no user is logged in
        }
    });
};

// ✅ Execute on window load
window.onload = checkAuthAndFetchUser(userId = "bMo2h9TFfIQY6pYCbGrJ7g2t6RK2");
