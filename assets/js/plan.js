
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
const sw=document.getElementById('billSwitch');
const plans=document.querySelectorAll('.plan');
const isYear=()=>sw.getAttribute('data-year')==="1";
function format(n){return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');}
function updatePrices(){plans.forEach(p=>{const m=+p.dataset.month,y=+p.dataset.year;const val=isYear()?y:m;p.querySelector('.val').textContent=format(val);p.querySelector('.per').textContent=isYear()?'سالانه':'ماهانه';});}
function toggle(){const on=!isYear();sw.setAttribute('data-year',on?"1":"0");sw.setAttribute('aria-checked',on);updatePrices();}
sw.addEventListener('click',toggle);
sw.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle();}});
updatePrices();
