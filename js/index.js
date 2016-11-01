/**
 * Created by Administrator on 2016/10/22.
 */
define(function (require,exports,module) {

    require('../css/swiper.min.css');
    require('../css/index.css');

    var Swiper = require('swiper');
    var $ = require('$');
    require('lazyload');
    var tpl = require('../component/home.html');


    exports.index = function(){

        $(".main").html(tpl).siblings().show();

        var mySwiper = new Swiper ('.swiper-container', {
            // Optional parameters
            direction: 'horizontal',
            paginationType : 'bullets',
            loop: true,
            autoplay:2000,
            pagination: '.swiper-pagination',
            paginationClickable: true
        });

        $('img.lazy').lazyload({
            effect: 'fadeIn',
            placeholder : "images/blank.gif",
            container: $('#wrapper')
        });

    };
});