function editProfile() {
  alert("در نسخه بعدی امکان ویرایش اطلاعات فعال خواهد شد.");
}

function logout() {
  const confirmLogout = confirm("آیا مطمئن هستید که می‌خواهید خارج شوید؟");
  if (confirmLogout) {
    alert("با موفقیت خارج شدید.");
    // در نسخه واقعی: انتقال به صفحه ورود یا حذف توکن
  }
}
function addSkill() {
  const skillInput = document.getElementById('newSkill')
  const skill = skillInput.value.trim()
  if (skill) {
    const span = document.createElement('span')
    span.textContent = skill
    document.getElementById('skillsList').appendChild(span)
    skillInput.value = ''
  }
}

document.getElementById('editForm').addEventListener('submit', function(e) {
  e.preventDefault()
  const name = document.getElementById('nameInput').value
  const title = document.getElementById('titleInput').value
  const bio = document.getElementById('bioInput').value

  alert('اطلاعات با موفقیت ذخیره شد!')
  // اینجا می‌تونی اطلاعات رو به دیتابیس یا localStorage بفرستی
})
document.getElementById('editForm').addEventListener('submit', function(e) {
  e.preventDefault()

  // گرفتن مقادیر جدید
  const newName = document.getElementById('nameInput').value
  const newTitle = document.getElementById('titleInput').value
  const newBio = document.getElementById('bioInput').value

  // به‌روزرسانی بخش نمایش پروفایل
  document.getElementById('displayName').textContent = newName
  document.getElementById('displayTitle').textContent = newTitle
  document.getElementById('displayBio').textContent = newBio

  alert('پروفایل با موفقیت به‌روزرسانی شد!')
})
