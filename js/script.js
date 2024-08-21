document.addEventListener('DOMContentLoaded', function () {

    const loadingScreen = document.querySelector('.loading-screen');
    const loadingWords = document.querySelector('.loading-words');
    const homePage = document.querySelector('main');
    const loadingContainer = document.querySelector('.loading-container');
    const roundedDivTop = document.querySelector('.rounded-div-wrap.top');
    const roundedDivBottom = document.querySelector('.rounded-div-wrap.bottom');
    const navLinks = document.querySelectorAll('.nav-link');
    const words = loadingWords.querySelectorAll('h2');
    let currentWord = 0;

    function showNextWord() {
        if (currentWord > 0) {
            words[currentWord - 1].classList.remove('active');
        }
        if (currentWord < words.length) {
            words[currentWord].classList.add('active');
            currentWord++;
        } else {
            clearInterval(wordInterval);
            setTimeout(pageTransitionIn, 100);
        }
    }

    const wordInterval = setInterval(showNextWord, 100);

    function initLoader() {
        loadingWords.style.opacity = '1';
        setTimeout(() => {
            loadingWords.style.opacity = '0';
            loadingContainer.style.top = '-100%';
            setTimeout(() => {
                homePage.style.opacity = '1';
                homePage.style.transform = 'translateY(0)';
                document.body.classList.remove('no-scroll');
            }, 800);
        }, 2000);
    }

    function pageTransitionIn() {
        loadingContainer.style.pointerEvents = 'none';
        loadingContainer.style.display = 'none';
        loadingWords.style.opacity = '0';
        roundedDivTop.style.height = '0';
        roundedDivBottom.style.height = '0';
        homePage.style.opacity = '1';
        homePage.style.transform = 'translateY(0)';
        homePage.style.transition = 'opacity 1s, transform 1s';
    }

    function pageTransitionOut() {
        loadingContainer.style.pointerEvents = 'auto';
        loadingWords.style.opacity = '1';
        roundedDivTop.style.height = '100vh';
        roundedDivBottom.style.height = '100vh';
        homePage.style.opacity = '0';
        homePage.style.transform = 'translateY(50vh)';
        homePage.style.transition = 'opacity 1s, transform 1s';
    }

    // Start the loader animation
    initLoader();

    window.addEventListener('load', () => {
        setTimeout(pageTransitionOut, 100);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            pageTransitionOut();
            setTimeout(() => {
                window.location.href = this.href;
            }, 800);
        });
    });
});


function magneticMenuItems() {
    // Add classes to menu items and their links
    document.querySelectorAll(".menu-item").forEach(item => item.classList.add("magnetic"));
    document.querySelectorAll(".menu-item a").forEach(link => link.classList.add("link"));

    // Select all elements with the 'magnetic' class
    var elements = document.querySelectorAll(".magnetic");
    var t = 25; // Range of the magnetic effect

    // Apply the magnetic effect only if the window width is greater than 540 pixels
    if (window.innerWidth > 540) {
        elements.forEach(element => {
            // Add mousemove and mouseout event listeners to each magnetic element
            element.addEventListener("mousemove", handleMouseMove);
            element.addEventListener("mouseout", function (e) {
                // Return the element to its original position on mouseout
                gsap.to(e.currentTarget, {
                    duration: 1,
                    x: 0,
                    y: 0,
                    ease: "power4.out"
                });
            });
        });

        function handleMouseMove(e) {
            var element = e.currentTarget;
            var rect = element.getBoundingClientRect();

            gsap.to(element, {
                duration: 1,
                x: ((e.clientX - rect.left) / element.offsetWidth - 0.6) * t,
                y: ((e.clientY - rect.top) / element.offsetHeight - 0.6) * t,
                ease: "power4.out"
            });
        }
    }
}

function magneticLogo() {
    // Select the logo element
    var logo = document.querySelector(".logo-div");
    var t = 30; // Range of the magnetic effect

    // Apply the magnetic effect only if the window width is greater than 540 pixels
    if (window.innerWidth > 540) {
        // Add mousemove and mouseout event listeners to the logo
        logo.addEventListener("mousemove", handleMouseMove);
        logo.addEventListener("mouseout", function (e) {
            // Return the logo to its original position on mouseout
            gsap.to(e.currentTarget, {
                duration: 1,
                x: 0,
                y: 0,
                ease: "power4.out"
            });
        });

        function handleMouseMove(e) {
            var rect = logo.getBoundingClientRect();

            gsap.to(logo, {
                duration: 1,
                x: ((e.clientX - rect.left) / logo.offsetWidth - 0.6) * t,
                y: ((e.clientY - rect.top) / logo.offsetHeight - 0.6) * t,
                ease: "power4.out"
            });
        }
    }
}

// Initialize the magnetic effect for the logo when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", magneticLogo);


// Call the function after the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
    magneticMenuItems();
});

grained('#grained', {
    animate: true,
    patternWidth: 200,
    patternHeight: 200,
    grainOpacity: 0.05,
    grainDensity: 2.80,
    grainHeight: 2.1,
    grainWidth: 2.1
});