document.addEventListener('DOMContentLoaded', function() {
    
    function runScripts() {
        // --- Mobile Menu Toggle ---
        const mobileMenuButton = document.getElementById('nav-mobile-btn');
        const mobileMenu = document.getElementById('nav-mobile');
        
        if (mobileMenuButton && mobileMenu) {
            const menuIcon = mobileMenuButton.querySelector('i');
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                menuIcon.classList.toggle('fa-bars');
                menuIcon.classList.toggle('fa-times');
            });
        }
        
        // --- Scroll Animations ---
        const animatedElements = document.querySelectorAll('.fade-in-up');
        if ("IntersectionObserver" in window) {
            const scrollObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '0px',
                threshold: 0.1
            });
            animatedElements.forEach(el => scrollObserver.observe(el));
        }

        // --- About Section Tabs ---
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        if (tabButtons.length > 0) {
            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const tabId = button.dataset.tab;

                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');

                    tabContents.forEach(content => {
                        content.classList.toggle('active', content.id === `${tabId}-content`);
                    });
                });
            });
        }

        // --- Team Slider Logic ---
        const teamSlider = document.getElementById('team-slider');
        if (teamSlider) {
            const slides = teamSlider.querySelectorAll('.slider-item');
            const dots = teamSlider.querySelectorAll('.slider-dot');
            const prevButton = teamSlider.querySelector('#team-slider-prev');
            const nextButton = teamSlider.querySelector('#team-slider-next');
            let currentSlide = 0;
            let slideInterval;

            if (slides.length > 0) {
                function showSlide(n) {
                    currentSlide = (n + slides.length) % slides.length;
                    
                    slides.forEach(slide => slide.classList.remove('active'));
                    slides[currentSlide].classList.add('active');

                    if(dots.length > 0) {
                        dots.forEach(dot => dot.classList.remove('active'));
                        dots[currentSlide].classList.add('active');
                    }
                }

                function next() {
                    showSlide(currentSlide + 1);
                }

                function startSlideShow() {
                    stopSlideShow();
                    slideInterval = setInterval(next, 5000);
                }

                function stopSlideShow() {
                    clearInterval(slideInterval);
                }

                if(dots.length > 0) {
                    dots.forEach((dot, index) => {
                        dot.addEventListener('click', () => {
                            stopSlideShow();
                            showSlide(index);
                            startSlideShow();
                        });
                    });
                }
                
                if (prevButton && nextButton) {
                    prevButton.addEventListener('click', () => {
                        stopSlideShow();
                        showSlide(currentSlide - 1);
                        startSlideShow();
                    });

                    nextButton.addEventListener('click', () => {
                        stopSlideShow();
                        next();
                        startSlideShow();
                    });
                }
                
                startSlideShow();
            }
        }

        // --- Navigation Active Link Logic ---
        const navContainer = document.getElementById('nav-desktop');
        if (navContainer) {
            const navLinks = navContainer.querySelectorAll('.nav-link');
            const sections = document.querySelectorAll('main section[id]');

            function updateActiveLink(activeId) {
                navLinks.forEach(link => {
                    const linkHref = link.getAttribute('href').substring(1);
                    link.classList.toggle('active', linkHref === activeId);
                });
            }
            
            if ("IntersectionObserver" in window) {
                 const navObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            let sectionId = entry.target.id;
                            updateActiveLink(sectionId);
                        }
                    });
                }, { rootMargin: '-50% 0px -50% 0px', threshold: 0.5 });

                sections.forEach(section => {
                    if(section.id !== 'hero'){
                        navObserver.observe(section);
                    }
                });
            }
        }

        // --- Academics Modal Logic ---
        const modalOverlay = document.getElementById('strand-modal');
        const modalBody = document.getElementById('modal-body');
        const closeModalBtn = document.getElementById('modal-close-btn');

        const strandData = {
            STEM: {
                title: 'STEM: Science, Technology, Engineering, and Mathematics',
                description: 'The STEM strand is designed for students who are inclined towards the hard sciences. This track provides a strong foundation for careers in scientific research, healthcare, technology, and engineering.',
                subjects: ['Calculus', 'Physics', 'Biology', 'Chemistry', 'Research/Capstone Project', 'Computer Science'],
                careers: ['Engineer', 'Doctor', 'Scientist', 'Architect', 'Programmer', 'Medical Technologist']
            },
            ABM: {
                title: 'ABM: Accountancy, Business, and Management',
                description: 'The ABM strand is tailored for students who see themselves in the world of business. It covers the fundamental concepts of financial management, business operations, and accounting principles.',
                subjects: ['Business Math', 'Fundamentals of ABM 1 & 2', 'Organization & Management', 'Business Ethics', 'Marketing', 'Economics'],
                careers: ['Accountant', 'Marketing Director', 'HR Manager', 'Entrepreneur', 'Financial Analyst', 'Sales Manager']
            },
            HUMSS: {
                title: 'HUMSS: Humanities and Social Sciences',
                description: 'The HUMSS strand is ideal for students curious about human society, culture, and politics. It develops strong critical thinking and communication skills for careers in law, journalism, and education.',
                subjects: ['Creative Writing', 'World Religions', 'Philippine Politics', 'Community Engagement', 'Social Sciences', 'Humanities'],
                careers: ['Journalist', 'Lawyer', 'Teacher', 'Psychologist', 'Author', 'Social Worker']
            },
            HE: {
                title: 'HE: Home Economics',
                description: 'The Home Economics strand provides students with the skills for careers in hospitality, culinary arts, and lifestyle management. This hands-on track focuses on practical skills for livelihood.',
                subjects: ['Cookery', 'Bread & Pastry', 'Food & Beverage', 'Tourism Promotion', 'Handicraft Production', 'Wellness Massage'],
                careers: ['Chef', 'Hotel Manager', 'Baker', 'Restaurateur', 'Tour Guide', 'Event Planner']
            },
            ICT: {
                title: 'ICT: Information and Communications Technology',
                description: 'The ICT strand is for students passionate about technology, computers, and digital innovation. It covers programming, web development, and animation, preparing students for the tech industry.',
                subjects: ['Computer Programming', 'Web Development', 'Digital Animation', 'Java Programming', 'Networking', 'Systems Analysis'],
                careers: ['Web Developer', 'Animator', 'Programmer', 'IT Specialist', 'Network Engineer', 'Game Developer']
            }
        };

        const programData = {
            Education: {
                title: 'College of Education',
                description: 'The College of Education is committed to developing competent and compassionate educators who are ready to meet the challenges of 21st-century learning. Our programs focus on innovative teaching methodologies, curriculum development, and a deep understanding of educational psychology.',
                subjects: ['Facilitating Learning', 'Assessment of Student Learning', 'Curriculum Development', 'Educational Technology', 'Teaching Profession', 'Field Study & Internship'],
                careers: ['Classroom Teacher', 'School Administrator', 'Curriculum Developer', 'Instructional Designer', 'Educational Researcher', 'Corporate Trainer']
            },
            Business: {
                title: 'College of Business Administration',
                description: 'The College of Business Administration prepares students to become ethical and effective leaders in the global business environment. The curriculum integrates management theory with practical application, focusing on critical areas like marketing, finance, and human resources.',
                subjects: ['Financial Management', 'Marketing Management', 'Human Resource Management', 'Strategic Management', 'Business Law', 'Operations Management'],
                careers: ['Marketing Manager', 'Financial Analyst', 'HR Specialist', 'Operations Manager', 'Entrepreneur', 'Business Consultant']
            },
            Hospitality: {
                title: 'College of Hospitality & Tourism Management',
                description: 'The College of Hospitality and Tourism Management offers comprehensive training for students aspiring to join the dynamic tourism and hospitality industry. The program emphasizes service excellence, operational efficiency, and international standards.',
                subjects: ['Rooms Division Management', 'Food & Beverage Operations', 'Tourism & Hospitality Marketing', 'Event Management', 'Culinary Arts & Sciences', 'International Tourism'],
                careers: ['Hotel General Manager', 'Restaurant Owner', 'Events Coordinator', 'Tour Operator', 'Flight Attendant', 'Cruise Line Director']
            },
            Technology: {
                title: 'College of Information Technology',
                description: 'The College of Information Technology equips students with the technical skills and theoretical knowledge to excel in the fast-evolving world of IT. The curriculum covers software development, network administration, and emerging technologies.',
                subjects: ['Data Structures & Algorithms', 'Object-Oriented Programming', 'Database Management', 'Software Engineering', 'Networking &-Communications', 'Information Assurance & Security'],
                careers: ['Software Developer', 'Systems Analyst', 'Network Administrator', 'Database Administrator', 'IT Project Manager', 'Cybersecurity Specialist']
            }
        };

        function openModal(data) {
            if (data) {
                modalBody.innerHTML = `
                    <h3 class="modal-title">${data.title}</h3>
                    <p class="modal-desc">${data.description}</p>
                    <h4 class="modal-subtitle">Key Subjects / Courses</h4>
                    <ul>${data.subjects.map(s => `<li>${s}</li>`).join('')}</ul>
                    <h4 class="modal-subtitle">Potential Career Paths</h4>
                    <ul>${data.careers.map(c => `<li>${c}</li>`).join('')}</ul>
                `;
                modalOverlay.classList.add('active');
            }
        }

        const strandCards = document.querySelectorAll('.strand-card');
        strandCards.forEach(card => {
            card.addEventListener('click', () => {
                const strand = card.dataset.strand;
                openModal(strandData[strand]);
            });
        });

        const programCards = document.querySelectorAll('.program-card');
        programCards.forEach(card => {
            card.addEventListener('click', () => {
                const program = card.dataset.program;
                openModal(programData[program]);
            });
        });

        const closeModal = () => {
            modalOverlay.classList.remove('active');
        }

        closeModalBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) {
                closeModal();
            }
        });
        

        // --- Copy to Clipboard Logic ---
        const copyTargets = document.querySelectorAll('.copy-target');
        copyTargets.forEach(target => {
            target.addEventListener('click', () => {
                const textToCopy = target.dataset.copyText;
                
                const textArea = document.createElement('textarea');
                textArea.value = textToCopy;
                textArea.style.position = 'fixed';
                textArea.style.left = '-9999px';
                document.body.appendChild(textArea);
                
                textArea.select();
                try {
                    document.execCommand('copy');
                    const feedbackSpan = target.nextElementSibling;
                    if (feedbackSpan && feedbackSpan.classList.contains('copy-message')) {
                        feedbackSpan.textContent = 'Copied!';
                        setTimeout(() => {
                            feedbackSpan.textContent = '';
                        }, 2000);
                    }
                } catch (err) {
                    console.error('Failed to copy text: ', err);
                }
                
                document.body.removeChild(textArea);
            });
        });

        // Close mobile menu on link click
        const allMenuLinks = document.querySelectorAll('#nav-mobile a, #nav-desktop a');
        allMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if(mobileMenu && !mobileMenu.classList.contains('hidden')){
                     mobileMenu.classList.add('hidden');
                     const menuIcon = mobileMenuButton.querySelector('i');
                     menuIcon.classList.remove('fa-times');
                     menuIcon.classList.add('fa-bars');
                }
            });
        });
    }

    // Execute all scripts
    runScripts();
});
