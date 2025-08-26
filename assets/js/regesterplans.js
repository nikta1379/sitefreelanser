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

// Billing toggle: monthly/yearly (20% off simulated by 'data-year' values)
const sw = document.getElementById('billSwitch');
const plans = document.querySelectorAll('.plan');
const isYear = () => sw.getAttribute('aria-checked') === 'true';
function format(n){return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');}
function updatePrices(){
  plans.forEach(p=>{
    const m = +p.dataset.month, y = +p.dataset.year;
    const val = isYear() ? y : m;
    const el = p.querySelector('.val'); if(el) el.textContent = format(val);
    const per = p.querySelector('.per'); if(per) per.textContent = isYear()? 'سالانه' : 'ماهانه';
  });
}
function toggle(){
  const on = !isYear();
  sw.setAttribute('aria-checked', on);
  sw.dataset.year = on ? '1' : '0';
  updatePrices();
}
sw.addEventListener('click', toggle);
sw.addEventListener('keydown', e=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); toggle(); }});
updatePrices();
