// ---------- AVATAR UPLOAD FUNCTIONALITY ----------
function initAvatarUpload() {
  const avatarInput = document.getElementById('avatarInput');
  const avatar = document.getElementById('avatar');
  
  // تغییر آواتار با انتخاب فایل
  avatarInput.addEventListener('change', handleAvatarUpload);
  
  // امکان کلیک روی آواتار برای انتخاب فایل
  avatar.addEventListener('click', () => {
    avatarInput.click();
  });
  
  // drag and drop برای آواتار
  avatar.addEventListener('dragover', (e) => {
    e.preventDefault();
    avatar.classList.add('drag-over');
  });
  
  avatar.addEventListener('dragleave', (e) => {
    e.preventDefault();
    avatar.classList.remove('drag-over');
  });
  
  avatar.addEventListener('drop', (e) => {
    e.preventDefault();
    avatar.classList.remove('drag-over');
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      handleAvatarFile(files[0]);
    }
  });
  
  // بارگذاری آواتار ذخیره شده
  loadSavedAvatar();
}

function handleAvatarUpload(e) {
  const file = e.target.files[0];
  if (file && file.type.startsWith('image/')) {
    handleAvatarFile(file);
  }
}

function handleAvatarFile(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const avatar = document.getElementById('avatar');
    avatar.src = e.target.result;
    
    // ذخیره در localStorage
    localStorage.setItem('userAvatar', e.target.result);
    
    // نمایش پیام موفقیت
    showToast('عکس پروفایل با موفقیت تغییر کرد');
  };
  reader.readAsDataURL(file);
}

function loadSavedAvatar() {
  const savedAvatar = localStorage.getItem('userAvatar');
  if (savedAvatar) {
    document.getElementById('avatar').src = savedAvatar;
  }
}

// تابع حذف آواتار
window.deleteAvatar = function() {
  if (confirm('آیا از حذف عکس پروفایل مطمئن هستید؟')) {
    const avatar = document.getElementById('avatar');
    avatar.src = 'https://placehold.co/200x200/png';
    
    // حذف از localStorage
    localStorage.removeItem('userAvatar');
    
    // ریست کردن input فایل
    document.getElementById('avatarInput').value = '';
    
    showToast('عکس پروفایل حذف شد');
  }
};

// تابع نمایش toast
function showToast(message) {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = message;
    toast.style.display = 'block';
    
    setTimeout(() => {
      toast.style.display = 'none';
    }, 3000);
  }
}

// فراخوانی هنگام لود صفحه
document.addEventListener('DOMContentLoaded', function() {
  initAvatarUpload();
  
  // همچنین کاور را هم مدیریت کنیم
  initCoverUpload();
});

// مدیریت آپلود کاور (اگر نیاز باشد)
function initCoverUpload() {
  const coverInput = document.getElementById('coverInput');
  const coverImg = document.getElementById('coverImg');
  
  coverInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function(e) {
        coverImg.src = e.target.result;
        coverImg.style.display = 'block';
        localStorage.setItem('userCover', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  });
}

window.deleteCover = function() {
  if (confirm('آیا از حذف کاور مطمئن هستید؟')) {
    const coverImg = document.getElementById('coverImg');
    coverImg.style.display = 'none';
    coverImg.src = '';
    localStorage.removeItem('userCover');
    document.getElementById('coverInput').value = '';
  }
};

// بارگذاری کاور ذخیره شده
function loadSavedCover() {
  const savedCover = localStorage.getItem('userCover');
  if (savedCover) {
    const coverImg = document.getElementById('coverImg');
    coverImg.src = savedCover;
    coverImg.style.display = 'block';
  }
}

// فراخوانی هنگام لود صفحه
document.addEventListener('DOMContentLoaded', function() {
  initAvatarUpload();
  initCoverUpload();
  loadSavedAvatar();
  loadSavedCover();
});
// ---------- HEADER TOGGLE ----------
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

setupToggle('tFreelancer', 'pFreelancer');
setupToggle('tEmployer', 'pEmployer');
// ---------- DATA ----------
const skillGroups=[
 {title:'طراحی گرافیک',items:['لوگو و هویت','پست و استوری','بنر تبلیغاتی','کاتالوگ/کارت','کاور','بسته‌بندی']},
 {title:'تصویرسازی و هنر دیجیتال',items:['کتاب کودک','فانتزی/رئال','کاراکتر/کانسپت','NFT','تبلیغاتی']},
 {title:'ویدیو/موشن/انیمیشن',items:['تدوین','ریلز/کلیپ','موشن‌گرافی','انیمیشن 2D/3D','استاپ موشن','آموزشی']},
 {title:'صدا و موسیقی',items:['نریشن/دوبله','میکس صدا','موسیقی اختصاصی','افکت صوتی','پادکست']},
 {title:'کپی‌رایتینگ',items:['برندینگ/کمپین','اسکریپت ویدیو','متن وب/لندینگ','شعار تبلیغاتی','ترجمه/بازنویسی','ویراستاری']},
 {title:'مدیریت شبکه‌های اجتماعی و تولید محتوا',items:['محتوای متنی','محتوای بصری/ویدئویی','مدیریت صفحات','تعامل/کمپین','رشد/اینفلوئنسر']},
 {title:'طراحی و توسعه وب‌سایت',items:['وردپرس','Webflow/Wix','UI/UX','فروشگاه','لندینگ‌پیج','پشتیبانی']},
 {title:'برنامه‌نویسی و توسعه نرم‌افزار',items:['وب فرانت/بک','موبایل','ربات/اتوماسیون','اپلیکیشن','API/یکپارچه‌سازی','دیتابیس']},
 {title:'هوش مصنوعی و علم داده',items:['ML','CV','NLP','تحلیل/مصورسازی','مدل‌های پیش‌بینی','LLM/ChatGPT']},
 {title:'سئو و بازاریابی دیجیتال',items:['سئوی تکنیکال','سئوی محتوا','Google Ads','تبلیغات اینستاگرام','ایمیل مارکتینگ','اتوماسیون','CRO']},
 {title:'عکاسی',items:['محصول','تبلیغاتی','پرسونال']},
];
let apps = ['Adobe Photoshop', 'Adobe Illustrator', 'Canva', 'Figma', 'CorelDRAW', 'Procreate', 'Adobe Fresco', 'Clip Studio Paint', 'Krita', 'Corel Painter', 'Adobe After Effects', 'Adobe Premiere Pro', 'CapCut', 'DaVinci Resolve', 'Blender', 'Adobe Audition', 'Audacity', 'FL Studio', 'Logic Pro X', 'GarageBand', 'Google Docs', 'Grammarly', 'Notion', 'Hemingway Editor', 'ChatGPT', 'Meta Business Suite', 'Later', 'Buffer', 'Metricool', 'WordPress', 'Elementor', 'Webflow', 'Wix', 'Visual Studio Code (VS Code)', 'GitHub', 'Postman', 'IntelliJ IDEA / PyCharm', 'Android Studio', 'Google Colab', 'Jupyter Notebook', 'TensorFlow', 'Power BI', 'HuggingFace', 'Google Analytics', 'Google Search Console', 'Ahrefs', 'Yoast SEO', 'Mailchimp'];
apps = [...new Set(apps)].sort((a,b)=>a.localeCompare(b,'fa'));

let selectedSkills=new Set();
let selectedApps=new Set();

let works=[];
let products=[];

// ---------- HELPERS ----------
const qs=(s,el=document)=>el.querySelector(s);
const qsa=(s,el=document)=>[...el.querySelectorAll(s)];
function chip(text, onRemove){ const el=document.createElement('span'); el.className='chip'; el.innerHTML=`<span>${text}</span><span class="x" style="cursor:pointer;opacity:.6">×</span>`; el.querySelector('.x').onclick=()=>onRemove?.(); return el; }
function renderAccordion(rootEl, groups, searchTerm, selectedSet, tokenBox){
  rootEl.innerHTML='';
  groups.forEach((g)=>{
    const group=document.createElement('div'); group.className='group';
    group.innerHTML=`<h4><span>${g.title}</span><span>▾</span></h4>`;
    const content=document.createElement('div'); content.className='content';
    g.items.filter(it=> it.toLowerCase().includes((searchTerm||'').toLowerCase())).forEach((it)=>{
      const line=document.createElement('label'); line.className='checkline';
      line.innerHTML=`<input type="checkbox" data-val="${it}"> <span>${it}</span>`;
      const cb=line.querySelector('input'); cb.checked=selectedSet.has(it);
      cb.onchange=(e)=>{ if(e.target.checked) selectedSet.add(it); else selectedSet.delete(it); paintTokens(tokenBox, selectedSet); };
      content.appendChild(line);
    });
    group.appendChild(content);
    group.querySelector('h4').onclick=()=>group.classList.toggle('open');
    rootEl.appendChild(group);
  });
}
function paintTokens(box, set){
  box.innerHTML=''; [...set].forEach(v=> box.appendChild(chip(v, ()=>{ set.delete(v); paintTokens(box,set); syncChecks(v,false); })));
}
function syncChecks(val,checked){
  qsa(`input[data-val="${val}"]`).forEach(cb=>{cb.checked=checked});
}
function filterApps(term){ return apps.filter(a=> a.toLowerCase().includes((term||'').toLowerCase())); }
function paintAppList(root, set, term){
  root.innerHTML='';
  filterApps(term).forEach(a=>{
    const row=document.createElement('label'); row.className='checkline';
    row.innerHTML=`<input type="checkbox" data-app="${a}"> <span>${a}</span>`;
    const cb=row.querySelector('input'); cb.checked=set.has(a);
    cb.onchange=(e)=>{ if(e.target.checked) set.add(a); else set.delete(a); paintTokens(root.nextElementSibling, set); };
    root.appendChild(row);
  });
}

// Uploader component: returns handlers for a drop zone
function makeDropZone(dropEl, inputEl, thumbsEl){
  const files=[]; // keep File objects
  function addFiles(list){
    [...list].forEach(f=>{
      files.push(f);
      const card=document.createElement('div'); card.className='thumb';
      let media='';
      if(f.type.startsWith('image/')){
        const url=URL.createObjectURL(f);
        media=`<img src="${url}" style="width:100%;height:auto;display:block">`;
      }else if(f.type.startsWith('video/')){
        const url=URL.createObjectURL(f);
        media=`<video src="${url}" controls style="width:100%;display:block"></video>`;
      }else if(f.type.startsWith('audio/')){
        const url=URL.createObjectURL(f);
        media=`<div class="ph" style="padding:6px 8px;flex-direction:column"><div>🎵 فایل صوتی</div><audio controls src="${url}" style="width:100%"></audio></div>`;
      }else{
        media=`<div class="ph">📦 ${f.name.split('.').pop()?.toUpperCase()||'FILE'}</div>`;
      }
      card.innerHTML=`${media}<div class="meta"><span title="${f.name}">${f.name.slice(0,16)}${f.name.length>16?'…':''}</span><button class="btn btn-ghost btn-sm">حذف</button></div>`;
      card.querySelector('button').onclick=()=>{ thumbsEl.removeChild(card); const idx=files.indexOf(f); if(idx>-1) files.splice(idx,1); };
      thumbsEl.appendChild(card);
    });
    return files;
  }
  dropEl.addEventListener('dragover', e=>{ e.preventDefault(); dropEl.classList.add('drag'); });
  dropEl.addEventListener('dragleave', ()=> dropEl.classList.remove('drag'));
  dropEl.addEventListener('drop', e=>{ e.preventDefault(); dropEl.classList.remove('drag'); addFiles(e.dataTransfer.files); });
  inputEl.addEventListener('change', e=> addFiles(e.target.files));
  return {getFiles:()=>files, addFiles};
}

// ---------- BINDINGS ----------
// Identity live preview
qs('#nameInput').oninput=e=> qs('#nameT').textContent=e.target.value||'نام فریلنسر';
qs('#titleInput').oninput=e=> qs('#titleT').textContent=e.target.value||'عنوان شغلی';
qs('#locInput').oninput=e=> qs('#locT').textContent=e.target.value?('📍'+e.target.value):'📍—';

qs('#avatarInput').onchange=e=>{ const f=e.target.files?.[0]; if(!f) return; const url=URL.createObjectURL(f); qs('#avatar').src=url; };
qs('#coverInput').onchange=e=>{ const f=e.target.files?.[0]; if(!f) return; const url=URL.createObjectURL(f); const img=qs('#coverImg'); img.src=url; img.style.display='block'; };

qsa('.status').forEach(cb=> cb.onchange=()=>{
  const box=qs('#statusTokens'); box.innerHTML='';
  qsa('.status:checked').forEach(x=> box.appendChild(chip(x.value, ()=>{ x.checked=false; x.dispatchEvent(new Event('change')); })));
});

function renderProfileSkills(){
  renderAccordion(qs('#skillsAcc'), skillGroups, qs('#skillSearch').value, selectedSkills, qs('#skillTokens'));
  paintTokens(qs('#skillTokens'), selectedSkills);
}
qs('#skillSearch').oninput=renderProfileSkills;

function renderProfileApps(){
  paintAppList(qs('#appList'), selectedApps, qs('#appSearch').value);
  paintTokens(qs('#appTokens'), selectedApps);
}
qs('#appSearch').oninput=renderProfileApps;
qs('#addAppBtn').onclick=()=>{
  const name=prompt('نام آپ جدید را وارد کنید:');
  if(name && !apps.includes(name)){ apps.unshift(name); selectedApps.add(name); renderProfileApps(); }
};

// Tabs
qsa('.tab').forEach(t=> t.onclick=()=>{
  qsa('.tab').forEach(x=>x.classList.remove('active')); t.classList.add('active');
  qsa('.tabpanes > section').forEach(s=>s.classList.remove('active')); qs('#'+t.dataset.tab).classList.add('active');
});

// Portfolio modal
const mWork=qs('#modalWork'); qsa('dialog [data-close]').forEach(b=> b.onclick=e=> e.target.closest('dialog').close());
let wEdit=-1;
qs('#addWork').onclick=()=>{ wEdit=-1; openWork(); };
function openWork(w={title:'',link:'',short:'',desc:'',skills:new Set(),apps:new Set(),files:[]}){
  qs('#wTitle').value=w.title; qs('#wLink').value=w.link||''; qs('#wShort').value=w.short||''; qs('#wDesc').value=w.desc||'';
  const wSkillSet = w.skills instanceof Set ? w.skills : new Set(w.skills||[]);
  const wAppSet   = w.apps   instanceof Set ? w.apps   : new Set(w.apps||[]);
  mWork._skillSet=wSkillSet; mWork._appSet=wAppSet;
  renderAccordion(qs('#wSkillsAcc'), skillGroups, qs('#wSkillSearch').value, mWork._skillSet, qs('#wSkillTok'));
  paintTokens(qs('#wSkillTok'), mWork._skillSet);
  paintAppList(qs('#wApps'), mWork._appSet, qs('#wAppSearch').value);
  paintTokens(qs('#wAppTok'), mWork._appSet);
  qs('#wSkillSearch').oninput=()=>{ renderAccordion(qs('#wSkillsAcc'), skillGroups, qs('#wSkillSearch').value, mWork._skillSet, qs('#wSkillTok')); };
  qs('#wAppSearch').oninput=()=>{ paintAppList(qs('#wApps'), mWork._appSet, qs('#wAppSearch').value); };
  qs('#wAddApp').onclick=()=>{ const name=prompt('نام آپ جدید؟'); if(name && !apps.includes(name)){ apps.unshift(name); mWork._appSet.add(name); paintAppList(qs('#wApps'), mWork._appSet, qs('#wAppSearch').value); paintTokens(qs('#wAppTok'), mWork._appSet); } };
  // init uploader for portfolio
  mWork._wDrop = makeDropZone(qs('#wDrop'), qs('#wFiles'), qs('#wThumbs'));
  if(w.files?.length){ mWork._wDrop.addFiles(w.files); }
  mWork.showModal();
}
qs('#wSave').onclick=()=>{
  const item={
    title:qs('#wTitle').value.trim(),
    link:qs('#wLink').value.trim(),
    short:qs('#wShort').value.trim(),
    desc:qs('#wDesc').value.trim(),
    skills:[...mWork._skillSet||[]],
    apps:[...mWork._appSet||[]],
    files:mWork._wDrop?.getFiles()||[]
  };
  if(!item.title){ alert('عنوان نمونه‌کار الزامی است'); return; }
  if(wEdit>-1) works[wEdit]=item; else works.unshift(item);
  paintWorkList(); mWork.close();
};
function paintWorkList(){
  const box=qs('#workList'); box.innerHTML='';
  if(!works.length){ box.innerHTML='<div class="muted">هنوز نمونه‌کاری اضافه نشده.</div>'; return; }
  works.forEach((w,i)=>{
    const card=document.createElement('div'); card.className='work';
    let poster='<div class="coverPh">Cover</div>';
    // if an image/video file exists, show it
    const imgFile=(w.files||[]).find(f=> typeof f.type==='string' && f.type.startsWith('image/'));
    const vidFile=(w.files||[]).find(f=> typeof f.type==='string' && f.type.startsWith('video/'));
    if(imgFile){ poster=`<img src="${URL.createObjectURL(imgFile)}" style="width:100%;display:block">`; }
    else if(vidFile){ poster=`<video src="${URL.createObjectURL(vidFile)}" controls style="width:100%;display:block"></video>`; }
    card.innerHTML=`${poster}
      <div class="meta">
        <div style="font-weight:700">${w.title}</div>
        <div class="row" style="margin:6px 0">${(w.skills||[]).map(s=>`<span class='chip'>${s}</span>`).join('')}</div>
        <div class="row">${(w.apps||[]).map(a=>`<span class='chip'>${a}</span>`).join('')}</div>
        <div class="row" style="justify-content:space-between;margin-top:8px">
          <a class="btn btn-ghost btn-sm" target="_blank" href="${w.link||'#'}">مشاهده</a>
          <button class="btn btn-ghost btn-sm" onclick="editWork(${i})">ویرایش</button>
    <button class="btn btn-danger btn-sm" onclick="deleteWork(${i})">حذف</button>
        </div>
      </div>`;
    box.appendChild(card);
  });
}
window.editWork=(i)=>{ wEdit=i; openWork(works[i]); };

// ---------- PRODUCTS ----------
const mProd=qs('#modalProduct'); let pEdit=-1;
qs('#addProduct').onclick=()=>{ pEdit=-1; openProduct(); };
function openProduct(p={title:'',price:'',days:'',count:'',short:'',desc:'',files:[]}){
  qs('#pTitle').value=p.title||''; qs('#pPrice').value=p.price||''; qs('#pDays').value=p.days||''; qs('#pCount').value=p.count||''; qs('#pShort').value=p.short||''; qs('#pDesc').value=p.desc||'';
  // init uploader
  mProd._pDrop = makeDropZone(qs('#pDrop'), qs('#pFiles'), qs('#pThumbs'));
  if(p.files?.length){ mProd._pDrop.addFiles(p.files); }
  mProd.showModal();
}
qsa('dialog [data-close]').forEach(b=> b.onclick=e=> e.target.closest('dialog').close());
qs('#pSave').onclick=()=>{
  const p={
    title:qs('#pTitle').value.trim(),
    price:Number(qs('#pPrice').value||0),
    days:Number(qs('#pDays').value||0),
    count:Number(qs('#pCount').value||0),
    short:qs('#pShort').value.trim(),
    desc:qs('#pDesc').value.trim(),
    files:mProd._pDrop?.getFiles()||[]
  };
  if(!p.title||!p.price){ alert('نام و قیمت محصول الزامی است'); return; }
  if(pEdit>-1) products[pEdit]=p; else products.unshift(p);
  paintProductList(); mProd.close();
};
function paintProductList(){
  const box=qs('#productList'); box.innerHTML='';
  if(!products.length){ box.innerHTML='<div class="muted">هنوز محصولی ایجاد نشده.</div>'; return; }
  products.forEach((p,i)=>{
    const imgFile=(p.files||[]).find(f=> typeof f.type==='string' && f.type.startsWith('image/'));
    const media = imgFile ? `<img src="${URL.createObjectURL(imgFile)}" style="width:56px;height:56px;object-fit:cover;border-radius:10px;border:1px solid var(--border)">` : `<div style="width:56px;height:56px;border-radius:10px;border:1px solid var(--border);display:flex;align-items:center;justify-content:center">📦</div>`;
    const row=document.createElement('div'); row.className='planbox';
    row.innerHTML=`<div class="row">
      ${media}
      <div>
        <div style="font-weight:700">${p.title}</div>
        <div class="muted" style="margin-top:6px">${p.short||''}</div>
      </div>
    </div>
    <div class="row">
      <span class="chip">${p.price.toLocaleString()} تومان</span>
      <button class="btn btn-ghost btn-sm" onclick="editProduct(${i})">ویرایش</button>
    <button class="btn btn-danger btn-sm" onclick="deleteProduct(${i})">حذف</button>
    </div>`;
    box.appendChild(row);
  });
}
window.editProduct=(i)=>{ pEdit=i; openProduct(products[i]); };

// ---------- PLAN DEMO ----------
function setPlanDemo(start='2025-07-22', end='2025-08-22'){
  const st=new Date(start), en=new Date(end), now=new Date();
  const total=(en-st)/86400000, left=Math.max(0, Math.ceil((en-now)/86400000));
  document.getElementById('planLeft').textContent=left;
  const pct=Math.max(0, Math.min(100, Math.round(((total-left)/total)*100)));
  document.getElementById('planBar').style.width=pct+'%';
}
setPlanDemo();

// INIT
function init(){
  renderProfileSkills();
  renderProfileApps();
  paintWorkList();
  paintProductList();
}
init();


(function(){
  const box = document.getElementById('statusTokens');
  const inputs = document.querySelectorAll('input.status');

  function paint(){
    if(!box) return;
    box.innerHTML = '';
    inputs.forEach(inp=>{
      // چیپ اصلی بالا با CSS :has استایل می‌گیرد
      if(inp.checked){
        const t = document.createElement('span');
        t.className = 'chip status';
        t.innerHTML = '<span>'+ (inp.value || inp.getAttribute('data-label') || 'گزینه') +'</span>'
                      + '<span class="x" style="cursor:pointer;opacity:.6">×</span>';
        t.querySelector('.x').onclick = ()=>{
          inp.checked = false;
          inp.dispatchEvent(new Event('change', {bubbles:true}));
          paint();
        };
        box.appendChild(t);
      }
    });
  }

  inputs.forEach(i=> i.addEventListener('change', paint));
  paint();
})();

// Added by patch: safe delete handlers

window.deleteWork = (i)=>{
  if(!confirm('این نمونه‌کار حذف شود؟')) return;
  try {
    if (Array.isArray(window.works)) {
      window.works.splice(i, 1);
      if (typeof window.paintWorkList === 'function') window.paintWorkList();
    }
  } catch(e){ console.error(e); alert('خطا در حذف نمونه‌کار'); }
};

window.deleteProduct = (i)=>{
  if(!confirm('این محصول حذف شود؟')) return;
  try {
    if (Array.isArray(window.products)) {
      window.products.splice(i, 1);
      if (typeof window.paintProductList === 'function') window.paintProductList();
    }
  } catch(e){ console.error(e); alert('خطا در حذف محصول'); }
};

// === Snapbrand: globalize data & handlers (safe) ===
(function(){
  // Lift arrays to window scope without losing references
  if (typeof window.works === 'undefined') {
    if (typeof works !== 'undefined' && Array.isArray(works)) { window.works = works; }
    else { window.works = []; }
  }
  if (typeof window.products === 'undefined') {
    if (typeof products !== 'undefined' && Array.isArray(products)) { window.products = products; }
    else { window.products = []; }
  }

  // Promote renderers
  if (typeof paintWorkList === 'function') window.paintWorkList = paintWorkList;
  if (typeof paintProductList === 'function') window.paintProductList = paintProductList;

  // Delete handlers (idempotent)
  if (typeof window.deleteWork !== 'function') {
    window.deleteWork = function(i){
      if(!confirm('این نمونه‌کار حذف شود؟')) return;
      try{
        if(Array.isArray(window.works)){
          window.works.splice(i,1);
          if(typeof window.paintWorkList==='function') window.paintWorkList();
        }
      }catch(err){ console.error(err); alert('خطا در حذف نمونه‌کار'); }
    };
  }

  if (typeof window.deleteProduct !== 'function') {
    window.deleteProduct = function(i){
      if(!confirm('این محصول حذف شود؟')) return;
      try{
        if(Array.isArray(window.products)){
          window.products.splice(i,1);
          if(typeof window.paintProductList==='function') window.paintProductList();
        }
      }catch(err){ console.error(err); alert('خطا در حذف محصول'); }
    };
  }
})();

// === Snapbrand FIX pack: unify products reference & harden deleteProduct ===
(function(){
  // Ensure products arrays are unified
  function getProductsRef(){
    if (Array.isArray(window.products)) return window.products;
    if (typeof products !== 'undefined' && Array.isArray(products)) return products;
    return (window.products = []);
  }
  function syncProductsRef(arr){
    try { window.products = arr; } catch(_) {}
    try { products = arr; } catch(_) {}
  }

  // Wrap/patch paintProductList to re-sync before render
  (function(){
    var _orig = (typeof window.paintProductList === 'function') ? window.paintProductList : null;
    window.paintProductList = function(){
      var arr = getProductsRef();
      syncProductsRef(arr);
      if (_orig) return _orig.apply(this, arguments);
    };
  })();

  // Robust deleteProduct (overrides older definitions safely)
  window.deleteProduct = function(i){
    if(!confirm('این محصول حذف شود؟')) return;
    try{
      var arr = getProductsRef();
      if (Array.isArray(arr) && i >= 0 && i < arr.length) {
        arr.splice(i,1);
        syncProductsRef(arr);
      }
      if (typeof window.paintProductList === 'function') window.paintProductList();
    }catch(err){
      console.error(err);
      alert('خطا در حذف محصول');
    }
  };

  // Also ensure deleteWork remains available (noop if already defined)
  if (typeof window.deleteWork !== 'function') {
    window.deleteWork = function(i){
      if(!confirm('این نمونه‌کار حذف شود؟')) return;
      try{
        if (Array.isArray(window.works)) {
          window.works.splice(i,1);
          if(typeof window.paintWorkList==='function') window.paintWorkList();
        }
      }catch(err){ console.error(err); alert('خطا در حذف نمونه‌کار'); }
    };
  }

  // Ensure delete buttons exist next to edit buttons (idempotent inject at render-time is harder;
  // here we just ensure markup contained them at load time)
})(); 

// Snapbrand: avatar/cover delete handlers
(function(){
  window.deleteAvatar = window.deleteAvatar || function(){
    if(!confirm('آواتار حذف شود؟')) return;
    var img = document.getElementById('avatar');
    if(img){ img.src = 'https://placehold.co/200x200/png'; }
    var inp = document.getElementById('avatarInput');
    if(inp){ inp.value = ''; }
  };
  window.deleteCover = window.deleteCover || function(){
    if(!confirm('کاور حذف شود؟')) return;
    var img = document.getElementById('coverImg');
    if(img){ img.removeAttribute('src'); img.style.display='none'; }
    var inp = document.getElementById('coverInput');
    if(inp){ inp.value = ''; }
  };
})();

(function(){
  const STORAGE_KEY = 'profileContacts';

  function labelFa(key){
    const labels = {
      instagram:"اینستاگرام",
      linkedin:"لینکدین",
      telegram:"تلگرام",
      whatsapp:"واتس‌اپ",
      phone:"شماره تماس",
      website:"وب‌سایت",
      other:"سایر",
      email:"ایمیل"
    };
    return labels[key] || key;
  }

  function normalizeLink(key, val){
    if(!val) return '';
    const v = val.trim();
    if(key === 'phone' || key === 'whatsapp'){ return 'tel:' + v.replace(/\s+/g,''); }
    if(key === 'email'){ return 'mailto:' + v; }
    if(/^https?:\/\//i.test(v)) return v;
    return 'https://' + v;
  }

  function readForm(){
    return {
      instagram: document.getElementById('instagramInput')?.value.trim() || '',
      linkedin:  document.getElementById('linkedinInput')?.value.trim() || '',
      telegram:  document.getElementById('telegramInput')?.value.trim() || '',
      whatsapp:  document.getElementById('whatsappInput')?.value.trim() || '',
      phone:     document.getElementById('phoneInput')?.value.trim() || '',
      website:   document.getElementById('websiteInput')?.value.trim() || '',
      other:     document.getElementById('otherInput')?.value.trim() || ''
    };
  }

  function fillForm(data){
    document.getElementById('instagramInput') && (instagramInput.value = data.instagram || '');
    document.getElementById('linkedinInput')  && (linkedinInput.value  = data.linkedin  || '');
    document.getElementById('telegramInput')  && (telegramInput.value  = data.telegram  || '');
    document.getElementById('whatsappInput')  && (whatsappInput.value  = data.whatsapp  || '');
    document.getElementById('phoneInput')     && (phoneInput.value     = data.phone     || '');
    document.getElementById('websiteInput')   && (websiteInput.value   = data.website   || '');
    document.getElementById('otherInput')     && (otherInput.value     = data.other     || '');
  }

  window.saveContactInfo = function(){
    const data = readForm();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    renderContactInfo();
    alert('اطلاعات تماس ذخیره شد.');
  };

  window.clearContactForm = function(){
    fillForm({});
  };

  window.renderContactInfo = function(){
    let data = {};
    try{ data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }catch(_){ data = {}; }
    const ul = document.getElementById('contactList');
    const display = document.getElementById('contactDisplay');
    if(!ul || !display) return;

    ul.innerHTML = '';
    const keys = ['instagram','linkedin','telegram','whatsapp','phone','website','other'];
    keys.forEach(k=>{
      const val = (data[k]||'').trim();
      if(val){
        const li = document.createElement('li');
        const a  = document.createElement('a');
        a.href = normalizeLink(k, val);
        a.target = '_blank';
        a.rel = 'noopener';
        a.textContent = val;
        li.innerHTML = '<strong style="min-width:96px">' + labelFa(k) + ':</strong> ';
        li.appendChild(a);
        ul.appendChild(li);
      }
    });
    display.style.display = ul.children.length ? 'block' : 'none';
  };

  // Initial hydrate
  try{
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    fillForm(saved);
  }catch(_){}
  window.renderContactInfo();
})();

(function(){
  // Extend renderContactInfo to populate #contactMiniList if present
  var prevRender = window.renderContactInfo;
  window.renderContactInfo = function(){
    if (typeof prevRender === 'function') try { prevRender(); } catch(_){}
    try{
      var ul = document.getElementById('contactMiniList');
      if(!ul) return;
      ul.innerHTML='';
      var data = {}; try{ data = JSON.parse(localStorage.getItem('profileContacts')||'{}'); }catch(_){}
      var labels = {instagram:'اینستاگرام',linkedin:'لینکدین',telegram:'تلگرام',whatsapp:'واتس‌اپ',phone:'شماره تماس',website:'وب‌سایت',other:'سایر'};
      function linkOf(k,v){
        if(k==='phone'||k==='whatsapp') return 'tel:'+v.replace(/\s+/g,'');
        if(/^https?:\/\//i.test(v)) return v;
        return 'https://'+v;
      }
      ['instagram','linkedin','telegram','whatsapp','phone','website','other'].forEach(function(k){
        var v = (data[k]||'').trim();
        if(v){
          var li = document.createElement('li');
          li.style.margin = '4px 0';
          li.innerHTML = '<strong style="min-width:96px;display:inline-block">'+labels[k]+':</strong> ' +
                         '<a href="'+linkOf(k,v)+'" target="_blank" rel="noopener">'+v+'</a>';
          ul.appendChild(li);
        }
      });
    }catch(e){ console.warn(e); }
  };

  // Hydrate form on load if inputs exist
  (function fillFormFromStorage(){
    try{
      var data = JSON.parse(localStorage.getItem('profileContacts')||'{}');
      function set(id,val){ var el=document.getElementById(id); if(el) el.value = val||''; }
      set('instagramInput', data.instagram);
      set('linkedinInput',  data.linkedin);
      set('telegramInput',  data.telegram);
      set('whatsappInput',  data.whatsapp);
      set('phoneInput',     data.phone);
      set('websiteInput',   data.website);
      set('otherInput',     data.other);
    }catch(_){}
  })();

  // Ensure initial render
  if (typeof window.renderContactInfo === 'function') window.renderContactInfo();
})();

(function(){
  function labelFa(key){
    const labels = {instagram:'اینستاگرام',linkedin:'لینکدین',telegram:'تلگرام',whatsapp:'واتس‌اپ',phone:'شماره تماس',website:'وب‌سایت',other:'سایر'};
    return labels[key]||key;
  }
  function formatLink(key,val){
    if(key==='phone'||key==='whatsapp') return 'tel:'+val.replace(/\s+/g,'');
    if(/^https?:\/\//i.test(val)) return val;
    return 'https://'+val;
  }
  window.deleteContact = function(key){
    let data={}; try{data=JSON.parse(localStorage.getItem('profileContacts')||'{}');}catch(_){}
    delete data[key];
    localStorage.setItem('profileContacts', JSON.stringify(data));
    if(typeof renderContactInfo==='function') renderContactInfo();
  };
  window.editContact = function(key){
    let data={}; try{data=JSON.parse(localStorage.getItem('profileContacts')||'{}');}catch(_){}
    const val=data[key]||'';
    const el=document.getElementById(key+'Input');
    if(el){el.value=val; el.focus();}
  };
  window.renderContactInfo = function(){
    let data={}; try{data=JSON.parse(localStorage.getItem('profileContacts')||'{}');}catch(_){}
    const ul=document.getElementById('contactMiniList'); if(!ul) return;
    ul.innerHTML='';
    const keys=['instagram','linkedin','telegram','whatsapp','phone','website','other'];
    keys.forEach(k=>{
      const val=(data[k]||'').trim();
      if(val){
        const li=document.createElement('li');
        li.style.margin='4px 0';
        li.innerHTML='<strong style="min-width:80px;display:inline-block">'+labelFa(k)+':</strong> '+
                     '<a href="'+formatLink(k,val)+'" target="_blank" rel="noopener">'+val+'</a> '+
                     '<button class="btn btn-danger btn-xs" style="margin-right:6px" onclick="deleteContact(\''+k+'\')">حذف</button>'+
                     '<button class="btn btn-ghost btn-xs" onclick="editContact(\''+k+'\')">ویرایش</button>';
        ul.appendChild(li);
      }
    });
  };
  window.renderContactInfo();
})();

// --- Snapbrand: Followers / Following demo rendering (non-breaking) ---
const followersDemo=[
  {name:'نگار راد', role:'Graphic Designer', avatar:'https://placehold.co/96x96/png'},
  {name:'امیرحسین فتحی', role:'UI Developer', avatar:'https://placehold.co/96x96/png'},
  {name:'سارا محمدی', role:'Illustrator', avatar:'https://placehold.co/96x96/png'}
];
const followingDemo=[
  {name:'مهدی صالحی', role:'Motion Designer', avatar:'https://placehold.co/96x96/png'},
  {name:'زهرا نیک‌پور', role:'Product Designer', avatar:'https://placehold.co/96x96/png'}
];

function userCard(u, mode){
  const wrap=document.createElement('div');
  wrap.className='user-card';
  wrap.innerHTML=`
    <img src="${u.avatar}" alt="">
    <div class="user-meta">
      <div class="name">${u.name}</div>
      <div class="role">${u.role||''}</div>
    </div>
    <div class="user-actions">
      ${mode==='followers'
        ? '<button class="btn btn-ghost btn-sm">نمایه</button><button class="btn btn-primary btn-sm">فالو بک</button>'
        : '<button class="btn btn-ghost btn-sm">نمایه</button><button class="btn btn-danger btn-sm">آنفالو</button>'}
    </div>`;
  return wrap;
}

function paintGrid(id, data, mode){
  const box=document.getElementById(id);
  if(!box) return;
  box.innerHTML='';
  data.forEach(u=> box.appendChild(userCard(u, mode)));
}

function paintFollowers(){ paintGrid('followersGrid', followersDemo, 'followers'); }
function paintFollowing(){ paintGrid('followingGrid', followingDemo, 'following'); }

// run once (doesn't affect other init steps)
try{ paintFollowers(); paintFollowing(); }catch(_){}
