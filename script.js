const display = document.getElementById("inputbox");

// Load the last result when the page opens
const lastResult = localStorage.getItem("lastResult");

if (lastResult !== null) {
    display.value = lastResult;
}


// Calculate
function calculate() {

    const calculation = display.value;

    if (calculation === "") {
        return;
    }

    const result = eval(calculation);

    // Show result
    display.value = result;

    // Save result to localStorage
    localStorage.setItem("lastResult", result);
};

function clearCalculator() {
    display.value = "";
    localStorage.removeItem("lastResult");
};