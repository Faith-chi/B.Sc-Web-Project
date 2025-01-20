// Select all steps
console.log('xjhjhjxgy jh');

const steps = document.querySelectorAll('.step');

// Select buttons
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const createAccountCard = document.getElementById('createAccount');

// Keep track of the current step
let currentStep = 1; // Start from step 1

// Function to update the progress indicator
function updateProgress() {
  steps.forEach((step, index) => {
    if (index < currentStep - 1) {
      // Completed steps
      step.classList.add('completed');
      step.classList.remove('active');
    } else if (index === currentStep - 1) {
      // Active step
      step.classList.add('active');
      step.classList.remove('completed');
    } else {
      // Upcoming steps
      step.classList.remove('active', 'completed');
    }
  });

  // Enable or disable navigation buttons
  prevButton.disabled = currentStep === 1;
  nextButton.disabled = currentStep === steps.length;
}

// Event listeners for navigation buttons
nextButton.addEventListener('click', () => {
  if (currentStep < steps.length) {
    currentStep++;
    updateProgress();
  }
  
  createAccountCard.classList.replace('create-account', 'create-account-unrendered');
  console.log('sjwuihywkiowkjjn');

});

prevButton.addEventListener('click', () => {
  if (currentStep > 1) {
    currentStep--;
    updateProgress();
  }
  
});

// Initialize the progress indicator
updateProgress();
