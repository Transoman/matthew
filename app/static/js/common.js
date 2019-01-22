jQuery(document).ready(function($) {

  // Toggle nav menu
  $('.nav-toggle').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.header__nav').toggleClass('open');
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
    }
    else {
      $('.header').removeClass('fixed');
    }
  }

  fixedHeader();

  $(window).scroll(function() {
    fixedHeader();
  });

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