// Js for Symptom tags

// Select all symptom buttons
const symptomButtons = document.querySelectorAll(".symptoms button");

// Add click event listeners
symptomButtons.forEach(button => {
  button.addEventListener("click", () => {
    button.classList.toggle("selected");
    if (button.classList.contains("selected")) {
      button.style.backgroundColor = "#f88";
      button.style.color = "#fff";
    } else {
      button.style.backgroundColor = "#f0f0f0";
      button.style.color = "#000";
    }
  });
});


// Js to handle multiple countdown timers

// Select all pet-card containers
const petCards = document.querySelectorAll(".pet-card");

// Function to update a single timer
function updateTimer(petCard) {
  const scheduledDate = new Date(petCard.dataset.scheduledDate).getTime();
  const now = new Date().getTime();
  const timeDifference = scheduledDate - now;

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  // Update the countdown in the pet card
  petCard.querySelector(".days").innerText = days.toString().padStart(2, "0");
  petCard.querySelector(".hours").innerText = hours.toString().padStart(2, "0");
  petCard.querySelector(".minutes").innerText = minutes.toString().padStart(2, "0");
  petCard.querySelector(".seconds").innerText = seconds.toString().padStart(2, "0");

  // Stop the countdown when time is up
  if (timeDifference < 0) {
    clearInterval(petCard.timerInterval);
    petCard.querySelector(".countdown").innerText = "Time's Up!";
  }
}

// Loop through each pet card and assign a timer
petCards.forEach((petCard) => {
  // Start an interval for each pet card
  petCard.timerInterval = setInterval(() => {
    updateTimer(petCard);
  }, 1000);
});

