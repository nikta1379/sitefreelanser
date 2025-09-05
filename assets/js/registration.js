let countdown = 60;
let timerId;
let selectedRole = null;
let phoneNumber = '';

function sendVerificationCode(e) {
    e.preventDefault();
    const phoneInput = document.getElementById('phone');
    phoneNumber = phoneInput.value.trim();
    const err = document.getElementById('phoneErr');
    
    // Validate Iranian mobile number
    if (!/^09[0-9]{9}$/.test(phoneNumber)) {
        err.textContent = 'شماره موبایل معتبر نیست.';
        return;
    }
    
    err.textContent = '';
    document.getElementById('phoneShown').textContent = phoneNumber;
    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'block';
    
    startTimer();
    
    // In a real application, send the verification code via SMS
    console.log('Sending verification code to:', phoneNumber);
    alert(`پیامک حاوی کد تأیید به شماره ${phoneNumber} ارسال شد (شبیه‌سازی)`);
    
    // For demo purposes, set a fixed code (123456)
    window.verificationCode = '123456';
}

function startTimer() {
    clearInterval(timerId);
    countdown = 60;
    document.getElementById('resendBtn').disabled = true;
    document.getElementById('timer').textContent = countdown + ' ثانیه تا ارسال مجدد';
    
    timerId = setInterval(() => {
        countdown--;
        document.getElementById('timer').textContent = countdown + ' ثانیه تا ارسال مجدد';
        
        if (countdown <= 0) {
            clearInterval(timerId);
            document.getElementById('resendBtn').disabled = false;
            document.getElementById('timer').textContent = 'می‌توانید دوباره کد بگیرید';
        }
    }, 1000);
}

function resendCode() {
    // Reset and start timer again
    startTimer();
    
    // Simulate resending SMS
    alert(`کد جدید به شماره ${phoneNumber} ارسال شد (شبیه‌سازی)`);
}

function verifyCode(e) {
    e.preventDefault();
    const otpInput = document.getElementById('otp');
    const enteredCode = otpInput.value.trim();
    const err = document.getElementById('otpErr');
    
    // Check if the entered code matches the sent code
    if (enteredCode === window.verificationCode) {
        // Stop the timer
        clearInterval(timerId);
        
        // Hide verification form and show role selection
        document.getElementById('step2').style.display = 'none';
        document.getElementById('step3').style.display = 'block';
        document.getElementById('roleSelection').style.display = 'block';
    } else {
        err.textContent = 'کد تأیید نامعتبر است. لطفاً دوباره تلاش کنید.';
    }
}

function selectRole(element, role) {
    // Remove selected class from all options
    const allOptions = document.querySelectorAll('.role-option');
    allOptions.forEach(option => option.classList.remove('selected'));
    
    // Add selected class to clicked option
    element.classList.add('selected');
    
    // Check the radio button inside the selected option
    const radioButton = element.querySelector('input[type="radio"]');
    radioButton.checked = true;
    
    selectedRole = role;
}

function completeRegistration() {
    const err = document.getElementById('roleErr');
    
    if (!selectedRole) {
        err.textContent = 'لطفاً نقش خود را انتخاب کنید';
        return;
    }
    
    err.textContent = '';
    
    // In a real application, you would send the registration data to your backend
    console.log('Registration completed:');
    console.log('Phone:', phoneNumber);
    console.log('Role:', selectedRole);
    
    // Show success message
    alert(`ثبت‌نام با موفقیت انجام شد! نقش: ${selectedRole === 'freelancer' ? 'فریلنسر' : 'کارفرما'}`);
    
    // Redirect to dashboard or home page
    // window.location.href = '/dashboard';
}

function backToPhone() {
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step1').style.display = 'block';
}

function backToVerification() {
    document.getElementById('step3').style.display = 'none';
    document.getElementById('step2').style.display = 'block';
}

function toLogin() {
    alert('صفحه ورود در حال توسعه است.');
}
