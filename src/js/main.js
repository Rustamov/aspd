svg4everybody(); //for svg spite in ie
objectFitImages();

// gsap.from('.s-main-item__header-title', {
//     scrollTrigger: '.s-main-item__header-title',
//     x: 400,
//     duration: 3,
//     opacity: 0
// })

let $body,
    $window,
    wWidth = 0,
    wHeight = 0,
    W_SM = 576,
    W_MD = 768,
    W_LG = 992,
    W_XL = 1200,
    LOADER_HTML =
        '<div class="overlay-loader"><div class="loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>';

$(document).ready(function () {
    $body = $("body");
    $window = $(window);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector('.js-smooth-scroll'),
        smooth: true
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(".js-smooth-scroll", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".js-smooth-scroll").style.transform ? "transform" : "fixed"
    });


    leftMenu();
    if ($('.main-page').length) {
        mainPage();
    }

    // var scroll = new LocomotiveScroll();
    // gsap.registerPlugin(ScrollTrigger);

    

    $body.on('click', '.js-scroll-to-id', function(e) {
        e.preventDefault();
        let href = $(this).attr('href');

        locoScroll.scrollTo(href);
    })

    function leftMenu () {
        let leftNav = $('.left-nav'),
            leftNavIsOpen = leftNav.hasClass('open'),
            openClass = 'left-nav-open',
            opening = false,
            transitionTime = 500,
            timeout;



        $body.on('click touch', '.js-left-nav-trigger', function (e) {
            e.preventDefault();
            navToggle();
        });


        $body.on('click touch', function (event) {
            let obj = $(event.target);

            if ( !opening && leftNav.hasClass('open') && !obj.closest('.left-nav').length && !obj.closest('.fancybox-container').length ) {
                navToggle()
            };
        });

        $body.on('keydown', function(e) {
            if ( !opening && leftNavIsOpen && (e.keyCode  === 27)) { // escape key maps to keycode '27'
                navToggle()
            };
        });

        function navToggle() {
            if ( opening ) {
                return 
            }

            opening = true;

            leftNavIsOpen = leftNav.hasClass('open');

            leftNav.toggleClass('open', !leftNavIsOpen);

            if (!leftNavIsOpen) {
                $body.toggleClass(openClass, true);
                // window.globalOptions.freeze();
            }
        
            if ( timeout ) {
                clearTimeout(timeout)
            }

            timeout = setTimeout(function() {
                leftNavIsOpen = leftNav.hasClass('open');

                if (!leftNavIsOpen) {
                    $body.toggleClass(openClass, false);
                    // window.globalOptions.unfreeze();
                }
                opening = false;
            }, transitionTime)
            
        };

        $('.left-nav__content').on('scroll',function(e) {
            if ( $('.left-nav__content').scrollTop() > 10 ) {
                $body.addClass('left-nav-scroll');
            } else {
                $body.removeClass('left-nav-scroll');
            }
        });
    };

    function mainPage() {
        
          
        // gsap.utils.toArray(".s-main-item__header").forEach(layer => {
        //     let section = $(layer).closest('.s-main-item');

        //     let tl = gsap.timeline({
        //         scrollTrigger: {
        //           trigger: section,
        //           scroller: '.js-smooth-scroll',
        //           start: "top bottom",
        //           end: "top top",
        //           scrub: 0.3,
        //           toggleActions: "restart pause reverse none"
        //         }
        //       });

        //     let depth = layer.dataset.depth;
        //     let movement = -(layer.offsetHeight + 50)
        //     tl.to(layer, {y: movement, ease: "none"}, 0)
        // });

        gsap.utils.toArray(".s-main-item__body-bg-img").forEach(layer => {
            let section = $(layer).closest('.s-main-item');

            let tl = gsap.timeline({
                scrollTrigger: {
                  trigger: section,
                  scroller: '.js-smooth-scroll',
                  start: "0% 0%",
                //   end: "top botto",
                //   scrub: 0.3,
                //   toggleActions: "restart pause reverse none"
                }
              });

            let movement = (layer.offsetHeight / 3)
            tl.from(layer, {scale: 1.08, duration: 0.8}, 0)
        });

        gsap.utils.toArray(".s-main-item__body-bg-img").forEach(layer => {
            let section = $(layer).closest('.s-main-item');

            let tl = gsap.timeline({
                scrollTrigger: {
                  trigger: section,
                  scroller: '.js-smooth-scroll',
                  start: "0% 0%",
                //   end: "top botto",
                  scrub: 0.3,
                  toggleActions: "restart pause reverse none"
                }
              });

            let movement = (layer.offsetHeight / 3)
            tl.to(layer, {y: movement, ease: "none"}, 0)
        });



    }





    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
});

window.globalOptions = {
    animationDuration: 200,
    sizes: {
        xl: 1920,
        lg: 1200,
        md: 992,
        sm: 768,
        xs: 576
    },
    // freeze: function() {
    //     const h = $('html');

    //     if (h.css('position') !== 'fixed') {
    //         const top = h.scrollTop() ? h.scrollTop() : $body.scrollTop();

    //         if (window.innerWidth > h.width()) {
    //             h.css('overflow-y', 'scroll');
    //         }

    //         h.css({
    //             width: '100%',
    //             position: 'fixed',
    //             top: -top,
    //         });
    //     }
    // },

    // unfreeze: function() {
    //     const h = $('html');

    //     if (h.css('position') === 'fixed') {
    //         h.css('position', 'static');

    //         $('html, body').scrollTop(-parseInt(h.css('top'), 10));

    //         h.css({
    //             position: '',
    //             width: '',
    //             top: '',
    //             'overflow-y': '',
    //         });
    //     }
    // },

    // scrollToId: function(href, delay) {
    //     let scrollOnMenuBtn = false,
    //         scrollOnHeaderHide = false,
    //         scrollSpeed = 800;


    //     // if ( href == '#interior' 
    //     //     || href == '#magazines'
    //     // ) {
    //     //     scrollOnMenuBtn = true;
    //     // }

    //     setTimeout(function() {
    //         scrollTo();
    //     }, delay)

    //     function scrollTo() {

    //         let targetOffset = $(href).offset().top;

    //         // if ( wWidth >= W_MD && scrollOnMenuBtn ) {
    //         //     targetOffset -= $('.side-nav__trigger-icon-line--1').offset().top - $('.header').offset().top;
    //         // } else if (wWidth < W_MD && !scrollOnHeaderHide) {
    //         //     targetOffset -= $('.header').outerHeight();
    //         // }

    //         try {
    //             scrollSpeed = Math.abs($window.scrollTop() - targetOffset) / Math.abs($body[0].scrollHeight) * 4000
    //         } catch(event) {
    //             console.error(event);
    //         }

    //         scrollSpeed = ( scrollSpeed < 1000 ) ? 1000 : scrollSpeed;
     
    //         $('html, body').animate({ scrollTop: targetOffset }, scrollSpeed);

    //         location.replace(href);
            
    //     }
    // }
};
