define(["jquery-1.11.3.min"],function($){
  function slide_show(home_carousel){//轮播图加载插入
    let data = home_carousel;
    let str = ``;
    let str1 = ``;
    for(let i = 0; i < data.length; i++){
      if(i == 0){
        str += `<div class="swiper_slide carousel_img_active">`;
        str1 += `<span class="swiper_pagination_bullet carousel_active"></span>`;
      }else{
        str += `<div class="swiper_slide">`;
        str1 += `<span class="swiper_pagination_bullet"></span>`;
      }
      str += `<a href="${data[i].link}">`;
      str += `<img src="${data[i].image[0]}" alt="banner" class="banner_img">`;
      str += `
      </a>
      </div>
      `;
    }
    $(`${str}`).appendTo($(".carousel_img_insert"));
    $(`${str1}`).appendTo($(".carousel_tab_insert"));
  }
  function hot_active(home_activities){//热门活动加载插入
    let data = home_activities;
    let str = ``;
    for(let i = 0; i < data.length; i++){
      str += `
      <figure class="advertise">
        <img src="${data[i].image}" alt="广告位图片">
        <a href="${data[i].link}" class="ad_click_mask"></a>
      </figure>
      `;
    }
    $(`${str}`).appendTo($(".hot_active_insert"));
  }
  function hot_goods(home_hot){//热门商品加载插入
    let data = home_hot;
    let str = ``;
    for(let i = 0; i < data.length; i++){
      let sku = data[i].spu.sku_info[0]
      str += `
      <section class="spu_item_normal_box" id="${sku.id}">
        <figure class="item_cover">
          <a href="https://www.smartisan.com/item/${sku.id}"><img src="${sku.ali_image}" alt="商品图片"></a>
        </figure>
        <article>
          <h3>${sku.title}</h3>
          <h5 class="text_product_title">
            ${sku.sub_title}
          </h5>
        </article>
        <aside class="item_attr_colors">
        </aside>
        <article class="item_price">
          <span>￥${sku.price}</span>
          <span class="orignal_price"><!--没有找到对应数据，暂时搁置--></span>
        </article>
      </section>
      `;
    }
    $(`${str}`).appendTo($(".hot_goods_insert"));
  }
  function goods(home_floors){//页面主体部分载入
    let data = home_floors;
    let str = ``;
    for(let i = 0; i < data.length; i++){
      let tab_items = data[i].tabs[0].tab_items;
      str += `
      <div class="normal_shop_box">
        <section class="common_normal_box">
          <header class="d_flex justify_content_between">
              <h5>${data[i].title}</h5>
          </header>
          <aside class="common_flex_box multi_line flex_four">
            <figure class="advertise flex_2in4">
              <img src="${tab_items[0].image}" alt="广告大图">
              <a href="${tab_items[0].link}" class="ad_click_mask"></a>
            </figure>
      `;
      for(let j = 1; j < tab_items.length; j++){
        let sku_info = tab_items[j].spu.sku_info[0];
        str += `
        <section class="spu_item_normal_box flex_item">
          <figure class="item_cover">
            <a href="https://www.smartisan.com/item/${sku_info.id}"><img src="${sku_info.ali_image}"></a>
          </figure>
          <article>
            <h3>${sku_info.title}</h3>
            <h5 class="txt_product_title">${sku_info.sub_title}</h5>
          </article>
          <aside class="item_attr_colors"><!--不做--></aside>
          <article class="item_price">
            <span>￥${sku_info.price}</span>
            <span class="orignal_price"><!--因数据问题，搁置--></span>
          </article>
        </section>
        `;
      }
      str += `
      </aside>
      </section>
      </div>
      `;
      $(`${str}`).insertBefore($(".normal_shop_insert"));
    }
  }
  return {
    slide_show,
    hot_active,
    hot_goods,
    goods
  };
});