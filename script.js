document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navbar.classList.toggle('active');
        
        // Toggle body scroll when menu is open
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
    
    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        navLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            if (section.offsetTop <= scrollPosition + 100 && 
                section.offsetTop + section.offsetHeight > scrollPosition + 100) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Fallback for browsers that don't support CSS video backgrounds
    if (!CSS.supports('background-video', 'url()')) {
        const homeSection = document.querySelector('.home');
        const video = document.createElement('video');
        
        video.src = './vd1.mp4';
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.style.position = 'absolute';
        video.style.top = '0';
        video.style.left = '0';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        video.style.zIndex = '-1';
        
        homeSection.insertBefore(video, homeSection.firstChild);
        
        // Ensure video plays on mobile
        video.play().catch(e => {
            document.addEventListener('click', function playVideo() {
                video.play();
                document.removeEventListener('click', playVideo);
            }, { once: true });
        });
    }
});