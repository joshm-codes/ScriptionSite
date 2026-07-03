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

                // Reset all CTAs
                $('.cta').removeClass('visible');

                // Animate CTA on first slide
                const firstCTA = $('.flex-active-slide .cta');
                setTimeout(function(){
                    firstCTA.addClass('visible');
                }, 50);
            },

            before: function(slider){
                // Reset all CTAs BEFORE slide changes
                $('.cta').removeClass('visible');
            },

            after: function(slider) {
                clearTimeout(restartTimer);

                // Animate CTA AFTER slide changes
                const activeCTA = $('.flex-active-slide .cta');
                setTimeout(function(){
                    activeCTA.addClass('visible');
                }, 50);

                restartTimer = setTimeout(function() {
                    slider.play();   
                }, 6000); 
            }
        });
    });
})();
