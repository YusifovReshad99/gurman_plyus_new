let loaderComplate = 0;
let boleanMap = false;
function callLoader(){
    $('body').css("overflow", "hidden");
    let loaderInterval =  setInterval(function(){
         loaderComplate += Math.floor(Math.random() * 15);
         $('.loader-progress').html(loaderComplate +"%");
         $('.item-progres').css("width", loaderComplate +"%");
         if(loaderComplate == 100 || loaderComplate > 100){
             $('.loader-progress').html("100%");
             $('.item-progres').css("width", "100%");
             $('body').css("overflow", "auto");
             clearInterval(loaderInterval);
             removeLoader();
         }
     },200);
}

function removeLoader(){
    $('.loader-page').hide(500);
    setTimeout(function(){
        $('.loader-page').remove();
    },1000)
}

function add_yandex(){
    ymaps.ready(function () {
        var myMap = new ymaps.Map('map', {
                center: [40.410641, 49.845871],
                zoom: 14
            }, {
                searchControlProvider: 'yandex#search'
            }),
    
            MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
            ),
    
            myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                hintContent: 'Собственный значок метки',
                balloonContent: 'Азербвйджан, Город Баку, М.К.Ататюрк, дом 39/69'
            }, {
                iconLayout: 'default#image',
                iconImageHref: 'images/location.gif',
                iconImageSize: [50, 50],
                iconImageOffset: [-5, -38]
            });
    
           
    
        myMap.geoObjects
            .add(myPlacemark)
            .add(myPlacemarkWithContent);
    });
}


$('#map').mouseenter(function(){
    boleanMap = true;
});

$('#map').mouseleave(function(){
    boleanMap = false;
})

$(document).ready(function(){
    $('.animate-menu').click(function(){
        $(this).toggleClass('active');
        let elementClass = $(this).hasClass('active');
        if(elementClass){
            $('.toggle-menu').addClass('active');
        }
        else{
            $('.toggle-menu').removeClass('active');
        }
    });
    $('.close-menu-icon').click(function(){
        $('.toggle-menu').removeClass('active');
        $('.animate-menu').removeClass('active');
    });
    
})


$('img').on('dragstart', function(event) { event.preventDefault(); });



function resizeSideContent(){
    let getLength = document.querySelectorAll('.content-box-flex .content-col').length;
    if(getLength >0){
        let getWidthContent = document.querySelector('.col-flex-2').clientWidth;
        document.querySelector('.content-box-flex').style.width = getWidthContent *getLength + "px";
        document.querySelectorAll('.content-box-flex .content-col').forEach(function(item){
            item.style.width = getWidthContent + "px";
        })
    }
    else{}
}

let positionArray = [];
function resizeAndUpdateCanvas(){
    let screenSize = window.innerWidth;
    let canvasParent = document.querySelector('.canvas-parent');
    let canvas = document.querySelector(".canvas-geo");
    canvas.setAttribute('width', canvasParent.clientWidth - screenSize / 2);
    canvas.setAttribute('height', canvasParent.clientHeight);
    let ctx = canvas.getContext("2d");
    ctx.moveTo(0,canvasParent.clientHeight / 2);
    for(x=0; x<=canvasParent.clientWidth - screenSize; x++){
        ctx.strokeStyle = "#b3161b";
        ctx.lineWidth = 1;
        y = canvasParent.clientHeight / 2 - Math.sin(x*Math.PI/-2000)*280;
        ctx.lineTo(x,y);
        positionArray.push({
            x:x,
            y:y
        })
    }
    ctx.stroke();
    getYX();
    canvasPosition();
}
      


function getYX(){
    let elementHeight = document.querySelector('.cicle-control').clientHeight;
    let y = Math.floor(positionArray[0].y) - elementHeight /2;
    let x = Math.floor(positionArray[0].x)-50;
    document.querySelector('.cicle-control').style.transform = "translate3d("+x+"px, "+y+"px, 0px)";
}   


function scrollCoordinates(){
    let elementHeight = document.querySelector('.cicle-control').clientHeight;
    let scrollCount= document.querySelector('.col-flex-2').scrollLeft;
    let y = positionArray[scrollCount].y - elementHeight / 2;
    let x = positionArray[scrollCount].x - 50   ;
    document.querySelector('.cicle-control').style.transform = "translate3d("+x+"px, "+y+"px, 0px)";
}

function canvasPosition(){
    let screenSize = window.innerWidth;
    document.querySelector(".canvas-geo").style.left = screenSize / 2.4 + "px";
    document.querySelector(".cicle-control").style.left = screenSize / 2.4 + "px";
}

    
document.onkeydown = function(e){
    let event = window.event ? window.event : e;
    if(event.code == "ArrowRight"){
        $('.col-flex-2').stop().animate({scrollLeft: '+=560'}, 300, );
    }
    else if(event.code == "ArrowLeft"){
        $('.col-flex-2').stop().animate({scrollLeft: '-=560'},300,  );
    }
    else{}
}
document.querySelector('.col-flex-2').addEventListener('mousewheel', function(event){
    if(!boleanMap){
        if(event.deltaY < 1 ){
            $('.col-flex-2').stop().animate({scrollLeft: '-=560'}, 300,  );
        }
        else{
            $('.col-flex-2').stop().animate({scrollLeft: '+=560'}, 300,  );
        }
    }
    else{}
});

function rightEvent(payload){
    $('.col-flex-2').stop().animate({scrollLeft: '+=30'}, 0);
}

function lefEvent(payload){
    $('.col-flex-2').stop().animate({scrollLeft: '-=30'}, 0);
}


function rightEventClick(payload){
    $('.col-flex-2').stop().animate({scrollLeft: '+=560'}, 300,  );
    
}

function leftEventClick(payload){
    $('.col-flex-2').stop().animate({scrollLeft: '-=560'}, 300,  );
}

    let oldX = 0;
    function mouseControl(event){
        if(event.screenX > oldX){
            rightEvent(event.screenX);
        }
        else if(event.screenX < oldX){
            lefEvent(event.screenX);
        }
        else{}
        oldX = event.screenX;
    }
    document.querySelector('.cicle-control').addEventListener('mousedown', function(){
        document.querySelector('.col-flex-2').setAttribute('onmousemove', 'mouseControl(event)');
    })
    document.querySelector('.cicle-control').addEventListener('mouseup', function(){
        document.querySelector('.col-flex-2').removeAttribute('onmousemove');
    }); 
    window.addEventListener('mouseup', function(){
        document.querySelector('.col-flex-2').removeAttribute('onmousemove');
    }); 





function changeText(event){
    document.querySelector('.file-upload-text').innerHTML = event.target.value;
    document.querySelector('.file-upload-text').setAttribute('title', event.target.value)

}


function openPopup(id){
    $('.custom-popup').addClass('active');
    $('.box-slider img[data-id="'+id+'"]').addClass('open');
    controlCountSlider();
}

function closePopup(){
    $('.custom-popup').removeClass('active');
    $('.box-slider img').removeClass('open');
}

function nextSlider(){
    $('.box-slider img.open').next().addClass('open');
    $('.box-slider img.open').prevAll().removeClass('open');
    controlCountSlider();
}
function prevSlider(){
    $('.box-slider img.open').prev().addClass('open');
    $('.box-slider img.open').nextAll().removeClass('open');
    controlCountSlider();
}

function controlCountSlider(){
    let getIndex = $('.box-slider img.open').index() + 1;
    $('.dynamiCount').html(getIndex);
}

function closePageePopup(){
    $('.comment-popup').each(function(){
        $(this).removeClass('active');
    });
    $('body').css("overflow", "auto");
}


function openPagePopup(id){
    $('body').css("overflow", "hidden");
    $('.comment-popup').each(function(){
        $(this).removeClass('active');
    });
    $('.comment-popup[data-position="'+id+'"]').addClass('active');
}

function createSlider(){
    let width = +$('.slider-home').css('width').split("px")[0];
    let length = document.querySelectorAll('.slider-parent .item-slider').length;
    document.querySelectorAll('.slider-parent .item-slider').forEach(function(item){
        item.style.width = width + "px";
    });
    $('.slider-parent').css('width', width * length + "px");
}


let countSlider =0;
function sliderControl(){
    let width = +$('.slider-home').css('width').split("px")[0];
    let length = document.querySelectorAll('.slider-parent .item-slider').length;
    setInterval(function(){
        countSlider++;
        if(countSlider == length){
            countSlider = 0;
        }
        else{}
        $('.slider-parent').animate({
            left: - width * countSlider + "px"
        },500);
        $('.circle-slider span').removeClass('active');
        $('.circle-slider span:eq('+countSlider+')').addClass('active');

    },4000);
}


$('.circle-slider span').click(function(){
    $('.circle-slider span').removeClass('active');
    $(this).addClass('active');
    let index = $('.circle-slider span.active').index();
    countSlider = index;
    let width = +$('.slider-home').css('width').split("px")[0];
    $('.slider-parent').animate({
        left: - width * countSlider + "px"
    },500);
});