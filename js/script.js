document.addEventListener('DOMContentLoaded', function () {
    function cardShow() {
        let showingImage;
        document.querySelectorAll('.cnt').forEach(function (cnt) {
            cnt.addEventListener("mousemove", function (dets) {
                showingImage = dets.target;
                document.querySelector("#cursor").children[dets.target.dataset.index].style.opacity = 1;
                document.querySelector("#cursor").children[dets.target.dataset.index].style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`;
                showingImage.style.filter = "grayscale(1)";
                document.querySelector(".Work").style.backgroundColor =  "#" + dets.target.dataset.color;
            });
            cnt.addEventListener("mouseleave", function (dets) {
                document.querySelector("#cursor").children[showingImage.dataset.index].style.opacity = 0;
                showingImage.style.filter = "grayscale(0)";
                document.querySelector(".Work").style.backgroundColor =  "#f2f2f2";
            });
        });
    }
    cardShow();

    function locoInitialize() {
        const scroll = new LocomotiveScroll({
            el: document.querySelector('main'),
            smooth: true
        });
    }
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingWords = document.querySelector('.loading-words');
    const homePage = document.querySelector('main');
    const loadingContainer = document.querySelector('.loading-container');
    const roundedDivTop = document.querySelector('.rounded-div-wrap.top');
    const roundedDivBottom = document.querySelector('.rounded-div-wrap.bottom');
    const navLinks = document.querySelectorAll('.nav-link');
    const words = loadingWords.querySelectorAll('h2');
    let currentWord = 0;
    const images = document.querySelectorAll('.random-img');
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    locoInitialize();

    images.forEach(img => {
        const randomX = Math.random() * (viewportWidth - img.width);
        const randomY = Math.random() * (viewportHeight - img.height);

        img.style.left = `${randomX}px`;
        img.style.top = `${randomY}px`;

        img.style.transform = `rotate(${Math.random() * 360}deg)`;
    });

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
    document.querySelectorAll(".menu-item").forEach(item => item.classList.add("magnetic"));
    document.querySelectorAll(".menu-item a").forEach(link => link.classList.add("link"));

    var elements = document.querySelectorAll(".magnetic");
    var t = 25;

    if (window.innerWidth > 540) {
        elements.forEach(element => {
            element.addEventListener("mousemove", handleMouseMove);
            element.addEventListener("mouseout", function (e) {
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
    var logo = document.querySelector(".logo-div");
    var t = 30;

    if (window.innerWidth > 540) {
        logo.addEventListener("mousemove", handleMouseMove);
        logo.addEventListener("mouseout", function (e) {
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

document.addEventListener("DOMContentLoaded", magneticLogo);


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

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Simulate form submission
    console.log('Form submitted:', { name, email, message });

    // Show response message
    document.getElementById('responseMessage').innerText = 'Thank you for your message! I will get back to you soon.';
    
    // Clear the form
    this.reset();
});
