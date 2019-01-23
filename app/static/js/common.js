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

  // Modal
  $('.modal').popup({
    transition: 'all 0.3s',
    onopen: function() {
      // slider.update();
    },
    onclose: function() {
      $(this).find('label.error').remove();
    }
  });

  // Fixed header
  function fixedHeader() {
    if($(this).scrollTop() > 50) {
      $('.header').addClass('fixed');
    }
    else {
      $('.header').removeClass('fixed');
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

  var hiddenItemNav = function() {
    var nav = $('.nav-list');
    var navWidth = nav.width();
    var allWidth = 0;
    var hiddenWidth = 0;
    var maxWidth = 500;
    var arrIndexHidden = [];
  
    if (navWidth > maxWidth) {
      nav.find('li').each(function(i, el) {
        
        if (allWidth + $(this).next().width() < maxWidth) {
          allWidth += $(this).width();
        }
        else {
            $(this).hide();
            hiddenWidth += $(this).width();
            arrIndexHidden.push(i);
        }
      });

      nav.append('<li class="nav-list__drop"><a href="#">. . .</a></li>');
    }
    
  
    // $('.nav-list__drop a').click(function(e) {
    //   e.preventDefault();
    //   arrIndexHidden.forEach(function(item, i, arrIndexHidden) {
    //     console.log(item)
    //   });
    //   // nav.css('transform', 'translateX(-'+ hiddenWidth +'px)');
    // });
  }

  hiddenItemNav();

  $(window).resize(function() {
    hiddenItemNav();
  });

  // SVG
  svg4everybody({});

});