"use strict";

define(["jquery"], function ($) {
  function check() {
    console.log("home_insert.js开始执行");
  }
  function end() {
    console.log("home_insert.js执行结束");
  }
  function slide_show(home_carousel, callback) {
    //轮播图加载插入
    var data = home_carousel;
    var str = "";
    var str1 = "";
    for (var i = 0; i < data.length; i++) {
      if (i == 0) {
        str += "<div class=\"swiper_slide carousel_img_active\">";
        str1 += "<span class=\"swiper_pagination_bullet carousel_active\"></span>";
      } else {
        str += "<div class=\"swiper_slide\">";
        str1 += "<span class=\"swiper_pagination_bullet\"></span>";
      }
      str += "<a href=\"" + data[i].link + "\">";
      str += "<img src=\"" + data[i].image[0] + "\" alt=\"banner\" class=\"banner_img\">";
      str += "\n      </a>\n      </div>\n      ";
    }
    $("" + str).appendTo($(".carousel_img_insert"));
    $("" + str1).appendTo($(".carousel_tab_insert"));
    callback();
  }
  function hot_active(home_activities) {
    //热门活动加载插入
    var data = home_activities;
    var str = "";
    for (var i = 0; i < data.length; i++) {
      str += "\n      <figure class=\"advertise\">\n        <img src=\"" + data[i].image + "\" alt=\"\u5E7F\u544A\u4F4D\u56FE\u7247\">\n        <a href=\"" + data[i].link + "\" class=\"ad_click_mask\"></a>\n      </figure>\n      ";
    }
    $("" + str).appendTo($(".hot_active_insert"));
  }
  function hot_goods(home_hot) {
    //热门商品加载插入
    var data = home_hot;
    var str = "";
    for (var i = 0; i < data.length; i++) {
      var sku = data[i].spu.sku_info[0];
      str += "\n      <section class=\"spu_item_normal_box\" id=\"" + sku.id + "\">\n        <figure class=\"item_cover\">\n          <a href=\"https://www.smartisan.com/item/" + sku.id + "\"><img src=\"" + sku.ali_image + "\" alt=\"\u5546\u54C1\u56FE\u7247\"></a>\n        </figure>\n        <article>\n          <h3>" + sku.title + "</h3>\n          <h5 class=\"text_product_title\">\n            " + sku.sub_title + "\n          </h5>\n        </article>\n        <aside class=\"item_attr_colors\">\n        </aside>\n        <article class=\"item_price\">\n          <span>\uFFE5" + sku.price + "</span>\n          <span class=\"orignal_price\"><!--\u6CA1\u6709\u627E\u5230\u5BF9\u5E94\u6570\u636E\uFF0C\u6682\u65F6\u6401\u7F6E--></span>\n        </article>\n      </section>\n      ";
    }
    $("" + str).appendTo($(".hot_goods_insert"));
  }
  function goods(home_floors) {
    //页面主体部分载入
    var data = home_floors;
    var str = "";
    for (var i = 0; i < data.length; i++) {
      var tab_items = data[i].tabs[0].tab_items;
      str += "\n      <div class=\"normal_shop_box\">\n        <section class=\"common_normal_box\">\n          <header class=\"d_flex justify_content_between\">\n              <h5>" + data[i].title + "</h5>\n          </header>\n          <aside class=\"common_flex_box multi_line flex_four\">\n            <figure class=\"advertise flex_2in4\">\n              <img src=\"" + tab_items[0].image + "\" alt=\"\u5E7F\u544A\u5927\u56FE\">\n              <a href=\"" + tab_items[0].link + "\" class=\"ad_click_mask\"></a>\n            </figure>\n      ";
      for (var j = 1; j < tab_items.length; j++) {
        var sku_info = tab_items[j].spu.sku_info[0];
        str += "\n        <section class=\"spu_item_normal_box flex_item\">\n          <figure class=\"item_cover\">\n            <a href=\"https://www.smartisan.com/item/" + sku_info.id + "\"><img src=\"" + sku_info.ali_image + "\"></a>\n          </figure>\n          <article>\n            <h3>" + sku_info.title + "</h3>\n            <h5 class=\"txt_product_title\">" + sku_info.sub_title + "</h5>\n          </article>\n          <aside class=\"item_attr_colors\"><!--\u4E0D\u505A--></aside>\n          <article class=\"item_price\">\n            <span>\uFFE5" + sku_info.price + "</span>\n            <span class=\"orignal_price\"><!--\u56E0\u6570\u636E\u95EE\u9898\uFF0C\u6401\u7F6E--></span>\n          </article>\n        </section>\n        ";
      }
      str += "\n      </aside>\n      </section>\n      </div>\n      ";
      $("" + str).insertBefore($(".normal_shop_insert"));
      str = "";
    }
  }
  return {
    check: check,
    slide_show: slide_show,
    hot_active: hot_active,
    hot_goods: hot_goods,
    goods: goods,
    end: end
  };
});