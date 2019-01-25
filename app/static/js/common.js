jQuery(document).ready(function($) {

  // Toggle nav menu
  $('.nav-toggle').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.header__nav').toggleClass('open');
  });

  // Slider
  $('.project-modal__slider').each(function(i, el) {
    var $this = $(this);
    $this.addClass("project-modal__slider-" + i);
    $this.parent().find(".swiper-pagination").addClass("swiper-pagination-" + i);

    var pagination = '.swiper-pagination-' + i;

    var slider = new Swiper ('.project-modal__slider-' + i, {
      pagination: {
        el: pagination,
      }
    });

    $('.project-list__view-detail').click(function() {
      slider.update();
      console.log(slider);
    });
  });

  new Swiper ('.testimonial-slider', {
    spaceBetween: 200,
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // Modal
  $('.modal').popup({
    transition: 'all 0.3s',
    onclose: function() {
      $(this).find('label.error').remove();
    }
  });

  // Fixed header
  function fixedHeader() {
    if($(this).scrollTop() > 50) {
      $('.header').addClass('fixed');
      $('.hero--inner').addClass('fixed');
    }
    else {
      $('.header').removeClass('fixed');
      $('.hero--inner').removeClass('fixed');
    }
  }

  fixedHeader();

  $(window).scroll(function() {
    fixedHeader();
  });

  // Parallax
  function simpleParallax(intensity, element) {
    $(window).scroll(function() {
      var scrollTop = $(window).scrollTop();
      var imgPos = scrollTop / intensity + 'px';
      element.css('transform', 'translateY(' + imgPos + ')');
    });
  }

  simpleParallax(-5, $('.parallax-1'));
  simpleParallax(-5, $('.parallax-2'));
  simpleParallax(5, $('.parallax-3'));
  simpleParallax(5, $('.parallax-4'));
  simpleParallax(5, $('.parallax-5'));
  simpleParallax(-5, $('.parallax-6'));
  simpleParallax(5, $('.parallax-7'));

  // Show more project
  var showMoreProject = function() {
    var list = $('.project-list');
    var items = list.find('.project-list__item');
    var countItems = items.length;
    var maxItems = 5;
    var arrIndexHidden = [];
    var btnShow = $('.project__more');
    var btnTextHide = 'Hide';
    var btnTextShow = 'Show more';

    if (countItems > maxItems) {
      items.each(function(i, el) {
        if (i > 4) {
          $(this).hide();
          arrIndexHidden.push(i);
        }
      });
    }

    btnShow.click(function(e) {
      e.preventDefault();
      arrIndexHidden.forEach(function(item, i, arrIndexHidden) {
        items.eq(item).slideToggle();
      });

      if ($(this).text() == btnTextHide) {
        $(this).text(btnTextShow);
      }
      else {
        $(this).text(btnTextHide);
      }
    });
  }

  showMoreProject();

  // Read more
  function readMore(element, maxHeight, showText, hideText) {
    var elem = element;//$('.resume__content');
    var fullHeight = element.innerHeight();//$('.resume__content').innerHeight();
    var maxHeight = maxHeight != undefined ? maxHeight : 310;
    var moreText = showText != undefined ? showText : 'Read more';
    var lessText = hideText != undefined ? hideText : 'Hide';
    var btn = element.find('a'); //$('.resume__more');

    $(window).resize(function(event) {
      fullHeight = element.innerHeight();//$('.resume__content').innerHeight();
      if (parseInt(elem.css('height'), 10) != fullHeight && parseInt(elem.css('height'), 10) != maxHeight) {
        elem.css('height', maxHeight).animate({
          height: fullHeight,
          },
          200, function() {
        });
      }
    });

    elem.css({
      height: maxHeight,
      overflow: 'hidden'
    })

    btn.click(function(e) {
      e.preventDefault();

      if (parseInt(elem.css('height'), 10) != fullHeight) {
        elem.css('height', maxHeight).animate({
          height: fullHeight,
          },
          200, function() {
            elem.addClass('active');
            btn.html(lessText);
        });
      }
      else {
        elem.animate({
          height: maxHeight,
          },
          200, function() {
            elem.css('height', maxHeight);
            elem.removeClass('active');
            btn.html(moreText);
        });
      }

    });
  }

  readMore($('.resume__content'));

  var breakpoint = window.matchMedia( '(max-width: 767px)' );

  var breakpointChecker = function() {
    if ( breakpoint.matches === true ) {
      $('.testimonial-slider__content').each(function(i, el) {
        readMore($(el), 250, 'Read all');
      });
    }
  }

  breakpoint.addListener(breakpointChecker);

  breakpointChecker();

  // Fixed map
  var navbar =  $('.article__map-container');  // navigation block
  var wrapper = $('.article__wrap');        // may be: navbar.parent();

  $(window).scroll(function(){
    if ($(window).width() > 992) {
      var nsc = $(document).scrollTop();
      var bp1 = wrapper.offset().top;
      var bp2 = bp1 + wrapper.outerHeight()-$(window).height();
      var widthWindow = $('body').prop("clientWidth");
      var width = (widthWindow - wrapper.outerWidth()) / 2;

      if (nsc>bp1) { navbar.addClass('fixed').css('right', width); }
      else { navbar.removeClass('fixed'); }
      if (nsc>bp2) { navbar.css({'top': bp2-nsc, 'right': width}); }
      else { navbar.css('top', '0'); }
    }
  });

  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
        && 
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          var headerH = $('header').outerHeight();
          $('.nav-toggle').removeClass('active');
          $('.header__nav').removeClass('open');
          $('html, body').animate({
            scrollTop: target.offset().top - headerH
          }, 1000);
        }
      }
    });

  // SVG
  svg4everybody({});

});