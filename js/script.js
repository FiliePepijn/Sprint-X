const text = document.querySelector('.welcome_text');
const content = document.querySelector('.content');
const sectionimage = document.querySelector('.section-image');

const welcomeText = [
    '                  __                              __          __                            ^',
    '                 / /___ __________  ___  _____   / /   ____ _/ /_____  __  _______          ^',
    '         __  / / __ `/ ___/ __ \\/ _ \\/ ___/  / /   / __ `/ __/ __ \\/ / / / ___/       ^',
    '           / /_/ / /_/ (__  ) /_/ /  __/ /     / /___/ /_/ / /_/ /_/ / /_/ / /              ^',
    '    \\____/\\__,_/____/ .___/\\___/_/     /_____/\\__,_/\\__/\\____/\\__,_/_/        ^',
    '                     /_/                                                          ^',
];
const iam = " I'm a software developer living ^ in the Netherlands";

let i = 0;
let j = 0;
const speed = 5;

function welcomeAnimate(element, animatedText, speed, callback) {
    if (i < animatedText.length) {
        if (j < animatedText[i].length) {
            if (animatedText[i].charAt(j) === "^") {
                element.innerHTML += "<br>";
            } else if (animatedText[i].charAt(j) === " ") { // Add non-breaking space
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

welcomeAnimate(text, welcomeText, 5, () => {
    welcomeAnimate(content, iam, 5, () => {
    content.style.display = 'block';
    sectionimage.style.display = 'block';
});});



const terminalUser = 'Visitor@website.JasperLatour;~$ ';
const terminal = document.getElementById('terminal');
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

function terminalAnimate() {
    terminalInput.focus();
}

function animateCommand(element, commandText, speed) {
    let i = 0;
    function animate() {
        if (i < commandText.length) {
            if (commandText.slice(i, i+4) === '<br>') { // check for line breaks
                element.innerHTML += '<br>';
                i += 4;
            } else if (commandText.charAt(i) === " ") { // check for tabs
                element.innerHTML += '&nbsp;';
                i++;
            } else {
                element.innerHTML += commandText.charAt(i);
                i++;
            }
            setTimeout(animate, speed);
        }
    }
    animate();
}

function command(input) {
    switch (input) {
        case 'clear':
            terminalOutput.innerHTML = '';
            break;
        case 'help':
        case 'ls command':
        case '?':
        case 'h':
        case 'Help':
        case 'HELP':
        case 'H':
            terminalOutput.innerHTML += terminalInput.value + '<br>';
            animateCommand(terminalOutput, 'Available commands: <br>' +
                'clear - Clear the terminal screen <br>' +
                'help - Display this help text<br>'      +
                'projects - Display my projects<br>'
            , 50, );
            break;

        case 'projects':
        case 'Projects':
        case 'project':
        case 'Project':
        case 'p':
        case 'P':
        case 'ls projects':
            animateCommand(terminalOutput, 'My projects:<br>' +
                'Flipper - a home made dual filpper cast <br>' +
                'AutoMatic gasstation <br>' +
                'Self made audio mixer', 5);
            break;

        case 'ls':
            animateCommand(terminalOutput, 'About Me        Projects        Contact' , 50);
    }
}

terminalInput.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {

        terminalOutput.innerHTML += terminalUser + terminalInput.value + '<br>';
        command(terminalInput.value);
        terminalInput.value = '';


    }
});
terminalAnimate();