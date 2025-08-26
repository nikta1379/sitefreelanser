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