define(["jquery","jquery_cookie"],function($){
  function check(){
    console.log("small_cart.js开始执行");
  }
  function end(){
    console.log("small_cart.js执行结束");
  }
  //加载购物车页面
  function small_cart_msg(){
    var cookieStr = $.cookie("goods");
    if(!cookieStr){
      $(".cart_empty").show();
      $(".cart_list_wrapper").hide();
      return;
    }else{
      $(".cart_empty").hide();
      $(".cart_list_wrapper").show();
    }
    //下载所有的商品数据
    $.ajax({
      url: "../json/hot_goods.json",
      success: function(data){
        let arr = data.data.list;
        let cookieArr = JSON.parse(cookieStr);
        let newArr = [];
        for(let i = 0; i < arr.length; i++){
          for(let j = 0; j < cookieArr.length; j++){
            if(cookieArr[j].id == arr[i].id){
              newArr.push({
                id:arr[i].id,
                num:cookieArr[j].num,
                name:arr[i].name,
                title:arr[i].shop_info.title,
                sub_title:arr[i].shop_info.sub_title,
                price:arr[i].price,
                image:arr[i].shop_info.ali_image,
                note:arr[i].shop_info.spec_json[0].item_value
              });
              break;
            }
          }
        }
        //通过newArr。处理数据，将数据添加页面上
        let str = ``;
        for(let i = 0; i < newArr.length; i++){
          str += `
          <li class="cart_item" data-id="${newArr[i].id}">
            <img src="${newArr[i].image}" class="cart_picture">
            <div class="cart_detail">
              <p class="title">${newArr[i].name}</p>
              <p class="attrs">
                <span class="attr">${newArr[i].note}</span>
              </p>
              <p class="cart_price">
                <span class="price" data-price="${newArr[i].price}">${newArr[i].price}</span>
                <span class="count" data-count="${newArr[i].num}">${newArr[i].num}</span>
              </p>
            </div>
            <div class="delete_button" data-id="${newArr[i].id}"></div>
          </li>
          `;
        }
        $("ul.cart_list").html(str);
        sum_num_price();
        console.log("加载购物车页面完成");
      },
      error: function(msg){
        console.log(msg);
      }
    });
  }
  //统计并修改购物车总计
  function sum_num_price(){
    let count_node = $("header ul.cart_list").find("span.count");
    let price_node = $("header ul.cart_list").find("span.price");
    let total_count = 0;
    let total_money = 0;
    for(let i = 0; i < count_node.length; i++){
      total_count += Number(count_node[i].attr('data-count'));
      total_money += Number(count_node[i].attr('data-count')) * Number(price_node[i].attr('data-price'));
    }
    $("p.total_count strong").html(total_count);
    $("p.total_money span").html(total_money);
  }
  //删除购物内容
  function delete_goods(){
    $("ul.cart_list .delete_button").live("click", function(){
      let id = $(this).attr("data-id");
      $(this).closest("li").remove();
      //删除页面上的节点  从cookie中删除数据
      let cookieArr = JSON.parse($.cookie("goods"));
      for(let i = 0; i < cookieArr.length; i++){
        if(cookieArr[i].id == id){
          cookieArr.splice(i, 1);
          break;
        }
      }
      if(cookieArr.length){
        $.cookie("goods", JSON.stringify(cookieArr), {
          expires: 7,
          path:"/"
        });
        //更新数据数量
        sum_num_price();
      }else{
        $.cookie("goods", null);
        $(".cart_empty").show();
        $(".cart_list_wrapper").hide();
      }
      console.log("成功删除数据");
    })
  }
  return {
    check,
    s_c:small_cart_msg,
    s_n_p:sum_num_price,
    d_g:delete_goods,
    end
  };
})