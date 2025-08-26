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
const productGrid = document.getElementById('productGrid')
const search = document.getElementById('search')
const categoryButtons = document.querySelectorAll('.category-btn')

// Updated services data with categories
const services = [
  {
    title: 'طراحی لوگو مینیمال',
    desc: 'لوگو حرفه‌ای با سبک ساده و برندینگ قوی',
    price: '۳۵۰٬۰۰۰ تومان',
    image: 'https://via.placeholder.com/400x300',
    category: 'graphic-design'
  },
  {
    title: 'ویرایش ویدیو تبلیغاتی',
    desc: 'تدوین با پریمیر و افتر افکت برای شبکه‌های اجتماعی',
    price: '۵۰۰٬۰۰۰ تومان',
    image: 'https://via.placeholder.com/400x300',
    category: 'video-animation'
  },
  {
    title: 'طراحی سایت شرکتی',
    desc: 'سایت واکنش‌گرا با پنل مدیریت و سئو اولیه',
    price: '۱٬۵۰۰٬۰۰۰ تومان',
    image: 'https://via.placeholder.com/400x300',
    category: 'web-design'
  },
  {
    title: 'تصویرسازی کتاب کودک',
    desc: 'تصویرسازی خلاقانه برای کتاب‌های کودک',
    price: '۲۰۰٬۰۰۰ تومان',
    image: 'https://via.placeholder.com/400x300',
    category: 'digital-art'
  },
  {
    title: 'نریشن صوتی تبلیغاتی',
    desc: 'نریشن حرفه‌ای برای تبلیغات و ویدیوها',
    price: '۱۵۰٬۰۰۰ تومان',
    image: 'https://via.placeholder.com/400x300',
    category: 'audio-music'
  },
  {
    title: 'تولید محتوای اینستاگرام',
    desc: 'تولید محتوای جذاب برای صفحات اینستاگرام',
    price: '۳۰۰٬۰۰۰ تومان',
    image: 'https://via.placeholder.com/400x300',
    category: 'copywriting'
  },
  {
    title: 'مدیریت صفحه لینکدین',
    desc: 'مدیریت و بهینه‌سازی صفحه لینکدین شرکت',
    price: '۸۰۰٬۰۰۰ تومان',
    image: 'https://via.placeholder.com/400x300',
    category: 'social-media'
  },
  {
    title: 'برنامه‌نویسی اپلیکیشن موبایل',
    desc: 'توسعه اپلیکیشن موبایل با React Native',
    price: '۲٬۵۰۰٬۰۰۰ تومان',
    image: 'https://via.placeholder.com/400x300',
    category: 'programming'
  },
  {
    title: 'تحلیل داده و مصورسازی',
    desc: 'تحلیل داده‌های کسب‌وکار و ایجاد داشبورد',
    price: '۱٬۲۰۰٬۰۰۰ تومان',
    image: 'https://via.placeholder.com/400x300',
    category: 'ai-data'
  },
  {
    title: 'سئوی محتوا',
    desc: 'سئو و بهینه‌سازی محتای سایت',
    price: '۶۰۰٬۰۰۰ تومان',
    image: 'https://via.placeholder.com/400x300',
    category: 'seo-marketing'
  }
]

function renderCards(list) {
  productGrid.innerHTML = ''
  list.forEach(service => {
    const card = document.createElement('div')
    card.className = 'card'
    card.innerHTML = `
      <img src="${service.image}" alt="${service.title}" />
      <div class="card-content">
        <h3>${service.title}</h3>
        <p>${service.desc}</p>
        <div class="price">${service.price}</div>
        <button>ارسال درخواست</button>
      </div>
    `
    productGrid.appendChild(card)
  })
}

// Filter services by category
function filterServices(category) {
  if (category === 'all') {
    return services;
  }
  return services.filter(service => service.category === category);
}

// Add event listeners to category buttons
categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');
    // Filter and render services
    const category = button.dataset.category;
    const filteredServices = filterServices(category);
    renderCards(filteredServices);
  });
});

search.addEventListener('input', () => {
  const query = search.value.toLowerCase();
  const activeCategory = document.querySelector('.category-btn.active').dataset.category;
  const categoryFiltered = filterServices(activeCategory);
  const filtered = categoryFiltered.filter(s =>
    s.title.toLowerCase().includes(query)
  );
  renderCards(filtered);
});

// Initial render
renderCards(services);

// Add diagnostic logging for slider functionality
console.log('Shop page loaded. Checking for slider elements...');

// Check if slider elements exist
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

console.log('Slider found:', !!slider);
console.log('Number of slides found:', slides.length);
console.log('Previous button found:', !!prevBtn);
console.log('Next button found:', !!nextBtn);

// Check if image paths are correct
const slideImages = document.querySelectorAll('.slide img');
slideImages.forEach((img, index) => {
  console.log(`Slide ${index + 1} image source:`, img.src);
  img.addEventListener('error', () => {
    console.error(`Failed to load image: ${img.src}`);
  });
});

// Add the missing changeSlide function
function changeSlide(direction) {
  console.log('changeSlide called with direction:', direction);
  
  const slides = document.querySelectorAll('.slide');
  const activeSlide = document.querySelector('.slide.active');
  let currentIndex = Array.from(slides).indexOf(activeSlide);
  
  console.log('Current slide index:', currentIndex);
  
  // Remove active class from current slide
  if (activeSlide) {
    activeSlide.classList.remove('active');
  }
  
  // Calculate new index
  let newIndex = currentIndex + direction;
  if (newIndex >= slides.length) {
    newIndex = 0;
  } else if (newIndex < 0) {
    newIndex = slides.length - 1;
  }
  
  console.log('New slide index:', newIndex);
  
  // Add active class to new slide
  if (slides[newIndex]) {
    slides[newIndex].classList.add('active');
  }
}

// Add event listeners if buttons exist
if (prevBtn) {
  prevBtn.addEventListener('click', () => changeSlide(-1));
  console.log('Added event listener to previous button');
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => changeSlide(1));
  console.log('Added event listener to next button');
}
