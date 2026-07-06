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

        $('.logo').click(function(){
            $('html').animate({scrollTop: 0}, 800, 'easeOutCirc');
            return false;
        });
        $('nav ul li a').click(function(){
            let thisSection = $(this).attr('href');
            let thisLink = $(this);

            $('html').stop().animate({
                scrollTop: $(thisSection).offset().top -100
            }, 800, 'easeOutCirc', function(){
                $('nav ul li a').removeAttr('class');
                $(thisLink).addClass('selected');
            });
            return false;
        });

        var posts = $('#overview, #download, #pricing, #listen, #ourteam');
        var postTops = [];

        posts.each(function(){
            postTops.push($(this).offset().top);
        });

        $(window).scroll(function(){
            let pageTop = $(window).scrollTop() + 150; 

            for (let i = 0; i < postTops.length; i++) {
                if (pageTop >= postTops[i] && (i === postTops.length - 1 || pageTop < postTops[i + 1])) {

            $('nav ul li a').removeClass('selected');
            $('nav ul li a').eq(i).addClass('selected');
        }
    }
});
        function calculatePostTops() {
            postTops = [];
            posts.each(function(){
                postTops.push($(this).offset().top);
            });
        }

        calculatePostTops();

        $(window).on('resize', calculatePostTops);


});
})();
