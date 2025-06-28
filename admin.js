document.addEventListener('DOMContentLoaded', function () {
    // --- Basic Elements ---
    const menuButton = document.getElementById('menu-button');
    const sidebar = document.getElementById('sidebar');
    const navLinks = document.querySelectorAll('#sidebar-nav a.nav-item');
    const pages = document.querySelectorAll('.page-content');
    const headerTitle = document.getElementById('header-title');

    // --- Mobile Sidebar Toggle ---
    if (menuButton && sidebar) {
        menuButton.addEventListener('click', () => {
            const isVisible = sidebar.style.transform === 'translateX(0px)';
            sidebar.style.transform = isVisible ? 'translateX(-100%)' : 'translateX(0px)';
        });
    }

    // --- Page Navigation Logic ---
    function showPage(pageId) {
        pages.forEach(page => page.classList.remove('active'));
        const targetPage = document.querySelector(`[data-page="${pageId}"]`);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        const activeLink = document.querySelector(`#sidebar-nav a[href="#${pageId}"]`);
        if (activeLink) {
           headerTitle.textContent = activeLink.textContent.trim();
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href.indexOf('#') !== 0 || href === '#') return;

            e.preventDefault();
            const pageId = href.substring(1);

            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            showPage(pageId);
            window.location.hash = pageId;

            if (window.innerWidth < 768 && sidebar) {
                sidebar.style.transform = 'translateX(-100%)';
            }
        });
    });

    // --- Initial Page Load ---
    function initializePage() {
        const initialPage = window.location.hash ? window.location.hash.substring(1) : 'dashboard';
        const initialLink = document.querySelector(`#sidebar-nav a[href="#${initialPage}"]`);
        
        if (initialLink) {
            navLinks.forEach(l => l.classList.remove('active'));
            initialLink.classList.add('active');
            showPage(initialPage);
        } else {
            navLinks.forEach(l => l.classList.remove('active'));
            document.querySelector('#sidebar-nav a[href="#dashboard"]').classList.add('active');
            showPage('dashboard');
        }
    }

    initializePage();

    // --- News Modal Logic ---
    const newsModal = document.getElementById('news-modal');
    if (newsModal) {
        const addArticleBtn = document.getElementById('add-article-btn');
        const closeNewsModalBtn = document.getElementById('news-modal-close');
        const cancelNewsModalBtn = document.getElementById('news-modal-cancel');
        const newsList = document.getElementById('news-list');

        const openNewsModal = () => newsModal.classList.add('active');
        const closeNewsModal = () => newsModal.classList.remove('active');
        
        if (addArticleBtn) {
            addArticleBtn.addEventListener('click', openNewsModal);
        }
        if (closeNewsModalBtn) {
            closeNewsModalBtn.addEventListener('click', closeNewsModal);
        }
        if (cancelNewsModalBtn) {
            cancelNewsModalBtn.addEventListener('click', closeNewsModal);
        }
        
        newsModal.addEventListener('click', (e) => {
            if (e.target === newsModal) {
                closeNewsModal();
            }
        });

        if (newsList) {
            newsList.addEventListener('click', (e) => {
                const editButton = e.target.closest('.edit-article');
                if (editButton) {
                    e.preventDefault();
                    openNewsModal();
                    // In a real app, you would populate the modal with data from the clicked row.
                }
            });
        }
    }

    // --- Team Page: Add/Delete Team Member ---
    const addMemberBtn = document.getElementById('add-member-btn');
    const teamList = document.getElementById('team-list');

    if (addMemberBtn && teamList) {
        const createNewTeamMember = () => {
            const newItem = document.createElement('div');
            newItem.classList.add('card');
            newItem.innerHTML = `
                <div style="position: absolute; top: 1rem; right: 1rem; display: flex; gap: 0.5rem;">
                    <button class="btn-edit btn-edit-member" title="Edit Member"><i class="fas fa-pencil-alt"></i></button>
                    <button class="btn-delete btn-delete-member" title="Delete Member"><i class="fas fa-trash-alt"></i></button>
                </div>
                <h3 class="card-header">New Team Member</h3>
                <div class="form-grid">
                    <div class="form-group">
                        <label class="form-label">Full Name:</label>
                        <input type="text" placeholder="e.g., Juan dela Cruz" class="form-input">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Position:</label>
                        <input type="text" placeholder="e.g., Principal" class="form-input">
                    </div>
                    <div class="form-group form-group-full member-image-preview-container" style="display: none;">
                        <img src="" alt="Member Image Preview" class="member-image-preview" style="max-height: 150px; margin-bottom: 1rem; border-radius: 0.25rem;">
                    </div>
                    <div class="form-group form-group-full">
                        <label class="form-label">Image:</label>
                        <input type="file" class="form-input-file member-image-input" accept="image/*">
                    </div>
                    <div class="form-group form-group-full">
                        <label class="form-label">Description:</label>
                        <textarea rows="3" class="form-textarea" placeholder="Enter member description..."></textarea>
                    </div>
                </div>
                <div class="form-actions">
                    <button class="btn btn-success">Save Changes</button>
                </div>
            `;
            teamList.appendChild(newItem);
        };

        addMemberBtn.addEventListener('click', createNewTeamMember);

        teamList.addEventListener('click', (e) => {
            const deleteBtn = e.target.closest('.btn-delete-member');
            if (deleteBtn) {
                deleteBtn.closest('.card').remove();
            }
        });
        
        teamList.addEventListener('change', (e) => {
            if (e.target.classList.contains('member-image-input')) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    const previewContainer = e.target.closest('.card').querySelector('.member-image-preview-container');
                    const previewImage = previewContainer.querySelector('.member-image-preview');

                    reader.onload = function(event) {
                        previewImage.src = event.target.result;
                        previewContainer.style.display = 'block';
                    }
                    reader.readAsDataURL(file);
                }
            }
        });
    }

    // --- Academics Page: Add/Delete College Program ---
    const addProgramBtn = document.getElementById('add-program-btn');
    const programList = document.getElementById('program-list');

    if (addProgramBtn && programList) {
        const createNewProgram = () => {
            const newItem = document.createElement('div');
            newItem.classList.add('accordion-item');
            newItem.innerHTML = `
                <div class="accordion-header">
                    <p class="accordion-title">New Program</p>
                    <div>
                        <button class="btn-edit" title="Edit Program"><i class="fas fa-pencil-alt"></i></button>
                        <button class="btn-delete" title="Delete Program"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </div>
                <div class="form-grid">
                    <div class="form-group">
                        <label class="form-label-sm">Program Name:</label>
                        <input type="text" placeholder="e.g., Arts & Sciences" class="form-input form-input-sm">
                    </div>
                    <div class="form-group">
                        <label class="form-label-sm">Font Awesome Icon:</label>
                        <input type="text" placeholder="e.g., fa-solid fa-paint-brush" class="form-input form-input-sm">
                    </div>
                    <div class="form-group form-group-full">
                        <label class="form-label-sm">Description:</label>
                        <textarea class="form-textarea form-textarea-sm" rows="3" placeholder="Enter program description..."></textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-label-sm">Courses / Majors (one per line):</label>
                        <textarea rows="4" class="form-textarea form-textarea-sm"></textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-label-sm">Key Subjects (one per line):</label>
                        <textarea rows="4" class="form-textarea form-textarea-sm"></textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-label-sm">Potential Career Paths (one per line):</label>
                        <textarea rows="4" class="form-textarea form-textarea-sm"></textarea>
                    </div>
                </div>
            `;
            programList.appendChild(newItem);
        };
        addProgramBtn.addEventListener('click', createNewProgram);

        programList.addEventListener('click', (e) => {
            const deleteBtn = e.target.closest('.btn-delete');
            if (deleteBtn) {
                deleteBtn.closest('.accordion-item').remove();
            }
        });
    }
    
    // --- Academics Page: Add/Delete Senior High Strand ---
    const addStrandBtn = document.getElementById('add-strand-btn');
    const strandList = document.getElementById('strand-list');

    if (addStrandBtn && strandList) {
        const createNewStrand = () => {
            const newItem = document.createElement('div');
            newItem.classList.add('accordion-item');
            newItem.innerHTML = `
                <div class="accordion-header">
                    <p class="accordion-title">New Strand</p>
                    <div>
                        <button class="btn-edit" title="Edit Strand"><i class="fas fa-pencil-alt"></i></button>
                        <button class="btn-delete" title="Delete Strand"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </div>
                <div class="form-grid">
                    <div class="form-group">
                        <label class="form-label-sm">Strand Name:</label>
                        <input type="text" placeholder="e.g., GAS: General Academic Strand" class="form-input form-input-sm">
                    </div>
                    <div class="form-group">
                        <label class="form-label-sm">Description:</label>
                        <textarea class="form-textarea form-textarea-sm" rows="3" placeholder="Enter strand description..."></textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-label-sm">Key Subjects (one per line):</label>
                        <textarea class="form-textarea form-textarea-sm" rows="4"></textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-label-sm">Career Paths (one per line):</label>
                        <textarea class="form-textarea form-textarea-sm" rows="4"></textarea>
                    </div>
                </div>
            `;
            strandList.appendChild(newItem);
        };

        addStrandBtn.addEventListener('click', createNewStrand);

        strandList.addEventListener('click', (e) => {
            const deleteBtn = e.target.closest('.btn-delete');
            if (deleteBtn) {
                deleteBtn.closest('.accordion-item').remove();
            }
        });
    }

    // --- Services Page: Add/Delete Service ---
    const addServiceBtn = document.getElementById('add-service-btn');
    const serviceList = document.getElementById('service-list');

    if (addServiceBtn && serviceList) {
        const createNewService = () => {
            const newItem = document.createElement('div');
            newItem.classList.add('card');
            newItem.innerHTML = `
                <h4 class="card-title-sm">New Service</h4>
                <div class="form-group">
                    <label class="form-label-sm">Font Awesome Icon Class:</label>
                    <input type="text" placeholder="e.g., fa-solid fa-star" class="form-input form-input-sm">
                </div>
                <div class="form-group">
                    <label class="form-label-sm">Description:</label>
                    <textarea rows="3" class="form-textarea form-textarea-sm" placeholder="Enter service description..."></textarea>
                </div>
                <div class="form-actions">
                     <button class="btn btn-primary btn-sm">Save</button>
                     <button class="btn btn-danger btn-sm btn-delete-service">Delete</button>
                </div>
            `;
            serviceList.appendChild(newItem);
        };
        addServiceBtn.addEventListener('click', createNewService);

        serviceList.addEventListener('click', (e) => {
            const deleteBtn = e.target.closest('.btn-delete-service');
            if (deleteBtn) {
                deleteBtn.closest('.card').remove();
            }
        });
    }

    // --- Settings Page: Add/Delete Social Link ---
    const addSocialLinkBtn = document.getElementById('add-social-link-btn');
    const socialLinksList = document.getElementById('social-links-list');
    
    if(addSocialLinkBtn && socialLinksList) {
        const createNewSocialLink = () => {
            const newItem = document.createElement('div');
            newItem.classList.add('social-link-item');
            newItem.innerHTML = `
                <div class="form-group">
                    <label class="form-label-sm">URL:</label>
                    <input type="url" placeholder="https://www.example.com" class="form-input form-input-sm">
                </div>
                <div class="form-group">
                    <label class="form-label-sm">Icon Class (e.g., fab fa-twitter):</label>
                    <input type="text" placeholder="fab fa-twitter" class="form-input form-input-sm">
                </div>
                <button class="btn-delete btn-delete-social" title="Delete Link"><i class="fas fa-trash-alt"></i></button>
            `;
            socialLinksList.appendChild(newItem);
        };

        addSocialLinkBtn.addEventListener('click', createNewSocialLink);

        socialLinksList.addEventListener('click', (e) => {
            const deleteBtn = e.target.closest('.btn-delete-social');
            if (deleteBtn) {
                deleteBtn.closest('.social-link-item').remove();
            }
        });
    }
});
