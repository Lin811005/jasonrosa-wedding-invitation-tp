//套件開始
//슬라이더-메인
$(document).ready(function () {

    var $slider = $(".slider"),
      $slideBGs = $(".slide__bg"),
      diff = 0,
      curSlide = 0,
      numOfSlides = $(".slide").length - 1,
      animating = false,
      animTime = 500,
      autoSlideTimeout,
      autoSlideDelay = 6000,
      $pagination = $(".slider-pagi");
  
    function createBullets() {
      for (var i = 0; i < numOfSlides + 1; i++) {
        var $li = $("<li class='slider-pagi__elem'></li>");
        $li.addClass("slider-pagi__elem-" + i).data("page", i);
        if (!i) $li.addClass("active");
        $pagination.append($li);
      }
    };
  
    createBullets();
  
    function manageControls() {
      $(".slider-control").removeClass("inactive");
      if (!curSlide) $(".slider-control.left").addClass("inactive");
      if (curSlide === numOfSlides) $(".slider-control.right").addClass("inactive");
    };
  
    function autoSlide() {
      autoSlideTimeout = setTimeout(function () {
        curSlide++;
        if (curSlide > numOfSlides) curSlide = 0;
        changeSlides();
      }, autoSlideDelay);
    };
  
    autoSlide();
  
    function changeSlides(instant) {
      if (!instant) {
        animating = true;
        manageControls();
        $slider.addClass("animating");
        $slider.css("top");
        $(".slide").removeClass("active");
        $(".slide-" + curSlide).addClass("active");
        setTimeout(function () {
          $slider.removeClass("animating");
          animating = false;
        }, animTime);
      }
      window.clearTimeout(autoSlideTimeout);
      $(".slider-pagi__elem").removeClass("active");
      $(".slider-pagi__elem-" + curSlide).addClass("active");
      $slider.css("transform", "translate3d(" + -curSlide * 100 + "%,0,0)");
      $slideBGs.css("transform", "translate3d(" + curSlide * 50 + "%,0,0)");
      diff = 0;
      autoSlide();
    }
  
    function navigateLeft() {
      if (animating) return;
      if (curSlide > 0) curSlide--;
      changeSlides();
    }
  
    function navigateRight() {
      if (animating) return;
      if (curSlide < numOfSlides) curSlide++;
      changeSlides();
    }
  
    $(document).on("mousedown touchstart", ".slider", function (e) {
      if (animating) return;
      window.clearTimeout(autoSlideTimeout);
      var startX = e.pageX || e.originalEvent.touches[0].pageX,
        winW = $(window).width();
      diff = 0;
  
      $(document).on("mousemove touchmove", function (e) {
        var x = e.pageX || e.originalEvent.touches[0].pageX;
        diff = (startX - x) / winW * 70;
        if ((!curSlide && diff < 0) || (curSlide === numOfSlides && diff > 0)) diff /= 2;
        $slider.css("transform", "translate3d(" + (-curSlide * 100 - diff) + "%,0,0)");
        $slideBGs.css("transform", "translate3d(" + (curSlide * 50 + diff / 2) + "%,0,0)");
      });
    });
  
    $(document).on("mouseup touchend", function (e) {
      $(document).off("mousemove touchmove");
      if (animating) return;
      if (!diff) {
        changeSlides(true);
        return;
      }
      if (diff > -8 && diff < 8) {
        changeSlides();
        return;
      }
      if (diff <= -8) {
        navigateLeft();
      }
      if (diff >= 8) {
        navigateRight();
      }
    });
  
    $(document).on("click", ".slider-control", function () {
      if ($(this).hasClass("left")) {
        navigateLeft();
      } else {
        navigateRight();
      }
    });
  
    $(document).on("click", ".slider-pagi__elem", function () {
      curSlide = $(this).data("page");
      changeSlides();
    });
  
  });
  
  //이미지 슬라이드
  var gall = setInterval(galleryFun, 2500);
  var inter = true;
  var idx = 2;
  
  function galleryFun() {
  
    $(".gall-1 ul").animate({
      "left": -300 * idx + "px"
    }, 300);
    $(".g_item ul li").eq(idx - 1).addClass("on").siblings().removeClass("on");
    idx++;
    if (idx > $(".gall-1 ul li").length - 3) {
      $(".gall-1 ul").animate({
        "left": 0
      }, 0);
      idx = 0;
  
    }
  }
  
  $(".gall-1 , .g_item").hover(function () {
    if (inter == true) {
      clearInterval(gall);
      inter = false;
    }
  }, function () {
    if (inter == false) {
      gall = setInterval(galleryFun, 2500);
      inter = true;
    }
  });
  
  $(".g_item ul li").on('click', function () {
    $(this).addClass("on").siblings().removeClass("on");
    idx = $(this).index() + 1;
    $(".gall-1 ul").animate({
      "left": -300 * idx + "px"
    }, 1000);
  
  });
  
  //햄버거메뉴
  
  $(".btn").click(function () {
    $("#menu,.page_cover,html").addClass("open");
    window.location.hash = "#open";
  });
  
  window.onhashchange = function () {
    if (location.hash != "#open") {
      $("#menu,.page_cover,html").removeClass("open");
    }
  };
  //套件結束

  $(document).ready(function(){
    $('.customer-logos').slick({
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1800,
        arrows: false,
        dots: false,
        pauseOnFocus: false, // 在焦点状态下不暂停轮播
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 4
            }
        }, {
            breakpoint: 520,
            settings: {
                slidesToShow: 3
            }
        }]
    });
});
  