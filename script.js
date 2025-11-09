// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // ===== EMAILJS CONFIGURATION =====
    const EMAILJS_CONFIG = {
        PUBLIC_KEY: 'S4W7DyNVmSUvmAmsV',
        SERVICE_ID: 'service_q5ln44p', 
        TEMPLATE_ID: 'template_tdf670q'
    };

    // Initialize EmailJS
    (function() {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        console.log('EmailJS initialized with your keys');
    })();

    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navbar.classList.toggle('active');
        document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : 'auto';
    });
    
    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navbar.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navbar.contains(event.target) && 
            !hamburger.contains(event.target) && 
            navbar.classList.contains('active')) {
            hamburger.classList.remove('active');
            navbar.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Sticky Header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        header.classList.toggle('sticky', window.scrollY > 100);
    });
    
    // Active Navigation on Scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        navLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            if (section) {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    });

    // ===== CONTACT FORM SUBMISSION =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                name: this.querySelector('input[name="name"]').value,
                email: this.querySelector('input[name="email"]').value,
                projectType: this.querySelector('select[name="projectType"]').value,
                message: this.querySelector('textarea[name="message"]').value
            };
            
            // Validate form
            if (!formData.name || !formData.email || !formData.projectType || !formData.message) {
                showNotification('error', 'Please fill all fields!');
                return;
            }
            
            // Send email
            await sendContactEmail(formData, 'contact');
        });
    }
    
    // ===== HIRE ME NOTIFICATION SYSTEM =====
    const hireMeBtn = document.querySelector('a[href="#contact"]');
    
    if (hireMeBtn) {
        hireMeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showHireMeNotification();
        });
    }
    
    function showHireMeNotification() {
        const notificationModal = document.createElement('div');
        notificationModal.className = 'notification-modal';
        notificationModal.innerHTML = `
            <div class="notification-content">
                <span class="close-modal">&times;</span>
                <h3>Let's Work Together! 🚀</h3>
                <p>I'm excited to hear about your opportunity! Please fill out the form below.</p>
                
                <form class="hire-form" id="hireForm">
                    <div class="form-group">
                        <input type="text" name="name" placeholder="Your Name" required>
                    </div>
                    <div class="form-group">
                        <input type="email" name="email" placeholder="Your Email" required>
                    </div>
                    <div class="form-group">
                        <input type="text" name="company" placeholder="Company Name (Optional)">
                    </div>
                    <div class="form-group">
                        <select name="projectType" required>
                            <option value="">Select Your Interest</option>
                            <option value="freelancer">Freelance Project</option>
                            <option value="job">Job Opportunity</option>
                            <option value="frontend">Frontend Development</option>
                            <option value="internship">Internship</option>
                            <option value="collaboration">Project Collaboration</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <textarea name="message" placeholder="Tell me about the opportunity..." rows="4" required></textarea>
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="checkbox" name="agreement" required>
                            I agree to the terms and conditions
                        </label>
                    </div>
                    <button type="submit" class="btn submit-btn">Send Message</button>
                </form>
            </div>
        `;
        
        document.body.appendChild(notificationModal);
        
        // Close modal functionality
        const closeModal = notificationModal.querySelector('.close-modal');
        closeModal.addEventListener('click', function() {
            document.body.removeChild(notificationModal);
        });
        
        notificationModal.addEventListener('click', function(e) {
            if (e.target === notificationModal) {
                document.body.removeChild(notificationModal);
            }
        });
        
        // Hire form submission
        const hireForm = document.getElementById('hireForm');
        hireForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const formObject = Object.fromEntries(formData);
            
            // Send email for hire form
            await sendContactEmail(formObject, 'hire');
        });
    }

    // ===== ROTATING TITLES ANIMATION =====
    function initRotatingTitles() {
        const animatedTitle = document.querySelector('.animated-title');
        if (!animatedTitle) return;
        
        const titles = [
            'Full Stack Developer',
            'Java Developer', 
            'Problem Solver',
            'Web Developer',
            'CSE Student',
            'Software Developer'
        ];
        
        let titleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function typeWriter() {
            const currentTitle = titles[titleIndex];
            
            if (isDeleting) {
                // Delete one character
                animatedTitle.textContent = currentTitle.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50; // Faster deletion
            } else {
                // Type one character
                animatedTitle.textContent = currentTitle.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100; // Normal typing speed
            }
            
            // When word is completely typed
            if (!isDeleting && charIndex === currentTitle.length) {
                typingSpeed = 2000; // Pause for 2 seconds
                isDeleting = true;
            } 
            // When word is completely deleted
            else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                typingSpeed = 500; // Pause before next word
            }
            
            setTimeout(typeWriter, typingSpeed);
        }
        
        // Start animation
        setTimeout(typeWriter, 1000);
    }

    // Initialize rotating titles
    initRotatingTitles();

    // Animate Skill Bars on Scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight - 100 && rect.bottom >= 0);
            
            if (isVisible && !bar.classList.contains('animated')) {
                const width = bar.getAttribute('data-width') + '%';
                
                // Use setTimeout to ensure the animation triggers
                setTimeout(() => {
                    bar.style.width = width;
                    bar.classList.add('animated');
                    
                    // Add completed class after animation
                    setTimeout(() => {
                        bar.classList.add('completed');
                    }, 1500);
                }, 100);
            }
        });
    }
    
    // Initialize skill bars
    animateSkillBars();
    window.addEventListener('scroll', animateSkillBars);
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to Top Button
    const backToTop = document.querySelector('.footer-iconTop a');
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// ===== EMAIL SENDING FUNCTION =====
async function sendContactEmail(formData, formType) {
    const submitBtn = formType === 'contact' 
        ? document.querySelector('#contactForm .btn') 
        : document.querySelector('.submit-btn');
    
    const originalText = submitBtn.textContent;
    
    // Show loading
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
        // Prepare email parameters
        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            company: formData.company || 'Not specified',
            interest_type: formData.projectType,
            message: formData.message,
            form_type: formType === 'hire' ? 'Hire Request' : 'Contact Form',
            timestamp: new Date().toLocaleString('en-IN', {
                timeZone: 'Asia/Kolkata',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            })
        };
        
        console.log('Sending email with params:', templateParams);
        
        // Send email using EmailJS
        const response = await emailjs.send(
            'service_q5ln44p',
            'template_tdf670q',
            templateParams
        );
        
        console.log('Email sent successfully!', response);
        
        // Show success message
        showNotification('success', 
            formType === 'hire' 
                ? 'Message sent successfully! I will get back to you soon.' 
                : 'Message sent! I will contact you soon.'
        );
        
        // Reset form
        if (formType === 'contact') {
            document.getElementById('contactForm').reset();
        } else {
            // Close hire modal after delay
            setTimeout(() => {
                const modal = document.querySelector('.notification-modal');
                if (modal) document.body.removeChild(modal);
            }, 2000);
        }
        
    } catch (error) {
        console.error('Email failed:', error);
        
        // Show error message
        showNotification('error', 
            'Failed to send message. Please try again or contact me directly at harishnandakumar837@gmail.com'
        );
    } finally {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(type, message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.email-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `email-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class='bx ${type === 'success' ? 'bx-check-circle' : 'bx-error'}'></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// ===== SKILL BARS ANIMATION =====
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight - 100 && rect.bottom >= 0);
        
        if (isVisible && !bar.classList.contains('animated')) {
            const width = bar.getAttribute('data-width') + '%';
            
            // Use setTimeout to ensure the animation triggers
            setTimeout(() => {
                bar.style.width = width;
                bar.classList.add('animated');
                
                // Add completed class after animation
                setTimeout(() => {
                    bar.classList.add('completed');
                }, 1500);
            }, 100);
        }
    });
}

// Initialize when page loads
window.addEventListener('load', animateSkillBars);

// Animate when scrolling
window.addEventListener('scroll', animateSkillBars);
