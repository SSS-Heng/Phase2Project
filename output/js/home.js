"use strict";

define(["jquery-1.11.3.min", "home_insert", "home_behavior"], function ($, I, B) {
  //json读取并绘制主页html（不包括购物车）
  function insert() {
    //二级导航加载数据并插入节点
    $.ajax({
      url: "json/second_nav.json",
      success: function success(json_arr) {
        var nav = json_arr;
        var str = "";
        var type = null;
        for (var i = 0; i < nav.length; i++) {
          str += "\n          <li>\n            <a href=\"" + nav[i].url + "\" class=\"title\">" + nav[i].name + "</a>\n              <div class=\"sub_panel_wrapper\">\n                <div class=\"nav_sub_container\">\n          ";
          type = nav[i].type;
          if (type == "category") {
            str += "<ul class=\"category_wrapper\">";
          } else if (type == "goods") {
            str += "<ul class=\"goods_container\">";
          } else {
            console.log("警告，二级导航目录创建错误，错误点：<ul class='category/goods_container'>");
          }
          var nav_list = nav[i].list;
          for (var j = 0; j < nav_list.length; j++) {
            str += "<li class=\"item\">";
            if (type == "category") {
              //种类导航
              str += "\n              <div class=\"container\">\n                <div class=\"title\">\n                  <a href=\"#\">" + nav_list[j].title + "</a>\n                </div>\n                <ul class=\"category_container\">\n              ";
              var nav_list_sub = nav_list[j].sub;
              for (var k = 0; k < nav_list_sub.length; k++) {
                str += "\n                <li class=\"category_item\">\n                  <a href=\"#\" class=\"link\" id=\"" + nav_list_sub[k].id + "\">\n                    <img src=\"" + nav_list_sub[k].image + "\" class=\"picture\">\n                    <span class=\"sub_title\">" + nav_list_sub[k].name + "</span>\n                  </a>\n                </li>\n                ";
              }
              str += "</ul></div>";
            } else if (type == "goods") {
              //商品导航
              str += "\n              <a href=\"#\" class=\"link\" id=\"" + nav_list[j].spu + "\">\n                <img src=\"" + nav_list[j].ali_image + "\" class=\"picture\">\n                <p class=\"name\">" + nav_list[j].spu_name + "</p>\n                <p class=\"price\">" + nav_list[j].sell_price + "</p>\n              </a>\n              ";
            } else {
              console.log("警告，二级导航内容创建错误，错误点：<li class='item'></li>");
            }
            str += "</li>";
          }
          str += "</ul></div></div></li>";
        }
        $("" + str).prependTo($(".nav_insert"));
      },
      error: function error(msg) {
        console.log(msg);
      }
    });
    //主页主体部分加载数据并插入节点
    $.ajax({
      url: "json/home.json",
      success: function success(home_json) {
        //轮播图插入
        var home_carousel = home_json.data.home_carousel;
        I.slide_show && I.slide_show(home_carousel);
        //热门活动插入
        var home_activities = home_json.data.home_activities;
        I.hot_active && I.hot_active(home_activities);
        //热门商品插入
        var home_hot = home_json.data.home_hot;
        I.hot_goods && I.hot_goods(home_hot);
        //页面主体插入
        var home_floors = home_json.data.home_floors;
        I.goods && I.goods(home_floors);
      },
      error: function error(msg) {
        console.log(msg);
      }
    });
  }
  //主页个别动作设置
  function behavior() {
    B.ca();
    B.n_s();
    B.h_g_o();
  }
  return {
    ins: insert,
    beh: behavior
  };
});