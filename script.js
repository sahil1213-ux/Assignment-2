document.getElementById("apply-styles").addEventListener("click", function() {
    // Get the values from the input fields
    const primaryColor = document.getElementById("primary-color").value;
    const secondaryColor = document.getElementById("secondary-color").value;
    const highlightColor = document.getElementById("highlight-color").value;
    const fontFamily = document.getElementById("font-family").value;
    const animationDuration = document.getElementById("animation-duration").value + 's';

    // Update the CSS variables
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
    document.documentElement.style.setProperty('--highlight-color', highlightColor);
    document.documentElement.style.setProperty('--font-family', fontFamily);
    document.documentElement.style.setProperty('--animation-duration', animationDuration);
});


// Select all the steps in the recipe
const steps = document.querySelectorAll("#steps li");
// Initialize step index to track progress
let stepIndex = 0;
let timerInterval;

// Select the progress bar element
const progressBar = document.querySelector(".progress-bar");

// Toggle Ingredients Visibility
document.getElementById("toggle-ingredients").addEventListener("click", function() {
    const ingredients = document.getElementById("ingredients");
    ingredients.classList.toggle("hidden");
    this.textContent = ingredients.classList.contains("hidden") ? "Show Ingredients" : "Hide Ingredients";
});

// Start Cooking Button - Progress through steps
document.getElementById("start-cooking").addEventListener("click", function() {

        steps[stepIndex].classList.add("active-step");
        // Show the next button
        document.getElementById("next-step").classList.remove("hidden");
        // Hide the start button
        this.classList.add("hidden");
        startTimer(30 * 60);
});

document.getElementById("next-step").addEventListener("click", function() {
    // Remove the active-step class from the current step
    steps[stepIndex].classList.remove("active-step");
    stepIndex++;
    // Check if there are more steps
    if (stepIndex < steps.length) {
        // Highlight the next step by adding the active-step class
        steps[stepIndex].classList.add("active-step");

        const progressPercentage = (stepIndex / steps.length) * 100;
    
        // Update the progress bar width to reflect the current step
        progressBar.style.width = progressPercentage + "%";

    } else {
        // Update the progress bar to 100% before hiding the next button
        progressBar.style.width = "100%";
        // Hide the next button if there are no more steps
        this.classList.add("hidden");
        clearInterval(timerInterval);
        alert("You have completed all the steps! Please refresh the browser to start the process of making the recipe again. Thank you!");
    }
});



// print the recipe
document.getElementById("print-recipe").addEventListener("click", function() {
    window.print();
});

// start timer
function startTimer(duration) {
    let timer = duration, minutes, seconds;
    const timerDisplay = document.getElementById("timer");

    timerInterval = setInterval(function() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timerDisplay.textContent = "Time Remaining: " + minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(timerInterval);
            alert("Time's up! Please refresh the browser to start the process of making the recipe again. Thank you!");
        }
    }, 1000);
}