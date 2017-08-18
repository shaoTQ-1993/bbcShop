
/**
 * Created by shaoTQ on 17/3/31.
 * 公共函数方法
 */

exports.install = function (Vue, options) {


    ///foorer-nav的active方法
    Vue.prototype.active = (page) => {
        $(".foorer-nav span").each(function () {
            $(this).siblings().removeClass("active");
        });
        $(page).addClass("active");

    }


};