// مدیریت منوهای toggle
function setupToggle(tId, pId) {
    const t = document.getElementById(tId),
        p = document.getElementById(pId);
    t.addEventListener('click', () => {
        const open = p.classList.contains('open');
        document.querySelectorAll('.panel').forEach(x => x.classList.remove('open'));
        document.querySelectorAll('.toggle').forEach(x => x.setAttribute('aria-expanded', 'false'));
        if (!open) {
            p.classList.add('open');
            t.setAttribute('aria-expanded', 'true');
        }
    });
}

document.addEventListener('click', e => {
    if (!e.target.closest('.panel') && !e.target.closest('.toggle')) {
        document.querySelectorAll('.panel').forEach(x => x.classList.remove('open'));
        document.querySelectorAll('.toggle').forEach(x => x.setAttribute('aria-expanded', 'false'));
    }
});

document.addEventListener('keydown', e => {
    if (e.key === "Escape") {
        document.querySelectorAll('.panel').forEach(x => x.classList.remove('open'));
        document.querySelectorAll('.toggle').forEach(x => x.setAttribute('aria-expanded', 'false'));
    }
});

// مدیریت اسلایدر
let sliderIndex = 0;
function initSlider() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-arrow-left');
    const nextBtn = document.querySelector('.slider-arrow-right');

    if (!slider || !slides.length) return;

    function showSlide() {
        const slideWidth = slides[0].clientWidth;
        slider.style.transform = `translateX(${-sliderIndex * slideWidth}px)`;
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (sliderIndex < slides.length - 1) {
                sliderIndex++;
            } else {
                sliderIndex = 0;
            }
            showSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (sliderIndex > 0) {
                sliderIndex--;
            } else {
                sliderIndex = slides.length - 1;
            }
            showSlide();
        });
    }

    window.addEventListener('resize', showSlide);
}

// مدیریت نمایش پروفایل‌های فریلنسر
(function(){
    const PROFILE_STORAGE_KEY = 'freelancerProfiles';

    // بارگذاری پروفایل‌های منتشر شده
    function loadPublishedProfiles() {
        try {
            const profiles = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY) || '[]');
            return profiles.filter(profile => profile.isPublished === true);
        } catch (e) {
            console.error('Error loading profiles:', e);
            return [];
        }
    }

    // تولید کارت فریلنسر
    function generateFreelancerCard(profile) {
        const avatarSrc = profile.avatar || 'https://via.placeholder.com/80';
        const coverStyle = profile.cover ? 
            `background-image: url('${profile.cover}'); background-size: cover; background-position: center;` : 
            'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);';
        
        const skills = profile.skills ? profile.skills.slice(0, 4) : [];
        const works = profile.works ? profile.works.length : 0;
        const products = profile.products ? profile.products.length : 0;
        
        return `
            <div class="freelancer-card" data-profile-id="${profile.id}">
                <div class="freelancer-header" style="${coverStyle}">
                    <img src="${avatarSrc}" alt="${profile.name}" class="freelancer-avatar">
                </div>
                <div class="freelancer-body">
                    <h3 class="freelancer-name">${profile.name || 'نام فریلنسر'}</h3>
                    <p class="freelancer-title">${profile.title || 'عنوان شغلی'}</p>
                    <div class="freelancer-rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                        4.8 (12 نظر)
                    </div>
                    <p class="freelancer-description">${profile.about || 'توضیحات فریلنسر در اینجا نمایش داده می‌شود.'}</p>
                    <div class="freelancer-skills">
                        ${skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                        ${skills.length === 0 ? '<span class="skill-tag">مهارت‌ها</span>' : ''}
                    </div>
                    <div class="freelancer-stats">
                        <div class="stat-item">
                            <div class="stat-value">${works}</div>
                            <div class="stat-label">نمونه‌کار</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">${products}</div>
                            <div class="stat-label">محصول</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">${profile.status ? profile.status.length : 0}</div>
                            <div class="stat-label">وضعیت</div>
                        </div>
                    </div>
                    <div class="freelancer-actions">
                        <button class="btn-secondary" onclick="viewFreelancerProfile('${profile.id}')">پروفایل</button>
                        <button class="btn-primary" onclick="contactFreelancer('${profile.id}')">ارسال پیشنهاد</button>
                    </div>
                </div>
            </div>
        `;
    }

    // نمایش پروفایل‌های فریلنسر
    function renderFreelancerProfiles() {
        const profiles = loadPublishedProfiles();
        const grid = document.getElementById('freelancersGrid');
        
        if (!grid) return;
        
        if (profiles.length === 0) {
            grid.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #666;">
                    <i class="fas fa-users" style="font-size: 48px; margin-bottom: 16px; opacity: 0.5;"></i>
                    <h3>هنوز پروفایلی منتشر نشده است</h3>
                    <p>فریلنسرها می‌توانند پروفایل خود را در صفحه پروفایل منتشر کنند.</p>
                </div>
            `;
        } else {
            grid.innerHTML = profiles.map(profile => generateFreelancerCard(profile)).join('');
        }
    }

    // مشاهده پروفایل فریلنسر در مودال
    function viewFreelancerProfile(profileId) {
        const profiles = loadPublishedProfiles();
        const profile = profiles.find(p => p.id === profileId);
        
        if (profile) {
            const modal = document.getElementById('freelancerProfileModal');
            if (!modal) return;
            
            const avatar = modal.querySelector('.profile-avatar-large');
            const name = modal.querySelector('.profile-name');
            const title = modal.querySelector('.profile-title');
            const about = modal.querySelector('.profile-section p');
            const skills = modal.querySelector('.freelancer-skills');
            
            if (avatar) avatar.src = profile.avatar || 'https://via.placeholder.com/120';
            if (name) name.textContent = profile.name || 'نام فریلنسر';
            if (title) title.textContent = profile.title || 'عنوان شغلی';
            if (about) about.textContent = profile.about || 'توضیحات فریلنسر در اینجا نمایش داده می‌شود.';
            
            if (skills && profile.skills && profile.skills.length > 0) {
                skills.innerHTML = profile.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
            } else if (skills) {
                skills.innerHTML = '<span class="skill-tag">مهارت‌ها</span>';
            }
            
            openModal('freelancerProfileModal');
        }
    }

    // تماس با فریلنسر
    function contactFreelancer(profileId) {
        const profiles = loadPublishedProfiles();
        const profile = profiles.find(p => p.id === profileId);
        
        if (profile && profile.contactInfo) {
            const contactInfo = profile.contactInfo;
            let contactText = `اطلاعات تماس ${profile.name}:\n\n`;
            
            if (contactInfo.phone) contactText += `📱 تلفن: ${contactInfo.phone}\n`;
            if (contactInfo.telegram) contactText += `📱 تلگرام: ${contactInfo.telegram}\n`;
            if (contactInfo.whatsapp) contactText += `📱 واتس‌اپ: ${contactInfo.whatsapp}\n`;
            if (contactInfo.instagram) contactText += `📷 اینستاگرام: ${contactInfo.instagram}\n`;
            if (contactInfo.website) contactText += `🌐 وب‌سایت: ${contactInfo.website}\n`;
            
            alert(contactText);
        } else {
            alert('اطلاعات تماس در دسترس نیست.');
        }
    }

    // راه‌اندازی جستجو و فیلتر
    function setupSearchAndFilter() {
        const searchInput = document.querySelector('.search-box input');
        const categoryChips = document.querySelectorAll('.category-chip');
        
        // قابلیت جستجو
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                filterProfiles(searchTerm);
            });
        }
    
        // فیلتر دسته‌بندی
        if (categoryChips.length > 0) {
            categoryChips.forEach(chip => {
                chip.addEventListener('click', function() {
                    const category = this.textContent;
                    filterProfilesByCategory(category);
                });
            });
        }
    }

    // فیلتر پروفایل‌ها بر اساس عبارت جستجو
    function filterProfiles(searchTerm) {
        const profiles = loadPublishedProfiles();
        const filteredProfiles = profiles.filter(profile => {
            const name = (profile.name || '').toLowerCase();
            const title = (profile.title || '').toLowerCase();
            const about = (profile.about || '').toLowerCase();
            const skills = (profile.skills || []).join(' ').toLowerCase();
            
            return name.includes(searchTerm) || 
                   title.includes(searchTerm) || 
                   about.includes(searchTerm) || 
                   skills.includes(searchTerm);
        });
        
        renderFilteredProfiles(filteredProfiles);
    }

    // فیلتر پروفایل‌ها بر اساس دسته‌بندی
    function filterProfilesByCategory(category) {
        if (category === 'همه') {
            renderFreelancerProfiles();
            return;
        }
        
        const profiles = loadPublishedProfiles();
        const filteredProfiles = profiles.filter(profile => {
            const skills = profile.skills || [];
            return skills.some(skill => skill.toLowerCase().includes(category.toLowerCase()));
        });
        
        renderFilteredProfiles(filteredProfiles);
    }

    // نمایش پروفایل‌های فیلتر شده
    function renderFilteredProfiles(profiles) {
        const grid = document.getElementById('freelancersGrid');
        if (!grid) return;
        
        if (profiles.length === 0) {
            grid.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #666;">
                    <i class="fas fa-search" style="font-size: 48px; margin-bottom: 16px; opacity: 0.5;"></i>
                    <h3>نتیجه‌ای یافت نشد</h3>
                    <p>لطفاً جستجوی خود را تغییر دهید.</p>
                </div>
            `;
        } else {
            grid.innerHTML = profiles.map(profile => generateFreelancerCard(profile)).join('');
        }
    }

    // مقداردهی اولیه داده‌های دمو
    function initializeDemoData() {
        try {
            const existingProfiles = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY) || '[]');
            
            if (existingProfiles.length === 0) {
                const demoProfiles = [
                    {
                        id: 'demo1',
                        name: 'علی رضایی',
                        title: 'توسعه‌دهنده فرانت‌اند',
                        location: 'تهران، ایران',
                        about: 'توسعه‌دهنده فرانت‌اند با 5 سال سابقه کار در زمینه React و Vue.js. علاقه‌مند به ساخت رابط‌های کاربری مدرن و بهینه.',
                        skills: ['React', 'Vue.js', 'JavaScript', 'CSS3', 'HTML5'],
                        apps: ['VS Code', 'GitHub', 'Figma'],
                        status: ['پروژه‌ای', 'فریلنس'],
                        works: [],
                        products: [],
                        avatar: 'https://via.placeholder.com/80',
                        cover: '',
                        contactInfo: {
                            phone: '09120000001',
                            telegram: '@ali_developer',
                            whatsapp: '09120000001',
                            instagram: 'ali_web_dev'
                        },
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        isPublished: true
                    },
                    {
                        id: 'demo2',
                        name: 'سارا اکبری',
                        title: 'طراح UI/UX',
                        location: 'اصفهان، ایران',
                        about: 'طراح UI/UX با تمرکز بر تجربه کاربری و طراحی محصول. متخصص در طراحی اپلیکیشن‌های موبایل و وب.',
                        skills: ['UI/UX', 'Figma', 'Adobe XD', 'Prototype', 'Sketch'],
                        apps: ['Figma', 'Adobe XD', 'Sketch', 'InVision'],
                        status: ['تمام‌وقت', 'پاره‌وقت'],
                        works: [],
                        products: [],
                        avatar: 'https://via.placeholder.com/80',
                        cover: '',
                        contactInfo: {
                            phone: '09120000002',
                            telegram: '@sara_designer',
                            whatsapp: '09120000002',
                            instagram: 'sara_ui_ux'
                        },
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        isPublished: true
                    },
                    {
                        id: 'demo3',
                        name: 'محمد کریمی',
                        title: 'توسعه‌دهنده بک‌اند',
                        location: 'مشهد، ایران',
                        about: 'توسعه‌دهنده بک‌اند با تخصص در Node.js و Python. متخصص در طراحی API و پایگاه داده.',
                        skills: ['Node.js', 'Python', 'MongoDB', 'PostgreSQL', 'Docker'],
                        apps: ['VS Code', 'Postman', 'Docker Desktop', 'GitHub'],
                        status: ['پروژه‌ای', 'تمام‌وقت'],
                        works: [],
                        products: [],
                        avatar: 'https://via.placeholder.com/80',
                        cover: '',
                        contactInfo: {
                            phone: '09120000003',
                            telegram: '@mohammad_backend',
                            whatsapp: '09120000003',
                            instagram: 'mohammad_dev'
                        },
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        isPublished: true
                    }
                ];
                
                localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(demoProfiles));
                console.log('Demo profiles initialized');
            }
        } catch (e) {
            console.error('Error initializing demo data:', e);
        }
    }

    // مقداردهی اولیه هنگام لود صفحه
    document.addEventListener('DOMContentLoaded', function() {
        initializeDemoData();
        renderFreelancerProfiles();
        setupSearchAndFilter();
    });

    // تازه‌سازی پروفایل‌ها هنگام visible شدن صفحه
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            renderFreelancerProfiles();
        }
    });

    // در دسترس قرار دادن توابع به صورت global
    window.viewFreelancerProfile = viewFreelancerProfile;
    window.contactFreelancer = contactFreelancer;
})();

// مدیریت مودال‌ها
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// بستن مودال با کلیک خارج از آن
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
});

// فیلتر دسته‌بندی
document.addEventListener('DOMContentLoaded', function() {
    const categoryChips = document.querySelectorAll('.category-chip');
    if (categoryChips.length > 0) {
        categoryChips.forEach(chip => {
            chip.addEventListener('click', function() {
                categoryChips.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // ارسال فرم
    const forms = document.querySelectorAll('form');
    if (forms.length > 0) {
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('پیشنهاد با موفقیت ارسال شد!');
                closeModal('hireFreelancerModal');
            });
        });
    }
});

// مقداردهی اولیه همه چیز هنگام لود صفحه
document.addEventListener('DOMContentLoaded', function() {
    setupToggle('tFreelancer', 'pFreelancer');
    setupToggle('tEmployer', 'pEmployer');
    initSlider();
});
