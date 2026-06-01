// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Solid background on scroll
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Hide/Show on scroll down/up
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Animate numbers on scroll
const stats = document.querySelectorAll('.stat-item h3');
let animated = false;

const animateStats = () => {
    stats.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const count = +stat.innerText;
        const speed = 200; // lower is faster
        const inc = target / speed;

        if (count < target) {
            stat.innerText = Math.ceil(count + inc);
            setTimeout(animateStats, 10);
        } else {
            stat.innerText = target;
        }
    });
};

const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !animated) {
        animateStats();
        animated = true;
    }
}, { threshold: 0.5 });

const statsSection = document.getElementById('stats');
if (statsSection) {
    observer.observe(statsSection);
}

// Basic form validation
function validateForm(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const messageElem = document.getElementById('formMessage');

    if (name.trim() === '' || email.trim() === '') {
        messageElem.style.color = 'red';
        messageElem.innerText = 'Please fill out all required fields.';
        return false;
    }

    messageElem.style.color = 'green';
    messageElem.innerText = 'Thank you! Your message has been sent.';
    document.getElementById('contactForm').reset();
    return false;
}

// FAQ Accordion Logic
const faqQuestions = document.querySelectorAll('.faq-question');
if (faqQuestions) {
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            
            // Close all other open FAQs
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current FAQ
            item.classList.toggle('active');
        });
    });
}
