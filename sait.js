// Создание звёздного неба
function createStars() {
    const starsContainer = document.getElementById('stars');
    const numberOfStars = 200;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const size = Math.random() * 3;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        starsContainer.appendChild(star);
    }
}

createStars();

// Плавная прокрутка
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Анимация появления элементов при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.8s ease-out';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
        }
    });
}, observerOptions);

document.querySelectorAll('.section, .planet-card').forEach(el => {
    observer.observe(el);
});

// Скрытие индикатора прокрутки при скролле
window.addEventListener('scroll', () => {
    const indicator = document.querySelector('.scroll-indicator');
    if (window.scrollY > 100) {
        indicator.style.opacity = '0';
    } else {
        indicator.style.opacity = '1';
    }
});

// Эффект параллакса для звёзд
window.addEventListener('scroll', () => {
    const stars = document.querySelectorAll('.star');
    const scrolled = window.pageYOffset;
    
    stars.forEach((star, index) => {
        const speed = (index % 3 + 1) * 0.1;
        star.style.transform = `translateY(${scrolled * speed}px)`;
    });
});