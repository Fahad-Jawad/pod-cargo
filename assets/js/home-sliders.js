const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    spaceBetween: 100,

    autoplay: {
   delay: 5000,
 },    pagination: { el: '.swiper-pagination' },
  })