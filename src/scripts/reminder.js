import {
  doc,
  getDocs,
  collection,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { db } from "./firebase.js"; // Ensure Firestore is initialized

// Function to update countdown dynamically
function updateCountdown() {
  const petCards = document.querySelectorAll(".pet-card");
  const now = new Date().getTime();

  petCards.forEach((card) => {
    const scheduledDate = new Date(
      card.getAttribute("data-scheduled-date")
    ).getTime();
    const timeDiff = scheduledDate - now;
    const countdownElement = card.querySelector(".countdown");
    const timeContainers = card.querySelectorAll(".countdown-time span");

    if (timeDiff > 0) {
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      if (timeContainers.length === 4) {
        timeContainers[0].textContent = days.toString().padStart(2, "0");
        timeContainers[1].textContent = hours.toString().padStart(2, "0");
        timeContainers[2].textContent = minutes.toString().padStart(2, "0");
        timeContainers[3].textContent = seconds.toString().padStart(2, "0");
      }
    } else {
      countdownElement.innerHTML = "<strong>Time Expired</strong>";
      card.classList.add("expired"); // Add styling for expired appointments
    }
  });
}

setInterval(updateCountdown, 1000);

// Fetch all appointments and update UI in real-time
// function getAllAppointments() {
//   onSnapshot(collection(db, "appointments"), (snapshot) => {
//     const container = document.getElementById("appointments-container");
//     container.innerHTML = ""; // Clear existing data

//     snapshot.forEach((doc) => {
//       const appointment = doc.data();
//       const petCard = document.createElement("div");
//       petCard.classList.add("pet-card");

//       // Check if appointmentDate is defined and is a Firestore Timestamp
//       if (appointment.appointmentDate && appointment.appointmentDate.toDate) {
//         const scheduledDate = appointment.appointmentDate.toDate();  // Convert Firestore Timestamp to Date
//         petCard.setAttribute("data-scheduled-date", scheduledDate.toISOString());  // Use ISO string format for compatibility
//         console.log(appointment)
//         petCard.innerHTML = `
//           <h3>${appointment.petName}</h3>
//           <p>Owner: ${appointment.ownerName}</p>
//           <div class="countdown">
//             <span class="countdown-time"><span>00</span>d : <span>00</span>h : <span>00</span>m : <span>00</span>s</span>
//           </div>
//         `;
//         container.appendChild(petCard);
//       } else {
//         console.error("Scheduled date is not valid for appointment:", appointment);
//       }
//     });

//     updateCountdown(); // Ensure countdown updates immediately
//   });
// }

function getAllAppointments() {
  onSnapshot(collection(db, "appointments"), (snapshot) => {
    const container = document.getElementById("appointments-container");
    container.innerHTML = ""; // Clear existing data

    snapshot.forEach((doc) => {
      const appointment = doc.data();
      const petCard = document.createElement("div");
      petCard.classList.add("pet-card");

      // Check if appointmentDate is defined and is a Firestore Timestamp
      if (appointment.appointmentDate && appointment.appointmentDate.toDate) {
        const scheduledDate = appointment.appointmentDate.toDate(); // Convert Firestore Timestamp to Date
        const formattedDate = scheduledDate.toLocaleString("en-US", {
          weekday: "long", // "Monday"
          year: "numeric", // "2025"
          month: "long", // "December"
          day: "numeric", // "12"
        });
        const formattedTime = scheduledDate.toLocaleString("en-US", {
          hour: "numeric", // "4"
          minute: "numeric", // "00"
          hour12: true, // "PM"
        });

        petCard.setAttribute(
          "data-scheduled-date",
          scheduledDate.toISOString()
        ); // Use ISO string format for compatibility

        // Generate symptom buttons dynamically
        const symptomsButtons = appointment.listOfSymptoms
          .map((symptom) => `<button>${symptom}</button>`)
          .join(" ");

        petCard.innerHTML = `
          <div class="pet-info">
            <table>
              <tr class="table-th">
                <th>Pet's Name</th>
                <th>Breed</th>
                <th>Scheduled Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
              <tr>
                <td>${appointment.nameOfPet}</td>
                <td>${appointment.breedOfPet}</td>
                <td>${formattedDate}</td>
                <td>${formattedTime}</td>
                <td><span class="status approved">Approved</span></td>
              </tr>
              <tr>
                <td colspan="5" class="symptoms">
                  ${symptomsButtons}
                </td>
              </tr>
            </table>
          </div>

          <div class="countdown">
            <div class="parent">
              <div class="time-container">
                <span>Days</span>
                <div class="countdown-time">
                  <span style="font-size: 70px;">00</span>
                </div>
              </div>
              <span style="margin: auto;">:</span>
              <div class="time-container">
                <span>Hours</span>
                <div class="countdown-time">
                  <span style="font-size: 70px;">00</span>
                </div>
              </div>
              <span style="margin: auto;">:</span>
              <div class="time-container">
                <span>Minutes</span>
                <div class="countdown-time">
                  <span style="font-size: 70px;">00</span>
                </div>
              </div>
              <span style="margin: auto;">:</span>
              <div class="time-container">
                <span>Seconds</span>
                <div class="countdown-time">
                  <span style="font-size: 70px;">00</span>
                </div>
              </div>
            </div>
          </div>
        `;
        container.appendChild(petCard);
      } else {
        console.error(
          "Scheduled date is not valid for appointment:",
          appointment
        );
      }
    });

    updateCountdown(); // Ensure countdown updates immediately
  });
}

document.addEventListener("DOMContentLoaded", function () {
  getAllAppointments();
});
