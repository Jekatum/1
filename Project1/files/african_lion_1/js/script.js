$(document).ready(function () {
    $('a[href^="#"]').click(function () {
        var elementClick = $(this).attr("href");
        var destination = $(elementClick).offset().top - 60;
        jQuery("html:not(:animated), body:not(:animated)").animate({scrollTop: destination}, 800);
        return false;
    });


    $('[name="country"]').on('change', function () {
        var geoKey = $(this).find('option:selected').val();
        var data = $jsonData.prices[geoKey];
        var price = data.price;
        var oldPrice = data.old_price;
        var currency = data.currency;
        $("[value = " + geoKey + "]").attr("selected", true).siblings().attr('selected', false);

        $('.price_land_s1').text(price);
        $('.price_land_s2').text(oldPrice);
        $('.price_land_curr').text(currency);
    });

    $(".reviews-items").slick({
        infinite: !0,
        slidesToShow: 3,
        slidesToScroll: 1,
        variableWidth: !0,
        prevArrow: '<button type="button" class="slick-prev"><svg width="23" height="45" viewBox="0 0 23 45" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.9923 43.0231L4.03037 23.301L20.3791 1.5378" stroke="#FFB905" stroke-width="5" stroke-miterlimit="16"/></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg width="21" height="45" viewBox="0 0 21 45" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.24806 42.9782L17.4239 23.301L2.0639 1.48891" stroke="#FFB905" stroke-width="5" stroke-miterlimit="16"/></svg></button>',
        responsive: [
            {
                breakpoint: 1201,
                settings: {
                    arrows: !0,
                    slidesToShow: 1,
                    variableWidth: !1
                }
            }
            ]
    });
    $(window).on('resize', function () {
        $(window).width() <= 992 && $(".reviews-items").slick("unslick");
    });

    $(window).width() <= 992 && $(".reviews-items").slick("unslick");
});
