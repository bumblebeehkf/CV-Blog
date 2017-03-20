$(document).ready(function() {

  //搭配、配件、周边三大部分中选项卡的切换
  $('.top-button ul').each(function() {

    $(this).find('li').each(function() {

      var index = $(this).index();
      $(this).mouseenter(function() {
          $(this).siblings().find('a').removeClass('top-button-border');
          $(this).find('a').addClass('top-button-border');

          $(this).parents('.main-top').next().find('.right-lattice').hide();
          $(this).parents('.main-top').next().find('.right-lattice').eq(index).show();
      })
    })
  })


  //打开地区选择和遮蔽层
  $('.select').click(function() {    
       $('.switch').slideDown();
       $('.shield').fadeIn();
       return false;
     })

  $('.x').click(function() {
      $('.switch').slideUp();
      $('.shield').fadeOut();
      return false;
  })


  //搜索框效果
  $('.search-text').focus(function() {
      $('.search-hotwords').fadeOut();
      $('.search-form').addClass('search-button-blur')
  })

  $('.search-text').blur(function() {
      $('.search-hotwords').fadeIn();
      $('.search-form').removeClass('search-button-blur');
  })


  //购物车效果
  $('.topbar-care').mouseenter(function() {
      $('.care-menu').slideToggle();
      $('.kong').addClass('kong-change');
      $('.topbar-care').addClass('care-change');
  })

  $('.topbar-care').mouseleave(function() {
      $('.care-menu').slideToggle();
      $('.kong').removeClass('kong-change');
      $('.topbar-care').removeClass('care-change');
  })
  

  //左侧菜单
  $('.con-top-menu ul').find('li').each(function() {
        $(this).mouseenter(function() {  
           $(this).find('div').fadeIn();
      })
         $(this).mouseleave(function() {
           $(this).find('div').fadeOut();
      })
  })


  //顶部导航
  $('.header-nav ul').find('.header-nav-li').each(function() {  
        $(this).mouseenter(function() {
            $(this).find('div').show();
        })
        $(this).mouseleave(function() {
            $(this).find('div').hide('fast')
        })
  })


  //焦点轮播图
  $('.rolling').click(function() {
      $('.rolling').removeClass('touch');
      $(this).addClass('touch');

      var n = $(this).text();
      $('.rolling0').fadeTo(300,0);
      $('.rolling0').eq(n).fadeTo(100,1);
      var ahref = $('.rolling0').eq(n).attr('href');
      $('.rolling0').eq(4).attr('href', ahref);

      return false;
  })

  var timer;
  var index = 0;
  function play() {
  timer = setInterval(function() {
      index ++;
      if (index > 4) {
          index = 0;
      }
      $('.rolling').eq(index).trigger('click');  
      }, 4000)
}

  play();

  $('.rolling0').mouseenter(function() {
       clearInterval(timer);
  })
  $('.rolling0').mouseleave(play)


  //明星单品切换
  $('.con-bottom-unclick').addClass('con-bottom-button-show');

  $(".con-bottom-onclick").click(function(){
      $(".carousel-one").fadeIn(500)
      $(".carousel-tow").fadeOut(500)
      $(this).addClass('con-bottom-button-show');
      $(this).siblings().removeClass('con-bottom-button-show');
      return false;  
    });
  $(".con-bottom-unclick").click(function(){
      $(".carousel-tow").fadeIn(800)  
      $(".carousel-one").fadeOut(800)
      $(this).addClass('con-bottom-button-show');
      $(this).siblings().removeClass('con-bottom-button-show');
      return false;  
    });

  var starNum = 1;
  var starArray = ['.con-bottom-onclick', '.con-bottom-unclick'];
  setInterval(function() {   
      starNum = starNum == 0 ? 1 : 0;
      $(starArray[starNum]).trigger('click');
       }, 4000)

})