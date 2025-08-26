
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

