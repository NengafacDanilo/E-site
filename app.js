 document.addEventListener('DOMContentLoaded', () => {
            // Mobile Navigation Toggle
            const navToggle = document.getElementById('navToggle');
            const navMenu = document.querySelector('.nav-menu');

            if (navToggle) {
                navToggle.addEventListener('click', () => {
                    navMenu.classList.toggle('active');
                    // Toggle icon between bars and times
                    const icon = navToggle.querySelector('i');
                    icon.classList.toggle('fa-bars');
                    icon.classList.toggle('fa-times');
                });

                // Close menu when clicking outside
                document.addEventListener('click', (e) => {
                    if (!navToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        const icon = navToggle.querySelector('i');
                        icon.classList.add('fa-bars');
                        icon.classList.remove('fa-times');
                    }
                });
            }

            // 1. Scroll Reveal Animation using Intersection Observer
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Add the 'show' class to trigger the CSS transition
                        entry.target.classList.add('show');
                        // Stop observing once the element is visible
                        observer.unobserve(entry.target); 
                    }
                });
            }, {
                // Root margin allows us to start loading elements slightly before they hit the viewport
                rootMargin: '0px 0px -100px 0px', 
                threshold: 0.1, // Trigger when 10% of the element is visible
            });

            // Select all elements marked for transition
            const elementsToObserve = document.querySelectorAll('.transition-element');
            elementsToObserve.forEach(el => {
                observer.observe(el);
            });
            
            // 2. Simple Hero Text Animation (Initial load fade in)
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                // Apply initial hidden state (if not already handled by general CSS)
                heroContent.style.opacity = 0;
                heroContent.style.transform = 'translateY(20px)';
                heroContent.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
                
                // Animate after a short delay
                setTimeout(() => {
                    heroContent.style.opacity = 1;
                    heroContent.style.transform = 'translateY(0)';
                }, 100); 
            }
        });