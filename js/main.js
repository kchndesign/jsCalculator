// when window loads, get all of the required elements

// write to screen
// get array of existing texts
// if newline = false overrite bottom text
// if newline = true move everything up and new bottom text
function writeToScreen(string, newline = false) {
    const display = document.querySelector('.calc__display');
    const lineArr = document.querySelectorAll('.display__text');

    if (newline) {
        lineArr[lineArr.length - 1].classList.add('display__text--subtext');
        display.innerHTML += `<p class="display__text">${string}</p>`;
    }
}
