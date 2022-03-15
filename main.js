// grab the object that holds all the buttons
const keys = document.querySelector('.calc__keys');

// object for the status of the calculator
const keysStats = keys.dataset.prevKeyType;

// object that displays the numbers
const display = document.querySelector('.display__text');

const displaySub = document.querySelector('.display__subtext');

// add eventListener to the keys container
// next we use the event. object to find out which key was pressed with event.target
keys.addEventListener('click', (event) => {
    // new object to store the clicked element
    const key = event.target;
    const keyValue = key.textContent;

    // new variable for display content
    const displayContent = display.textContent;

    // if this input is a number key:

    if (key.classList.contains('number')) {
        // manage state on the keys div for number clicked
        keys.dataset.prevKeyType = 'number';

        // if there is already input in the display,
        // concatenate new inputs onto the end

        if (displayContent !== '0') {
            display.textContent = displayContent + keyValue;
        }

        // if display is default ie. just '0'
        // replace with new input without concatenating
        else {
            display.textContent = keyValue;
        }
    }

    // if this input is a operator key:
    if (key.classList.contains('operator')) {
        // if an operator is already pressed.
        if (keys.dataset.prevKeyType == 'operator') {
            keys.dataset.prevKeyType = 'none';

            // reset all of the operators off.
            let operators = document.querySelectorAll('.operator');

            operators.forEach((operator) => {
                operator.classList.remove('pressed');
            });

            key.classList.toggle('pressed');
        } else {
            keys.dataset.prevKeyType = 'operator';
            // change styling
            key.classList.toggle('pressed');
        }
    }
});
