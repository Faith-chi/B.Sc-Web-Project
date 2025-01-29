// // Select Observable Symptoms
const symptomButtons = document.querySelectorAll(".symptom");

symptomButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");
  });
});

// // Date Picker Controls
// const datePicker = document.getElementById("date-picker");
// const prevDateBtn = document.getElementById("prev-date");
// const nextDateBtn = document.getElementById("next-date");

// // beginning of reminder container
// // Get references to the sections
// const calendarSection = document.getElementById('calendar-section');
// const reminderSection = document.getElementById('reminder-section');

// // Get the "Next" button from the calendar section
// const nextButton = document.getElementById('next-date');
========================================================
const appointmentForm = document.getElementById("pet-details-form");

appointmentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form values
    const petName = document.getElementById("pet-name").value;
    const petAge = document.getElementById("pet-age").value;
    const petBreed = document.getElementById("pet-breed").value;
    const symptoms = Array.from(document.querySelectorAll(".symptom.selected")).map(btn => btn.innerText);
    const appointmentDate = e.target.appointmentDate.value; // Get from user input
    const appointmentTime = "4:00 PM"; // Get from user input
    const status = "Pending"; // Default status

    // Create appointment object
    const appointmentData = {
        petName,
        petAge,
        petBreed,
        symptoms,
        appointmentDate,
        appointmentTime,
        status,
        createdAt: new Date()
    };

    // Store in Firestore
    try {
        await addDoc(collection(db, "appointments"), appointmentData);
        alert("Appointment successfully booked!");
        appointmentForm.reset();
    } catch (error) {
        console.error("Error adding appointment:", error);
    }
});

=================================================================
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

const uniqueId = uuidv4();


// Assume you have a reference to your Firestore database (db)
import { getFirestore } from "firebase/firestore";
const db = getFirestore();

// Form submit handler
const handleFormSubmit = async (event) => {
  
const nameOfPet = document.getElementById('pet-name');
const ageOfPet = document.getElementById('pet-age');
const breedOfPet = document.getElementById('pet-breed');
const appointmentDate = document.getElementById('date-picker');
  event.preventDefault(); // Prevent form reload

  // Extracting values from the form inputs
  const nameOfPetVal = event.target.nameOfPet.value;
  const ageOfPetVal = event.target.ageOfPet.checked; // For a checkbox
  const breedOfPetVal = parseFloat(event.target.breedOfPet.value);
  const appointmentDateVal = new Date(event.target.appointmentDate.value); // From a date input
  const listOfSymptomsVal = event.target.listOfSymptoms.value.split(","); // Assuming a comma-separated input
  const petIdVal = uniqueId(); // Can leave this static or dynamically determine
  const objectExample = event.target.objectExample.value;

  // Construct the docData object
  const docData = {
    nameOfPetVal,
    ageOfPetVal,
    breedOfPetVal,
    appointmentDateVal: Timestamp.fromDate(appointmentDate),
    listOfSymptomsVal,
    petIdVal,
    objectExample,
  };

  try {
    // Write the data to Firestore
    await setDoc(doc(db, "data", "formSubmission"), docData);
    console.log("Document written successfully:", docData);
  } catch (error) {
    console.error("Error writing document:", error);
  }

  console.log(docData);
  
};

document.getElementById('submit-button').addEventListener('click', function (event) {
  // alert('Form submitted!');
  handleFormSubmit(event);
  console.log('sgcyuhsuihc');
  
});
