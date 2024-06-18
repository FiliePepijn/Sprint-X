const terminalcontainer = document.querySelector('.terminal-container');
const terminalUser = 'Visitor@website.JasperLatour;~$ ';
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

function terminalAnimate() {
    terminalInput.focus();
}

function animateCommand(element, commandText, speed, callback) {
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
        } else {
            // Animation complete, execute callback if provided
            if (callback && typeof callback === 'function') {
                callback();
            }
        }
    }
    animate();
}

function scrollToBottom() {
    terminalInput.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

// Variable to track if animation is in progress
let isAnimating = false;



function command(input) {
    // Check if animation is in progress
    if (isAnimating) {
        return; // Exit function if animation is ongoing
    }

    // Set isAnimating to true to prevent overlapping animations
    isAnimating = true;

    let parts = input.split(' '); // Split the input into parts
    let command = parts[0]; // The command is the first part
    let argument = parts[1]; // The argument is the second part

    switch (command) {
        case 'clear':
            terminalOutput.innerHTML = '';
            isAnimating = false; // Reset animation flag
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
                'help - Display this help text<br>' +
                'projects - Display my projects<br>' +
                'home - Go to Home page<br>' +
                'about - Go to About page<br>' +
                'projects - Go to Projects page<br>' +
                'cd - Change directory<br>'
                , 50, function() {
                    // Animation complete, allow next command
                    isAnimating = false;
                    scrollToBottom(); // Scroll to bottom after animation
                });
            break;

        case 'home':
        case 'cd home':
        case 'cd /':
            window.location.href = 'index.html';
                break;

        case 'about':
        case 'cd about':
        case 'cd home/about':
            window.location.href = '/Sprint-X/html/about.html';
            break;

        case 'projects':
        case 'cd projects':
        case 'cd home/projects':
            window.location.href = '/Sprint-X/html/projects.html';
            break;

        case 'ls':
            animateCommand(terminalOutput, 'Available commands: <br>' +
                'home <br>' +
                'home/about <br>' +
                'home/projects <br>' +
                'home/projects/ledclock <br>' +
                'home/projects/pinball <br>' +
                'home/projects/volumesliders <br>'
                , 50, function() {
                    // Animation complete, allow next command
                    isAnimating = false;
                    scrollToBottom(); // Scroll to bottom after animation
                });
            break;
        default:
            // Handle unknown commands or do nothing
            isAnimating = false; // Ensure isAnimating is reset
    }
    scrollToBottom(); // Scroll to bottom after handling command
}

terminalInput.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        terminalOutput.innerHTML += terminalUser + terminalInput.value + '<br>';
        command(terminalInput.value);
        terminalInput.value = '';
    }
});

terminalInput.addEventListener('focus', function () {
    terminalcontainer.classList.add('active');
    console.log('Input focused');
});

terminalInput.addEventListener('blur', function () {
    terminalcontainer.classList.remove('active');
    command('clear');
    console.log('Input blurred');
});

terminalcontainer.addEventListener('click',
    function () {
        terminalInput.focus();
        console.log('Container clicked');
    }
);
