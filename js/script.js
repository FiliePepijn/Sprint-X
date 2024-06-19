const terminalcontainer = document.querySelector('.terminal-container');
const terminalUser = 'Visitor@website.JasperLatour;~$ ';
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');
let discoInterval;
let isAnimating = false;


function animateCommand(element, commandText, speed, callback) {
    let i = 0;
    function animate() {
        if (i < commandText.length) {
            if (commandText.slice(i, i+4) === '<br>') {
                element.innerHTML += '<br>';
                i += 4;
            } else if (commandText.charAt(i) === " ") {
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



function startDisco() {
    let hue = 0;
    let page = document.querySelector('.star');
    page.classList.add('disco');
    let starElement = document.querySelector('.disco');
    if (starElement) {
        discoInterval = setInterval(() => {
            starElement.style.filter = `hue-rotate(${hue}deg)`;
            hue = (hue + 30) % 360;
        }, 50);
        localStorage.setItem('disco', 'on'); // Turn on disco
    } else {
        console.log('Star element not found');
    }
}



function command(input) {
    if (isAnimating) {
        return;
    }
    isAnimating = true;

    let parts = input.split(' ');
    let command = parts[0];
    let argument = parts.slice(1).join(' ');

    switch (command) {
        case 'clear':
            terminalOutput.innerHTML = '';
            isAnimating = false;
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
                    isAnimating = false;
                    scrollToBottom();
                });
            break;

        case 'home':
        case 'cd /':
            window.location.href = '/Sprint-X/index.html';
                break;

        case 'about':
        case 'cd home/about':
            window.location.href = '/Sprint-X/html/about.html';
            break;

        case 'projects':
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

                    isAnimating = false;
                    scrollToBottom();
                });
            break;

        case 'cd':
            switch (argument) {
                case 'home':
                    window.location.href = 'index.html';
                    break;
                case 'about':
                    window.location.href = '/Sprint-X/html/about.html';
                    break;
                case 'projects':
                    window.location.href = '/Sprint-X/html/projects.html';
                    break;
                default:
                    isAnimating = false;
            }
            break;

        case 'disco':
            console.log('Mario star command')
            if (discoInterval) {
                clearInterval(discoInterval);
                localStorage.removeItem('disco');
            } else {
                startDisco();
            }
            isAnimating = false;
            break;

        default:

            isAnimating = false;
    }
    scrollToBottom();
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
});

terminalInput.addEventListener('blur', function () {
    terminalcontainer.classList.remove('active');
});

terminalcontainer.addEventListener('click',
    function () {
        terminalInput.focus();
    }
);

window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('disco') === 'on') {
        startDisco();
    }
});
