
let countdown = 60; let timerId;
function goNext(e){ e.preventDefault();
  const id = document.getElementById('identifier').value.trim();
  const err = document.getElementById('idErr');
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(id);
  const phoneOk = /^(?:\+?98|0)?9\d{9}$/.test(id);
  if(!emailOk && !phoneOk){ err.textContent = 'ایمیل یا شماره موبایل معتبر نیست.'; return; }
  err.textContent='';
  document.getElementById('idShown').textContent = id;
  document.getElementById('idShown2').textContent = id;
  document.getElementById('step1').style.display='none';
  document.getElementById('step2').style.display='block';
  startTimer();
  // اینجا در حالت واقعی باید درخواست ارسال OTP به سرور ارسال شود.
}

function startTimer(){
  clearInterval(timerId); countdown = 60;
  document.getElementById('resendBtn').disabled = true;
  document.getElementById('timer').textContent = countdown + ' ثانیه تا ارسال مجدد';
  timerId = setInterval(()=>{
    countdown--;
    document.getElementById('timer').textContent = countdown + ' ثانیه تا ارسال مجدد';
    if(countdown<=0){ clearInterval(timerId); document.getElementById('resendBtn').disabled = false; document.getElementById('timer').textContent='می‌توانید دوباره کد بگیرید'; }
  },1000);
}

function resend(){
  // درخواست ارسال مجدد OTP به سرور
  startTimer();
  alert('کد جدید ارسال شد.');
}

function usePassword(e){ e.preventDefault();
  document.getElementById('step2').style.display='none';
  document.getElementById('stepPass').style.display='block';
}

function backToId(){
  document.getElementById('step2').style.display='none';
  document.getElementById('stepPass').style.display='none';
  document.getElementById('step1').style.display='block';
}

function submitLogin(e){ e.preventDefault();
  // اینجا به API لاگین خود متصل شوید. فعلاً نمایشی:
  const otp = document.getElementById('otp')?.value;
  const pass = document.getElementById('password')?.value;
  if(document.getElementById('step2').style.display==='block' && (!otp || otp.length<4)){
    document.getElementById('otpErr').textContent='کد وارد شده صحیح نیست.'; return;
  }
  if(document.getElementById('stepPass').style.display==='block' && (!pass || pass.length<6)){
    document.getElementById('passErr').textContent='رمز عبور باید حداقل ۶ کاراکتر باشد.'; return;
  }
  alert('ورود موفق! (دمو)');
}

function toRegister(){ alert('صفحه ثبت‌نام در حال توسعه است. می‌توانید این دکمه را به /register لینک کنید.'); }
function forgotPass(e){ e.preventDefault(); alert('لینک بازیابی رمز عبور (نمایشی)'); }
