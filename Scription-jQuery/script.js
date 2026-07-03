(function (){
    $(window).on('load', function() {
        let restartTimer;

        $('.flexslider').flexslider({
            animation: 'slide',
            slideshow: true,
            slideshowSpeed: 4000,
            animationSpeed: 600,
            pauseOnAction: true,  
            pauseOnHover: false,

            start: function(slider) {
                clearTimeout(restartTimer);
            },

            after: function(slider) {
                clearTimeout(restartTimer);

                restartTimer = setTimeout(function() {
                    slider.play();   
                }, 6000); 
            }
        });
    });
})(); 