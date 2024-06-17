
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

        switch (input) {
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
                    'projects - Display my projects<br>'
                    , 50, function() {
                        // Animation complete, allow next command
                        isAnimating = false;
                        scrollToBottom(); // Scroll to bottom after animation
                    });
                break;

            case 'projects':
            case 'Projects':
            case 'project':
            case 'Project':
            case 'p':
            case 'P':
            case 'ls projects':
                animateCommand(terminalOutput, 'My projects:<br>' +
                    'Flipper - a home made dual flipper cast <br>' +
                    'AutoMatic gasstation <br>' +
                    'Self made audio mixer', 50, function() {
                    isAnimating = false;
                    scrollToBottom();
                });
                break;

            case 'ls':
                animateCommand(terminalOutput, 'About Me        Projects        Contact', 50, function() {
                    isAnimating = false;
                    scrollToBottom();
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
