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


  // JavaScript ساده: کلیک روی کارت => نمایش اطلاعات در کنسول یا می‌توانید رفتار دلخواه اضافه کنید
  document.getElementById('gallery').addEventListener('click', function(e){
    const card = e.target.closest('.card');
    if(!card) return;
    const title = card.getAttribute('data-title') || card.querySelector('.title')?.innerText;
    const date = card.getAttribute('data-date') || card.querySelector('time')?.innerText;
    const desc = card.getAttribute('data-desc') || card.querySelector('.excerpt')?.innerText;
    // مثال: نمایش در کنسول؛ می‌توانید به صفحه مطلب بروید یا مودال باز کنید
    console.log('کلیک روی کارت:', {title, date, desc});
    // نمونه: باز کردن لینک (اگر href در <a class="thumb" موجود است)
    // const link = card.querySelector('.thumb')?.href;
    // if(link) window.location.href = link;
  });
