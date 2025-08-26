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
});
