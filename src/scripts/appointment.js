// Select Observable Symptoms
const symptomButtons = document.querySelectorAll(".symptom");

symptomButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");
  });
});

// Date Picker Controls
const datePicker = document.getElementById("date-picker");
const prevDateBtn = document.getElementById("prev-date");
const nextDateBtn = document.getElementById("next-date");

prevDateBtn.addEventListener("click", () => {
  const currentDate = new Date(datePicker.value);
  if (isNaN(currentDate)) return;
  const previousDate = new Date(currentDate.setDate(currentDate.getDate() - 1));
  datePicker.value = previousDate.toISOString().split("T")[0];
});

nextDateBtn.addEventListener("click", () => {
  const currentDate = new Date(datePicker.value);
  if (isNaN(currentDate)) return;
  const nextDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
  datePicker.value = nextDate.toISOString().split("T")[0];
});

// beginning of reminder container
// Get references to the sections
const calendarSection = document.getElementById('calendar-section');
const reminderSection = document.getElementById('reminder-section');

// Get the "Next" button from the calendar section
const nextButton = document.getElementById('next-button');

// Transition to the reminder section on "Next" button click
nextButton.addEventListener('click', function () {
  calendarSection.style.display = 'none'; // Hide the calendar section
  reminderSection.style.display = 'flex'; // Show the reminder section
});

// Add interactivity to the "Daily", "Weekly", "Monthly" buttons
const repeatButtons = document.querySelectorAll('.repeat-options button');
repeatButtons.forEach(button => {
  button.addEventListener('click', function () {
    repeatButtons.forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
  });
});

// Handle "Activate Reminder" button click
document.getElementById('activate-reminder').addEventListener('click', function () {
  alert('Reminder activated!');
});

// Handle "Submit" button click
document.querySelector('.submit-button').addEventListener('click', function () {
  alert('Form submitted!');
});
