$('.carousel').each(function(){
    var currentCarouselID = '#' + $(this).attr('id');
    
var carouselWidth = $(currentCarouselID + ' .carousel-inner')[0].scrollWidth;
var cardWitdh = $(currentCarouselID + ' .carousel-item').width();

var scrollPosition = 0;
console.log("next");

$(currentCarouselID +' .carousel-control-next').on('click', function(){
        
    console.log("ScrollPosition: "+ scrollPosition+ " cardWitdh: "+ cardWitdh);
    console.log(carouselWidth)
    if(scrollPosition < (carouselWidth - (cardWitdh * 1))){
        console.log("ScrollPosition: "+ scrollPosition+ " cardWitdh: "+ cardWitdh);
        scrollPosition = scrollPosition + cardWitdh;
        $(currentCarouselID + ' .carousel-inner').animate({scrollLeft: scrollPosition}, 
        600);

    }
});

$(currentCarouselID + ' .carousel-control-prev').on('click', function(){
        
    
    if(scrollPosition > 0){
        console.log("ScrollPosition: "+ scrollPosition+ " cardWitdh: "+ cardWitdh);
        scrollPosition = scrollPosition - cardWitdh;
        $(currentCarouselID +' .carousel-inner').animate({scrollLeft: scrollPosition}, 
        600);

    }
});


})

