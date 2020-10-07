"use strict";

define(["small_cart", "jquery", "jquery_cookie"], function (SC, $) {
  function check() {
    console.log("goods.js开始执行");
    console.log($ ? "ok" : "error");
  }
  function end() {
    console.log("goods.js执行结束");
  }
  //二级导航加载数据并插入节点
  function nav_insert() {
    $.ajax({
      url: "../json/second_nav.json",
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
              var nav_list_sub = nav_list[j].sub;
              str += "\n              <div class=\"container\">\n                <div class=\"title\">\n                  <a href=\"#\">" + nav_list[j].title + "</a>\n                </div>\n              ";
              if (nav_list_sub.length > 8) {
                str += "<ul class=\"category_container\" style=\"width:606px\">";
              } else if (nav_list_sub.length > 4) {
                str += "<ul class=\"category_container\" style=\"width:404px\">";
              } else {
                str += "<ul class=\"category_container\" style=\"width:202px\">";
              }
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
  }
  //网页卷动时二级导航的动画
  function nav_scroll() {
    $(window).scroll(function () {
      var oTop = $(document).scrollTop();
      if (oTop >= 45) {
        $(".search_wrapper").css("display", "none");
        $(".nav_aside").css("display", "block");
      } else if (oTop < 45) {
        $(".search_wrapper").css("display", "block");
        $(".nav_aside").css("display", "none");
      } else {
        console.log("网页卷动时二级导航动画出错");
      }
    });
  }
  //相关商品插入
  function goods_insert() {
    $.ajax({
      url: "../json/hot_goods.json",
      success: function success(json_arr) {
        var data = json_arr.data.list;
        var str = "";
        str += "\n        <!--\u4F2A\u7ED3\u6784\u63D2\u5165\u70B9\uFF0C\u8B66\u544A\uFF1A\u6837\u5F0F\u4E2D\u4F7F\u7528\u4E86:nth-child\u9009\u62E9,\u8BE5\u884C\u4E0D\u80FD\u5220\u9664-->\n        ";
        for (var index = 0; index < 8; index++) {
          var i = index + 9;
          var shop = data[i];
          str += "\n          <li class=\"recommend_item_four\">\n            <div class=\"product_box_item cart_box\" data-shopId=\"" + shop.id + "\">\n              <div>\n                <div class=\"item_img\"> \n                  <img src=\"" + shop.shop_info.ali_image + "\" style=\"opacity: 1;\"> \n                </div>\n                <h4>" + shop.shop_info.title + "</h4>\n                <h6>" + shop.shop_info.sub_title + "</h6>\n              </div>\n              <div class=\"params_colors\"><!--\u9ED8\u8BA4\u4E0D\u63D2\u5165\u4EFB\u4F55\u8282\u70B9-->\n              </div>\n              <div class=\"item_price clearfix\"> \n                <span>\n                  <i>\xA5</i>\n                  <span>" + shop.price + "</span>\n                </span> \n              </div>\n              <div class=\"button_container\">\n                <a href=\"https://www.smartisan.com/item/" + shop.id + "\">\n                  <button class=\"normal\">\u67E5\u770B\u8BE6\u60C5</button>\n                </a>\n                <button class=\"confirm\" data-id=\"" + shop.id + "\">\u52A0\u5165\u8D2D\u7269\u8F66</button>\n              </div>\n            </div>\n          </li>\n          ";
        }
        $(".hot_good_insert").html(str);
      },
      error: function error(msg) {
        console.log(msg);
      }
    });
  }
  //相关商品加入购物车操作
  function add_goods() {
    $("button.confirm").live("click", function () {
      //取出当前点击加入购物车按钮的id
      var id = Number($(this).attr("data-id"));
      //1、判断是否是第一次添加
      var first = !$.cookie("goods");
      if (first) {
        $.cookie("goods", JSON.stringify([{ id: id, num: 1 }]), {
          expires: 7,
          path: "/"
        });
      } else {
        //2、不是第一次，判定之前是否添加过
        var cookieArr = JSON.parse($.cookie("goods"));
        var same = false; //假设没有相同的数据
        for (var i = 0; i < cookieArr.length; i++) {
          if (cookieArr[i].id == id) {
            same = true;
            break;
          }
        }
        same ? cookieArr[i].num++ : cookieArr.push({ id: id, num: 1 });

        //3、将处理完的数据存储回去
        $.cookie("goods", JSON.stringify(cookieArr), {
          expires: 7,
          path: "/"
        });
      }
      SC.s_c();
    });
  }
  //商品详细页的其他行为
  function behavior() {
    //商品数量减
    $("span.down").click(function () {
      var num = Number($("span.num").text());
      if (num <= 1) {
        $("span.down").addClass("disabled");
        return;
      }
      num--;
      $("span.num").text(num);
      $(".fix_bar_wrapper").attr("data-num", "" + num);
      $(".bar_device_info").find("span.title").text("Smartisan 颈挂蓝牙耳机 × " + num + " ");
      var price = Number($(".fix_bar_wrapper").attr("data-price"));
      var total_money = price * num;
      $(".bar_price").find("span").text(total_money + ".00");
    });
    //商品数量加
    $("span.up").click(function () {
      var num = Number($("span.num").text());
      $("span.down").removeClass("disabled");
      num++;
      $("span.num").text(num);
      $(".fix_bar_wrapper").attr("data-num", "" + num);
      $(".bar_device_info").find("span.title").text("Smartisan 颈挂蓝牙耳机 × " + num + " ");
      var price = Number($(".fix_bar_wrapper").attr("data-price"));
      var total_money = price * num;
      $(".bar_price").find("span").text(total_money + ".00");
    });
    //加入购物车
    $(".add_cart").click(function () {
      var id = $(".fix_bar_wrapper").attr("data-id");
      var num = $(".fix_bar_wrapper").attr("data-num");
      //1、判断是否是第一次添加
      var first = !$.cookie("goods");
      if (first) {
        $.cookie("goods", JSON.stringify([{ id: id, num: num }]), {
          expires: 7,
          path: "/"
        });
      } else {
        //2、不是第一次，判定之前是否添加过
        var cookieArr = JSON.parse($.cookie("goods"));
        var same = false; //假设没有相同的数据
        for (var i = 0; i < cookieArr.length; i++) {
          if (cookieArr[i].id == id) {
            same = true;
            break;
          }
        }
        same ? cookieArr[i].num++ : cookieArr.push({ id: id, num: num });

        //3、将处理完的数据存储回去
        $.cookie("goods", JSON.stringify(cookieArr), {
          expires: 7,
          path: "/"
        });
      }
      SC.s_c();
    });
  }
  return {
    check: check,
    n_i: nav_insert,
    n_s: nav_scroll,
    g_i: goods_insert,
    a_g: add_goods,
    behavior: behavior,
    end: end
  };
});