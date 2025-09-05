
function setupToggle(tId, pId){
  const t=document.getElementById(tId), p=document.getElementById(pId);
  t.addEventListener('click',()=>{
    const open=p.classList.contains('open');
    document.querySelectorAll('.panel').forEach(x=>x.classList.remove('open'));
    document.querySelectorAll('.toggle').forEach(x=>x.setAttribute('aria-expanded','false'));
    if(!open){p.classList.add('open');t.setAttribute('aria-expanded','true');}
  });
}
document.addEventListener('click',e=>{
  if(!e.target.closest('.panel')&&!e.target.closest('.toggle')){
    document.querySelectorAll('.panel').forEach(x=>x.classList.remove('open'));
    document.querySelectorAll('.toggle').forEach(x=>x.setAttribute('aria-expanded','false'));
  }
});
document.addEventListener('keydown',e=>{
  if(e.key==="Escape"){
    document.querySelectorAll('.panel').forEach(x=>x.classList.remove('open'));
    document.querySelectorAll('.toggle').forEach(x=>x.setAttribute('aria-expanded','false'));
  }
});
setupToggle('tFreelancer','pFreelancer');
setupToggle('tEmployer','pEmployer');
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slider-arrow-left');
const nextBtn = document.querySelector('.slider-arrow-right');

let index = 0;

document.addEventListener('DOMContentLoaded', function() {
            const slider = document.querySelector('.slider');
            const slides = document.querySelectorAll('.slide');
            const controls = document.querySelectorAll('.slider-control');
            const arrowLeft = document.querySelector('.arrow-left');
            const arrowRight = document.querySelector('.arrow-right');
            
            let currentSlide = 0;
            const slideCount = slides.length;
            
            // تابع برای تغییر اسلاید
            function goToSlide(index) {
                if (index < 0) {
                    index = slideCount - 1;
                } else if (index >= slideCount) {
                    index = 0;
                }
                
                slider.style.transform = `translateX(-${index * 100}%)`;
                
                // به روز رسانی کنترل‌های فعال
                controls.forEach((control, i) => {
                    if (i === index) {
                        control.classList.add('active');
                    } else {
                        control.classList.remove('active');
                    }
                });
                
                currentSlide = index;
            }
            
            // اضافه کردن رویداد برای کنترل‌ها
            controls.forEach((control, index) => {
                control.addEventListener('click', () => {
                    goToSlide(index);
                });
            });
            
            // اضافه کردن رویداد برای فلش‌ها
            arrowLeft.addEventListener('click', () => {
                goToSlide(currentSlide + 1);
            });
            
            arrowRight.addEventListener('click', () => {
                goToSlide(currentSlide - 1);
            });
            
            // اسلاید خودکار
            let autoSlide = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 5000);
            
            // توقف اسلاید خودکار هنگام هاور روی اسلایدر
            const sliderContainer = document.querySelector('.slider-container');
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(autoSlide);
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                autoSlide = setInterval(() => {
                    goToSlide(currentSlide + 1);
                }, 5000);
            });
            
            // پشتیبانی از سوایپ در تاچ اسکرین
            let touchStartX = 0;
            let touchEndX = 0;
            
            sliderContainer.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
            });
            
            sliderContainer.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
            
            function handleSwipe() {
                if (touchEndX < touchStartX) {
                    goToSlide(currentSlide + 1); // سوایپ به چپ - اسلاید بعدی
                }
                if (touchEndX > touchStartX) {
                    goToSlide(currentSlide - 1); // سوایپ به راست - اسلاید قبلی
                }
            }
        });
         // رنگ‌های پالت
        const colors = [
            '#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE', 
            '#448AFF', '#40C4FF', '#18FFFF', '#64FFDA', '#69F0AE',
            '#B2FF59', '#EEFF41', '#FFFF00', '#FFD740', '#FFAB40', 
            '#FF6E40', '#000000', '#616161', '#9E9E9E', '#FFFFFF'
        ];






        // به‌روزرسانی وضعیت دکمه‌های ناوبری
        function updateNavButtons() {
            const scroller = document.getElementById('scroller');
            const leftBtn = document.getElementById('leftBtn');
            const rightBtn = document.getElementById('rightBtn');
            
            leftBtn.disabled = scroller.scrollLeft === 0;
            rightBtn.disabled = scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth;
        }


        // فرمت قیمت
        function formatPrice(price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        // فرمت تاریخ
        function formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('fa-IR', options);
        }

        
        // داده‌های نمونه برای پست‌ها با ویژگی‌های کامل برای فیلتر کردن
        const postsData = [
            { 
                id: 1, 
                title: "طراحی لوگو برای شرکت فناوری", 
                category: "graphic-design", 
                subcategory: "logo-design", 
                description: "طراحی لوگو مدرن و منحصر به فرد برای استارتاپ فناوری", 
                price: 4500000, 
                date: "2023-10-15", 
                isPro: true,
                tools: ["Adobe Illustrator", "Adobe Photoshop"],
                availability: "پروژه‌ای / فریلنس",
                country: "ایران",
                city: "تهران",
                dominantColor: "#FF5252"
            },
            { 
                id: 2, 
                title: "تدوین ویدیو تبلیغاتی", 
                category: "video-animation", 
                subcategory: "video-editing", 
                description: "تدوین حرفه‌ای ویدیو تبلیغاتی 60 ثانیه‌ای", 
                price: 3200000, 
                date: "2023-10-12", 
                isPro: false,
                tools: ["Adobe Premiere Pro", "Adobe After Effects"],
                availability: "تمام‌وقت",
                country: "ایران",
                city: "مشهد",
                dominantColor: "#448AFF"
            },
            { 
                id: 3, 
                title: "تولید محتوای اینستاگرام", 
                category: "content-creation", 
                subcategory: "instagram-content", 
                description: "تولید محتوای ماهانه برای پیج اینستاگرام", 
                price: 2800000, 
                date: "2023-10-10", 
                isPro: true,
                tools: ["Canva", "Adobe Photoshop"],
                availability: "پروژه‌ای / فریلنس",
                country: "ایران",
                city: "اصفهان",
                dominantColor: "#69F0AE"
            },
            { 
                id: 4, 
                title: "برنامه‌نویسی وب اپلیکیشن", 
                category: "web-development", 
                subcategory: "web-app", 
                description: "توسعه وب اپلیکیشن با React و Node.js", 
                price: 12500000, 
                date: "2023-10-08", 
                isPro: true,
                tools: ["Visual Studio Code (VS Code)", "GitHub"],
                availability: "تمام‌وقت",
                country: "کانادا",
                city: "تورنتو",
                dominantColor: "#7C4DFF"
            },
            { 
                id: 5, 
                title: "طراحی کاراکتر برای بازی", 
                category: "illustration", 
                subcategory: "character-design", 
                description: "طراحی و طراحی کاراکتر برای بازی موبایل", 
                price: 7500000, 
                date: "2023-10-05", 
                isPro: false,
                tools: ["Procreate", "Adobe Illustrator"],
                availability: "پروژه‌ای / فریلنس",
                country: "آلمان",
                city: "برلین",
                dominantColor: "#FF4081"
            },
            { 
                id: 6, 
                title: "مشاوره سئو وبسایت", 
                category: "seo-marketing", 
                subcategory: "seo-consulting", 
                description: "بهینه‌سازی وبسایت برای موتورهای جستجو", 
                price: 6000000, 
                date: "2023-10-03", 
                isPro: true,
                tools: ["Google Analytics", "Ahrefs"],
                availability: "پروژه‌ای / فریلنس",
                country: "امارات",
                city: "دبی",
                dominantColor: "#FFD740"
            },
            { 
                id: 7, 
                title: "عکاسی محصولات", 
                category: "photography", 
                subcategory: "product-photography", 
                description: "عکاسی حرفه‌ای از محصولات برای سایت", 
                price: 3800000, 
                date: "2023-10-01", 
                isPro: false,
                tools: ["Adobe Lightroom", "Adobe Photoshop"],
                availability: "تمام‌وقت",
                country: "ترکیه",
                city: "استانبول",
                dominantColor: "#18FFFF"
            },
            { 
                id: 8, 
                title: "نریشن ویدیو آموزشی", 
                category: "audio-music", 
                subcategory: "narration", 
                description: "ضبط صدا و نریشن برای ویدیوهای آموزشی", 
                price: 2200000, 
                date: "2023-09-28", 
                isPro: true,
                tools: ["Adobe Audition", "Audacity"],
                availability: "پروژه‌ای / فریلنس",
                country: "ایران",
                city: "شیراز",
                dominantColor: "#FF6E40"
            },
            { 
                id: 9, 
                title: "کپی‌رایتینگ تبلیغاتی", 
                category: "copywriting", 
                subcategory: "ad-copy", 
                description: "نوشتن متن تبلیغاتی خلاقانه برای کمپین", 
                price: 3100000, 
                date: "2023-09-25", 
                isPro: false,
                tools: ["Notion", "Google Docs"],
                availability: "پروژه‌ای / فریلنس",
                country: "ایران",
                city: "تبریز",
                dominantColor: "#64FFDA"
            },
            { 
                id: 10, 
                title: "مدیریت پیج اینستاگرام", 
                category: "social-media", 
                subcategory: "instagram-management", 
                description: "مدیریت کامل پیج اینستاگرام به صورت ماهانه", 
                price: 4800000, 
                date: "2023-09-22", 
                isPro: true,
                tools: ["Canva", "Notion"],
                availability: "تمام‌وقت",
                country: "ایران",
                city: "اهواز",
                dominantColor: "#E040FB"
            },
            { 
                id: 11, 
                title: "طراحی موشن گرافی", 
                category: "video-animation", 
                subcategory: "motion-graphics", 
                description: "ساخت موشن گرافی 30 ثانیه‌ای برای تبلیغات", 
                price: 5500000, 
                date: "2023-09-20", 
                isPro: true,
                tools: ["Adobe After Effects", "Adobe Premiere Pro"],
                availability: "پروژه‌ای / فریلنس",
                country: "ایران",
                city: "رشت",
                dominantColor: "#FFFF00"
            },
            { 
                id: 12, 
                title: "توسعه اپلیکیشن هوش مصنوعی", 
                category: "programming-ai", 
                subcategory: "ai-development", 
                description: "پیاده‌سازی مدل هوش مصنوعی برای پردازش تصویر", 
                price: 18500000, 
                date: "2023-09-18", 
                isPro: true,
                tools: ["Python", "TensorFlow", "Jupyter Notebook"],
                availability: "تمام‌وقت",
                country: "آمریکا",
                city: "سانفرانسیسکو",
                dominantColor: "#9E9E9E"
            },
            { 
                id: 13, 
                title: "طراحی پست اینستاگرام", 
                category: "graphic-design", 
                subcategory: "post-story-design", 
                description: "طراحی پست‌های جذاب برای اینستاگرام", 
                price: 2500000, 
                date: "2023-09-15", 
                isPro: false,
                tools: ["Adobe Photoshop", "Canva"],
                availability: "پروژه‌ای / فریلنس",
                country: "ایران",
                city: "اصفهان",
                dominantColor: "#FF9800"
            },
            { 
                id: 14, 
                title: "طراحی بنر تبلیغاتی", 
                category: "graphic-design", 
                subcategory: "banner-design", 
                description: "طراحی بنرهای تبلیغاتی برای وب‌سایت", 
                price: 1800000, 
                date: "2023-09-12", 
                isPro: true,
                tools: ["Adobe Illustrator", "Adobe Photoshop"],
                availability: "تمام‌وقت",
                country: "ایران",
                city: "شیراز",
                dominantColor: "#4CAF50"
            },
            { 
                id: 15, 
                title: "تصویرسازی کتاب کودک", 
                category: "illustration", 
                subcategory: "children-book-illustration", 
                description: "تصویرسازی خلاقانه برای کتاب‌های کودکان", 
                price: 4200000, 
                date: "2023-09-10", 
                isPro: true,
                tools: ["Procreate", "Adobe Illustrator"],
                availability: "پروژه‌ای / فریلنس",
                country: "ایران",
                city: "تبریز",
                dominantColor: "#E91E63"
            },
            { 
                id: 16, 
                title: "ساخت ریلز اینستاگرام", 
                category: "video-animation", 
                subcategory: "reels-clips", 
                description: "ساخت ریلز جذاب برای اینستاگرام", 
                price: 3500000, 
                date: "2023-09-08", 
                isPro: false,
                tools: ["CapCut", "Adobe Premiere Pro"],
                availability: "پروژه‌ای / فریلنس",
                country: "ایران",
                city: "مشهد",
                dominantColor: "#9C27B0"
            },
            { 
                id: 17, 
                title: "تدوین و میکس صدا", 
                category: "audio-music", 
                subcategory: "audio-mixing", 
                description: "تدوین و میکس حرفه‌ای صدا برای پروژه‌ها", 
                price: 2800000, 
                date: "2023-09-05", 
                isPro: true,
                tools: ["Adobe Audition", "FL Studio"],
                availability: "تمام‌وقت",
                country: "ایران",
                city: "تهران",
                dominantColor: "#607D8B"
            },
            { 
                id: 18, 
                title: "تولید محتوای وبلاگ", 
                category: "content-creation", 
                subcategory: "blog-content", 
                description: "نوشتن محتوای با کیفیت برای وبلاگ", 
                price: 1500000, 
                date: "2023-09-03", 
                isPro: false,
                tools: ["Google Docs", "Notion"],
                availability: "پروژه‌ای / فریلنس",
                country: "ایران",
                city: "اصفهان",
                dominantColor: "#795548"
            },
            { 
                id: 19, 
                title: "مدیریت لینکدین", 
                category: "social-media", 
                subcategory: "social-management", 
                description: "مدیریت حرفه‌ای صفحه لینکدین", 
                price: 5500000, 
                date: "2023-09-01", 
                isPro: true,
                tools: ["Canva", "LinkedIn"],
                availability: "تمام‌وقت",
                country: "ایران",
                city: "تهران",
                dominantColor: "#2196F3"
            },
            { 
                id: 20, 
                title: "طراحی سایت وردپرس", 
                category: "web-development", 
                subcategory: "wordpress-design", 
                description: "طراحی سایت کامل با وردپرس", 
                price: 8500000, 
                date: "2023-08-28", 
                isPro: true,
                tools: ["WordPress", "Elementor"],
                availability: "تمام‌وقت",
                country: "ایران",
                city: "شیراز",
                dominantColor: "#3F51B5"
            },
            { 
                id: 21, 
                title: "برنامه‌نویسی وب", 
                category: "programming-ai", 
                subcategory: "web-programming", 
                description: "توسعه وب‌سایت با React و Node.js", 
                price: 12000000, 
                date: "2023-08-25", 
                isPro: true,
                tools: ["Visual Studio Code", "GitHub"],
                availability: "تمام‌وقت",
                country: "ایران",
                city: "تهران",
                dominantColor: "#00BCD4"
            },
            { 
                id: 22, 
                title: "سئوی تکنیکال", 
                category: "seo-marketing", 
                subcategory: "technical-seo", 
                description: "بهینه‌سازی تکنیکال سایت برای سئو", 
                price: 4500000, 
                date: "2023-08-22", 
                isPro: true,
                tools: ["Google Search Console", "Ahrefs"],
                availability: "پروژه‌ای / فریلنس",
                country: "ایران",
                city: "اصفهان",
                dominantColor: "#8BC34A"
            }
        ];

        // وضعیت فیلترها
        let activeFilters = {
            categories: [],
            availability: '',
            country: '',
            city: '',
            tools: [],
            colors: []
        };

        // متغیرهای global
        let currentCategory = "for-you";
        let currentSubcategory = "";

        // رنگ‌های پالت
        const colors = [
            '#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE',
            '#448AFF', '#40C4FF', '#18FFFF', '#64FFDA', '#69F0AE',
            '#B2FF59', '#EEFF41', '#FFFF00', '#FFD740', '#FFAB40',
            '#FF6E40', '#000000', '#616161', '#9E9E9E', '#FFFFFF'
        ];

        // زیرمجموعه‌های دسته‌بندی‌ها با نام نمایشی و slug
        const subcategories = {
            "graphic-design": [
                { name: "طراحی لوگو و هویت بصری", slug: "logo-design" },
                { name: "طراحی پست و استوری", slug: "post-story-design" },
                { name: "طراحی بنر تبلیغاتی", slug: "banner-design" },
                { name: "طراحی کاتالوگ، بروشور، کارت ویزیت", slug: "catalog-design" },
                { name: "طراحی کاور (موزیک، پادکست، کتاب)", slug: "cover-design" },
                { name: "طراحی بسته‌بندی (پک محصولات)", slug: "packaging-design" }
            ],
            "illustration": [
                { name: "تصویرسازی کتاب کودک", slug: "children-book-illustration" },
                { name: "تصویرسازی فانتزی / رئال", slug: "fantasy-illustration" },
                { name: "کاراکتر دیزاین", slug: "character-design" },
                { name: "طراحی NFT", slug: "nft-design" },
                { name: "تصویرسازی تبلیغاتی", slug: "advertising-illustration" },
                { name: "آرت کانسپت (برای بازی و انیمیشن)", slug: "concept-art" }
            ],
            "video-animation": [
                { name: "تدوین و ادیت ویدیو", slug: "video-editing" },
                { name: "ساخت ریلز و کلیپ تبلیغاتی", slug: "reels-clips" },
                { name: "موشن‌گرافی", slug: "motion-graphics" },
                { name: "انیمیشن دو بعدی / سه بعدی", slug: "animation-2d-3d" },
                { name: "استاپ موشن", slug: "stop-motion" },
                { name: "ویدیوهای آموزشی", slug: "educational-videos" }
            ],
            "audio-music": [
                { name: "نریشن و دوبله", slug: "narration" },
                { name: "تدوین و میکس صدا", slug: "audio-mixing" },
                { name: "ساخت موسیقی اختصاصی", slug: "custom-music" },
                { name: "افکت‌گذاری صوتی", slug: "audio-effects" },
                { name: "ضبط پادکست", slug: "podcast-recording" }
            ],
            "content-creation": [
                { name: "تولید محتوای وبلاگ", slug: "blog-content" },
                { name: "تولید محتوا برای اینستاگرام", slug: "instagram-content" },
                { name: "نوشتن اسکریپت ویدیو", slug: "video-script" },
                { name: "کپشن‌نویسی و متن تبلیغاتی", slug: "ad-copy" },
                { name: "نوشتن متن سایت و لندینگ", slug: "website-content" },
                { name: "ترجمه و بازنویسی", slug: "translation-rewrite" },
                { name: "ویراستاری متون فارسی", slug: "persian-editing" }
            ],
            "social-media": [
                { name: "مدیریت پیج اینستاگرام", slug: "instagram-management" },
                { name: "مدیریت لینکدین / توییتر / تلگرام", slug: "social-management" },
                { name: "ساخت تقویم محتوایی", slug: "content-calendar" },
                { name: "پاسخ به دیرکت و تعامل با فالوورها", slug: "engagement" },
                { name: "اجرای کمپین و مسابقه", slug: "campaign-execution" },
                { name: "رشد ارگانیک و تبلیغات اینفلوئنسری", slug: "organic-growth" }
            ],
            "web-development": [
                { name: "طراحی سایت وردپرس", slug: "wordpress-design" },
                { name: "طراحی سایت Webflow یا Wix", slug: "webflow-wix" },
                { name: "طراحی UI/UX", slug: "ui-ux-design" },
                { name: "طراحی فروشگاه اینترنتی", slug: "ecommerce-design" },
                { name: "طراحی لندینگ‌پیج", slug: "landing-page" },
                { name: "پشتیبانی سایت", slug: "website-support" }
            ],
            "programming-ai": [
                { name: "برنامه‌نویسی وب (Front-end / Back-end)", slug: "web-programming" },
                { name: "برنامه‌نویسی موبایل (iOS / Android)", slug: "mobile-programming" },
                { name: "ساخت ربات / اتوماسیون", slug: "bot-automation" },
                { name: "طراحی اپلیکیشن", slug: "app-design" },
                { name: "API و یکپارچه‌سازی سیستم‌ها", slug: "api-integration" },
                { name: "پروژه‌های دیتابیس", slug: "database-projects" }
            ],
            "seo-marketing": [
                { name: "سئوی تکنیکال", slug: "technical-seo" },
                { name: "سئوی محتوا", slug: "content-seo" },
                { name: "تبلیغات گوگل (Google Ads)", slug: "google-ads" },
                { name: "تبلیغات اینستاگرام", slug: "instagram-ads" },
                { name: "ایمیل مارکتینگ", slug: "email-marketing" },
                { name: "اتوماسیون بازاریابی", slug: "marketing-automation" },
                { name: "آنالیز کمپین و CRO", slug: "campaign-analysis" }
            ]
        };

        // مقداردهی اولیه
        document.addEventListener('DOMContentLoaded', function () {
            // ایجاد پالت رنگ
            const palette = document.getElementById('palette');
            colors.forEach(color => {
                const colorOption = document.createElement('div');
                colorOption.className = 'color-option';
                colorOption.style.backgroundColor = color;
                colorOption.setAttribute('data-color', color);
                colorOption.addEventListener('click', function () {
                    this.classList.toggle('selected');
                    updateSelectedCount();
                });
                palette.appendChild(colorOption);
            });

            // افزودن رویداد به آکاردئون‌ها
            document.querySelectorAll('.acc').forEach(button => {
                button.addEventListener('click', function () {
                    const expanded = this.getAttribute('aria-expanded') === 'true';
                    this.setAttribute('aria-expanded', !expanded);
                    const panel = this.nextElementSibling;
                    panel.style.display = expanded ? 'none' : 'block';
                });
            });

            // جستجو در دسته‌ها
            document.getElementById('catSearch').addEventListener('input', function () {
                filterList('catList', this.value);
            });

            // جستجو در ابزارها
            document.getElementById('toolSearch').addEventListener('input', function () {
                filterList('toolList', this.value);
            });

            // رویداد تغییر برای فیلترها
            document.querySelectorAll('input[name="cat"], input[name="tool"]').forEach(input => {
                input.addEventListener('change', updateSelectedCount);
            });

            document.querySelectorAll('input[name="availability"]').forEach(input => {
                input.addEventListener('change', updateSelectedCount);
            });

            document.getElementById('country').addEventListener('change', updateSelectedCount);
            document.getElementById('city').addEventListener('input', updateSelectedCount);

            // نمایش پست‌ها
            displayPosts(postsData);

            // افزودن رویداد به دکمه‌های دسته‌بندی
            document.querySelectorAll('.pill').forEach(pill => {
                pill.addEventListener('click', function () {
                    // حذف کلاس فعال از همه
                    document.querySelectorAll('.pill').forEach(p => p.classList.remove('is-active'));
                    // افزودن کلاس فعال به دکمه کلیک شده
                    this.classList.add('is-active');

                    // به‌روزرسانی دسته‌بندی فعلی
                    currentCategory = this.getAttribute('data-category');

                    // نمایش زیرمجموعه‌ها اگر دسته‌بندی اصلی انتخاب شده
                    if (subcategories[currentCategory]) {
                        showSubcategories(currentCategory);
                    } else {
                        hideSubcategories();
                    }

                    // فیلتر کردن پست‌ها
                    filterPosts();
                });
            });

            // رویدادهای ناوبری
            const scroller = document.getElementById('scroller');
            const leftBtn = document.getElementById('leftBtn');
            const rightBtn = document.getElementById('rightBtn');

            leftBtn.addEventListener('click', () => {
                scroller.scrollBy({ left: -200, behavior: 'smooth' });
            });

            rightBtn.addEventListener('click', () => {
                scroller.scrollBy({ left: 200, behavior: 'smooth' });
            });

            scroller.addEventListener('scroll', updateNavButtons);
            
            // اسلایدر
            setupSlider();
            
            // toggle panels
            setupToggle('tFreelancer', 'pFreelancer');
            setupToggle('tEmployer', 'pEmployer');
        });

        // تابع برای فیلتر کردن پست‌ها با تمام فیلترها
        function filterPostsWithAllFilters() {
            let filteredPosts = postsData;

            // فیلتر بر اساس دسته‌بندی اصلی
            if (currentCategory && currentCategory !== "for-you" && currentCategory !== "followed" && currentCategory !== "featured") {
                filteredPosts = filteredPosts.filter(post => post.category === currentCategory);
            }

            // فیلتر بر اساس زیردسته
            if (currentSubcategory) {
                filteredPosts = filteredPosts.filter(post => post.subcategory === currentSubcategory);
            }

            // فیلتر بر اساس دسته‌های انتخاب شده در پنل فیلتر
            if (activeFilters.categories.length > 0) {
                filteredPosts = filteredPosts.filter(post =>
                    activeFilters.categories.includes(post.category)
                );
            }

            // فیلتر بر اساس ابزارها
            if (activeFilters.tools.length > 0) {
                filteredPosts = filteredPosts.filter(post =>
                    post.tools && post.tools.some(tool => activeFilters.tools.includes(tool))
                );
            }

            // فیلتر بر اساس وضعیت همکاری
            if (activeFilters.availability) {
                filteredPosts = filteredPosts.filter(post =>
                    post.availability === activeFilters.availability
                );
            }

            // فیلتر بر اساس موقعیت مکانی
            if (activeFilters.country) {
                filteredPosts = filteredPosts.filter(post =>
                    post.country === activeFilters.country
                );
            }

            if (activeFilters.city) {
                filteredPosts = filteredPosts.filter(post =>
                    post.city && post.city.toLowerCase().includes(activeFilters.city.toLowerCase())
                );
            }

            // فیلتر بر اساس رنگ
            if (activeFilters.colors.length > 0) {
                filteredPosts = filteredPosts.filter(post =>
                    post.dominantColor && activeFilters.colors.includes(post.dominantColor)
                );
            }

            // نمایش پست‌های فیلتر شده
            displayPosts(filteredPosts);
        }

        // اعمال فیلترها
        function applyFilters() {
            // جمع‌آوری فیلترهای دسته‌ها
            activeFilters.categories = [];
            document.querySelectorAll('input[name="cat"]:checked').forEach(checkbox => {
                activeFilters.categories.push(checkbox.value);
            });

            // جمع‌آوری فیلترهای ابزارها
            activeFilters.tools = [];
            document.querySelectorAll('input[name="tool"]:checked').forEach(checkbox => {
                activeFilters.tools.push(checkbox.value);
            });

            // وضعیت همکاری
            const availabilityInput = document.querySelector('input[name="availability"]:checked');
            activeFilters.availability = availabilityInput ? availabilityInput.value : '';

            // موقعیت مکانی
            activeFilters.country = document.getElementById('country').value;
            activeFilters.city = document.getElementById('city').value;

            // رنگ‌ها
            activeFilters.colors = [];
            document.querySelectorAll('.color-option.selected').forEach(colorOption => {
                activeFilters.colors.push(colorOption.getAttribute('data-color'));
            });

            console.log('فیلترهای اعمال شده:', activeFilters);

            // فیلتر کردن پست‌ها بر اساس فیلترهای اعمال شده
            filterPostsWithAllFilters();

            closeFilters();
        }

        // باز کردن فیلترها
        function openFilters() {
            console.log("open")
            document.getElementById('drawer').classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        // بستن فیلترها
        function closeFilters() {
            document.getElementById('drawer').classList.remove('open');
            document.body.style.overflow = 'auto';
        }

        // فیلتر کردن لیست‌ها
        function filterList(listId, searchTerm) {
            const list = document.getElementById(listId);
            const items = list.getElementsByClassName('item');

            for (let item of items) {
                const text = item.textContent || item.innerText;
                if (text.toLowerCase().includes(searchTerm.toLowerCase())) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            }
        }

        // به‌روزرسانی تعداد انتخاب‌ها
        function updateSelectedCount() {
            // شمارش دسته‌های انتخاب شده
            const selectedCats = document.querySelectorAll('input[name="cat"]:checked').length;

            // شمارش ابزارهای انتخاب شده
            const selectedTools = document.querySelectorAll('input[name="tool"]:checked').length;

            // بررسی وضعیت همکاری انتخاب شده
            const availabilitySelected = document.querySelector('input[name="availability"]:checked').value !== '';

            // بررسی موقعیت مکانی
            const countrySelected = document.getElementById('country').value !== '';
            const citySelected = document.getElementById('city').value !== '';

            // شمارش رنگ‌های انتخاب شده
            const selectedColors = document.querySelectorAll('.color-option.selected').length;

            // محاسبه کل انتخاب‌ها
            const totalSelected = selectedCats + selectedTools + selectedColors +
                (availabilitySelected ? 1 : 0) +
                (countrySelected ? 1 : 0) +
                (citySelected ? 1 : 0);

            // به‌روزرسانی شمارنده
            document.getElementById('selCount').textContent = `${totalSelected} انتخاب`;
            
            // به‌روزرسانی note در آکاردئون‌ها
            document.querySelectorAll('.acc .note').forEach(note => {
                const section = note.closest('.section');
                const acc = section.querySelector('.acc');
                if (acc.textContent.includes('دسته‌بندی‌ها') && selectedCats > 0) {
                    note.textContent = `${selectedCats} انتخاب`;
                } else if (acc.textContent.includes('ابزارها و اپ‌ها') && selectedTools > 0) {
                    note.textContent = `${selectedTools} انتخاب`;
                } else {
                    note.textContent = '';
                }
            });
        }

        // بازنشانی فیلترها
        function resetFilters() {
            // بازنشانی چک‌باکس‌های دسته‌ها
            document.querySelectorAll('input[name="cat"]').forEach(checkbox => {
                checkbox.checked = false;
            });

            // بازنشانی چک‌باکس‌های ابزارها
            document.querySelectorAll('input[name="tool"]').forEach(checkbox => {
                checkbox.checked = false;
            });

            // بازنشانی وضعیت همکاری
            document.querySelector('input[name="availability"][value=""]').checked = true;

            // بازنشانی موقعیت مکانی
            document.getElementById('country').value = '';
            document.getElementById('city').value = '';

            // بازنشانی رنگ‌ها
            document.querySelectorAll('.color-option.selected').forEach(colorOption => {
                colorOption.classList.remove('selected');
            });

            // بازنشانی جستجوها
            document.getElementById('catSearch').value = '';
            document.getElementById('toolSearch').value = '';
            filterList('catList', '');
            filterList('toolList', '');

            // به‌روزرسانی شمارنده
            updateSelectedCount();

            // بازنشانی فیلترهای فعال
            activeFilters = {
                categories: [],
                availability: '',
                country: '',
                city: '',
                tools: [],
                colors: []
            };

            console.log('فیلترها بازنشانی شدند');

            // نمایش همه پست‌ها
            displayPosts(postsData);
        }

        // نمایش پست‌ها
        function displayPosts(posts) {
            const postsContainer = document.getElementById('postsContainer');
            postsContainer.innerHTML = '';

            if (posts.length === 0) {
                postsContainer.innerHTML = '<div class="no-posts">پستی یافت نشد</div>';
                return;
            }

            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'post';

                postElement.innerHTML = `
                    <div class="post-image" style="background-color: ${post.dominantColor || '#eee'}">${post.title}</div>
                    <div class="post-content">
                        <div class="post-category">${post.category}</div>
                        <h3 class="post-title">${post.title}</h3>
                        <p class="post-description">${post.description}</p>
                        <div class="post-meta">
                            <span>${formatPrice(post.price)} تومان</span>
                            <span>${formatDate(post.date)}</span>
                        </div>
                        <div class="post-tools">
                            ${post.tools ? post.tools.map(tool => `<span class="tool-tag">${tool}</span>`).join('') : ''}
                        </div>
                    </div>
                `;

                postsContainer.appendChild(postElement);
            });
        }

        // نمایش زیرمجموعه‌های دسته‌بندی
        function showSubcategories(category) {
            const subcategoriesContainer = document.getElementById('subcategories');
            const subList = subcategories[category];

            let html = `
                <div class="subcategory-title">زیردسته‌های ${document.querySelector(`.pill[data-category="${category}"]`).textContent}</div>
                <div class="subcategory-list">
            `;
            subList.forEach(sub => {
                html += `<div class="subcategory-item" data-subcategory="${sub.slug}">${sub.name}</div>`;
            });

            html += '</div>';
            subcategoriesContainer.innerHTML = html;
            subcategoriesContainer.classList.add('active');

            // افزودن رویداد به آیتم‌های زیردسته
            document.querySelectorAll('.subcategory-item').forEach(item => {
                item.addEventListener('click', function () {
                    document.querySelectorAll('.subcategory-item').forEach(i => i.classList.remove('active'));
                    this.classList.add('active');

                    currentSubcategory = this.getAttribute('data-subcategory');
                    filterPosts();
                });
            });
        }

        // مخفی کردن زیرمجموعه‌ها
        function hideSubcategories() {
            const subcategoriesContainer = document.getElementById('subcategories');
            subcategoriesContainer.classList.remove('active');
            currentSubcategory = "";
        }

        // فیلتر کردن پست‌ها
        function filterPosts() {
            // استفاده از فیلترهای فعال از سیستم کشویی
            filterPostsWithAllFilters();
        }

        // به‌روزرسانی وضعیت دکمه‌های ناوبری
        function updateNavButtons() {
            const scroller = document.getElementById('scroller');
            const leftBtn = document.getElementById('leftBtn');
            const rightBtn = document.getElementById('rightBtn');

            leftBtn.disabled = scroller.scrollLeft === 0;
            rightBtn.disabled = scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth;
        }

        // فرمت قیمت
        function formatPrice(price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        // فرمت تاریخ
        function formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('fa-IR', options);
        }

        function setupToggle(tId, pId) {
            const t = document.getElementById(tId), p = document.getElementById(pId);
            t.addEventListener('click', () => {
                const open = p.classList.contains('open');
                document.querySelectorAll('.panel').forEach(x => x.classList.remove('open'));
                document.querySelectorAll('.toggle').forEach(x => x.setAttribute('aria-expanded', 'false'));
                if (!open) { p.classList.add('open'); t.setAttribute('aria-expanded', 'true'); }
            });
        }

        function setupSlider() {
            const slider = document.querySelector('.slider');
            const slides = document.querySelectorAll('.slide');
            const controls = document.querySelectorAll('.slider-control');
            const arrowLeft = document.querySelector('.arrow-left');
            const arrowRight = document.querySelector('.arrow-right');

            let currentSlide = 0;
            const slideCount = slides.length;

            // تابع برای تغییر اسلاید
            function goToSlide(index) {
                if (index < 0) {
                    index = slideCount - 1;
                } else if (index >= slideCount) {
                    index = 0;
                }

                slider.style.transform = `translateX(-${index * 100}%)`;

                // به روز رسانی کنترل‌های فعال
                controls.forEach((control, i) => {
                    if (i === index) {
                        control.classList.add('active');
                    } else {
                        control.classList.remove('active');
                    }
                });

                currentSlide = index;
            }

            // اضافه کردن رویداد برای کنترل‌ها
            controls.forEach((control, index) => {
                control.addEventListener('click', () => {
                    goToSlide(index);
                });
            });

            // اضافه کردن رویداد برای فلش‌ها
            arrowLeft.addEventListener('click', () => {
                goToSlide(currentSlide + 1);
            });

            arrowRight.addEventListener('click', () => {
                goToSlide(currentSlide - 1);
            });

            // اسلاید خودکار
            let autoSlide = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 5000);

            // توقف اسلاید خودکار هنگام هاور روی اسلایدر
            const sliderContainer = document.querySelector('.slider-container');
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(autoSlide);
            });

            sliderContainer.addEventListener('mouseleave', () => {
                autoSlide = setInterval(() => {
                    goToSlide(currentSlide + 1);
                }, 5000);
            });

            // پشتیبانی از سوایپ در تاچ اسکرین
            let touchStartX = 0;
            let touchEndX = 0;

            sliderContainer.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
            });

            sliderContainer.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });

            function handleSwipe() {
                if (touchEndX < touchStartX) {
                    goToSlide(currentSlide + 1); // سوایپ به چپ - اسلاید بعدی
                }
                if (touchEndX > touchStartX) {
                    goToSlide(currentSlide - 1); // سوایپ به راست - اسلاید قبلی
                }
            }
        }

        // جلوگیری از بسته شدن پنل‌ها هنگام کلیک داخل آنها
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

        

