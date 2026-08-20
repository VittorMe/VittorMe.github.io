;(function () {
	
	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	
	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 100, 'easeInOutExpo' );
					});
					
				}, 50);
				
			}

		} , { offset: '85%' } );
	};



	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};

	var pieChart = function() {
		$('.chart').easyPieChart({
			scaleColor: false,
			lineWidth: 4,
			lineCap: 'butt',
			barColor: '#FF9000',
			trackColor:	"#f5f5f5",
			size: 160,
			animate: 1000
		});
	};

	var skillsWayPoint = function() {
		if ($('#fh5co-skills').length > 0 ) {
			$('#fh5co-skills').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( pieChart , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}

	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	
	var navigation = function() {
		var $nav = $('#site-nav');
		var $toggle = $('.js-nav-toggle');

		$(window).on('scroll', function() {
			if ($(window).scrollTop() > 40) {
				$nav.addClass('scrolled');
			} else if (!$nav.hasClass('nav-open')) {
				$nav.removeClass('scrolled');
			}
		});

		$toggle.on('click', function() {
			var isOpen = $nav.toggleClass('nav-open').hasClass('nav-open');
			$toggle.attr('aria-expanded', isOpen);
			if (isOpen) {
				$nav.addClass('scrolled');
			} else if ($(window).scrollTop() <= 40) {
				$nav.removeClass('scrolled');
			}
		});

		$('.site-nav a[href^="#"]').on('click', function(event) {
			var href = $(this).attr('href');
			var target = $(href);
			if (target.length) {
				event.preventDefault();
				var offset = href === '#page' ? 0 : target.offset().top - 70;
				$('html, body').animate({
					scrollTop: offset
				}, 600, 'easeInOutExpo');
				$nav.removeClass('nav-open');
				$toggle.attr('aria-expanded', false);
				if (href === '#page') {
					$nav.removeClass('scrolled');
				} else {
					$nav.addClass('scrolled');
				}
			}
		});
	};

	$(function(){
		contentWayPoint();
		goToTop();
		loaderPage();
		fullHeight();
		parallax();
		skillsWayPoint();
		navigation();
	});


}());

function abrirClienteEmail(event) {
    event.preventDefault();

    var nome = document.getElementById('name').value.trim();
    var emailRemetente = document.getElementById('email').value.trim();
    var assunto = document.getElementById('subject').value.trim();
    var mensagem = document.getElementById('message').value.trim();

    if (!nome || !emailRemetente || !assunto || !mensagem) {
        alert('Preencha todos os campos para enviar a mensagem.');
        return;
    }

    var corpo = 'Olá, Vittor\n\n' + mensagem + '\n\nAtenciosamente,\n' + nome + '\n' + emailRemetente;
    var link = 'mailto:vittordemelo@gmail.com?subject=' + encodeURIComponent(assunto) + '&body=' + encodeURIComponent(corpo);

    window.location.href = link;
}
