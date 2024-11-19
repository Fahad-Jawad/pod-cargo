document
.getElementById('hamburger')
.addEventListener('click', function () {
  document
    .getElementById('mobileMenu')
    .classList.remove('translate-x-full');
});

document
.getElementById('closeMenu')
.addEventListener('click', function () {
  document
    .getElementById('mobileMenu')
    .classList.add('translate-x-full');
});
document.querySelectorAll('.mbl-link').forEach(link => {
  link.addEventListener('click', function () {
    document
      .getElementById('mobileMenu')
      .classList.add('translate-x-full');
  });
});