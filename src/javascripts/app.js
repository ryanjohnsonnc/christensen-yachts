(function($){

  'use strict';

  function initNavbar () {
    if (!$('section:first').is('.parallax, #home, .splash')) {
      $('#topnav').addClass('scroll');
      $('body').addClass('top-padding');
    }

    if ($('section:first').is('#home') && $('#home').hasClass('bordered')) {
      $('#topnav').addClass('top-space');
    }

    $(window).scroll(function() {
      
      if($('section:first').is('.parallax, #home, .splash')){
        if ($(window).scrollTop() >= 100 ) {
          $('#topnav').addClass('scroll');
        } else{
          $('#topnav').removeClass('scroll');
        }
      }

      var filters = $('#filters');
      if(filters.length && !filters.hasClass('no-fix')){
        if ($(window).scrollTop() >= $('.page-title:first').height() + 30) {
          filters.addClass('fixed');
        } else{
          filters.removeClass('fixed');
        }
      }

    }).trigger('scroll');

    $('.navbar-toggle').on('click', function(event) {
      $(this).toggleClass('open');
      $('#navigation').slideToggle(400);
      $('.cart, .search').removeClass('open');
    });

    $('.cart').on('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      if ($(window).width() < 768) {
        if ($('#navigation').is(':visible')) {
          $('.navbar-toggle').click();
        }
        $('.search').removeClass('open');
        $(this).toggleClass('open');
      }
    });

    $('.search').on('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      if ($(window).width() < 768) {
        if ($('#navigation').is(':visible')) {
          $('.navbar-toggle').click();
        }
        $('.cart').removeClass('open');
        $(this).toggleClass('open');
      }
    });

    $('.shopping-cart, .search-form').on('click', function(e) {
      event.stopPropagation();
    });

    $('body').on('click', function(event) {
      $('.cart, .search').removeClass('open');
    });

    $('.navigation-menu>li').slice(-2).addClass('last-elements');

    $('.navigation-menu li.has-submenu a[href="#"]').on('click', function(e) {
      if ($(window).width() < 992) {
        e.preventDefault();
        $(this).parent('li').toggleClass('open').find('.submenu:first').toggleClass('open');
      }
    });
  }

  function initHomeSlider() {

    $('#home-slider img').each(function(index, el) {
      var slide = $(this).parent('li');
      var image = $(this).attr('src');

      $(slide).prepend($('<div class="slide-image"></div>').css('background-image', 'url('+image+')'));

      if (navigator.userAgent.indexOf("Firefox") != -1 && $('#home').hasClass('bordered')) {
        $('.slide-image').addClass('ff-fix');
      }

      $(this).remove();
    });

    var options = {
      prevText: '<i class="ti-angle-left"></i>',
      nextText: '<i class="ti-angle-right"></i>',
      keyboard: false,
    };

    if ($('#home-slider .slides > li').length < 2) {
      options.directionNav = false
    }

    if ($('#home-slider').hasClass('kenburn')) {

      options.start = function () {
        $('#home-slider').find(".slides > li.flex-active-slide > .slide-image").each(function () {
          var $content = $(this);
          $content.css({
            '-webkit-transform': 'scale(1.2)',
            '-moz-transform': 'scale(1.2)',
            'transform': 'scale(1.2)',
          });
        })
      }

      options.before = function () {
        $('#home-slider').find(".slides > li > .slide-image").each(function () {
          var $content = $(this);
          $content.css({
            '-webkit-transform': 'scale(1)',
            '-moz-transform': 'scale(1)',
            'transform': 'scale(1)',
          });
        })
      }

      options.after = function () {
        $('#home-slider').find(".slides > li.flex-active-slide > .slide-image").each(function () {
          var $content = $(this);
          $content.css({
            '-webkit-transform': 'scale(1.2)',
            '-moz-transform': 'scale(1.2)',
            'transform': 'scale(1.2)',
          });
        })
      }
    }

    $('#home-slider').flexslider(options);

    $('#text-rotator').flexslider({
      controlNav: false,
      directionNav: false
    })
  }

  function initCarousels () {
    $('.owl-carousel').each(function(index, el) {
      var dataOptions = $(this).data('options') || {};

      var options = {
        items: dataOptions.items || 4,
        loop: dataOptions.loop || true,
        dots: dataOptions.dots || false,
        margin: dataOptions.margin || 10,
        autoplay: dataOptions.autoplay || false,
        responsiveClass: true,
        responsive:{
          0:{
            items: dataOptions.xsItems || 1,
            margin: 25
          },
          768:{
            items: dataOptions.smItems || 2,
          },
          992:{
            items:dataOptions.mdItems || 3,
          },
          1200: {
            items: dataOptions.items || 4
          }
        }
      }

      if (options.autoplay) {
        options.autoplayTimeout = dataOptions.autoplayTimeout || 2000;
        options.autoplayHoverPause = true;
      }


      $(el).owlCarousel(options);
    });
  }

  function initSliders () {
    $('.flexslider').each(function(index, el) {
      var dataOptions = $(this).data('options') || {};

      var options = {
        animation: dataOptions.animation === 'slide' ? 'slide' : 'fade',
        controlNav: dataOptions.controlNav === true ? true : false,
        directionNav: dataOptions.directionNav === true ? true : false,
        prevText: '<i class="ti-arrow-left"></i>',
        nextText: '<i class="ti-arrow-right"></i>',
      };

      $(el).flexslider(options);
    });
  }

  function initMap() {

    var lat = $('#map').data('lat');
    var lang = $('#map').data('lang');

    var myLatlng = new google.maps.LatLng(lat, lang);

    var styles = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}];

    var mapOptions = {
      zoom: 12,
      center: myLatlng,
      mapTypeControl: false,
      disableDefaultUI: true,
      zoomControl: false,
      scrollwheel: false,
      styles: styles
    }

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var infowindow = new google.maps.InfoWindow({
      content: "We are here!"
    });

    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      icon: 'images/marker.svg',
      title: 'We are here!'
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });
  }

  function initCountdowns () {
    var theDate = $('.countdown').data('date');
    $(".countdown").downCount({
      date: theDate,
      offset: 0
    });
  }

  function initAccordions () {
    $('.accordion-title').on('click', function(event) {
      var accordion = $(this).parents('.accordion');

      if (!accordion.data('multiple')) {
        accordion.find('li').not($(this).parent()).removeClass('active');
        accordion.find('li').not($(this).parent()).find('.accordion-content').slideUp(300);
      }

      $(this).parent('li').toggleClass('active');
      $(this).next().slideToggle(300, function () {
        fixScroll();
      });

    });
  }

  function initLoad () {
    $(window).load(function() {

      $("#loader").delay(500).fadeOut();
      $("#mask").delay(1000).fadeOut("slow");

      var $grid = $('#works').isotope({
        masonry: {
         columnWidth: 0
        },
        itemSelector: '.work-item'
      });

      $grid.on('layoutComplete', function(event) {
        $(window).trigger('resize');
        fixScroll();
      });;

      $('.blog-masonry').isotope({
        masonry: {
         columnWidth: 0
        },
        itemSelector: '.masonry-post'
      });

      $('#filters').on('click', 'li', function() {
        $('#filters li').removeClass('active');
        $(this).addClass('active');
        var filterValue = $(this).attr('data-filter');
        $('#works').isotope({ filter: filterValue });
        $(window).trigger('resize');
      });

    });
  }

  function initVideoModal () {
    $('.play-button').on('click', function(e) {
      var videoUrl = $(this).data('src');

      var template = '<div id="gallery-modal">';
      template += '<div class="centrize">';
      template += '<div class="v-center">';
      template += '<div class="gallery-image">';
      template += '<div class="media-video">';
      template += '<a href="#" id="gallery-close"><i class="ti-close"></i></a>';
      template += '<iframe src="'+ videoUrl +'" frameborder="0">';
      template += '</div>';
      template += '</div>';
      template += '</div>';
      template += '</div>';
      template += '</div>';

      $('body').append(template);

      $('body').addClass('modal-open');

      $('#gallery-modal').fadeIn(300);

    });
  }

  function initVideoBg(){

    if ($('.player').length) {
      $('.player').mb_YTPlayer({
        containment: '#video-wrapper',
        autoPlay: true,
        mute: true
      });

      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        $('#video-wrapper').append('<div id="fallback-bg"></div>');
        $('#fallback-bg').css('background-image', 'url('+$('#video-wrapper').data('fallback-bg')+')');
      }
    }

    var videoEl = $('#video-wrapper video');

    var setProportion = function () {
      var proportion = getProportion();
      videoEl.width(proportion*1280);
      videoEl.height(proportion*780);

      centerVideo();
    }

    var getProportion = function () {
      var windowWidth = $(window).width();
      var windowHeight = $(window).height();
      var windowProportion = windowWidth / windowHeight;
      var origProportion = 1280 / 720;
      var proportion = windowHeight / 720;

      if (windowProportion >= origProportion) {
        proportion = windowWidth / 1280;
      }

      return proportion;
    }

    var centerVideo = function() {
      var centerX = (($(window).width() >> 1) - (videoEl.width() >> 1)) | 0;
      var centerY = (($(window).height() >> 1) - (videoEl.height() >> 1)) | 0;

      videoEl.css({ 'left': centerX, 'top': centerY });
        
    }

    if (videoEl.length) {
      $(window).resize(function() {
        setProportion();
      }).trigger('resize');
    }
  }

  function initPhotoGallery () {

    var imagesArray = [];

    $('.photo-gallery').on('click', '.gallery-item a', function(event) {
      event.preventDefault();
        
      var gallery = $(this).parents('.photo-gallery');
      var galleryElements = gallery.find('.gallery-item>a');
        
        

      for (var i = 0; i < galleryElements.length; i++) {
        imagesArray.push($(galleryElements[i]).attr('href'));
        
        
      };
         

      var image = $(this).attr('href');
        var caption = $(this).attr('alt'); 
        
        
        
        
     
        
      var template = '<div id="gallery-modal">';
      template += '<div class="centrize">';
      template += '<div class="v-center">';
      template += '<div class="gallery-image">';
      template += '<div class="gallery-caption"><span>'+caption+'</span></div>';    
        
      template += '<a href="#" id="gallery-close"><i class="ti-close"></i></a>';
      template += '<a href="#" class="gallery-control gallery-prev"><i class="ti-angle-left"></i></a>';
      template += '<img src="'+imagesArray[imagesArray.indexOf(image)]+'" alt="">';
      template += '<a href="#" class="gallery-control gallery-next"><i class="ti-angle-right"></i></a>';
      template += '</div>';
      template += '</div>';
      template += '</div>';
      template += '</div>';

      $('body').append(template);
      $('body').addClass('modal-open');

      $('#gallery-modal').fadeIn(300);

    });

    $('body').on('click', '.gallery-control', function(event) {
      event.preventDefault();
      event.stopPropagation();

      var currentImage = $('.gallery-image').find('img');
        var currentCaption = $('.gallery-caption span');

      if ($(this).hasClass('gallery-next')) {
        if (imagesArray.indexOf(currentImage.attr('src')) >= (imagesArray.length - 1)) {
          return false;
        }

        currentImage.fadeOut(300, function() {
          var nextImage = imagesArray[imagesArray.indexOf(currentImage.attr('src')) + 1]

          $(currentImage).attr('src', nextImage);

            
        }).fadeIn(300);
      }

      else if ($(this).hasClass('gallery-prev')) {
        if (imagesArray.indexOf(currentImage.attr('src')) < 1) {
          return false;
        }

        currentImage.fadeOut(300, function() {
          var nextImage = imagesArray[imagesArray.indexOf(currentImage.attr('src')) - 1]
          $(currentImage).attr('src', nextImage);
          $(currentCaption).attr('style', nextImage);
        }).fadeIn(300);

      }

    });

    $('body').on('click', '#gallery-close', function(event) {
      event.preventDefault();
      $('#gallery-modal').fadeOut(300, function() {
        $('#gallery-modal').remove();
      });
      $('body').removeClass('modal-open');
    });

    $('body').on('click', '.gallery-image', function(event) {
      event.stopPropagation();
    });

    $('body').on('click', '#gallery-modal', function(event) {
      $('#gallery-close').trigger('click');
    });

    $(document).keyup(function(e) {
      if (e.keyCode == 27) {
        $('#gallery-close').trigger('click');
      }
      if (e.keyCode == 37) {
        $('.gallery-control.gallery-prev').trigger('click');
      }
      if (e.keyCode == 39) {
        $('.gallery-control.gallery-next').trigger('click');
      }
    });
  }

  function initContactForm() {

    var requiredInputs = $('#contact-form').find('input[data-required="true"], textarea[data-required="true"]').toArray();

    var isValidForm = function() {
      var toReturn;

      requiredInputs.forEach(function(element, index){
        if (!$(element).val()) {
          toReturn = false;
        } else{
          toReturn = true;
        }
      });

      return toReturn;
    }

    $('#contact-form').on('submit', function(event) {

      event.preventDefault();

      requiredInputs.forEach(function(element, index){
        if (!$(element).val()) {
          $(element).parent('.form-group').addClass('has-error');
        } else{
          $(element).parent('.form-group').removeClass('has-error');
        }
      });

      if (isValidForm()) {
        $.ajax({
          url: $(this).attr('action'),
          type: 'POST',
          data: $(this).serialize(),
        })
        .done(function() {
          var message = $('#contact-form').data('success-text') || 'Your message has been sent. We will get back to you shortly!';
          var succesTemplate = '<div role="alert" class="alert alert-success alert-outline">'+ message +'</div>';
          $('#contact-form input, #contact-form textarea, #contact-form button').attr('disabled', 'disabled');
          $('#contact-form .alert').fadeOut(300);
          $(succesTemplate).insertBefore($('#contact-form button'));
        })
        .fail(function() {
          var message = $('#contact-form').data('error-text') || 'There was an error. Try again later.';
          var errorTemplate = '<div role="alert" class="alert alert-danger alert-outline">'+ message +'</div>';
          $('#contact-form .alert').fadeOut(300);
          $(errorTemplate).insertBefore($('#contact-form button'));
        })        
      }

    });

    $('#contact-form input, #contact-form textarea').on('keyup', function(event) {
      event.preventDefault();
      if ($(this).val()) {
        $(this).parent('.form-group').removeClass('has-error');
      }
    });
  }

  function initCounters () {
    
    $('.counter').appear(function() {
      var counter = $(this).find('.number-count');
      var toCount = counter.data('count');
      
      $(counter).countTo({
        from: 0,
        to: toCount,
        speed: 1000,
        refreshInterval: 50
      })

    });
  }

  function fixScroll() {
    $('#sscr').css('height', 0);
    $('#sscr').css('height', document.documentElement.scrollHeight + 'px');
  }

  function initForms () {

    $('form[data-mailchimp]').each(function(index, el) {
      $(el).ajaxChimp({
        url: 'http://hody.us12.list-manage.com/subscribe/post?u=d9d1052c1b2ba81576842a9fb&id=c70c5d0c82',
        callback: function (res) {
          var template = '<div class="modal fade" id="modal" tabindex="-1" role="dialog">';
          template += '<div class="centrize">';
          template += '<div class="v-center">';
          template += '<div class="modal-dialog">';
          template += '<div class="modal-content">';
          template += '<div class="modal-header">';
          template += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"><i class="ti-close"></i></span></button>';
          if (res.result === 'success') {
            template += '<h4 class="modal-title">Thank you!</h2>';
          } else{
            template += '<h4 class="modal-title">There was an error.</h2>';          }

          template += '</div>';
          template += '<div class="modal-body">';
          template += '<p>' + res.msg + '</p>';
          template += '</div>';
          template += '</div>';
          template += '</div>';
          template += '</div>';
          template += '</div>';
          template += '</div>';

          $(template).modal().on('hidden.bs.modal', function () {
            $(this).remove();      
          });
        }
      });
    });
  }

  function initGeneral () {

    $("a[href='#top']").on('click', function() {
      $("html, body").animate({ scrollTop: 0 }, 1000);
      return false;
    });

    $('a[data-scroll="true"]').on('click', function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });

    if ($('#navigation').data('onepage')) {
      $('body').scrollspy({
        target: '#navigation'
      });
    }

    $('.bg-img, .thumb-placeholder').each(function(index, el) {
      var image = $(el).attr('src');
      $(el).parent().css('background-image', 'url(' + image + ')');
      $(el).remove();
    });

    $('.alert').on('closed.bs.alert', function () {
      fixScroll();
    });

    $('body').on('click', '.alert', function() {
      $(this).on('closed.bs.alert', function() {
        fixScroll();
      });
    });

    var parallaxZIndex = -100;

    if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("MSIE ") != -1 || navigator.userAgent.match(/Trident.*rv\:11\./) != null){
      parallaxZIndex = 11;
      $('section.parallax').css('z-index', 20);
    }

    $('.parallax-bg').parallax({
      speed: 0.5,
      zIndex: parallaxZIndex
    });

    $('#login-tabs a:first').tab('show');

    $('#login-content .tab-pane:first').addClass('fade in');

    $('#login-tabs li a').on('click', function (e) {
      e.preventDefault();
      $(this).tab('show');
    });

    $('a[data-toggle=tab]').on('click', function(event) {
      $(window).trigger('resize');      
    }).on('shown.bs.tab', function(e) {
      var container = $($(this).attr('href'));

      if (container.find('.progress-bar').length) {
        container.find('.progress-bar').each(function(index, el) {
          $(el).css('width', $(this).data('progress') + '%');
          $(el).parents('.skill').find('.skill-perc').css('right', 100 - $(el).data('progress') + '%');
        });
      }

    });;

    $('.particles-bg').particleground({
      dotColor: '#EF2D56',
      particleRadius: 5
    });

    $('.boxes [data-bg-color]').each(function(index, el) {
      $(el).css('background-color', $(el).data('bg-color'));  
    });

    $('.progress-bar').appear(function() {
      $(this).css('width', $(this).data('progress') + '%');
      $(this).parents('.skill').find('.skill-perc').css('right', 100 - $(this).data('progress') + '%');
    });

    $('[data-animated=true]').addClass('invisible');

    $('[data-animated=true]').appear(function(){
      var el = $(this);
      if (el.data('delay')) {
        setTimeout(function(){
          el.removeClass('invisible').addClass('fade-in-top');
        }, parseInt(el.data('delay')));
      } else{
        $(this).removeClass('invisible').addClass('fade-in-top');
      }
    }, {accX: 0, accY: 0});

    $('.client-image').hover(function() {
      $(this).removeClass('fade-in-top')
    }, function() {
      //
    });
  }

  function initCustom () {
    // Your custom code here.
  }

  function init () {
    initNavbar();
    initHomeSlider();
    initCarousels();
    initSliders();
    initAccordions();
    initLoad();
    initVideoBg();
    initVideoModal();
    initPhotoGallery();
    initContactForm();
    initCounters();
    initForms();
    initGeneral();
    initCustom();

    if ($('#map').length) {
      google.maps.event.addDomListener(window, 'load', initMap);
      $('#map').css('position', 'absolute');
    }

    if ($('.countdown').length) {
      initCountdowns();
    }
  }

  init();
    
    $("#title-1").on("click", function() {
    $("#service-img").css("background-image", "url(images/services-woodworking.jpg)");
  });
  $("#title-2").on("click", function() {
    $("#service-img").css("background-image", "url(images/services-metalwork.jpg)");
  });
  $("#title-3").on("click", function() {
    $("#service-img").css("background-image", "url(images/services-stonework.jpg)");
  });
  $("#title-4").on("click", function() {
    $("#service-img").css("background-image", "url(images/services-upholstery.jpg)");
  });

})(jQuery)


!function(a,b){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("AniJS-RWWD");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=function(b){var c="data-anijs",d="default",e="|",f="$",g="if",h="on",i=["do","after","before","to"],j="(\\s+|^)",k="(\\s+|$)",l="animationend",m="transitionend",n="target";b={rootDOMTravelScope:{},notifierCollection:{},init:function(){o._t={};var a=o._a();b.registerHelper(d,a),o._u=d,b.rootDOMTravelScope=document,b.Parser=o.Parser,o._v=o._p(),o._w=""},setDOMRootTravelScope:function(a){var c,d=document;try{"document"===a?c=d:(c=d.querySelector(a),c||(c=d))}catch(e){c=d}b.rootDOMTravelScope=c},run:function(){var a=[],d={};b.purgeAll(),b.notifierCollection={},a=o._o(b.rootDOMTravelScope);var e,f=a.length,g=0;for(g;f>g;g++)e=a[g],d=o._n(e.getAttribute(c)),o._c(e,d);var h=b.getNotifier("AniJSNotifier");h&&h.dispatchEvent("onRunFinished")},createAnimation:function(a,b){var c=b||"";o._c(c,a)},getHelper:function(a){var b=o._t;return b[a]||b[d]},registerHelper:function(a,b){o._t[a]=b},purge:function(a){if(a&&""!==a&&" "!==a){var c=document.querySelectorAll(a),d=c.length,e=0;for(e;d>e;e++)b.EventSystem.purgeEventTarget(c[e])}},purgeAll:function(){b.EventSystem.purgeAll()},purgeEventTarget:function(a){b.EventSystem.purgeEventTarget(a)},setClassNamesWhenAnim:function(a){o._w=" "+a},createNotifier:function(){return b.EventSystem.createEventTarget()},registerNotifier:function(a){var c=b.notifierCollection;return a.id&&a.value&&b.EventSystem.isEventTarget(a.value)?(c[a.id]=a.value,1):""},getNotifier:function(a){return b.notifierCollection[a]}};var o={};return o._a=function(){var a={removeAnim:function(a,b){a.target&&a.type&&b.nodeHelper.removeClass(a.target,b.behavior)},holdAnimClass:function(){},fireOnce:function(a,b){b.eventSystem.removeEventListenerHelper(b.eventTarget,b.event.type,b.listener)},emit:function(a,c,d){var e=d[0]||null,f="";if(null!==e){e=e.split("."),e.length>1?(f=e[0],e=e[1]):(f="",e=e[0]);var g=b.getNotifier(f)||null;null!==g&&g.dispatchEvent(e)}c.hasRunned||c.run()}};return a},o._b=function(){return new Parser},o._c=function(a,b){var c,d,e,f,g=b.length,h=0;for(h;g>h;h++)c=b[h],e=c.after,d=c.before,f=c.behavior,e&&(c.after=o.Parser.parseDoDefinition(e)),d&&(c.before=o.Parser.parseDoDefinition(d)),f&&(c.behavior=o.Parser.parseDoDefinition(f)),o._d(a,c)},o._d=function(a,c){var d,e=o._e(c),f=o._f(a,c);if(c.after&&o.Util._x(c.after)&&(d=c.after[0]),""!==e){var g,h=f.length,i=0;for(i;h>i;i++)if(g=f[i],b.EventSystem.isEventTarget(g)){var j=function(e){var f=o._g(a,c,e),g=o._h(c),h=o._j(a,c),i=o._i(a,c);""!==o._w&&(o.Util._x(g)||(g+=o._w));var k={behaviorTargetList:f,nodeHelper:o.NodeHelper,animationEndEvent:o._v,behavior:g,after:i,eventSystem:b.EventSystem,eventTarget:e.currentTarget,afterFunctionName:d,dataAniJSOwner:a,listener:j,event:e,before:h},l=new b.AnimationContext(k);l.runAll(k)};b.EventSystem.addEventListenerHelper(g,e,j,!1),b.EventSystem.registerEventHandle(g,e,j)}}},o._e=function(a){var b="",c=a.event||b;return c===l?c=o._p():c===m&&(c=o._q()),c},o._f=function(c,d){var e,f=c,g=[f],h=b.rootDOMTravelScope;if(d.eventTarget)if(e=o._notifierHelper(d.eventTarget),e.length>0)g=e;else if("document"===d.eventTarget)g=[document];else if("window"===d.eventTarget)g=[a];else if(d.eventTarget.split)try{g=h.querySelectorAll(d.eventTarget)}catch(i){g=[]}return g},o._g=function(a,c,d){var e=a,g=[e],h=b.rootDOMTravelScope,i=c.behaviorTarget;if(i)if(o.Util._x(i)){var j=this._y(a,c,i);j&&o.Util.isFunction(j[0])&&(g=j[0](d,{dataAniJSOwner:a},o._z(j)))}else if(i===n&&d.currentTarget)g=[d.currentTarget];else{i=i.split(f).join(",");try{g=h.querySelectorAll(i)}catch(k){g=[]}}return g},o._h=function(a){return this._y({},a,a.behavior)},o._i=function(a,b){var c=b.after;return o.Util._x(c)?this._y(a,b,c):o._k(a,b,c)},o._j=function(a,b){var c=b.before;return o.Util._x(c)?this._y(a,b,c):o._k(a,b,c)},o._y=function(a,b,c){var d,e=c||"";return o.Util._x(e)&&(d=o._k(a,b,e[0]),d?e[0]=d:e=e.join(" ")),e},o._k=function(a,b,c){var d=c||"",e=o._l(b);if(d&&!o.Util.isFunction(d)){var f=o._t,g=f[e];d=g&&o.Util.isFunction(g[d])?g[d]:!1}return d},o._l=function(a){var b=a.helper||o._u;return b},o._notifierHelper=function(a){{var c=[];b.notifierCollection}if(a)if(a.id&&b.EventSystem.isEventTarget(a.value))c.push(a.value),b.registerNotifier(a);else if(a.split){notifierIDList=a.split("$");var d,e=notifierIDList.length,f=1;for(f;e>f;f++)if(d=notifierIDList[f],d&&" "!==d){d=d.trim();var g=b.getNotifier(d);g||(g=b.EventSystem.createEventTarget(),b.registerNotifier({id:d,value:g})),c.push(g)}}return c},o._z=function(a){for(var b=[],c=a.length;c-->1;)b[c-1]=a[c];return b},o._n=function(a){return o.Parser.parse(a)},o._o=function(a){var b="["+c+"]";return a.querySelectorAll(b)},o._p=function(){var a=o._r(),b=[l,"oAnimationEnd",l,"webkitAnimationEnd"];return b[a]},o._q=function(){var a=o._r(),b=[m,"oTransitionEnd",m,"webkitTransitionEnd"];return b[a]},o._r=function(){for(var a=document.createElement("fe"),b="Animation",c=["animation","O"+b,"Moz"+b,"webkit"+b],d=0;d<c.length;d++)if(void 0!==a.style[c[d]])return d},b.AnimationContext=function(a){var c=this;c.init=function(a){c.behaviorTargetList=a.behaviorTargetList||[],c.nodeHelper=a.nodeHelper,c.animationEndEvent=a.animationEndEvent,c.behavior=a.behavior,c.after=a.after,c.eventSystem=a.eventSystem,c.eventTarget=a.eventTarget,c.afterFunctionName=a.afterFunctionName,c.dataAniJSOwner=a.dataAniJSOwner,c.listener=a.listener,c.event=a.event,c.before=a.before},c.doDefaultAction=function(a,b){var d,e=c,f=e.nodeHelper,g=e.animationEndEvent,h=e.after,i=e.afterFunctionName;e.eventSystem.addEventListenerHelper(a,g,function(a){a.stopPropagation(),e.eventSystem.removeEventListenerHelper(a.target,a.type,arguments.callee),h&&(o.Util.isFunction(h)?h(a,c):o.Util._x(h)&&h[0](a,c,o._z(h)))}),"holdAnimClass"!==i&&"$holdAnimClass"!==i&&(d=a._ajLastBehavior,d&&f.removeClass(a,d),a._ajLastBehavior=b),a.offsetWidth=a.offsetWidth,f.addClass(a,b)},c.doFunctionAction=function(a,b){var d=c,e=d.after,f={target:a};b[0](f,c,o._z(b)),o.Util.isFunction(e)?e(f,c):o.Util._x(e)&&e[0](f,c,o._z(e))},c.runAll=function(){var a,d,e=c,f=e.behaviorTargetList,g=f.length,h=(e.behavior,0),i=e.before,j=c.event;for(h;g>h;h++)d={behaviorTargetList:[f[h]],nodeHelper:c.nodeHelper,animationEndEvent:c.animationEndEvent,behavior:c.behavior,after:c.after,eventSystem:c.eventSystem,eventTarget:c.eventTarget,afterFunctionName:c.afterFunctionName,dataAniJSOwner:c.dataAniJSOwner,listener:c.listener,event:j},a=new b.AnimationContext(d),i?o.Util.isFunction(i)?i(j,a):o.Util._x(i)&&i[0](j,a,o._z(i)):a.run()},c.run=function(){var a=c,b=a.behavior,d=a.behaviorTargetList[0];c.hasRunned=1,o.Util._x(b)?a.doFunctionAction(d,b):a.doDefaultAction(d,b)},c.init(a)},o.Parser={parse:function(a){return this.parseDeclaration(a)},parseDeclaration:function(a){var b,c,d=[];b=a.split(";");var e=b.length,f=0;for(f;e>f;f++)c=this.parseSentence(b[f]),d.push(c);return d},parseSentence:function(a){var b,c,d={};b=a.split(",");var e=b.length,f=0;for(f;e>f;f++)c=this.parseDefinition(b[f]),d[c.key]=c.value;return d},parseDefinition:function(a){var b,c,d,e={},f="event",j="eventTarget",k=["behavior","after","before","behaviorTarget"];if(b=a.split(":"),b.length>1){if(c=b[0].trim(),b.length>2?(d=b.slice(1),d=d.join(":"),d=d.trim()):d=b[1].trim(),e.value=d,c===g)c=f;else if(c===h)c=j;else for(var l=i.length-1;l>=0;l--)c===i[l]&&(c=k[l],"after"!==c&&"before"!==c||"$"===d[0]||(d="$"+d),d=this.parseDoDefinition(d));e.key=c,e.value=d}return e},parseDoDefinition:function(a){var b=/^\$(\w+)\s*/g,c=b.exec(a),d="",f=1;if(null!==c){d=c[1],doDefinitionArray=a.split(c[0])[1],doDefinitionArray=null!==doDefinitionArray?doDefinitionArray.split(e):[],a=[],a[0]=d;for(var g=0;g<doDefinitionArray.length;g++)""!==doDefinitionArray[g]&&(a[f++]=doDefinitionArray[g].trim());return a}return a}},o.NodeHelper={addClass:function(a,b){b instanceof Array||(b=b.split(" "));for(var c=0,d=b.length;d>c;++c)b[c]&&!new RegExp(j+b[c]+k).test(a.className)&&(a.className=""===a.className?b[c]:a.className.trim()+" "+b[c])},removeClass:function(a,b){b instanceof Array||(b=b.split(" "));for(var c=0,d=b.length;d>c;++c)a.className=a.className.replace(new RegExp(j+b[c]+k)," ").trim()},hasClass:function(a,b){return b&&new RegExp(j+b+k).test(a.className)}},o.Util={isFunction:function(a){return!!(a&&a.constructor&&a.call&&a.apply)},_x:function(a){return Array.isArray(a)}},b.EventSystem={eventCollection:{},eventIdCounter:0,isEventTarget:function(a){return a.addEventListener?1:0},createEventTarget:function(){return new b.EventTarget},addEventListenerHelper:function(a,b,c){a.addEventListener(b,c,!1)},removeEventListenerHelper:function(a,b,c){a&&a.removeEventListener(b,c)},purgeAll:function(){var a,b,c=this,d=c.eventCollection,e=Object.keys(d),f=e.length,g=0;for(g;f>g;g++)a=e[g],b=d[a],b&&b.handleCollection&&b.handleCollection.length>0&&c.purgeEventTarget(b.handleCollection[0].element),delete d[a]},purgeAllNodes:function(a){var b=a.querySelectorAll("*");size=b.length;for(var c=size-1;c>=0;c--)this.purgeEventTarget(b[c])},purgeEventTarget:function(a){var b,c=this,d=a._aniJSEventID;if(d){b=c.eventCollection[d].handleCollection;var e,f=b.length,g=0;for(g;f>g;g++)e=b[g],c.removeEventListenerHelper(a,e.eventType,e.listener);c.eventCollection[d]=a._aniJSEventID=null,delete c.eventCollection[d],delete a._aniJSEventID}},registerEventHandle:function(a,b,c){var d=this,e=a._aniJSEventID,f=d.eventCollection,g={eventType:b,listener:c,element:a};if(e)f[e].handleCollection.push(g);else{var h={handleCollection:[g]};f[++d.eventIdCounter]=h,a._aniJSEventID=d.eventIdCounter}}},b.EventTarget=function(){this._listeners={}},b.EventTarget.prototype={constructor:b.EventTarget,addEventListener:function(a,b){var c=this;"undefined"==typeof c._listeners[a]&&(c._listeners[a]=[]),c._listeners[a].push(b)},dispatchEvent:function(a){var b=this;if("string"==typeof a&&(a={type:a}),a.target||(a.target=b),!a.type)throw new Error("error");if(this._listeners[a.type]instanceof Array)for(var c=b._listeners[a.type],d=0,e=c.length;e>d;d++)c[d].call(b,a)},removeEventListener:function(a,b){var c=this;if(c._listeners[a]instanceof Array)for(var d=c._listeners[a],e=0,f=d.length;f>e;e++)if(d[e]===b){d.splice(e,1);break}}},b}(c||{});return c.init(),c.run(),"function"==typeof define&&define.amd&&define("anijs",[],function(){return c}),"undefined"==typeof b&&(a.AniJS=c),c});
!function(){var a=AniJS.getHelper();a.scrollReveal=function(a,c,d){var e=.07;animationContextBehaviorTargetList=c.behaviorTargetList,d.length<2&&"repeat"!==d[0]&&c.after.length<1&&(c.after=[AniJS.getHelper().fireOnce]),isNaN(parseFloat(d[0]))||(e=d[0]);for(var f=0;f<animationContextBehaviorTargetList.length;f++)element=animationContextBehaviorTargetList[f],b.isElementInViewport(element,e)?element.isRevealed||(element.isRevealed=1,c.run()):element.isRevealed=0};var b={viewportFactor:1,docElem:window.document.documentElement,isElementInViewport:function(a,b){var c=window.pageYOffset,d=c+this._getViewportH(),e=a.offsetHeight,f=this._getOffset(a).top,g=f+e,b=b||0;return d>=f+e*b&&g>=c||"fixed"==(a.currentStyle?a.currentStyle:window.getComputedStyle(a,null)).position},_getViewportH:function(){var a=this.docElem.clientHeight,b=window.innerHeight;return b>a?b:a},_getOffset:function(a){var b=0,c=0;do isNaN(a.offsetTop)||(b+=a.offsetTop),isNaN(a.offsetLeft)||(c+=a.offsetLeft);while(a=a.offsetParent);return{top:b,left:c}}};window.scroll(window.scrollX,window.scrollY+1)}(window);

$('san[class="red-dot"]').each(function() {
    this.setAttribute("data-anijs", "if: mouseover, do: pulse animated");
});



