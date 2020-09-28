define(["jquery-1.11.3.min","home_insert","home_behavior"],function($,I,B){
  //json读取并绘制主页html（不包括购物车）
  function insert(){
    //二级导航加载数据并插入节点
    $.ajax({
      url: "json/second_nav.json",
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
              str += `
              <div class="container">
                <div class="title">
                  <a href="#">${nav_list[j].title}</a>
                </div>
                <ul class="category_container">
              `;
              let nav_list_sub = nav_list[j].sub;
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
      url: "json/home.json",
      success: function(home_json){
        //轮播图插入
        let home_carousel = home_json.data.home_carousel;
        I.slide_show&&I.slide_show(home_carousel);
        //热门活动插入
        let home_activities = home_json.data.home_activities;
        I.hot_active&&I.hot_active(home_activities);
        //热门商品插入
        let home_hot = home_json.data.home_hot;
        I.hot_goods&&I.hot_goods(home_hot);
        //页面主体插入
        let home_floors = home_json.data.home_floors;
        I.goods&&I.goods(home_floors);
      },
      error: function(msg){
        console.log(msg);
      }
    })
  }
  //主页个别动作设置
  function behavior(){
    B.ca();
    B.n_s();
    B.h_g_o();
  }
  return {
    ins:insert,
    beh:behavior
  };
});