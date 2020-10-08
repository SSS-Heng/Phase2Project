define(["small_cart","jquery","jquery_cookie"],function(SC,$){
  function check(){
    console.log("goods.js开始执行");
    console.log($?"ok":"error");
  }
  function end(){
    console.log("goods.js执行结束");
  }
  //二级导航加载数据并插入节点
  function nav_insert(){
    $.ajax({
      url: "../json/second_nav.json",
      success: function(json_arr){
        let nav = json_arr;
        let str = ``;
        let type = null;
        for(let i = 0; i < nav.length; i++){
          str += `
          <li>
            <a href="${nav[i].url}" class="title">${nav[i].name}</a>
              <div class="sub_panel_wrapper">
                <div class="nav_sub_container">
          `;
          type = nav[i].type;
          if(type == "category"){
            str += `<ul class="category_wrapper">`;
          }else if(type == "goods"){
            str += `<ul class="goods_container">`;
          }else{
            console.log("警告，二级导航目录创建错误，错误点：<ul class='category/goods_container'>");
          }
          let nav_list = nav[i].list;
          for(let j = 0; j < nav_list.length; j++){
            str += `<li class="item">`;
            if(type == "category"){//种类导航
              let nav_list_sub = nav_list[j].sub;
              str += `
              <div class="container">
                <div class="title">
                  <a href="#">${nav_list[j].title}</a>
                </div>
              `;
              if(nav_list_sub.length > 8){
                str += `<ul class="category_container" style="width:606px">`;
              }else if (nav_list_sub.length > 4){
                str += `<ul class="category_container" style="width:404px">`;
              }else{
                str += `<ul class="category_container" style="width:202px">`;
              }
              for(let k = 0; k < nav_list_sub.length; k++){
                str += `
                <li class="category_item">
                  <a href="#" class="link" id="${nav_list_sub[k].id}">
                    <img src="${nav_list_sub[k].image}" class="picture">
                    <span class="sub_title">${nav_list_sub[k].name}</span>
                  </a>
                </li>
                `;
              }
              str += `</ul></div>`;
            }else if(type == "goods"){//商品导航
              str += `
              <a href="#" class="link" id="${nav_list[j].spu}">
                <img src="${nav_list[j].ali_image}" class="picture">
                <p class="name">${nav_list[j].spu_name}</p>
                <p class="price">${nav_list[j].sell_price}</p>
              </a>
              `;
            }else{
              console.log("警告，二级导航内容创建错误，错误点：<li class='item'></li>");
            }
            str += `</li>`;
          }
          str += `</ul></div></div></li>`;
        }
        $(`${str}`).prependTo($(".nav_insert"));
      },
      error: function(msg){
        console.log(msg);
      }
    });
  }
  //网页卷动时二级导航的动画
  function nav_scroll(){
    $(window).scroll(function(){
      let oTop = $(document).scrollTop();
      if(oTop >= 45){
        $(".search_wrapper").css("display","none");
        $(".nav_aside").css("display","block");
      }else if(oTop < 45){
        $(".search_wrapper").css("display","block");
        $(".nav_aside").css("display","none");
      }else{
        console.log("网页卷动时二级导航动画出错");
      }
    });
  }
  //放大镜动画
  function magnifying_glass(){
    $(".small").mousemove(function(ev){
      let l = ev.clientX - $(this).offset().left - 100;
      let t = ev.clientY - $(this).offset().top - 100;
      //限制出界
      l = Math.max(0, l);
      l = Math.min(200, l);
      t = Math.max(0, t);
      t = Math.min(200, t);
      $(".mark").css({
        left: l,
        top: t
      })
      $(".big img").css({
        left: -2 * l,
        top: -2 * t
      })
    })
  }
  //相关商品插入
  function goods_insert(){
    $.ajax({
      url:"../json/hot_goods.json",
      success: function(json_arr){
        let data = json_arr.data.list;
        let str = ``;
        str += `
        <!--伪结构插入点，警告：样式中使用了:nth-child选择,该行不能删除-->
        `;
        for(let index = 0; index < 8; index++){
          let i = index + 9;
          let shop = data[i]; 
          str += `
          <li class="recommend_item_four">
            <div class="product_box_item cart_box" data-shopId="${shop.id}">
              <div>
                <div class="item_img"> 
                  <img src="${shop.shop_info.ali_image}" style="opacity: 1;"> 
                </div>
                <h4>${shop.shop_info.title}</h4>
                <h6>${shop.shop_info.sub_title}</h6>
              </div>
              <div class="params_colors"><!--默认不插入任何节点-->
              </div>
              <div class="item_price clearfix"> 
                <span>
                  <i>¥</i>
                  <span>${shop.price}</span>
                </span> 
              </div>
              <div class="button_container">
                <a href="https://www.smartisan.com/item/${shop.id}">
                  <button class="normal">查看详情</button>
                </a>
                <button class="confirm" data-id="${shop.id}">加入购物车</button>
              </div>
            </div>
          </li>
          `;
        }
        $(".hot_good_insert").html(str);
      },
      error: function(msg){
        console.log(msg);
      }
    });
  }
  //相关商品加入购物车操作
  function add_goods(){
    $(".hot_good_insert").on("click","button.confirm", function(){
      //取出当前点击加入购物车按钮的id
      let id = Number($(this).attr("data-id"));
      //1、判断是否是第一次添加
      let first = !($.cookie("goods"));
      if(first){
        $.cookie("goods", JSON.stringify([{id:id,num:1}]), {
          expires: 7,
          path:"/"
        });
      }else{
        //2、不是第一次，判定之前是否添加过
        let cookieArr = JSON.parse($.cookie("goods"));
        let same = false; //假设没有相同的数据
        for(var i = 0; i < cookieArr.length; i++){
          if(cookieArr[i].id == id){
            same = true;
            break;
          }
        }
        same ? cookieArr[i].num++ : cookieArr.push({id:id, num: 1});

        //3、将处理完的数据存储回去
        $.cookie("goods", JSON.stringify(cookieArr), {
          expires: 7,
          path:"/"
        });
      }
      SC.s_c();
    });
  }
  //商品详细页的其他行为
  function behavior(){
    //商品数量减
    $("span.down").click(function(){
      let num = Number($("span.num").text());
      if(num <= 1){
        $("span.down").addClass("disabled");
        return;
      }
      num--;
      $("span.num").text(num);
      $(".fix_bar_wrapper").attr("data-num",""+num);
      $(".bar_device_info").find("span.title").text("Smartisan 颈挂蓝牙耳机 × " + num + " ");
      let price = Number($(".fix_bar_wrapper").attr("data-price"));
      let total_money = price * num;
      $(".bar_price").find("span").text(total_money + ".00");
    });
    //商品数量加
    $("span.up").click(function(){
      let num = Number($("span.num").text());
      $("span.down").removeClass("disabled");
      num++;
      $("span.num").text(num);
      $(".fix_bar_wrapper").attr("data-num","" + num);
      $(".bar_device_info").find("span.title").text("Smartisan 颈挂蓝牙耳机 × " + num + " ");
      let price = Number($(".fix_bar_wrapper").attr("data-price"));
      let total_money = price * num;
      $(".bar_price").find("span").text(total_money + ".00");
    });
    //加入购物车
    $(".add_cart").click(function(){
      let id = $(".fix_bar_wrapper").attr("data-id");
      let num = $(".fix_bar_wrapper").attr("data-num");
      num = Number(num);
      id = Number(id);
      //1、判断是否是第一次添加
      let first = !($.cookie("goods"));
      if(first){
        $.cookie("goods", JSON.stringify([{id:id,num:num}]), {
          expires: 7,
          path:"/"
        });
      }else{
        //2、不是第一次，判定之前是否添加过
        let cookieArr = JSON.parse($.cookie("goods"));
        let same = false; //假设没有相同的数据
        for(var i = 0; i < cookieArr.length; i++){
          if(cookieArr[i].id == id){
            same = true;
            break;
          }
        }
        same ? cookieArr[i].num += num : cookieArr.push({id:id, num: num});
        console.log(same);
        //3、将处理完的数据存储回去
        $.cookie("goods", JSON.stringify(cookieArr), {
          expires: 7,
          path:"/"
        });
      }
      SC.s_c();
    });
  }
  return {
    check,
    n_i:nav_insert,
    n_s:nav_scroll,
    g_i:goods_insert,
    a_g:add_goods,
    m_g:magnifying_glass,
    behavior,
    end
  };
});