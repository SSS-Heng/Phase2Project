"use strict";

define(["jquery", "jquery_cookie"], function ($) {
  function check() {
    console.log("small_cart.js开始执行");
  }
  function end() {
    console.log("small_cart.js执行结束");
  }
  //加载购物车页面
  function small_cart_msg() {
    var cookieStr = $.cookie("goods");
    if (!cookieStr) {
      $(".cart_empty").show();
      $(".cart_list_wrapper").hide();
      $("span.cart_num").hide();
      return;
    } else {
      $(".cart_empty").hide();
      $(".cart_list_wrapper").show();
      $("span.cart_num").show();
    }
    //下载所有的商品数据
    $.ajax({
      url: "../json/hot_goods.json",
      success: function success(data) {
        var arr = data.data.list;
        var cookieArr = JSON.parse(cookieStr);
        var newArr = [];
        for (var i = 0; i < arr.length; i++) {
          for (var j = 0; j < cookieArr.length; j++) {
            if (cookieArr[j].id == arr[i].id) {
              newArr.push({
                id: arr[i].id,
                num: cookieArr[j].num,
                name: arr[i].name,
                title: arr[i].shop_info.title,
                sub_title: arr[i].shop_info.sub_title,
                price: arr[i].price,
                image: arr[i].shop_info.ali_image,
                note: arr[i].shop_info.spec_json[0].item_value
              });
              break;
            }
          }
        }
        //通过newArr。处理数据，将数据添加页面上
        var str = "";
        for (var _i = 0; _i < newArr.length; _i++) {
          str += "\n          <li class=\"cart_item\" data-id=\"" + newArr[_i].id + "\">\n            <img src=\"" + newArr[_i].image + "\" class=\"cart_picture\">\n            <div class=\"cart_detail\">\n              <p class=\"title\">" + newArr[_i].name + "</p>\n              <p class=\"attrs\">\n                <span class=\"attr\">" + newArr[_i].note + "</span>\n              </p>\n              <p class=\"cart_price\">\n                <span class=\"price\" data-price=\"" + newArr[_i].price + "\">" + newArr[_i].price + "</span>\n                <span class=\"count\" data-count=\"" + newArr[_i].num + "\">" + newArr[_i].num + "</span>\n              </p>\n            </div>\n            <div class=\"delete_button\" data-id=\"" + newArr[_i].id + "\"></div>\n          </li>\n          ";
        }
        $("ul.cart_list").html(str);
        sum_num_price();
        console.log("加载购物车页面完成");
      },
      error: function error(msg) {
        console.log(msg);
      }
    });
  }
  //统计并修改购物车总计
  function sum_num_price() {
    var count_node = $("header ul.cart_list").find("span.count");
    var price_node = $("header ul.cart_list").find("span.price");
    var total_count = 0;
    var total_money = 0;
    for (var i = 0; i < count_node.length; i++) {
      total_count += Number(count_node.eq(i).attr('data-count'));
      total_money += Number(count_node.eq(i).attr('data-count')) * Number(price_node.eq(i).attr('data-price'));
    }
    $("p.total_count strong").html(total_count);
    $("p.total_money span").html(total_money);
  }
  //删除购物内容
  function delete_goods() {
    console.log("购物车删除函数赋予");
    $("ul.cart_list").on("click", ".delete_button", function () {
      console.log("准备删除数据");
      var id = Number($(this).attr("data-id"));
      $(this).closest("li").remove();
      //删除页面上的节点  从cookie中删除数据
      var cookieArr = JSON.parse($.cookie("goods"));
      console.log($.cookie("goods"));
      for (var i = 0; i < cookieArr.length; i++) {
        if (cookieArr[i].id == id) {
          cookieArr.splice(i, 1);
          break;
        }
      }
      if (cookieArr.length) {
        $.cookie("goods", JSON.stringify(cookieArr), {
          expires: 7,
          path: "/"
        });
        //更新数据数量
        sum_num_price();
      } else {
        $.cookie("goods", null, { path: "/" });
        $(".cart_empty").show();
        $(".cart_list_wrapper").hide();
        $("span.cart_num").hide();
        console.log("成功删除数据");
      }
    });
  }
  return {
    check: check,
    s_c: small_cart_msg,
    s_n_p: sum_num_price,
    d_g: delete_goods,
    end: end
  };
});