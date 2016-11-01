/**
 * Created by Administrator on 2016/10/22.
 */
define(function (require,exports,module) {
    var Backbone,Router;
    var $ = require('$');
    var _ = require('underscore.js');
    Backbone = require('backbone.js');
    Router = require('./routers.js');

    document.documentElement.style.fontSize = window.innerWidth/6.4 + "px";
    $(window).on("resize",function () {
        document.documentElement.style.fontSize = window.innerWidth/6.4 + "px";
    });

    new Router();
    Backbone.history.start();


});