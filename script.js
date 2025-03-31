document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        htmlElement.classList.add('dark');
    }
    
    themeToggle.addEventListener('click', function() {
        htmlElement.classList.toggle('dark');
        
        // Save preference
        if (htmlElement.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the data to a server
        // For this example, we'll just show an alert
        alert(`Thank you, ${name}! Your message has been received. I'll get back to you at ${email} soon.`);
        
        // Reset form
        contactForm.reset();
    });
    
    // Enhanced scroll animations
    const animatedSections = document.querySelectorAll('.scroll-section');
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the section is in view
            if (entry.isIntersecting) {
                // Get all animated elements in this section
                const animatedElements = entry.target.querySelectorAll('.animate__animated');
                
                // Animate each element with a staggered delay
                animatedElements.forEach((element, index) => {
                    setTimeout(() => {
                        // Remove any existing animation classes first
                        element.classList.remove('animate__zoomIn');
                        
                        // Force a reflow to restart animation
                        void element.offsetWidth;
                        
                        // Add the animation class
                        element.classList.add('animate__zoomIn');
                        element.style.opacity = 1;
                        element.style.animationDuration = '1s';
                    }, index * 150); // Stagger the animations
                });
                
                // If this section has skill bars, animate them
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
                
                // Stop observing this section once it's been animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Element is considered "in view" when it's 25% visible
        threshold: 0.25,
        // Start animating a bit before the element comes into view
        rootMargin: '0px 0px -10% 0px'
    });
    
    // Observe each section
    animatedSections.forEach(section => {
        observer.observe(section);
    });
    
    // Function to animate skill bars
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('#skills .bg-primary-DEFAULT');
        
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
                bar.style.transition = 'width 1.2s ease-in-out';
            }, 300);
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
});