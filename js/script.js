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
            setTimeout(pageTransitionIn, 100); // Ensure pageTransitionIn is called
        }
    }

    const wordInterval = setInterval(showNextWord, 100);

    function initLoader() {
        loadingWords.style.opacity = '1';
        setTimeout(() => {
            loadingWords.style.opacity = '0';
            loadingContainer.style.top = '-200%';
            setTimeout(() => {
                homePage.style.opacity = '1';
                homePage.style.transform = 'translateY(0)';
                document.body.classList.remove('no-scroll');
            }, 800);
        }, 2000);
    }

    function pageTransitionIn() {
        loadingContainer.style.pointerEvents = 'none';
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
        setTimeout(pageTransitionOut, 100); // Start the transition out after a slight delay
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