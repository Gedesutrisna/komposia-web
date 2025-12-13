        // Mobile menu toggle
        function toggleMenu() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
        }

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    document.querySelector('.nav-links').classList.remove('active');
                }
            });
        });

        // Scroll animation
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Dynamic counter animation
        function animateCounter(element, target, duration = 2000) {
            let start = 0;
            const increment = target / (duration / 16);
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    element.textContent = target + (element.dataset.suffix || '');
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(start) + (element.dataset.suffix || '');
                }
            }, 16);
        }

        // Trigger counter animation when visible
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const target = parseInt(entry.target.dataset.target);
                    animateCounter(entry.target, target);
                    entry.target.classList.add('counted');
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat-number, .achievement-number').forEach(el => {
            const text = el.textContent.replace(/[^0-9]/g, '');
            if (text) {
                el.dataset.target = text;
                el.dataset.suffix = el.textContent.replace(text, '');
                el.textContent = '0' + el.dataset.suffix;
                counterObserver.observe(el);
            }
        });