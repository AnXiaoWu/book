
var nav = document.querySelector('nav')

// console.log(nav);

window.onscroll=function(){
    var top = document.body.scrollTop||document.documentElement.scrollTop
    // console.log('页面滚动'+top);
    if(top>=120){
        nav.style.position='fixed';
        nav.style.top='0';
        nav.style.zIndex=999;
        nav.style.backgroundColor='##2b2d4270'
    }else{
        nav.style.position='static'
        nav.style.backgroundColor='#2b2d42'

    }
}
