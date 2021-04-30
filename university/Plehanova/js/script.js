/* Появление хедера при скролее на ПК */

window.onscroll = () => {

  const header = document.querySelector('.header-top')
  const Y = window.scrollY

  if(Y > window.innerHeight) {
    header.style.position = 'fixed'
    header.style.top = '0'
    header.style.backgroundColor = 'white'
    header.style.zIndex = '100'
    
  } else if (Y < window.innerHeight){
    header.style.position = 'relative'
  }

}

/* Слайдеры */

$(function() {
    $('.slider-prof').slick({
        dots: true,
        arrows: true,
        autoplay: true,
        speed: 700,
        prevArrow: '<span><i class="fas fa-arrow-left sliderProfArrow__prev"></i></span>',
        nextArrow: '<span><i class="fas fa-arrow-right sliderProfArrow__next"></i></span>',
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              arrows: false,
              
            }
          }
        ]
    })
})

$(function() {
    $('.sliderReviews').slick({
        dots: true,
        arrows: true,
        autoplay: true,
        speed: 700,
        prevArrow: '<span><img src="./img/slider_arrowLeft.svg" class="sliderReviews__prev" alt=""></span>',
        nextArrow: '<span><img src="./img/slider_arrowRight.svg" class="sliderReviews__next" alt=""></span>',
        responsive: [
            {
              breakpoint: 768,
              settings: {
                arrows: false,
                
              }
            }
          ]
    })
})

/* Меню на малых экранах */

let open = document.querySelector('.burger')
let menu = document.querySelector('.adaptive-nav')
let close = document.querySelector('.adaptiveIcon')

open.addEventListener('click', () => {
  menu.style.top = '0'
})

close.addEventListener('click', () => {
  menu.style.top = '-380px'
})

/* Форма обратного звонка */

let selector = ".btn button";
let popup = document.querySelector('.call')
let popupClose = document.querySelector('.call__close')

$(selector).on("click", (function () {
    $(popup).css("display", "block")
}))

popupClose.addEventListener('click', () => {
  popup.style.display = 'none'
})