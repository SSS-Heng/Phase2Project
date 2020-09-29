define(["jquery","home_insert","home_behavior"],function($,I,B){
  function check(){
    console.log("home.js开始执行");
    console.log($?"ok":"error");
  }
  function end(){
    console.log("home.js执行结束");
  }
  //json读取并绘制主页html（不包括购物车）
  function insert(){
    //二级导航加载数据并插入节点
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
    //主页主体部分加载数据并插入节点
    $.ajax({
      url: "../json/home.json",
      success: function(home_json){
        I.check();
        //轮播图插入
        let home_carousel = home_json.data.home_carousel;
        I.slide_show&&I.slide_show(home_carousel,B.ca);
        //热门活动插入
        let home_activities = home_json.data.home_activities;
        I.hot_active&&I.hot_active(home_activities);
        //热门商品插入
        let home_hot = home_json.data.home_hot;
        I.hot_goods&&I.hot_goods(home_hot);
        //页面主体插入
        let home_floors = home_json.data.home_floors;
        I.goods&&I.goods(home_floors);
        I.end();
      },
      error: function(msg){
        console.log(msg);
      }
    })
  }
  //主页个别动作设置
  function behavior(){
    B.check();
    //B.ca();
    B.n_s();
    B.h_g_o();
    B.end();
  }
  return {
    check,
    ins:insert,
    beh:behavior,
    end
  };
});