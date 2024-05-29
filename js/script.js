const cursor = document.querySelector('.cursor');
function blinkCursor() {
    console.log(cursor); // Log the cursor element to the console
    setInterval(() => {
        cursor.style.visibility = (cursor.style.visibility === 'visible') ? 'hidden' : 'visible';
    }, 500); // Adjust blinking speed here (milliseconds)

    console.log(cursor.style.animation); // Log the cursor's animation property
}

// Call the function to start blinking the cursor
blinkCursor();





const text = document.querySelector('.welcome_text');
const content = document.querySelector('.content');
const terminalInput = document.querySelector('.terminal');
const terminal = document.getElementById('terminal');

const welcomeText = [
    '       __                              __          __                  	^',
    '      / /___ __________  ___  _____   / /   ____ _/ /_____  __  _______	^',
    ' __  / / __ `/ ___/ __ \\/ _ \\/ ___/  / /   / __ `/ __/ __ \\/ / / / ___/	^',
    '/ /_/ / /_/ (__  ) /_/ /  __/ /     / /___/ /_/ / /_/ /_/ / /_/ / /    ^',
    '\\____/\\__,_/____/ .___/\\___/_/     /_____/\\__,_/\\__/\\____/\\__,_/_/     ^',
    '          /_/                                               ',
];

const user = "guest@webterm$ ";
const iam = " I'm a software developer living ^ in the Netherlands";

let i = 0;
let j = 0;
const speed = 5;

function welcomeAnimate(element, animatedText, speed, callback) {
    if (i < animatedText.length) {
        if (j < animatedText[i].length) {
            if (animatedText[i].charAt(j) === "^") {
                element.innerHTML += "<br>";
            } else if (animatedText[i].charAt(j) === " ") {
                element.innerHTML += "&nbsp;";
            } else {
                element.innerHTML += animatedText[i].charAt(j);
            }
            j++;
            setTimeout(() => welcomeAnimate(element, animatedText, speed, callback), speed);
        } else {
            i++;
            j = 0;
            setTimeout(() => welcomeAnimate(element, animatedText, speed, callback), speed);
        }
    } else if (callback) {
        callback();
    }
}

function enableTerminal() {
    const terminalPrompt = document.createElement('span');
    const cursor = document.createElement('span');
    cursor.classList.add('cursor');
    terminalPrompt.textContent = 'Visitor@website.JasperLatour;~$ ';
    terminalPrompt.classList.add('terminal-prompt'); // Add a class for styling
    
    // Clear the terminal and append the prompt
    terminal.innerHTML = '';
    terminal.appendChild(terminalPrompt);
    terminal.appendChild(cursor);

    // Append the input field
    terminal.appendChild(terminalInput);

    terminalInput.style.display = 'inline';
    terminalInput.style.borderBottomColor =  "rgb(254, 254, 254,0.1)";
    terminalInput.focus();

    // Adjust the animation to include the prompt
    const terminalField = ''; // Remove the prompt from here
    i = 0; j = 0;
    welcomeAnimate(terminalPrompt, terminalField, speed, () => {
        // After the prompt animation, enable the input field
        terminalInput.style.display = 'inline';
        terminalInput.focus();
    });
}


function startTyping() {
    i = 0; j = 0;
    welcomeAnimate(text, welcomeText, speed, () => {
        i = 0; j = 0;

        welcomeAnimate(content, iam, speed);
        setTimeout(enableTerminal, 1500); // Wait 1 second before enabling the terminal
    });
}

startTyping();


