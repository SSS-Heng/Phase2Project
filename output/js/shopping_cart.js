"use strict";

define(["jquery", "jquery_cookie"], function ($) {
  function check() {
    console.log("shopping_cart.js开始执行");
    console.log($ ? "ok" : "error");
  }
  function end() {
    console.log("shopping_cart.js执行结束");
  }
  //加载购物车页面
  function cart_msg() {
    var cookieStr = $.cookie("goods");
    if (!cookieStr) {
      $(".cart_insert").html("");
      return;
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
          var total_money = Number(newArr[_i].price) * Number(newArr[_i].num);
          str += "\n          <div class=\"divide\" data-id=\"" + newArr[_i].id + "\">\n            <!---->\n            <div class=\"cart_items\">\n              <!---->\n              <div class=\"cart_item\">\n                <div class=\"checkbox_container\">\n                  <span class=\"m_blue_checkbox_new checkbox_on\"> </span>\n                </div>\n                <div class=\"item_wrapper\">\n                  <div class=\"items_thumb\">\n                    <img height=\"80\" width=\"80\" src=\"" + newArr[_i].image + "\" alt=\"" + newArr[_i].title + "\">\n                    <a target=\"_blank\" title=\"" + newArr[_i].title + "\" href=\"https://www.smartisan.com/item/" + newArr[_i].id + "\"></a>\n                  </div>\n                  <div class=\"name hide_row\">\n                    <div class=\"name_table\">\n                      <a target=\"_blank\" title=\"" + newArr[_i].title + "\" href=\"https://www.smartisan.com/item/" + newArr[_i].id + "\">" + newArr[_i].title + "</a>\n                      <ul class=\"attribute clearfix\">\n                        <li>" + newArr[_i].note + "</li>\n                      </ul>\n                    </div>\n                  </div>\n                  <div class=\"operation\">\n                    <a class=\"items_delete_btn\" data-id=\"" + newArr[_i].id + "\"></a>\n                  </div>\n                  <div>\n                    <!---->\n                    <div class=\"subtotal\">\n                      <i>\xA5</i>\n                      <span>" + total_money + "</span>\n                    </div>\n                    <!---->\n                    <div class=\"item_cols_num\">\n                      <!---->\n                      <div class=\"quantity\">\n                        <span class=\"button down disabled\"></span>\n                        <span class=\"num\">\n                          <input name=\"number\" readonly=\"readonly\" type=\"number\" value=\"" + newArr[_i].num + "\">\n                        </span>\n                        <span class=\"button up\"></span>\n                        <!---->\n                      </div>\n                      <!---->\n                      <!---->\n                    </div>\n                    <div class=\"price\">\n                      <i>\xA5</i>\n                      <span>" + newArr[_i].price + "</span>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n          ";
        }
        $(".cart_insert").html(str);
        console.log("加载购物车页面完成");
      },
      error: function error(msg) {
        console.log(msg);
      }
    });
    total_data();
  }
  //统计栏刷新
  function total_data() {
    var cookieStr = $.cookie("goods");
    var sum = 0;
    if (cookieStr) {
      var cookieArr = JSON.parse(cookieStr);
      for (var i = 0; i < cookieArr.length; i++) {
        sum += cookieArr[i].num;
      }
    } else {
      $(".text_choose_all").prev().removeClass("checkbox_on");
      $(".total_num").find("h4 i").text(0);
      $(".total_num").find("h5 i").text(0);
      $(".total_price").find("h4 i span").text(0.00);
    }
    $(".total_num").find("h5 i").text(sum); //总商品数
    var checkbox_node = $(".cart_insert").find(".checkbox_on");
    var check_num = 0;
    var check_money = 0;
    if (checkbox_node.length) {
      for (var _i2 = 0; _i2 < checkbox_node.length; _i2++) {
        var parent_node = checkbox_node.eq(_i2).closest("div.divide");
        check_num += parent_node.find("input[name='number']").val();
        check_money += Number(parent_node.find(".subtotal span").text());
      }
    } else {
      check_num = 0;
      check_money = 0;
    }
    $(".total_num").find("h4 i").text(check_num); //选中商品数
    if (check_num == sum) {
      //是否全选
      $(".text_choose_all").prev().addClass("checkbox_on");
    } else {
      $(".text_choose_all").prev().removeClass("checkbox_on");
    }
    $(".total_price").find("h4 i span").text(check_money); //选中总金额
  }
  //购物车操作集合
  function cart_operation() {
    //选择按钮
    $("div.divide span.m_blue_checkbox_new").live("click", function () {
      $(this).hasClass("checkbox_on") ? $(this).removeClass("checkbox_on") : $(this).addClass("checkbox_on");
      total_data();
    });
    $(".js_choose_all span.m_blue_checkbox_new").click(function () {
      $(this).hasClass("checkbox_on") ? $("span.m_blue_checkbox_new").removeClass("checkbox_on") : $("span.m_blue_checkbox_new").addClass("checkbox_on");
      total_data();
    });
    //加减按钮
    $(".button.down").live("click", function () {
      var num_node = $(this).next(".num").find("input");
      var num = Number(num_node.val());
      num--;
      if (num <= 1) {
        $(this).addClass("disabled");
        num = 1;
      }
      num_node.val(num);
      var price = Number($(this).closest("div.divide").find("div.price span").text());
      var money = price * num;
      $(this).closest("div.divide").find("div.subtotal span").text(money);
      total_data();
    });
    $(".button.up").live("click", function () {
      var num_node = $(this).pre(".num").find("input");
      var num = Number(num_node.val());
      num++;
      $(this).closest("div.divide").find(".button.down").removeClass("disabled");
      num_node.val(num);
      var price = Number($(this).closest("div.divide").find("div.price span").text());
      var money = price * num;
      $(this).closest("div.divide").find("div.subtotal span").text(money);
      total_data();
    });
    //删除按钮
    $(".items_delete_btn").live("click", function () {
      var id = $(this).attr("data-id");
      $(this).closest("div.divide").remove();
      var cookieArr = JSON.parse($.cookie("goods"));
      var index = cookieArr.findIndex(function (item) {
        return item.id == id;
      });
      cookieArr.splice(index, 1);
      if (cookieArr.length) {
        $.cookie("goods", JSON.stringify(cookieArr), {
          expires: 7,
          path: "/"
        });
      } else {
        $.cookie("goods", null);
      }
      total_data();
    });
    //删除选中所有商品
    $(".delete_choose_goods").click(function () {
      var checkbox_node = $(".cart_insert").find(".checkbox_on");
      var cookieArr = JSON.parse($.cookie("goods"));
      if (!checkbox_node.length) {
        return;
      }

      var _loop = function _loop(i) {
        var parent_node = checkbox_node.eq(i).closest("div.divide");
        var id = parent_node.attr("data-id");
        parent_node.remove();
        var index = cookieArr.findIndex(function (item) {
          return item.id == id;
        });
        cookieArr.splice(index, 1);
      };

      for (var i = 0; i < checkbox_node.length; i++) {
        _loop(i);
      }
      if (cookieArr.length) {
        $.cookie("goods", JSON.stringify(cookieArr), {
          expires: 7,
          path: "/"
        });
      } else {
        $.cookie("goods", null);
      }
      total_data();
    });
  }
  return {
    check: check,
    c_m: cart_msg,
    t_d: total_data,
    c_o: cart_operation,
    end: end
  };
});