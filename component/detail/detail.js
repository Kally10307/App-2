/**
 *   detail
 */

define(function (require,exports,module) {
    require('../detail/detail.css');
    require('../../css/swiper.min.css');
    var $ = require('$');
    var Swiper = require('swiper');
    require('lazyload');
    var tpl = require('../detail/detail.html');
    exports.detail = function(){
        $('.main').html(tpl).siblings().show();

        // 幻灯片
        var mySwiper = new Swiper ('.swiper-container', {
            // Optional parameters
            loop: true,
            autoplay:2000
        });

        $.ajax({
            type: 'GET',
            url: "data/detaildp.json",
            dataType: 'json',
            success: function (data) {
                var allData = data.NomalPackage;
                createList(allData);
                if(allData.length>2){
                    $('.detail_hotel_show a').css('display','block');
                }
            }
        });

        // 展开套餐
        var tipOff = true;
        $('.detail_hotel_show a').bind('touchend',function(){

            if(tipOff){
                $(this).html('收起套餐').parent().addClass('detail_hotel_hide');
                $('.detail_spc_list ul li.detail_list_hide').show();
                tipOff = false;
            }else{
                $(this).html('展开套餐').parent().removeClass('detail_hotel_hide');
                $('.detail_spc_list ul li.detail_list_hide').hide();
                tipOff = true;
            }

        });

        $('.detail_spc_list ul').on('touchend','a',function (e) {

            var $dBtn = $(e.currentTarget);
            var orderName = $dBtn.parents('li').children('h3').html();
            window.sessionStorage.setItem('orderName',orderName);
            window.location.hash = "#/date";

        });

        $('img.lazy').lazyload({
            effect: 'fadeIn',
            placeholder : "images/blank.gif",
            container: $('.product_info')
        });

        // 创建list的函数
        function createList(data){
            var oLi = null;
            var hLi = null;
            if(data.length>2){
                for(var i=0; i<2;i++){
                    oLi = $('<li><h3>'+data[i].PackageName+'</h3><p>'+data[i].HotelList[0].HotelName+'<span>'+data[i].HotelList[0].HotelType+'1晚</span></p><div><span><em>￥</em><strong>'+data[i].PackagePrice+'</strong>起/份</span><a class="order_btn">立即预订</a></div></li>');
                    $('.detail_spc_list ul').append(oLi);
                }
                for(var i=2;i<data.length;i++){
                    hLi = $('<li class="detail_list_hide"><h3>'+data[i].PackageName+'</h3><p>'+data[i].HotelList[0].HotelName+'<span>'+data[i].HotelList[0].HotelType+'1晚</span></p><div><span><em>￥</em><strong>'+data[i].PackagePrice+'</strong>起/份</span><a class="order_btn">立即预订</a></div></li>');
                    $('.detail_spc_list ul').append(hLi);
                }
            }else{
                for(var i=0; i<data.length;i++){
                    oLi = $('<li><h3>'+data[i].PackageName+'</h3><p>'+data[i].HotelList[0].HotelName+'<span>'+data[i].HotelList[0].HotelType+'1晚</span></p><div><span><em>￥</em><strong>'+data[i].PackagePrice+'</strong>起/份</span><a class="order_btn" href="#/date">立即预订</a></div></li>');
                    $('.detail_spc_list ul').append(oLi);
                }
            }

        }

        // tab
        $('.product_tab ul li').bind('touchend',function(){
            $(this).addClass('active').siblings().removeClass('active');
            var index = $(this).index();
            $('.detail_content').eq(index).addClass('panel_active').siblings().removeClass('panel_active');
        });

        // 地图
        $.ajax({
            type: 'GET',
            url: "data/detaildt.json",
            dataType: 'json',
            success: function (data) {
                var oLi = null;
                for(var i=0;i<data.length;i++){
                    oLi = $('<li class="'+data[i].restype+'" data-lat="'+data[i].lat+'" data-lon="'+data[i].lon+'"><h3>'+data[i].resname+'<p>'+data[i].resadress+'</p></h3></li>');
                    $('.map_list ul').append(oLi);
                }
            }
        });

    }
});