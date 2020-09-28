define(["jquery-1.11.3.min"],function($){
  //轮播图动画
  function carousel(){
    let aBtns = $(".carousel_tab_insert").find("span");
    let oDivs = $(".carousel_img_insert").find("div");
    let iNow = 0;
    let timer = null;

    $(".banner_wrap").mouseenter(function () {
      clearInterval(timer);
    });

    $(".banner_wrap").mouseleave(function () {
      //轮播
      timer = setInterval(function () {
        iNow++;
        tab();
      }, 2000);
    });

    aBtns.click(function () {
      iNow = $(this).index();
      tab();
    });

    //轮播
    timer = setInterval(function () {
      iNow++;
      tab();
    }, 2000);

    function tab() {
      if (iNow == aBtns.size()) {
        iNow = 0;
      }
      aBtns.removeClass("carousel_active").eq(iNow).addClass("carousel_active");
      oDivs.removeClass("carousel_img_active").eq(iNow).addClass("carousel_img_active");
    }
  }
  //热门商品切换动画
  function hot_goods_operation(){
    $(".btn_left").click(function(){
      $(".btn_left").addClass("disabled");
      $(".btn_right").removeClass("disabled");
      $(".hot_goods_insert").css("transform","translate(0px, 0px)");
    });
    $(".btn_right").click(function(){
      $(".btn_left").removeClass("disabled");
      $(".btn_right").addClass("disabled");
      $(".hot_goods_insert").css("transform","translate(-1218px, 0px)");
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
  return {
    ca:carousel,
    h_g_o:hot_goods_operation,
    n_s:nav_scroll
  };
});