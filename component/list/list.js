define(function(require,exports,module){
    require('../list/list.css');

    var $ = require('$');
    var tpl = require('../list/list.html');

    exports.list = function(){
        $('.main').html(tpl).siblings().show();

        // 加载list列表
        $.ajax({
            type:'GET',
            url:"data/list1.json",
            dataType:'json',
            success:function(data){
                var allData = data.LineInfroList;
                createList(allData);
            }
        });

        function createList(data){
            var oLi = null;
            for(var i=0;i<data.length;i++){
                oLi = $('<li><a href="#detail"><div class="list_img"><img src="'+data[i].LineImageUrl+'" alt=""><p>'+data[i].CityName+'</p></div><div class="list_info"><p>'+data[i].LineMainTitle+'</p><p><strong>￥'+data[i].LineAmountDirt+'</strong><span>起/份</span></p><p><span>'+data[i].TravelDays+'天'+(data[i].TravelDays-1)+'晚</span><span>'+data[i].TitleLabel+'</span></p></div></a></li>');
                $('#list_wrapper ul').append(oLi);
            }
        }
        var num = 1;
        // ajax实现下拉加载
       $('.main').on('scroll',function() {
           var scrollTop = this.scrollTop + 421;
           var wTop = $('#list_wrapper').height() - $('.list_footer').height();
           if (scrollTop >= wTop) {

               $('#list_wrapper .loading').show();
               setTimeout(function () {
                   num++;
                   if (num > 4) {
                       $('#list_wrapper .loading').html('没有更多数据了！');
                       setTimeout(function () {
                           $('#list_wrapper .loading').hide();
                       }, 500);
                       return;
                   }
                   $('#list_wrapper .loading').hide();
                   $.ajax({
                       type: 'GET',
                       url: "data/list" + num + ".json",
                       dataType: 'json',
                       async:false,
                       success: function (data) {
                           var allData = data.LineInfroList;
                           createList(allData);
                       }
                   });
               }, 1000);
          }
       });

        // 价格排序
        $('.order_by').bind("touchend",function(){
            $('.normal_content').slideToggle();
            $('.overlys').slideToggle();
        });
        $('.overlys').bind("touchend",function(){
            $(this).slideToggle();
            $('.normal_content').slideToggle();
        });
        $('#list_lp').bind("touchend",function(){
            $(this).addClass('active').siblings().removeClass('active');
            $('.normal_content').slideToggle();
            $('.overlys').slideToggle();
            $('#list_wrapper ul').html("");
            $.ajax({
                type: 'GET',
                url: "data/list1.json",
                dataType: 'json',
                success: function (data) {
                    var allData = data.LineInfroList;
                    allData.sort(Sorts);
                    createList(allData);
                }
            });
        });
        function Sorts(a,b){
           return a.LineAmountDirt - b.LineAmountDirt;
        }
    }
});