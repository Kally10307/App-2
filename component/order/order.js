

define(function (require,exports,module) {

    require('../order/order.css');
    var $ = require('$');
    var tpl = require('../order/order.html');
    exports.order = function () {

        $('.main').html(tpl).siblings().hide();

        // 订单获取信息
        $('#order_name').html(window.sessionStorage.getItem('orderName')+'套餐');
        $('#unit_price').html(window.sessionStorage.getItem('unitPrice'));
        $('#room_type').html(window.sessionStorage.getItem('orderName'));
        $('#order_total').html(parseInt(window.sessionStorage.getItem('unitPrice'))+40);
        var orderDate = new Date(window.sessionStorage.getItem('selectDate'));
        var orderYear = orderDate.getFullYear();
        var orderMonth = orderDate.getMonth()+1;
        var orderDay = orderDate.getDate();
        var orderWeek = orderDate.getDay();
        var iWeek = new Array('周日','周一','周二','周三','周四','周五','周六');
        if(orderDay < 10){
            $('#order_date').html(orderYear+'-'+orderMonth+'-0'+orderDay+' '+iWeek[orderWeek]);
        }else{
            $('#order_date').html(orderYear+'-'+orderMonth+'-'+orderDay+' '+iWeek[orderWeek]);
        }

        // 套餐份数加减
        var num = $('#order_num').html();

        $('#reduce').on('touchend',function () {
            if(num > 1){
                num--;
                $('#order_num').html(num);
                $('#plus').removeClass('disabled');
                if(num == 1){
                    $('#reduce').addClass('disabled');
                }
            }
            toTotal(num);
        });

        $('#plus').on('touchend',function () {
            if(num >= 1 && num < 20) {
                num++;
                $('#order_num').html(num);
                $('#reduce').removeClass('disabled');
                if (num == 20) {
                    $('#plus').addClass('disabled');
                }
                toTotal(num);
            }
        });
        function toTotal(num){
            var unitPrice = $('#unit_price').html();
            var oredrTotal = num * (parseInt(unitPrice) + 10*2 + 10*2);
            $('#order_total').html(oredrTotal);
        }
        // 订单计算

        // 选择日期
        $('#order_date').on('click',function () {
            window.history.back();
        });

        // 出游人信息
        var bOff = true;
        $('.order_info p span').on('touchend',function () {
            if(bOff){
                $(this).addClass('disabled').html('删除').parent().prev().removeClass('order_hide');
                bOff = false;
            }else{
                $(this).removeClass('disabled').html('新增出游人').parent().prev().addClass('order_hide');
                bOff = true;
            }

        });

        // 提交订单
        $('#order_submit').on('touchend',function () {
            if(!$('#name').val()){
                var d1 = new Dialog();
                d1.init({
                    message:'请输入正确的姓名'
                });
            }
            else if($('#name').val() && !$('#tel_num').val()){
                var d2 = new Dialog();
                d2.init({
                    message:'请输入正确的手机号'
                });
            }
            else{
                var d3 = new Dialog();
                d3.init({
                    message:'订单已提交，返回主页',
                    delay:2000,
                    delayCallback:function(){
                        window.location.hash = "";
                    }
                })
            }
        });

        // 弹框组件

        function Dialog(){
            this.win = null;
            this.config = {
                message:null,
                delay:null,
                delayCallback:null,
                maskClose:null
            };

        }
        Dialog.prototype.init = function (opt) {
            var This = this;
            extend(this.config,opt);
            this.create();
            this.dialogClose();
            if(this.config.delay && this.config.delay != 0){
                setTimeout(function(){
                    document.body.removeChild(This.win);
                    This.config.delayCallback && This.config.delayCallback();
                },parseInt(this.config.delay));
            }
        };

        Dialog.prototype.create = function () {
            this.win = document.createElement('div');
            this.win.className = 'mask';
            this.win.innerHTML = '<div class="dialog"><div class="content">'+this.config.message+'<div><div class="btn">确定</div></div>';
            document.body.appendChild(this.win);

        };
        Dialog.prototype.dialogClose = function () {
            var This = this;
            var oClose = this.win.getElementsByClassName('btn')[0];
            oClose.ontouchend = function () {
                document.body.removeChild(This.win);
                This.config.delayCallback && This.config.delayCallback();
            }
        };

        function extend(obj1,obj2){
            for(var attr in obj2){
                obj1[attr] = obj2[attr];
            }
        }














    }
});