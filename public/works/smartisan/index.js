//封装的函数
function getDom(id){
  return document.getElementById(id)
}

function addEvent(el,event,fn){
     if(el.addEventListener){
      el.addEventListener(event,fn,false);
     } else if(el.attachEvent){
      el.attachEvent('on'+event,fn);
     }
  }


window.onload = function(){

//焦点轮播图部分
    var slide_box = getDom('slide-box');
    var slide_show = getDom('slide-show')
    var slide_button = getDom('slide-button');
    var slide_button_show = slide_button.getElementsByTagName('span');
    var index = 1;
    var timer;

    function changePic(offset){
         var left = parseInt(slide_box.style.left) + offset;    
         var time = 500;       //完成一张图片转换所用的时间
         var interval = 10;    //完成一张图片转换所移动的次数
         var speed = offset/(time/interval);  //speed是每次移动的距离, time/interval是一次移动所用的时间；
        
        //用递归的方式实现动画效果
         var go = function() {
          if ( (speed > 0 && parseInt(slide_box.style.left) < left)  || (speed < 0 && parseInt(slide_box.style.left) > left)) {
             slide_box.style.left = parseInt(slide_box.style.left) + speed + 'px';   
             setTimeout(go, interval);  
          } else {
               if(left < -3360){
                left = 0;
               }
               slide_box.style.left = left + 'px';
       }
    }
      go();
  }
    
    function showButton(){
      for (var i = 0; i < slide_button_show.length; i++){
        if(slide_button_show[i].className == 'active'){
          slide_button_show[i].className = 'slide_button_show';
        }
      }                                                     
      slide_button_show[index-1].className = 'active';
    }

   function play(){ 
      timer = setInterval(function(){
        changePic(-1120);
        if(index == 4){
          index = 1;
        } else {
          index = parseInt(index) + 1;
        }
        showButton();
   },3000);
 }

   play();

   for(var i = 0; i < slide_button_show.length; i++){

        addEvent(slide_button_show[i],'click',function(){
          var myIndex = this.getAttribute('index');    
               changePic(-1120*(myIndex-index)); 
               index = myIndex;
               showButton();                        
        })
    }

   addEvent(slide_show,'mouseover',function(){
        clearInterval(timer);
   })

    addEvent(slide_show,'mouseout',play);


//购物车部分
    var cart = getDom('cart');
    var cart_show_wrapper = getDom('cart-show-wrapper');
    addEvent(cart,'mouseover',function(){
    	cart_show_wrapper.style.display = 'block';
    })
    addEvent(cart,'mouseout',function(){
    	cart_show_wrapper.style.display = 'none';
    })


//选择语言部分
    var language = getDom('language');
    var sub_language = getDom('sub-language');
    addEvent(language,'mouseover',function(){
    	sub_language.style.display = 'block';
    })
    addEvent(document,'click',function(){
        sub_language.style.display = 'none';
    })


//滑动到顶端部分
    var toTop = getDom('toTop');    
    addEvent(window,'scroll',function(){   
    	var  scrollTop = document.documentElement.scrollTop || document.body.scrollTop;   
    	if(scrollTop > 700){
    	toTop.style.display = 'block';
       } else {
       	toTop.style.display = 'none';
       }
    })

}