$(document).ready(function () {

  // ======================== preloader =========================

  $(window).on('load', function () {
    let preloader = $('.preload');
    // let  preloadMidBlue = $('.preload__middle-blue');
    // let  preloadBoldBlue = $('.preload__bold-blue');
    // preloadMidBlue.fadeOut();
    // preloadBoldBlue.fadeOut();
    // $svg_anm.fadeOut();
    preloader.delay('1000').fadeOut('500');
  });

  // ================ инициализация библиотеки ленивой загрузки B-lazy=====================

  let blazy = new Blazy();


  // ================================= блок menu-burger ========================

  const menuBurger = document.querySelector('.menu-burger');
  const menuSwitcherContainer = document.querySelector('.menu-burger__switcher-container');
  const menuSwitcher = document.querySelector('.menu-burger__switcher');
  const menuListWrapper = document.querySelector('.menu-burger__list-wrapper');
  const headerContactsContainer = document.querySelector('.header__contacts-container');


  function showMenu() {
    menuSwitcher.classList.add('menu-burger__switcher_active');
    menuSwitcherContainer.classList.add('menu-burger__switcher-container_active');
    menuBurger.classList.add('menu-burger_active');
    headerContactsContainer.classList.add('header__contacts-container-active');
    $('.menu-burger__list-wrapper').slideDown('1000');
  }

  function hideMenu() {
    $('.menu-burger__list-wrapper').slideUp('1000');
    menuSwitcher.classList.remove('menu-burger__switcher_active');


    setTimeout(() => {

      menuSwitcherContainer.classList.remove('menu-burger__switcher-container_active');
      menuBurger.classList.remove('menu-burger_active');
      headerContactsContainer.classList.remove('header__contacts-container-active');
    }, 400)

  }

  menuSwitcher.onclick = function () {

    if ($('.menu-burger__list-wrapper').css('display') == 'none') {
      showMenu()
    } else {
      hideMenu();

    }

  };

  $(document).mouseup(function (e) { // событие клика по веб-документу
    var div = $(".header"); // тут указываем ID элемента
    if (!div.is(e.target) // если клик был не по элементу 
      &&
      div.has(e.target).length === 0) { // и не по его дочерним элементам

      hideMenu();
    }
  });

  // =============================== появление шапки ========================

  let headerHeight = $(".header").outerHeight();

  $(window).on("scroll", function () {
    let currentScrollTop = $(window).scrollTop();
    if (headerHeight < currentScrollTop) {
      $('.header').addClass('header_active');
      $('.header').addClass('header_active');

    } else {
      $('header').removeClass('header_active');
    }
  });


  //=========================== скрол по якорным ссылкам ============================

  $('.menu-burger__list a').on('click', function (event) {
    event.preventDefault();

    hideMenu();

    let anchorBlock = $(this).attr("href");
    let anchorOffset = $(anchorBlock).offset().top;


    $('html, body').animate({
      scrollTop: anchorOffset - headerHeight
    }, 1000);

  });


  // ================================== слайдер main-section__slider=========================

  $('.main-section__slider').slick({
    infinite: true,
    speed: 3000,
    lazyLoad:'ondemand',
    pauseOnHover: false,
    touchMove: false,
    swipe: false,
    pauseOnFocus: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,


  });

  // ================================== темные карточки раздела преимуществ info-card_dark =========================


  const advantagesSection = document.querySelector('.advantages');

  const advantagesCards = advantagesSection.querySelectorAll('.info-card');

  for (let i = 0; i < advantagesCards.length; i++) {
    if (i % 2 != 0 && i != 0) {
      advantagesCards[i].classList.add('info-card_dark');
    }
  }



  // ========================================== плавное появление элементов =================================

  if (window.matchMedia("(min-width: 1357px)").matches) {
    AOS.init({
      disable: 'phone', // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      duration: 600, // values from 0 to 3000, with step 50ms
      easing: 'ease-in', // default easing for AOS animations   
    });

  } 




  // =================================== модальные окна ================================

  $('[data-modal]').on('click', function (event) {

    $('.modal').fadeIn();

    let modalClass = $(this).attr('data-modal');

    $('.' + modalClass).css('display', 'block');

    if ($(this).attr('data-modal') === 'video-modal') {

      $('.video-modal__iframe').attr('src', 'https://www.youtube.com/embed/pZ5WnVxXt5c?autoplay=1&rel=0&&playlist=Video_ID');

    }

    //  Отключение скролла страницы
    function OffScroll() {
      var winScrollTop = $(window).scrollTop();
      $(window).bind('scroll', function () {
        $(window).scrollTop(winScrollTop);

      });
    }

    OffScroll();



  });



  $('.modal__close').on('click', function (event) {
    $('.modal').fadeOut();

    setTimeout(() => {

      // выключение видео
      if ($('.video-modal__iframe').attr('src') != '') {
        $('.video-modal__iframe').attr('src', '');
      }

      // добавление display none всем модальным окнам   
      $('.modal__content').children().css('display', 'none');
      $('.modal__close').css('display', 'block');
    }, 400)

    // Включение скролла страницы
    $(window).unbind('scroll');




  });

  $('.modal').mouseup(function (e) { // событие клика по фону 
    var div = $(".modal__content"); // тут указываем ID элемента
    if (!div.is(e.target) // если клик был не по элементу 
      &&
      div.has(e.target).length === 0) { // и не по его дочерним элементам

      $('.modal').fadeOut();

      // Включение скролла страницы
      $(window).unbind('scroll');

      // выключение видео
      if ($('.video-modal__iframe').attr('src') != '') {
        $('.video-modal__iframe').attr('src', '');

      }

    }
  });




  // =======================параллакс============================

  $(document).ready(function () {
    $window = $(window);
    $('[data-type="background"]').each(function () {
      var $bgobj = $(this);
      $(window).scroll(function () {
        var yPos = -($window.scrollTop() / $bgobj.data('speed'));
        var coords = '50% ' + yPos + 'px';
        $bgobj.css({
          backgroundPosition: coords
        });
      });
    });
  });

  // =========================== исправление order-form ==========================

  const orderFormConsentBoxAdapt = document.querySelector('.order-form__consent-box-adaptive');
  const orderFormConsentBox = document.querySelector('.order-form__consent-box');

  if (window.matchMedia("(max-width: 767px)").matches) {
    orderFormConsentBox.remove();


  } else {
    orderFormConsentBoxAdapt.remove();

  }



  // Маски для телефона, плагин jquery.maskedinput.js, его код добавлен в файл jquery-3.5.1.min.js

  $(".phone-mask").mask("+7(999) 999-99-99");













});