document.addEventListener('DOMContentLoaded', function() {
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

    const iam = "_____ I'm a software developer living ^ in the Netherlands ^ Check out the terminal below";

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
        });
    });
}, false);