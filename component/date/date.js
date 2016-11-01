

define(function (require,exports,module) {
    require('../date/date.css');

    var $ = require('$');
    var tpl = require('../date/date.html');

    exports.date = function(){
        $('.main').html(tpl).siblings().show();

        getData(2016,11,11);
        getData(2016,12,12);
        getData(2017,1,1);
        getData(2017,2,2);

        $('#calendarPage').on('click','td',function (e) {
            var $dInput = $(e.currentTarget).find('input');
            if($dInput.length == 1){
                var selectValue = $dInput.val();
                var selectDate = $dInput.attr('data-date');
                window.sessionStorage.setItem('unitPrice',selectValue);
                window.sessionStorage.setItem('selectDate',selectDate);
                window.location.hash = "#/order";
            }
        });

        // 获取日期
        function getData(year,month,num){
            $.ajax({
                type: 'GET',
                url: "data/date"+num+".json",
                dataType: 'json',
                async:false,
                success: function (data) {
                    createCalender(year,month,data);
                }
            });
        }
        function createCalender(fullYear,month,data){
            var iWrapper = null;
            var table = null;
            var aTr = null;
            var iH =null;
            function isLeap(year) {
                if( ((year%4 == 0) && year%100 != 0) || (year%400 == 0)){
                    return 1;
                }
                return 0;
            }
            var dateOfMonth = 1;
            var firstDate = new Date(fullYear,month-1,1);
            var daysOfMonth = new Array(31,28+isLeap(fullYear),31,30,31,30,31,31,30,31,30,31);
            var week = firstDate.getDay();
            var rows = Math.ceil((daysOfMonth[month-1] + week )/7);  // 表格需要的行数
            table = $('<table></table>');
            aTr = $('<tr><th class="sunday">日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</td><th class="saturday">六</th></tr>');
            table.append(aTr);
            var iTr = null;
            var iTd = null;
            for (var i=0; i< rows; i++){
                iTr = $("<tr></tr>");
                for ( var k = 0; k < 7; k++){
                    var idX = i * 7 + k;   // 单元格自然列号
                    var dateStr = idX - week +  1;  // 计算日期
                    (dateStr <= 0 || dateStr > daysOfMonth[month-1]) ? dateStr = "" : dateStr = idX - week + 1;
                    // 打印日期
                    if(data.length != 0 && dateStr != ""){
                        if( dateStr == dateOfMonth && month == 11 ){
                            iTd = "<td class='disabled today' data-day='"+dateStr+"'><div><span>今天</span><p>¥"+data[dateStr-1].Price+"</p><input type='hidden' value='"+data[dateStr-1].Price+"' data-date='"+new Date(fullYear,month-1,dateStr)+"'/></div></td>";
                            iTr.append(iTd);
                        }else{
                            iTd = "<td data-day='"+dateStr+"'><div><span>"+dateStr+"</span><p>¥"+data[dateStr-1].Price+"</p><input type='hidden' value='"+data[dateStr-1].Price+"' data-date='"+new Date(fullYear,month-1,dateStr)+"'/></div></td>";
                            iTr.append(iTd);
                        }
                    }else{
                        iTd = "<td class='disabled'>"+ dateStr + "</td>";
                        iTr.append(iTd);
                    }
                }
                table.append(iTr);
            }
            iWrapper = $('<div class="calender_wrapper"></div>');
            iH = $('<h3>'+fullYear+'年'+month+'月</h3>');
            iWrapper.append(iH);
            iWrapper.append(table);
            $('#calendarPage .calender').append(iWrapper);
        }
    }

});