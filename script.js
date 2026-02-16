// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }

            // Update active link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Update active link on scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Show/hide back to top button
    const backToTopButton = document.getElementById('back-to-top');
    if (scrollPosition > 300) {
        backToTopButton.classList.remove('hidden');
    } else {
        backToTopButton.classList.add('hidden');
    }
});

// Back to top button
document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animate skill bars on scroll
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsSection = document.getElementById('skills');
    const skillsSectionTop = skillsSection.offsetTop;
    const windowHeight = window.innerHeight;

    if (window.scrollY > skillsSectionTop - windowHeight + 200) {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });

        // Remove event listener after animation
        window.removeEventListener('scroll', animateSkillBars);
    }
};

window.addEventListener('scroll', animateSkillBars);


// -----------------------
// Typing Animation Script
// -----------------------

const roles = [
    "Python Developer ",
    "Full Stack Developer ",
    "Web Developer "
];

let typingIndex = 0;
let charIndex = 0;
let currentRole = "";
let isDeleting = false;
const typingElement = document.querySelector(".typing");

function typeEffect() {
    currentRole = roles[typingIndex];

    if (!isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex++);
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex--);
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1200);
        return;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typingIndex = (typingIndex + 1) % roles.length;
    }

    const speed = isDeleting ? 80 : 120;
    setTimeout(typeEffect, speed);
}

typeEffect();


// -----------------------
// Music Player Logic
// -----------------------
const bgMusic = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-toggle');
const musicIcon = musicBtn.querySelector('i');
let isPlaying = false;

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicIcon.classList.remove('fa-pause');
        musicIcon.classList.add('fa-play');
        musicBtn.classList.remove('pulse');
    } else {
        bgMusic.play().catch(error => {
            console.log("Audio play failed:", error);
        });
        musicIcon.classList.remove('fa-play');
        musicIcon.classList.add('fa-pause');
        musicBtn.classList.add('pulse');
    }
    isPlaying = !isPlaying;
});


// -----------------------
// Scroll Reveal Animation
// -----------------------
const revealElements = document.querySelectorAll('section, .project-card, .skill-bar');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal', 'active');
            observer.unobserve(entry.target); // Only animate once
        }
    });
};

const revealOptions = {
    threshold: 0.15
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(element => {
    element.classList.add('reveal'); // Ensure initial state is hidden
    revealObserver.observe(element);
});




// -----------------------
// Chatbot Logic
// -----------------------
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotModal = document.getElementById('chatbot-modal');
const chatbotForm = document.getElementById('chatbot-form');
const chatbotStatus = document.getElementById('chatbot-status');

// Toggle Chatbot
if (chatbotToggle && chatbotModal && chatbotClose) {
    const toggleChat = () => {
        const isHidden = chatbotModal.classList.contains('hidden');

        if (isHidden) {
            // Open
            chatbotModal.classList.remove('hidden');
            // Small delay to allow display:block to apply before opacity transition
            setTimeout(() => {
                chatbotModal.classList.add('chatbot-visible');
            }, 10);
        } else {
            // Close
            chatbotModal.classList.remove('chatbot-visible');
            // Wait for transition to finish before hiding
            setTimeout(() => {
                chatbotModal.classList.add('hidden');
            }, 300);
        }
    };

    chatbotToggle.addEventListener('click', toggleChat);
    chatbotClose.addEventListener('click', toggleChat);
}

// Chatbot Form Submission
if (chatbotForm) {
    const successView = document.getElementById('chatbot-success-view');
    const resetBtn = document.getElementById('chatbot-reset-btn');
    const userEmailDisplay = document.getElementById('user-email-display');

    chatbotForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const btn = this.querySelector('button[type="submit"]');
        const btnText = btn.querySelector('.btn-text');
        const btnLoader = btn.querySelector('.btn-loader');
        const icon = btn.querySelector('.fa-paper-plane');
        const emailInput = this.querySelector('input[name="email"]');

        // Loading state
        btn.disabled = true;
        btnText.textContent = 'Sending...';
        btnLoader.classList.remove('hidden');
        if (icon) icon.classList.add('hidden');

        const formData = new FormData(this);

        fetch("https://formsubmit.co/ajax/shurbhirawat43@gmail.com", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData))
        })
            .then(response => response.json())
            .then(data => {
                if (data.success === "false") throw new Error('Submission failed');

                // Success - Show Success View
                if (successView) {
                    chatbotForm.classList.add('hidden');
                    successView.classList.remove('hidden');
                    successView.classList.add('flex');
                    if (userEmailDisplay && emailInput) {
                        userEmailDisplay.textContent = emailInput.value;
                    }
                } else {
                    // Fallback if view irrelevant
                    chatbotStatus.textContent = "Message sent! I'll reply soon.";
                    chatbotStatus.className = "mt-3 text-center text-xs text-green-400 font-medium";
                    chatbotStatus.classList.remove('hidden');
                }

                this.reset();
            })
            .catch(error => {
                // Error
                chatbotStatus.textContent = "Failed to send. Please try again.";
                chatbotStatus.className = "mt-3 text-center text-xs text-red-400 font-medium";
                chatbotStatus.classList.remove('hidden');
                console.error('Error:', error);
            })
            .finally(() => {
                // Reset button
                btn.disabled = false;
                btnText.textContent = 'Send Message';
                btnLoader.classList.add('hidden');
                if (icon) icon.classList.remove('hidden');

                // Hide error status after 5s if it was shown
                if (!successView || !successView.classList.contains('flex')) {
                    setTimeout(() => {
                        chatbotStatus.classList.add('hidden');
                    }, 5000);
                }
            });
    });

    // Reset Chatbot to Form View
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            successView.classList.add('hidden');
            successView.classList.remove('flex');
            chatbotForm.classList.remove('hidden');
            chatbotStatus.classList.add('hidden'); // Ensure old status is hidden
        });
    }
}
