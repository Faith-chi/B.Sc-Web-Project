// Select all steps
console.log("xjhjhjxgy jh");

const steps = document.querySelectorAll(".step");

// Select buttons
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const createAccountCard = document.getElementById("createAccount");

const submitSignUpBtn = document.getElementById("submit-signup");

// Keep track of the current step
let currentStep = 1; // Start from step 1

// Function to update the progress indicator
function updateProgress() {
  steps.forEach((step, index) => {
    if (index < currentStep - 1) {
      // Completed steps
      step.classList.add("completed");
      step.classList.remove("active");
    } else if (index === currentStep - 1) {
      // Active step
      step.classList.add("active");
      step.classList.remove("completed");
    } else {
      // Upcoming steps
      step.classList.remove("active", "completed");
    }
  });

  // Enable or disable navigation buttons
  prevButton.disabled = currentStep === 1;
  nextButton.disabled = currentStep === steps.length;
}

// Event listeners for navigation buttons
nextButton.addEventListener("click", () => {
  if (currentStep < steps.length) {
    currentStep++;
    updateProgress();
  }

  createAccountCard.classList.replace(
    "create-account",
    "create-account-unrendered"
  );
  console.log("sjwuihywkiowkjjn");
});

prevButton.addEventListener("click", () => {
  if (currentStep > 1) {
    currentStep--;
    updateProgress();
  }
});

// Initialize the progress indicator
updateProgress();

import { registerUser } from "./auth.js";

async function submitSignUp(event) {
  console.log("...Submitting sign up ...... ");

  const email = document.getElementById("user-email").value;
  const password = document.getElementById("user-password").value;
  const petName = document.getElementById("pet-name").value;
  const petBreed = document.getElementById("pet-breed").value;
  const petAge = document.getElementById("pet-age").value;

  console.log([email, password, petName, petBreed, petAge]);

  event.preventDefault();

  // Check user type selections
  const userType = [];
  if (document.getElementById("singlepet-option").checked)
    userType.push("Single Pet Owner");
  if (document.getElementById("multiplepet-option").checked)
    userType.push("Multiple Pet Owner");
  if (document.getElementById("breeder-option").checked)
    userType.push("Breeder");

  try {
    await registerUser(email, password, petName, petBreed, petAge, userType);
    alert("Sign-up successful!");
    window.location.href = "dashboard.html"; // Redirect after sign-up
  } catch (error) {
    console.error("Error signing up:", error);
    alert("Sign-up failed: " + error.message);
  }
}

submitSignUpBtn.addEventListener("click", (event) => submitSignUp(event));
