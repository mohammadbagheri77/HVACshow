$(document).ready(function () {
    // Global Js
    $("img , p , span , h1 , h2 , h3 , h4 , h5 , i , a , b").on('dragstart', function (event) { event.preventDefault(); });
    $(window).scroll(function () {
        if ($(window).scrollTop() > 500) {
            $(".gototop").addClass("gototop-show");
        } else {
            $(".gototop").removeClass("gototop-show");
        }
    });
    $(".gototop").on("click", function () {
        $("html, body").animate({ scrollTop: 0 }, 1000);
    });
    $(window).scroll(function () {
        if ($(".header-top").css("display") == "block") {
            var headerTopHeight = 60;
        } else {
            var headerTopHeight = 0;
        }
        //headerTopHeight = 200;
        if ($(window).scrollTop() > headerTopHeight) {
            $("header").addClass("header-fixed");
        } else {
            $("header").removeClass("header-fixed");
        }
    });
    // Search Js
    $(".search-input").on("keyup", function () {
        var thisVal = $(this).val();
        var thisValLen = thisVal.length;
        if (thisValLen < 45) {
            $(".search-val").fadeIn(0)
            $(".search-val").text(thisVal);
        } else {
            $(".search-val").fadeOut(0)
        }
        if (thisValLen > 2) {
            $(".clear-search").addClass("active-clear-search");
            $(".clear-search *").fadeIn(300);
            $(".search-detail").fadeIn(300);
        } else {
            $(".clear-search").removeClass("active-clear-search");
            $(".clear-search *").fadeOut(300);
            $(".search-detail").fadeOut(300);
        }
    })
    $(".clear-search *").on("click", function () {
        $(this).fadeOut(300);
        $(".search-detail").fadeOut(300)
        $(".search-input").val("");
    })
    // Megamenu
    $(".megamenu-item ul li").hover(function () {
        $(".megamenu-item ul li").removeClass("active-megamenu-li");
        $(this).addClass("active-megamenu-li");
        var thisIndex = $(this).index();
        $(".megamenu-content > div").removeClass("megamenu-content-show");
        $(".megamenu-content > div").eq(thisIndex).addClass("megamenu-content-show");
    })
    $(".res-hsm").on("click", function () {
        $(this).find(".res-sub-menu").slideToggle();
        $(this).find("svg").toggleClass("rotate-chevron");
    })
    $(".rsp-button").on("click", function () {
        $(".res-menu").fadeIn();
        $(".res-menu-inner").addClass("res-menu-active");
    })
    $(".close-res-menu , .res-menu-inner-left").on("click", function () {
        $(".res-menu").fadeOut();
        $(".res-menu-inner").removeClass("res-menu-active");
    })
    // Slider
    $('.slider-right').slick({
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        adaptiveHeight: false,
        rtl: true,
        fade: true,
        autoplay: true,
        autoplaySpeed: 5000,
    });
    // Product Carousel
    $('.products-carousel').slick({
        speed: 800,
        infinite: false,
        slidesToShow: 6,
        slidesToScroll: 6,
        adaptiveHeight: false,
        rtl: true,
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
        ]
    });
    // Company Carousel
    $('.company-carousel').slick({
        speed: 800,
        infinite: false,
        slidesToShow: 6,
        slidesToScroll: 6,
        adaptiveHeight: false,
        rtl: true,
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
        ]
    });
    // Articles Carousel
    $('.articles-carousel').slick({
        speed: 800,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        adaptiveHeight: false,
        rtl: true,
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
        ]
    });
    // Product Gallery
    $(".single-right-main-gallery-pics > div > div").on("click", function () {
        var thisImg = $(this).find("img").attr("src");
        $(".single-right-main-gallery-pics > div > div").removeClass("single-right-main-gallery-active");
        $(this).addClass("single-right-main-gallery-active");
        $(".single-right-main-pic img").attr("src", thisImg);
    })
    // Product Bottom Menu
    $(".product-bottom-menu li").on("click", function () {
        var thisIndex = $(this).index();
        $(".product-bottom-section-inner").removeClass("product-bottom-section-inner-active")
        $(".product-bottom-section-inner").eq(thisIndex).addClass("product-bottom-section-inner-active")
        $(".product-bottom-menu li").removeClass("product-bottom-menu-active");
        $(this).addClass("product-bottom-menu-active");

    })
    // Toggle Sidebar List
    $(".toggle-side-arrow").on("click", function () {
        $(this).parent().next().slideToggle();
        $(this).parent().toggleClass("sidebar-title-toggle");
        $(this).toggleClass("sidebar-arrow-toggle");
    })
    $(".pr-comments").on("click", function () {
        $(".product-bottom-menu ul li:nth-child(3)").click();
        var target = $(".product-bottom-menu").offset().top;
        $("html, body").animate({ scrollTop: target - 200 }, 1000);
    })
    $(".pr-question").on("click", function () {
        $(".product-bottom-menu ul li:nth-child(4)").click();
        var target = $(".product-bottom-menu").offset().top;
        $("html, body").animate({ scrollTop: target - 200 }, 1000);
    })
    $(".select-rate i").click(function () {
        if ($(this).hasClass("star1")) {
            $(".select-rate .fa").addClass("fa-star-o").removeClass("fa-star");
            $(this).addClass("fa-star").removeClass("fa-star-o");
        } else if ($(this).hasClass("star2")) {
            $(".select-rate .fa").addClass("fa-star-o").removeClass("fa-star");
            $(this).addClass("fa-star").removeClass("fa-star-o");
            $(this).prev().addClass("fa-star").removeClass("fa-star-o");
        } else if ($(this).hasClass("star3")) {
            $(".select-rate .fa").addClass("fa-star-o").removeClass("fa-star");
            $(this).addClass("fa-star").removeClass("fa-star-o");
            $(this).prev().addClass("fa-star").removeClass("fa-star-o");
            $(this).prev().prev().addClass("fa-star").removeClass("fa-star-o");
        } else if ($(this).hasClass("star4")) {
            $(".select-rate .fa").addClass("fa-star-o").removeClass("fa-star");
            $(this).addClass("fa-star").removeClass("fa-star-o");
            $(this).prev().addClass("fa-star").removeClass("fa-star-o");
            $(this).prev().prev().addClass("fa-star").removeClass("fa-star-o");
            $(this).prev().prev().prev().addClass("fa-star").removeClass("fa-star-o");
        } else if ($(this).hasClass("star5")) {
            $(".select-rate .fa").addClass("fa-star-o").removeClass("fa-star");
            $(this).addClass("fa-star").removeClass("fa-star-o");
            $(this).prev().addClass("fa-star").removeClass("fa-star-o");
            $(this).prev().prev().addClass("fa-star").removeClass("fa-star-o");
            $(this).prev().prev().prev().addClass("fa-star").removeClass("fa-star-o");
            $(this).prev().prev().prev().prev().addClass("fa-star").removeClass("fa-star-o");
        }
    })
    $(".have-product").on("click", function () {
        if ($(this).is(':checked')) {
            $(".comment-rating").fadeIn(500);
        } else {
            $(".comment-rating").fadeOut(500);
        }
    })
    $('#comments-modal').on('hidden.bs.modal', function (e) {
        $(".comment-code").fadeOut(0)
    })
    $('#question-modal').on('hidden.bs.modal', function (e) {
        $(".question-code").fadeOut(0)
    })
    // Terms
    $(".term-pag a").click(function () {
        var thisID = $(this).attr("id");
        var target = "#title-" + thisID;
        $('html, body').animate({
            scrollTop: $(target).offset().top - 300
        }, 1000);
    });
    // FAQ
    $(".faq-item h4").on("click", function () {
        $(".faq-item h4").removeClass("faq-active");
        $(this).addClass("faq-active");
        if ($(this).next().css("display") == "block") {
            $(".faq-item h4").next().slideUp(300);
            $(this).next().slideUp(300);
            $(this).removeClass("faq-active");
        } else {
            $(".faq-item h4").next().not($(this).next()).slideUp(300);
            $(this).next().slideDown(300);
        }
    })
    // Login & Register
    $(".forgot-pw").on("click", function () {
        $(".login-form").hide(0);
        $(".reset-form").show(0);
        $(".inner-login-left .section-title h1").text("فراموشی رمز عبور");
    })
    $(".back-login").on("click", function () {
        $(".reset-form").hide(0);
        $(".login-form").show(0);
        $(".inner-login-left .section-title h1").text("ورود");
    })
    $(".next-btn").on("click", function () {
        $(".register-form1").hide(0);
        $(".register-form2").show(0);
    })
    $(".back-register").on("click", function () {
        $(".register-form2").hide(0);
        $(".register-form1").show(0);
    })
    /* Contact*/
    $(".subject-contact-form").select2({
        placeholder: "موضوع",
        minimumResultsForSearch: -1
    });
    // Request
    $(".subject-request-form").select2({
        placeholder: "موضوع",
        minimumResultsForSearch: -1
    });
    // Compare
    $(".compare-brand").select2({
        placeholder: "انتخاب کنید",
        minimumResultsForSearch: -1
    });
})
/*
function commentCodeSent() {
   $(".comment-code").fadeIn(500);
}*/
function questionCodeSent() {
    $(".question-code").fadeIn(500);
}