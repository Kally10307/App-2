/**
 * Created by Administrator on 2016/10/22.
 */

define(function(require,exports,module){
    var Backbone, Router, Index, List,Detail,Date,Order;
    Backbone = require('backbone.js');
    Index = require('./index.js');
    List = require('../component/list/list.js');
    Detail = require('../component/detail/detail.js');
    Date = require('../component/date/date.js');
    Order = require('../component/order/order.js');
    Router = Backbone.Router.extend({
        routes:{
            "":"index",
            "index":"index",
            "list":"getList",
            "detail":"getDetail",
            "date":"getDate",
            "order":"getOrder"
        },
        index: function () {
            Index.index();
        },
        getList: function(){
            List.list();
        },
        getDetail: function () {
            Detail.detail();
        },
        getDate: function () {
            Date.date();
        },
        getOrder: function (){
            Order.order();
        }
    });
    module.exports = Router;
});