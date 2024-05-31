'use strict';



/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */


const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});




/**
 * add event listener on multiple elements
 */

const addEventElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}




/**
 * NAVBAR
 */
const navbar = document.querySelector('[data-navbar]');
const navTogglers = document.querySelectorAll('[data-nav-toggler]');
const overlay = document.querySelector('[data-overlay]');


const toggleNavbar = function () {
  navbar.classList.toggle('active');
  navTogglers.classList.toggle('active');
  document.body.classList.toggle('nav-active');
}

addEventElements(navTogglers, "click", toggleNavbar);


/**
 * HEADER & BACK TOP BTN
 */


const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]")
let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");

    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");

  }
});


/**
 * HERO SLIDER
 */
// Lấy các phần tử của slider
const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

// Hàm cập nhật vị trí của slider
const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

// Hàm chuyển đến slide kế tiếp
const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }
  updateSliderPos();
}

// Thêm sự kiện click cho nút Next
heroSliderNextBtn.addEventListener("click", slideNext);

// Hàm chuyển đến slide trước đó
const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }
  updateSliderPos();
}


// Thêm sự kiện click cho nút Prev
heroSliderPrevBtn.addEventListener("click", slidePrev);


/**
 * Tự động chuyển slide
 */
let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000); // Chuyển slide mỗi 7 giây
}


// Hàm thêm sự kiện cho nhiều phần tử
const addEventOnElements = function (elements, event, handler) {
  elements.forEach(element => {
    element.addEventListener(event, handler);
  });
}


// Dừng tự động chuyển slide khi di chuột vào nút điều hướng
addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

// Tiếp tục tự động chuyển slide khi không di chuột vào nút điều hướng
addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

// Bắt đầu tự động chuyển slide khi trang tải xong
window.addEventListener("load", autoSlide);




/**
 * PARALLAX EFFECT
 */
const parallaxItems = document.querySelectorAll("[data-parallax-item]");
let x, y;

window.addEventListener("mousemove", function (event) {
  // Tính toán x và y dựa trên vị trí của chuột
  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;
  
  // Đảo ngược giá trị x và y
  x = -x;
  y = -y;

  for (let i = 0; i < parallaxItems.length; i++) {
    // Tính toán vị trí dịch chuyển cho từng phần tử dựa trên tốc độ parallax
    let itemX = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    let itemY = y * Number(parallaxItems[i].dataset.parallaxSpeed);

    // Cập nhật thuộc tính transform của phần tử
    parallaxItems[i].style.transform = `translate3d(${itemX}px, ${itemY}px, 0)`;
  }
});

