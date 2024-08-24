document.addEventListener('DOMContentLoaded', function () {

    // Initialize Locomotive Scroll
    function locoInitialize() {
        const scroll = new LocomotiveScroll({
            el: document.querySelector('main'),
            smooth: true
        });

        // Show or hide the menu button on scroll
        scroll.on('scroll', (event) => {
            let scrollButton = document.querySelector('.menu-btn');
            if (event.scroll.y > 100) {
                scrollButton.style.display = "block";
            } else {
                scrollButton.style.display = "none";
            }
        });
    }

    locoInitialize();

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

    const loadingScreen = document.querySelector('.loading-screen');
    const loadingWords = document.querySelector('.loading-words');
    const homePage = document.querySelector('section');
    const loadingContainer = document.querySelector('.loading-container');
    const roundedDivTop = document.querySelector('.rounded-div-wrap.top');
    const roundedDivBottom = document.querySelector('.rounded-div-wrap.bottom');
    const words = loadingWords.querySelectorAll('h2');
    let currentWord = 0;
    const images = document.querySelectorAll('.random-img');
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

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

    document.querySelector('.menu-icon').addEventListener('click', () => {
        document.querySelector('menu').classList.add("show");
        animateIconOpen('.menu-icon');
    });

    document.querySelector('.close-icon').addEventListener('click', () => {
        document.querySelector('menu').classList.remove("show");
        animateIconClose('.close-icon');
    });

    document.querySelector('.menu-btn').addEventListener('click', () => {
        document.querySelector('menu').classList.toggle("show");
    });
    
    const form = document.querySelector('.contact-form form');
    const submitBtn = document.querySelector('.contact-form .submit-btn');
    const responseMessage = document.createElement('div');
    responseMessage.classList.add('response-message');
    form.appendChild(responseMessage);

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        try {
            const response = await fetch('https://formspree.io/f/mblrpvlk', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                responseMessage.textContent = 'Thank you for your message! I will get back to you soon.';
                responseMessage.style.color = 'green';
                form.reset();
            } else {
                throw new Error('Something went wrong');
            }
        } catch (error) {
            responseMessage.textContent = 'There was a problem with your submission. Please try again.';
            responseMessage.style.color = 'red';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'SUBMIT';
        }
    });
});

// Animation for opening the menu icon
function animateIconOpen(selector) {
    gsap.to(selector, {
        duration: 0.5,
        rotation: 45,
        scale: 1.2,
        ease: "power2.out"
    });
}

// Animation for closing the menu icon
function animateIconClose(selector) {
    gsap.to(selector, {
        duration: 0.5,
        rotation: 0,
        scale: 1,
        ease: "power2.in"
    });
}

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

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    console.log('Form submitted:', { name, email, message });

    document.getElementById('responseMessage').innerText = 'Thank you for your message! I will get back to you soon.';
    
    this.reset();
});
