jQuery(function ($) {


    $.fn.isOnScreen = function () {

        var win = $(window);

        var viewport = {
            top: win.scrollTop(),
            left: win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();

        var bounds = this.offset();
        bounds.right = bounds.left + this.outerWidth();
        bounds.bottom = bounds.top + this.outerHeight();

        return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

    };

    function is_touch_device() {
        return 'ontouchstart' in window;
    };

    var ieUse = false;

    if (/*@cc_on !@*/false && (
    document.documentMode === 9 || document.documentMode === 10)
    ) {
        ieUse = true;
    }

    function mobileCheck() {
        $(".body-half").each(function () {
            var currentHalf = $(this);
            currentHalf.removeClass("fixed bottom");
            var thisHeight = currentHalf.outerHeight();
            var thisOffset = currentHalf.offset().top;
            if (thisHeight > $(window).height()) {
                if (thisOffset < $(window).scrollTop()) {
                    if ((thisHeight - $(window).height() + thisOffset) < $(window).scrollTop()) {
                        currentHalf.removeClass("fixed");
                        currentHalf.addClass("bottom");
                    } else {
                        currentHalf.removeClass("bottom");
                        currentHalf.addClass("fixed");
                    }
                    ;
                } else {
                    currentHalf.removeClass("fixed");
                }
                ;
            }
            ;
            $(window).scroll(function () {
                currentHalf.removeClass("fixed bottom");
                var thisHeight = currentHalf.outerHeight();
                var thisOffset = currentHalf.offset().top;
                if (thisHeight > $(window).height()) {
                    if (thisOffset < $(window).scrollTop()) {
                        if ((thisHeight - $(window).height() + thisOffset) < $(window).scrollTop()) {
                            currentHalf.removeClass("fixed");
                            currentHalf.addClass("bottom");
                        } else {
                            currentHalf.removeClass("bottom");
                            currentHalf.addClass("fixed");
                        }
                        ;
                    } else {
                        currentHalf.removeClass("fixed");
                    }
                    ;
                }
                ;
            });
        });
    };

    function jobCheck() {
        $(".job-list").each(function () {
            $(this).outerHeight($(".job-offer-holder.active").outerHeight());
        });
    };

    function header() {
        var offset = $(".header").outerHeight() + $(".social-line").height();
        if ($(window).scrollTop() > offset + $(".social-line").offset().top) {
            $(".header").addClass("moved");
        } else {
            $(".header").removeClass("moved");
        }
        ;
        if ($(window).scrollTop() > offset + 20 + $(".social-line").offset().top) {
            $(".header").addClass("visible");
        } else {
            $(".header").removeClass("visible");
        }
        ;

        if ($(".home").length) {
            if ($(window).scrollTop() > $(window).height()) {
                $("body").addClass("moved-header");
            } else {
                $("body").removeClass("moved-header");
            }
            ;
        }
        ;

        if ($(window).scrollTop() > $(window).height() / 2) {
            $(".btn-down").addClass("animated fadeOutUp");
        } else {
            $(".btn-down").removeClass("animated fadeOutUp");
            $(".btn-down").addClass("animated fadeIn");
        }
        ;
    };

    if (!ieUse) {
        if (!is_touch_device()) {
            $("body").addClass("no-touch");
            $('.awards-list .item, .home .body.awards .center-btn').addClass("opacity0");
        }
    }
    ;

    if (!is_touch_device()) {
        $("body").addClass("no-touch");
    }
    ;

    header();
    $(window).scroll(function () {
        header();
    });

    $(".home-slider .slides").bxSlider({
        mode: "fade",
        auto: true,
        pager: false,
        controls: false,
        randomStart: true,
        speed: 2000,
        pause: 7000,
    });
    $(".contact-form select option:first-child").addClass("label").val("");
    if (location.hash.replace("#", "").length) {
        $(".contact-form select option:contains(" + location.hash.replace("#", "").replace("+", " ").replace("+", " ") + ")").attr("selected", "selected");
    }
    ;
    $(".job-offers .function").each(function () {
        var seen = {};
        $(this).find("option").each(function () {
            var value = $(this).text();
            if (seen[value] == null) {
                seen[value] = true;
            } else {
                $(this).remove();
            }
        });
    });

    $("input[type=checkbox], input[type=radio]").crfi();
    $("select").crfs();

    $(".filter-row input").keyup(function () {
        var filter = $(this).val();

        $(".question").each(function () {
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });
        $(".topic-item").each(function () {
            if ($(this).children('.question:visible').length == 0) {
                $(this).addClass("empty")
            } else {
                $(this).removeClass("empty")
            }
            ;
        });
    });

    $('.resumator-job').each(function (index, elem) {
        var element = $(elem).find('.resumator-job-info').text();
        $('select.location').append('<option>' + element + '</option>');
    });
    $(".job-offers .function").change(function () {
        var index = $(this).find(":selected").index();
        var text = $(this).find(":selected").text();
        if (index == 0) {
            $(".function-item").show();
        } else {
            $(".function-item").hide().each(function () {
                if ($(this).find("h5").text() == text) {
                    $(this).show();
                }
                ;
            });
            $(".location-item").each(function () {
                if ($(this).children('.function-item:visible').length == 0) {
                    $(this).addClass("empty")
                } else {
                    $(this).removeClass("empty")
                }
                ;
            });
        }
        ;
        mobileCheck();
    });
    $(".job-offers .location").change(function () {
        var index = $(this).find(":selected").index();
        if (index == 0) {
            $(".job-offers .location-item").removeClass("filtered")
        } else {
            $(".job-offers .location-item").addClass("filtered").eq($(this).find(":selected").index() - 1).removeClass("filtered");
        }
        ;
        mobileCheck();
    });

    $(".filter-row select").change(function () {
        var index = $(this).find(":selected").index();
        if (index == 0) {
            $(".topic-item").removeClass("filtered")
        } else {
            $(".topic-item").addClass("filtered").eq($(this).find(":selected").index() - 1).removeClass("filtered");
        }
        ;
    });

    $("body").on('mouseenter', '.btn0', function () {
        $(".morph-button-fixed > button").addClass("hover");
    }).on('mouseleave', '.btn0', function () {
        $(".morph-button-fixed > button").removeClass("hover");
    });

    $(".contact-form").on('mouseenter', '.crf-s', function () {
        $(this).trigger("click");
    });
    $(".page-template-page-contact .crf-sm").on('mouseleave', function () {
        $("select").crfs("hide");
    });

    $(".mobile-menu .m-menu-ul ul").each(function () {
        $(this).before('<div class="sub-trigger"><i class="fa fa-caret-right"></i></div>');
        $(this).prepend('<li><span class="back">' + $(".back-text").html() + '</span></li>');
    });
    $(".resumator-job-title").click(function () {
        $(this).parent().addClass('active-trail');
        var id = $(this).parent().find('.resumator-job-link').attr('id');
        var open_id = id.replace("desc-show", "job-desc");

        var close_name = $(this).parent().find('.resumator-hide-details').text();
        $(this).parent().find('.resumator-hide-details').text(close_name.replace("- Hide details", " BACK TO OPEN POSITIONS"));
        $(this).parent().find('.resumator-hide-details').hide();
        $(this).parent().find('.resumator-job-description').append('<button class="cta"><i class="fa fa-caret-left"></i> BACK TO OPEN POSITIONS</button>');

        $('#' + open_id).addClass("active");
        jobCheckT(open_id);
        mobileCheck();
        header();
        $('html, body').stop().animate({
            scrollTop: $(".inner-content").offset().top + 21 - $(".header.moved").height()
        }, 0);
        return false;
    });

    function jobCheckT(elem) {
        $(".job-list").outerHeight($("#" + elem).height());
    };
    $.fn.extend({
        live: function (event, callback) {
            if (this.selector) {
                $(document).on(event, this.selector, callback);
            }
        }
    });

    $("button.cta").live('click', function () {
        $(this).parent().removeClass("active")
        $(this).parent().parent().removeClass('active-trail');
        $(".job-list").height("auto");
        mobileCheck();
        header();
        return false;
    });

    $(".job-offers li a").click(function () {
        $(".job-offer-holder").removeClass("active");
        $($(this).attr("href", '')).addClass("active");
        jobCheck();
        mobileCheck();
        header();
        $('html, body').stop().animate({
            scrollTop: $(".inner-content").offset().top + 21 - $(".header.moved").height()
        }, 0);
        return false;
    });


    $(".btn-down").click(function () {
        $('html, body').stop().animate({
            scrollTop: $(window).height()
        }, 1000);
        window.setTimeout(function () {
            $(".btn-down").addClass("animated fadeOutUp")
        }, 500);
        return false;
    });

    $(".job-offer-holder .cta").click(function () {
        $(".job-offer-holder").removeClass("active");
        $(".job-list").height("auto");
        mobileCheck();
        header();
        return false;
    });

    $(".menu .trigger").click(function () {
        $(".mobile-menu .opened").removeClass("opened");
        $(".mobile-menu").removeClass("opened-sub");
        $("body").toggleClass("st-menu-open");
        return false;
    });

    $(".feat-team a.close").click(function () {
        $(".feat-team .active").removeClass("active");
        return false;
    });

    $(".feat-team .trigger").click(function () {
        if ($(this).parent().hasClass("active")) {
            $(".feat-team .active").removeClass("active");
        } else {
            $(".feat-team .active").removeClass("active");
            $(this).parent().addClass("active");
            $($(this).attr("href")).addClass("active");
        }
        ;
        return false;
    });

    $(".featured-team a.close").click(function () {
        $(".head-tabs .active, .tabs-content, .featured-team").removeClass("active");
        return false;
    });

    $(".head-tabs a").click(function () {
        if ($(this).parent().hasClass("active")) {
            $(".head-tabs .active, .tabs-content, .featured-team").removeClass("active");
        } else {
            $(".head-tabs .active, .tabs-content").removeClass("active");
            $(".featured-team").addClass("active");
            $(this).parent().addClass("active");
            $($(this).attr("href")).addClass("active");
        }
        ;
        return false;
    });

    $(document).on('click', ".sub-trigger", function () {
        if ($(this).parent().hasClass("opened")) {
            $(this).parent().removeClass("opened");
            $(".mobile-menu").removeClass("opened-sub");
        } else {
            $(this).parent().addClass("opened");
            $(".mobile-menu").addClass("opened-sub");
        }
        ;
    });

    $(document).on('click', ".mobile-menu .back", function () {
        $(".mobile-menu .opened").removeClass("opened");
        $(".mobile-menu").removeClass("opened-sub");
    });

    $(document).on('click', ".page-container", function () {
        $(".mobile-menu .opened").removeClass("opened");
        $(".mobile-menu").removeClass("opened-sub");
        if ($("body").hasClass("st-menu-open")) {
            $("body").removeClass("st-menu-open");
            return false;
        }
        ;
    });
    mobileCheck();
    $(window).resize(function () {
        mobileCheck();
        jobCheck();
    });
    $(window).load(function () {
        $('.awards-list section').masonry({
            itemSelector: 'article',
            isFitWidth: true,
            columnWidth: 1,
            layoutPriorities: {
                upperPosition: 1,
                shelfOrder: 1
            }
        });
        mobileCheck();
        if (!ieUse) {
            if (!is_touch_device()) {

                $('.awards-list .item').each(function (index) {
                    var cur = $(this);
                    if (cur.isOnScreen()) {
                        window.setTimeout(function () {
                            if (!cur.hasClass("animated")) {
                                cur.addClass("animated fadeInUp");
                            }
                            ;
                        }, (+index + 1) * 300);
                        window.setTimeout(function () {
                            if (!$(".home .body.awards .center-btn").hasClass("animated")) {
                                $(".home .body.awards .center-btn").addClass("animated fadeInUp");
                            }
                            ;
                        }, 1200);
                    }
                    ;
                    $(window).scroll(function () {
                        if (cur.isOnScreen()) {
                            window.setTimeout(function () {
                                if (!cur.hasClass("animated")) {
                                    cur.addClass("animated fadeInUp");
                                }
                                ;
                            }, (+index + 1) * 300);
                            window.setTimeout(function () {
                                if (!$(".home .body.awards .center-btn").hasClass("animated")) {
                                    $(".home .body.awards .center-btn").addClass("animated fadeInUp");
                                }
                                ;
                            }, 1200);
                        }
                        ;
                    });
                });

            }
        }
        ;
    });


    if ($(".mockup-content").length) {
        var docElem = window.document.documentElement, didScroll, scrollPosition;

        // trick to prevent scrolling when opening/closing button
        function noScrollFn() {
            window.scrollTo(scrollPosition ? scrollPosition.x : 0, scrollPosition ? scrollPosition.y : 0);
        }

        function noScroll() {
            window.removeEventListener('scroll', scrollHandler);
            window.addEventListener('scroll', noScrollFn);
        }

        function scrollFn() {
            window.addEventListener('scroll', scrollHandler);
        }

        function canScroll() {
            window.removeEventListener('scroll', noScrollFn);
            scrollFn();
        }

        function scrollHandler() {
            if (!didScroll) {
                didScroll = true;
                setTimeout(function () {
                    scrollPage();
                }, 60);
            }
        };

        function scrollPage() {
            scrollPosition = {x: window.pageXOffset || docElem.scrollLeft, y: window.pageYOffset || docElem.scrollTop};
            didScroll = false;
        };

        scrollFn();

        var UIBtnn = new UIMorphingButton(document.querySelector('.morph-button'), {
            closeEl: '.close',
            onBeforeOpen: function () {
                // don't allow to scroll
                noScroll();
            },
            onAfterOpen: function () {
                // can scroll again
                canScroll();
            },
            onBeforeClose: function () {
                // don't allow to scroll
                noScroll();
            },
            onAfterClose: function () {
                // can scroll again
                canScroll();
            }
        });

    }
    ;
    function validateEmail(email) {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (!emailReg.test(email)) {
            $(".footer .subscrible .status.red").removeClass("hide");
        } else {
            $(".footer .subscrible .status.red").addClass("hide");
        }
    }

    ajaxMailChimpForm($("#mc-embedded-subscribe-form"));

    function ajaxMailChimpForm($form) {
        $form.submit(function (e) {
            e.preventDefault();
            if (!isValidEmail($form)) {
                $(".footer .subscrible .status.red").removeClass("hide");
            } else {
                $(".subscrible").addClass("inactive");
                submitSubscribeForm($form);
            }
        });
    }

    function isValidEmail($form) {
        var email = $form.find("input[type='email']").val();
        if (!email || !email.length) {
            return false;
        } else if (email.indexOf("@") == -1) {
            return false;
        }
        return true;
    }

    function submitSubscribeForm($form) {
        $.ajax({
            type: "GET",
            url: $form.attr("action"),
            data: $form.serialize(),
            cache: false,
            dataType: "jsonp",
            jsonp: "c",
            contentType: "application/json; charset=utf-8",
            error: function (error) {
            },
            success: function (data) {
                if (data.result != "success") {
                    $(".footer .subscrible .status.red").removeClass("hide");
                } else {
                    $(".footer .subscrible .status.red").remove();
                    $("#mce-EMAIL").val("").blur();
                    $(".footer .subscrible .status").removeClass("hide");
                }
            }
        });
    }

});

