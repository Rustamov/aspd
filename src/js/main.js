svg4everybody(); //for svg spite in ie
objectFitImages();


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

    wWidth =  $(window).width();
    wHeight =  $(window).height();

    $(window).on('resize', function() {
        wWidth =  $(window).width();
        wHeight =  $(window).height();
    });

    $body.addClass('js-on');

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
    if ($('.service-page').length) {
        servicePage();
    }
    if ($('.directions-page').length) {
        directionsPage();
    }

    headerVisible();
    formScript();
    map();
    commonScript();
    

    $body.on('click', '.js-scroll-to-id', function(e) {
        e.preventDefault();
        let href = $(this).attr('href');

        locoScroll.scrollTo(href);
    });

    document.querySelectorAll(".js-reveal").forEach((t,e)=>{
        t.classList.add("is-reveal-on");
    });


    locoScroll.on("call", function(t, e, i) {
        if ("revMask" == t) {
            const t = i.el.querySelectorAll(".text-cover");
            const delay = i.el.dataset.delay ? +i.el.dataset.delay : 0;
            const duration = i.el.dataset.duration ? +i.el.dataset.duration : 0.8;

            if ($(i.el).closest('.s-main-item__block').length) {
                $(i.el).closest('.s-main-item__block').addClass('is-shadow')
            }
            if ($(i.el).closest('.s-directions-banner__block').length) {
                $(i.el).closest('.s-directions-banner__block').addClass('is-shadow')
            }
            if ($(i.el).closest('.s-services-banner__block').length) {
                $(i.el).closest('.s-services-banner__block').addClass('is-shadow')
            }
            if ($(i.el).closest('.s-about-banner__block').length) {
                $(i.el).closest('.s-about-banner__block').addClass('is-shadow')
            }

            if (t && i.el.classList.contains("is-inview")) {
                gsap.to(t, duration, {
                    webkitMaskSize: "cover",
                    // webkitMaskImage: "linear-gradient(170deg, rgb(0, 0, 0) ".concat(20, "%, rgba(255, 255, 255, 0) ").concat(100, "%)"),
                    webkitMaskImage: "linear-gradient(170deg, rgb(0, 0, 0) ".concat(20, "%, rgba(255, 255, 255, 0) ").concat(100, "%)"),
                    ease: Power2.easeIn,
                    delay: delay,
                    onComplete: function() {
                        gsap.to(t, 2, {
                            webkitMaskImage: "linear-gradient(170deg, rgb(0, 0, 0) ".concat(100, "%, rgba(255, 255, 255, 0) ").concat(100, "%)"),
                            ease: Power2.easeOut
                        });

                        
                    }
                }, .1)
            }


        }
        if ("fadeInUp" == t) {
            const t = i.el;
            const delay = i.el.dataset.delay ? +i.el.dataset.delay : 0;
            const duration = i.el.dataset.duration ? +i.el.dataset.duration : 0.5;
            if (t && i.el.classList.contains("is-inview")) {
                gsap.to(t, duration, {
                    y: 0,
                    opacity: 1,
                    ease: Power2.easeOut,
                    delay: delay,
                }, .1)
            }
        }

    });

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
    }

    function mainPage() {
        gsap.set('.s-main-top__block-title-inner', {
            opacity: 0,
            y: (wHeight / 2)
        });
        gsap.set('.s-main-top__block-more', {
            opacity: 0,
            y: (wHeight / 2)
        });


        let topBgVideo = document.querySelector('.s-main-top__bg-video'),
            videoAterTimer;

        topBgVideo.addEventListener('play', function(e) {
            videoAterTimer = setTimeout(() => {
                doTopSectionAnimations();
            }, 1000);
        });


        setTimeout(() => {
            if (!document.querySelector('.s-main-top').classList.contains('is-show-content')) {
               if (videoAterTimer) clearTimeout(videoAterTimer);
               doTopSectionAnimations();
            }
        }, 2000);

        let topBgVideoTl = gsap.timeline({
            scrollTrigger: {
              trigger: '.s-main-top',
              scroller: '.js-smooth-scroll',

              toggleActions: "play resume none none",
              onLeave: (e) => {
                  topBgVideo.pause();
              },
              onEnterBack: (e) => {
                  topBgVideo.play();

              }
            }
        });

        topBgVideoTl.from(topBgVideo, {
        });

        function doTopSectionAnimations() {
            document.querySelector('.s-main-top').classList.add('is-show-content');

            gsap.to('.s-main-top__block-title-inner', {
                opacity: 1,
                y: 0,
                delay: 0,
                duration: 1,
            });
            gsap.to('.s-main-top__block-more', {
                opacity: 1,
                y: 0,
                delay: 0.2
            });
        }



        gsap.utils.toArray(".s-main-item__body-bg-img").forEach(layer => {
            let section = $(layer).closest('.s-main-item');

            let tl = gsap.timeline({
                scrollTrigger: {
                  trigger: section,
                  scroller: '.js-smooth-scroll',
                  start: "30% 80%",               
                }
              });

            tl.from(layer, {scale: 1.2, duration: 1.5, ease: "power1.out"}, 0)
        });

        gsap.utils.toArray(".s-main-item__body-bg-img").forEach(layer => {
            let section = $(layer).closest('.s-main-item'),
                movement = (layer.offsetHeight / 1.2);

            gsap.set(layer, {
                y: -(movement / 2)
            })

            let tl = gsap.timeline({
                scrollTrigger: {
                  trigger: section,
                  scroller: '.js-smooth-scroll',
                  scrub: 0.1,
                  toggleActions: "restart pause reverse none"
                }
              });

            tl.to(layer, {y: (movement / 2), ease: "none"}, 0)
        });


        for (el of document.querySelectorAll('.s-main-item__block-more')) {
            mouseMagnetMoreArrow(el);
        }
        function mouseMagnetMoreArrow(el) {
            let wrap = el,
                icon = el.querySelector('.s-main-item__block-more-icon'),
                arrow = el.querySelector('.svg-icon');

            wrap.addEventListener('mouseenter', function(e){
                gsap.to(icon, 0.3, {
                    scale: 1.5,
                    borderColor: 'rgba(255, 255, 255, 0.3)'
                });
                gsap.to(arrow, 0.3, {
                    scale: 0.9
                });
            });

            wrap.addEventListener('mouseleave', function(e){
                gsap.to(icon, 0.3, {
                    scale: 1,
                    x: 0,
                    y: 0,
                    delay: 0.1,
                    borderColor: 'rgba(255, 255, 255, 0)'
                });
                gsap.to(arrow, 0.3, {
                    scale: 1,
                    x: 0,
                    y: 0,
                    delay: 0.1
                });
            });
              
              
            wrap.addEventListener('mousemove', function(e) {
                callParallax(e, icon, 15);
            });
            wrap.addEventListener('mousemove', function(e) {
                callParallax(e, arrow, 7);
            });
            
            function callParallax(e, target, movement) {
                parallaxIt(e, target, movement);
            }
            
            function parallaxIt(e, target, movement) {
                var $this = $(wrap);
                var relX = e.pageX - $this.offset().left;
                var relY = e.pageY - $this.offset().top;
            
                gsap.to(target, 0.3, {
                    x: (relX - $this.width() / 2) / $this.width() * movement,
                    y: (relY - $this.height() / 2) / $this.height() * movement,
                    ease: Power2.easeOut
                });
            }
        }


        gsap.utils.toArray(".s-main-top, .s-main-item").forEach(layer => {
            // let section = $(layer).closest('.m-section');
            let section = $(layer);


            let tl = gsap.timeline({
                scrollTrigger: {
                  trigger: section,
                  start: "20% 50%",

                  scroller: '.js-smooth-scroll',
                  onEnter: onScroll,
                  onEnterBack: onScroll
                }
              });

            tl.to(section, {});

            function onScroll() {
                let id = section.attr('id');
                $(`.m-sections-nav__item`).removeClass('is-active');
                $(`.m-sections-nav__item[data-id=${id}]`).addClass('is-active');
            }
        });

        $body.on('click', '.m-sections-nav__item', function(e) {
            e.preventDefault();
            let href = '#' + $(this).attr('data-id');
            
            locoScroll.scrollTo(href);
        });
    

    }

    function headerVisible() {
        let curScroll,
            prevScroll = 0,
            direction = 0,
            prevDirection = 0,
            toggleHeader = function(t, e) {
                let header = document.querySelector(".header");
                
                if (2 === t && e > 100 ) {
                    gsap.to(header, {
                        opacity: 0,
                        pointerEvents: 'none',
                        duration: 0.8
                    });
                    prevDirection = t;
                } else if (1 === t){
                    gsap.to(header, {
                        opacity: 1,
                        pointerEvents: 'visible',
                        duration: 0.8
                    });
                    prevDirection = t;
                }
            };

        locoScroll.on("scroll", function(t, e) {
            hideShowHeader(t)
        });

        function hideShowHeader(t) {
            (curScroll = t.scroll.y) > prevScroll ? direction = 2 : curScroll < prevScroll && (direction = 1),
            direction !== prevDirection && toggleHeader(direction, curScroll),
            prevScroll = curScroll
        }
    }

    function servicePage() {

    }

    function directionsPage() {
        
        
    }

    function commonScript() {
        for (el of document.querySelectorAll('.js-text-fadeup-lines')) {
            animateFadeUpTextLinesOnSrcoll(el);
        }        
        function animateFadeUpTextLinesOnSrcoll(el) {
            const delay = el.dataset.delay ? +el.dataset.delay : 0;
            const duration = el.dataset.duration ? +el.dataset.duration : 0.5;

            const text = new SplitType(el, {
                types: 'lines',
                absolute: false
            });

            let tl = gsap.timeline({
                scrollTrigger: {
                  trigger: el,
                  scroller: '.js-smooth-scroll',
                  start: "85% 85%",
                  toggleActions: "play resume none none",
                 
                }
            });

            tl.from(text.lines, {
                rotateX: 90,
                transformOrigin: "left center",
                delay: delay,
                duration: duration,
                stagger: {
                    amount: 0.1
                },
            });
    
        }


        for (el of document.querySelectorAll('.js-fadeup')) {
            animateFadeUpOnSrcoll(el);
        }        
        function animateFadeUpOnSrcoll(el) {
            const delay = el.dataset.delay ? +el.dataset.delay : 0;
            const duration = el.dataset.duration ? +el.dataset.duration : 0.5;


            let tl = gsap.timeline({
                scrollTrigger: {
                  trigger: el,
                  scroller: '.js-smooth-scroll',
                  start: "85% 85%",
                  toggleActions: "restart resume none none"
                }
            });

            tl.from(el, {
                y: 20,
                opacity: 0,
                delay: delay,
                duration: duration,
            });
        }

        gsap.utils.toArray(".js-parallax-img").forEach(layer => {
            let section = $(layer).closest($(layer).data('trigger')),
                movement = (layer.offsetHeight / 1.2);

            gsap.set(layer, {
                y: -(movement / 2)
            })

            let tl = gsap.timeline({
                scrollTrigger: {
                  trigger: section,
                  scroller: '.js-smooth-scroll',
                //   start: "0% 0%",
                //   end: "top botto",
                  scrub: 0.1,
                  toggleActions: "restart pause reverse none"
                }
              });

            tl.to(layer, {y: (movement / 2), ease: "none"}, 0)
        });

        gsap.utils.toArray(".js-scroll-fade-up").forEach(layer => {
            let section = $(layer),
                delay = layer.dataset.delay ? +layer.dataset.delay : 0;
                duration = layer.dataset.duration ? +layer.dataset.duration : 0.5,
                offset = layer.dataset.offset ? layer.dataset.offset : '30% 100%';

            gsap.set(layer, {
                y: 50,
                opacity: 0,
            })

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    scroller: '.js-smooth-scroll',
                    start: offset,
                //   end: "top botto",
                //   scrub: 0.1,
                //   toggleActions: "restart pause reverse none"
                }
                });

            tl.to(layer, {
                y: 0,
                opacity: 1,
                duration: duration,
                delay: delay,
            }, 0)
        });

        gsap.to('.service-item', {
            scrollTrigger: {
                trigger: '.service-item',
                scroller: '.js-smooth-scroll',
                start: "30% 80%",
                
            },
            y: 0,
            opacity: 1,
            duration: 0.5,
            // delay: 2,
            ease: "power1.out",
            stagger: 0.05 
            
        }, 0);

        // gsap.to('.directions-item', {
        //     scrollTrigger: {
        //         // trigger: '.s-directions',
        //         trigger: '.directions-item',
        //         scroller: '.js-smooth-scroll',
        //         start: "30% 80%",
                
        //     },
        //     y: 0,
        //     opacity: 1,
        //     duration: 0.5,
        //     // delay: 2,
        //     ease: "power1.out",
        //     stagger: 0.05 
            
        // }, 0);

        gsap.utils.toArray(".directions-item").forEach((layer, index) => {
            let section = $(layer),
                delay = layer.dataset.delay ? +layer.dataset.delay : 0;
                duration = layer.dataset.duration ? +layer.dataset.duration : 0.5,
                offset = layer.dataset.offset ? layer.dataset.offset : '30% 95%';

            gsap.set(layer, {
                y: 50,
                opacity: 0,
            });

            delay = (index % 4 ) / 10;
            console.log(delay);

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    scroller: '.js-smooth-scroll',
                    start: offset,
                    
                //   end: "top botto",
                //   scrub: 0.1,
                //   toggleActions: "restart pause reverse none"
                }
                });

            tl.to(layer, {
                y: 0,
                opacity: 1,
                duration: duration,
                delay: delay,
            }, 0)
        });


        // 

        //Gallery
        gsap.from('.s-gallery__header-sign-img', {
            xPercent: 15,
            opacity: 0,
            duration: 1,
            delay: 0.3
        }, 0)

        $(".project-item").each(function(index, element){
            let item = $(this);
            let itemInner = item.find('.project-item__inner');
            let parentOffset = item.offset();
            
            let timeoutRun = false;
            let timeout;

            item.on('mousemove', function(event) {
                let e = event;

                if (timeoutRun) return
                
                update(e);
                timeoutRun = true;  
                    
                timeout = setTimeout(function() {
                    timeoutRun = false
                }, 40)    
            });

            item.on('mouseleave', function(event) {
                if (timeout) clearTimeout(timeout);
                timeoutRun = false; 

                gsap.to(itemInner, {
                    duration: 0.3, 
                    delay: 0.2, 
                    rotationX: 0,
                    rotationY: 0,
                    rotationZ: 0,
                    scale: 1,
                });

            });

            $window.on('resize', function() {
                parentOffset = item.offset();
            });

            function update(event) {
                let itemX = event.pageX - $(event.currentTarget).offset().left;
                let itemY = event.pageY - $(event.currentTarget).offset().top;

                let widthHalf = item.width() / 2;
                let heightHalf = item.height() / 2;
                let axisFromCenterX = widthHalf - itemX;
                let axisFromCenterY = heightHalf - itemY;

                let maxRotateX = 15;
                let rotateX = axisFromCenterX / (widthHalf / maxRotateX);

                let maxRotateY = 15;
                let rotateY = -(axisFromCenterY / (heightHalf / maxRotateY));

                gsap.to(itemInner, {duration: 0.5, 
                    rotationX: rotateY,
                    rotationY: rotateX,
                    rotationZ: 0,
                    scale: 1.05,
                    ease:Back.easeOut
                });

            }
        });

        setTimeout(function() {
            gsap.utils.toArray(".project-item").forEach(layer => {
                let section = $(layer);
    
                gsap.set(layer, {
                    y: 50,
                    opacity: 0,
                })
    
                let tl = gsap.timeline({
                    scrollTrigger: {
                      trigger: section,
                      scroller: '.js-smooth-scroll',
                      start: "30% 95%",
                    //   end: "top botto",
                    //   scrub: 0.1,
                    //   toggleActions: "restart pause reverse none"
                    }
                  });
    
                tl.to(layer, {
                    y: 0,
                    opacity: 1,
                    duration: 0.5
                }, 0)
            });
        }, 500)



        $body.on('click touch', '.slick-slide [data-fancybox]', function(e) {
            e.preventDefault();
            window.globalOptions.galleryOpen($(this));           

        });


        $('.js-certificates-slider').each(function() {
            let wrap = $(this)
                slider = wrap.find('.js-certificates-slider-items'),
                prevBtn = wrap.find('.js-slider-prev'),
                nextBtn = wrap.find('.js-slider-next')
                ;

            slider.slick({
                // centerMode: true,
                // variableWidth: true,
                infinite: true,
                adaptiveHeight: false,
                arrows: true,
                prevArrow: prevBtn,
                nextArrow: nextBtn,
                slidesToShow: 3,
                slidesToScroll: 3,
                responsive: [
                    {
                        breakpoint: window.globalOptions.sizes.lg,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                        }
                    },
                    {
                        breakpoint: window.globalOptions.sizes.md,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                        }
                    },
                    {
                        breakpoint: window.globalOptions.sizes.sm,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                        }
                    }
                    // ,
                    // {
                    //     breakpoint: window.globalOptions.sizes.xs,
                    //     settings: {
                    //         slidesToShow: 1,
                    //         slidesToScroll: 1,
                    //     }
                    // }
                ]
            }); 
        });


        $(".s-contacts-top").each(function(index, element){
            let item = $(this);
            let itemInner = item.find('.s-contacts-top__bg-video');
            let parentOffset = item.offset();
            
            let timeoutRun = false;
            let timeout;

            item.on('mousemove', function(event) {
                let e = event;

                if (timeoutRun) return
                
                update(e);
                timeoutRun = true;  
                    
                timeout = setTimeout(function() {
                    timeoutRun = false
                }, 40)    
            });

            item.on('mouseleave', function(event) {
                if (timeout) clearTimeout(timeout);
                timeoutRun = false; 

                gsap.to(itemInner, {
                    duration: 0.3, 
                    delay: 0.2, 
                    X: 0,
                });

            });

            $window.on('resize', function() {
                parentOffset = item.offset();
            });

            function update(event) {
                let itemX = event.pageX - $(event.currentTarget).offset().left;
                let itemY = event.pageY - $(event.currentTarget).offset().top;

                let widthHalf = item.width() / 2;
                let axisFromCenterX = widthHalf - itemX;

                let maxMoveX = 30;
                let moveX = axisFromCenterX / (widthHalf / maxMoveX);

                gsap.to(itemInner, {duration: 1, 
                    x: moveX,
                    ease:Back.easeOut
                });

            }
        });
    }

    function formScript () {

        $('[type=tel]').mask('+7 (000) 000-00-00');

        Parsley
            .addValidator('ruPhone', {
                // string | number | integer | date | regexp | boolean
                requirementType: 'string',

                // validateString | validateDate | validateMultiple
                validateString: function (value, requirement) {
                    let regexp = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
                    
                    return  regexp.test(value) 
                },

                messages: {
                    ru: 'Неверный формат номера',
                    en: 'Invalid number format'
                }
            })
            .addValidator('personName', {
                // string | number | integer | date | regexp | boolean
                requirementType: 'string',

                // validateString | validateDate | validateMultiple
                validateString: function (value, requirement) {
                    let regexp = /^[а-яА-ЯёЁa-zA-Z\ ]+$/;

                    return  regexp.test(value) 
                },

                messages: {
                  ru: 'Используйте только буквы',
                  en: 'Use only letters'
                }
            })
            .addMessages('ru', {
                defaultMessage: "Некорректное значение.",
                type: {
                    email:        "Введите правильный е-mail",
                    url:          "Введите URL адрес",
                    number:       "Введите число",
                    integer:      "Введите целое число",
                    digits:       "Введите только цифры",
                    alphanum:     "Введите буквенно-цифровое значение"
                },
                notblank:       "Это поле должно быть заполнено",
                required:       "Поле обязательно для заполнения",
                pattern:        "Это значение некорректно",
                min:            "Это значение должно быть не менее чем %s",
                max:            "Это значение должно быть не более чем %s",
                range:          "Это значение должно быть от %s до %s",
                minlength:      "Это значение должно содержать не менее %s символов",
                maxlength:      "Это значение должно содержать не более %s символов",
                length:         "Это значение должно содержать от %s до %s символов",
                mincheck:       "Выберите не менее %s значений",
                maxcheck:       "Выберите не более %s значений",
                check:          "Выберите от %s до %s значений",
                equalto:        "Это значение должно совпадать"
            })
            .setLocale('ru');

        $('.js-validate').parsley({

        });


        $body.on('click touch', '.js-form-resset', function(e) {
            let form = $(this).closest('form');

            form.removeClass('is-form-sent');
            window.globalOptions.formResset(form);
        });

    }

    function map() {
        if ( $('.js-map-yandex').length === 0) {
            return
        } else {
            $('.js-map-yandex').each(function() {
                initMap($(this));
            });
        };


        function initMap(el) {
            var mapWrap = el,
            mapPoints = mapWrap.find('.js-map-yandex-points'),
            mapArea = mapWrap.find('.js-map-yandex-area'),
            map;
      
      
            if (map == undefined && window.ymaps != undefined) {
                mapArea.html('');
                ymaps.ready(function() {
                    map = new ymaps.Map(mapArea[0], {
                        center: [+mapPoints.data('c-lat'), +mapPoints.data('c-long')],
                        zoom: +mapPoints.data('zoom'),
                        controls: ['zoomControl', 'fullscreenControl', 'geolocationControl']
                    });
            
            
                    map.behaviors.disable('scrollZoom');
                    if ( wWidth < window.globalOptions.sizes.lg ) {
                        map.behaviors.disable('drag');
                    };
            
            
                    mapPoints.find('li').each(function () {
                        if ( $(this).data('lat') ) {
                            var $this = $(this),
                                lat = +$this.data('lat'),
                                lng = +$this.data('long'),
                                title = $this.data('title')
                                // pin = 'img/map-pin.png'
                                ;
                
                            var placemark = new ymaps.Placemark(
                                [lat, lng], {
                                }, {
                                    iconLayout: 'default#image',
                                    // iconImageHref: pin,
                                    // iconImageSize: [49, 61],
                                    // iconImageOffset: [-25, -61],
                                    hideIconOnBalloonOpen: false,
                                    // balloonOffset: [3, -100]
                                });
                
                            map.geoObjects.add(placemark);
                        }
                    });
                });
            };
        }
      

    };

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
    formResset: function(form) {
        if ( !form.length ) {
            return
        }
    
        $('.input-text input, .input-text textarea', form).each(function() {
            let input = $(this),
                wrap = input.closest('.input-text');
    
            input.val('').trigger('input');
    
            wrap.toggleClass('input-text--dirty', input.val() != '');
        });
    
        form.parsley().reset();
    
    },

    galleryOpen: function(item) {
        let clickItem = item,
            selector = '[data-fancybox=' + clickItem.data('fancybox') + ']';
    
        let imagesArr = [];

        $(selector).filter(function(index, item) {
            let currentItem = $(item);

            if (currentItem.is(clickItem)) {
                imagesArr.unshift(currentItem.attr('href'))
            } else if (!currentItem.closest('.slick-slide').hasClass('slick-cloned')) {
                imagesArr.push(currentItem.attr('href'))
            }

        });

        let fancyboxArr = [];
        
        imagesArr.forEach(function(item) {
            let obj = {};

            obj.src = item;

            fancyboxArr.push(obj);
        });

        $.fancybox.open(
            fancyboxArr,
            {
                type : 'image'
            }
        );
    }

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



/**
 * SplitType
 * https://github.com/lukePeavey/SplitType
 * @version 0.2.4
 * @author Luke Peavey <lwpeavey@gmail.com>
 */

 !function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).SplitType=e()}(this,(function(){"use strict";function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function e(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}function n(t,e){return Object.getOwnPropertyNames(Object(t)).reduce((function(n,i){var o=Object.getOwnPropertyDescriptor(Object(t),i),r=Object.getOwnPropertyDescriptor(Object(e),i);return Object.defineProperty(n,i,r||o)}),{})}function i(t){var e=n(t);return(e.types||e.split)&&(e.types=e.types||e.split),(e.absolute||e.position)&&(e.absolute=e.absolute||/absolute/.test(t.position)),e}function o(t){return null!==t&&"object"==typeof t}function r(t){return Array.isArray(t)?t:null==t?[]:function(t){return o(t)&&function(t){return"number"==typeof t&&t>-1&&t%1==0}(t.length)}(t)?Array.prototype.slice.call(t):[t]}function s(t){return o(t)&&/^(1|3|11)$/.test(t.nodeType)}function c(t){return"string"==typeof t}function l(t){var e,n=t;return c(t)&&(n=/^(#[a-z]\w+)$/.test(t.trim())?document.getElementById(t.trim().slice(1)):document.querySelectorAll(t)),(e=n,r(e).reduce((function(t,e){return t.concat(r(e))}),[])).filter(s)}function a(t,e,n){var i={},r=null;return o(t)&&(r=t[a.expando]||(t[a.expando]=++a.uid),i=a.cache[r]||(a.cache[r]={})),void 0===n?void 0===e?i:i[e]:void 0!==e?(i[e]=n,n):void 0}function u(t){var e=t&&t[a.expando];e&&(delete t[e],delete a.cache[e])}function f(t,e){for(var n=r(t),i=n.length,o=0;o<i;o++)e(n[o],o,n)}a.expando="splitType".concat(1*new Date),a.cache={},a.uid=0;var d="\\ud800-\\udfff",h="\\u0300-\\u036f\\ufe20-\\ufe23",p="\\u20d0-\\u20f0",y="\\ufe0e\\ufe0f",g="[".concat(d,"]"),m="[".concat(h).concat(p,"]"),v="\\ud83c[\\udffb-\\udfff]",w="(?:".concat(m,"|").concat(v,")"),b="[^".concat(d,"]"),C="(?:\\ud83c[\\udde6-\\uddff]){2}",x="[\\ud800-\\udbff][\\udc00-\\udfff]",T="\\u200d",E="".concat(w,"?"),j="[".concat(y,"]?"),O=j+E+("(?:\\u200d(?:"+[b,C,x].join("|")+")"+j+E+")*"),S="(?:".concat(["".concat(b).concat(m,"?"),m,C,x,g].join("|"),"\n)"),H=RegExp("".concat(v,"(?=").concat(v,")|").concat(S).concat(O),"g"),k=RegExp("[".concat([T,d,h,p,y].join(""),"]"));function A(t){return k.test(t)}function L(t){return A(t)?function(t){return t.match(H)||[]}(t):function(t){return t.split("")}(t)}function M(t){return null==t?"":String(t)}function D(t,e){var n=document.createElement(t);return e?(Object.keys(e).forEach((function(t){var i=e[t];null!==i&&("textContent"===t||"innerHTML"===t?n[t]=i:"children"===t?f(i,(function(t){s(t)&&n.appendChild(t)})):n.setAttribute(t,String(i).trim()))})),n):n}var N={splitClass:"",lineClass:"line",wordClass:"word",charClass:"char",types:"lines, words, chars",absolute:!1,tagName:"div"},P=function(){return document.createDocumentFragment()},W=function(t){return document.createTextNode(t)};function B(t,e){var i,o,r=function(t){var e=c(t)||Array.isArray(t)?String(t):"";return{lines:/line/i.test(e),words:/word/i.test(e),chars:/(char)|(character)/i.test(e)}}((e=n(N,e)).types),s=e.tagName,l="B".concat(1*new Date,"R"),u="absolute"===e.position||e.absolute,d=[],h=[];if(o=r.lines?D("div"):P(),i=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:" ";return(t=t?String(t):"").split(e)}(function(t,e){var n=t.textContent;if(e){var i=t.innerHTML,o=document.createElement("div");o.innerHTML=i.replace(/<br\s*\/?>/g," ".concat(e," ")),n=o.textContent}return n.replace(/\s+/g," ").trim()}(t,l)).reduce((function(t,n,i,a){var u,d;return n===l?(o.appendChild(D("br")),t):(r.chars&&(d=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return(t=M(t))&&c(t)&&!e&&A(t)?L(t):t.split(e)}(n).map((function(t){return D(s,{class:"".concat(e.splitClass," ").concat(e.charClass),style:"display: inline-block;",textContent:t})})),h=h.concat(d)),r.words||r.lines?(u=D(s,{class:"".concat(e.wordClass," ").concat(e.splitClass),style:"display: inline-block; position: ".concat(r.words?"relative":"static"),children:r.chars?d:null,textContent:r.chars?null:n}),o.appendChild(u)):f(d,(function(t){o.appendChild(t)})),i!==a.length-1&&o.appendChild(W(" ")),r.words?t.concat(u):t)}),[]),t.innerHTML="",t.appendChild(o),!u&&!r.lines)return{chars:h,words:i,lines:[]};var p,y,g,m,v,w=[],b=[],C=a(t,"nodes",t.getElementsByTagName(s)),x=t.parentElement,T=t.nextElementSibling,E=window.getComputedStyle(t).textAlign;return u&&(m={left:o.offsetLeft,top:o.offsetTop,width:o.offsetWidth},g=t.offsetWidth,y=t.offsetHeight,a(t).cssWidth=t.style.width,a(t).cssHeight=t.style.height),f(C,(function(t){if(t!==o){var e,n=t.parentElement===o;r.lines&&n&&((e=a(t,"top",t.offsetTop))!==v&&(v=e,w.push(b=[])),b.push(t)),u&&(a(t).top=e||t.offsetTop,a(t).left=t.offsetLeft,a(t).width=t.offsetWidth,a(t).height=p||(p=t.offsetHeight))}})),x&&x.removeChild(t),r.lines&&(o=P(),d=w.map((function(t){var n=D(s,{class:"".concat(e.splitClass," ").concat(e.lineClass),style:"display: block; text-align: ".concat(E,"; width: 100%;")});return o.appendChild(n),u&&(a(n).type="line",a(n).top=a(t[0]).top,a(n).height=p),f(t,(function(t,e,i){r.words?n.appendChild(t):r.chars?f(t.children,(function(t){n.appendChild(t)})):n.appendChild(W(t.textContent)),e!==i.length-1&&n.appendChild(W(" "))})),n})),t.replaceChild(o,t.firstChild)),u&&(t.style.width="".concat(t.style.width||g,"px"),t.style.height="".concat(y,"px"),f(C,(function(t){var e="line"===a(t).type,n=!e&&"line"===a(t.parentElement).type;t.style.top="".concat(n?0:a(t).top,"px"),t.style.left="".concat(e?m.left:a(t).left-(n?m.left:0),"px"),t.style.height="".concat(a(t).height,"px"),t.style.width="".concat(e?m.width:a(t).width,"px"),t.style.position="absolute"}))),x&&(T?x.insertBefore(t,T):x.appendChild(t)),{lines:d,words:r.words?i:[],chars:h}}var R=n(N,{});return function(){function t(e,o){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.isSplit=!1,this.settings=n(R,i(o)),this.elements=l(e)||[],this.elements.length&&(this.originals=this.elements.map((function(t){return a(t,"html",a(t).html||t.innerHTML)})),this.settings.types&&this.split())}return e(t,null,[{key:"defaults",get:function(){return R},set:function(t){R=n(R,i(t))}}]),e(t,[{key:"split",value:function(t){var e=this;this.revert(),this.lines=[],this.words=[],this.chars=[];var o=[window.pageXOffset,window.pageYOffset];void 0!==t&&(this.settings=n(this.settings,i(t))),this.elements.forEach((function(t){var n=B(t,e.settings),i=n.lines,o=n.words,r=n.chars;e.lines=e.lines.concat(i),e.words=e.words.concat(o),e.chars=e.chars.concat(r),a(t).isSplit=!0})),this.isSplit=!0,window.scrollTo(o[0],o[1]),this.elements.forEach((function(t){r(a(t).nodes||[]).forEach(u)}))}},{key:"revert",value:function(){var t=this;this.isSplit&&(this.lines=null,this.words=null,this.chars=null),this.elements.forEach((function(e){a(e).isSplit&&a(e).html&&(e.innerHTML=a(e).html,e.style.height=a(e).cssHeight||"",e.style.width=a(e).cssWidth||"",t.isSplit=!1)}))}}]),t}()}));


function isMobile() {
    return !!(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i))
}