//fetch and display data in the reminder page
const dashboardContainer = document.getElementById("dashboard-appointments");

const fetchAppointments = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "appointments"));
        dashboardContainer.innerHTML = ""; // Clear existing content

        querySnapshot.forEach((doc) => {
            const appointment = doc.data();
            displayAppointment(appointment);
        });
    } catch (error) {
        console.error("Error fetching appointments:", error);
    }
};

const displayAppointment = (appointment) => {
    const appointmentCard = document.createElement("div");
    appointmentCard.classList.add("appointment-card");

    appointmentCard.innerHTML = `
        <div class="appointment-info">
            <p><strong>Pet Name:</strong> ${appointment.petName}</p>
            <p><strong>Breed:</strong> ${appointment.petBreed}</p>
            <p><strong>Scheduled Date:</strong> ${appointment.appointmentDate}</p>
            <p><strong>Time:</strong> ${appointment.appointmentTime}</p>
            <p><strong>Status:</strong> <span class="status-${appointment.status.toLowerCase()}">${appointment.status}</span></p>
        </div>
        <div class="symptoms">
            ${appointment.symptoms.map(symptom => `<span class="symptom-tag">${symptom}</span>`).join("")}
        </div>
        <div class="countdown" id="countdown-${appointment.petName.replace(/\s/g, '')}"></div>
    `;

    dashboardContainer.appendChild(appointmentCard);
    startCountdown(appointment.appointmentDate, appointment.appointmentTime, `countdown-${appointment.petName.replace(/\s/g, '')}`);
};

// Fetch appointments on page load
window.onload = fetchAppointments;

============================


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

