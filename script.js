jQuery.noConflict();
(function($) {
    $(document).ready(function() {
        // Code for preloader
        $(window).on('load', function() {
            $('#status').fadeOut();
            $('#preloader').delay(200).fadeOut('slow');
        });

        // Code for scroll to top button
        $(window).scroll(function() {
            if ($(this).scrollTop() >= 50) {
                $('#return-to-top').fadeIn(200);
            } else {
                $('#return-to-top').fadeOut(200);
            }
        });
        $('#return-to-top').click(function() {
            $('body,html').animate({
                scrollTop: 0
            }, 500);
        });

        // Code for page scrolling
        $('a.page-scroll').on('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });

        $(window).on('load', function() {
            var TxtRotate = function(el, toRotate, period) {
                this.toRotate = toRotate;
                this.el = el;
                this.loopNum = 0;
                this.period = parseInt(period, 10) || 2000; // Default period is 2000ms
                this.txt = '';
                this.tick();
                this.isDeleting = false;
            };
        
            TxtRotate.prototype.tick = function() {
                var i = this.loopNum % this.toRotate.length;
                var fullTxt = this.toRotate[i];
        
                if (this.isDeleting) {
                    this.txt = fullTxt.substring(0, this.txt.length - 1);
                } else {
                    this.txt = fullTxt.substring(0, this.txt.length + 1);
                }
        
                this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
        
                var that = this;
                var delta = 200 - Math.random() * 100;
        
                if (this.isDeleting) {
                    delta /= 2;
                }
        
                if (!this.isDeleting && this.txt === fullTxt) {
                    delta = this.period;
                    this.isDeleting = true;
                } else if (this.isDeleting && this.txt === '') {
                    this.isDeleting = false;
                    this.loopNum++;
                    delta = 500; // Pause before starting next cycle
                }
        
                setTimeout(function() {
                    that.tick();
                }, delta);
            };
        
            var elements = document.getElementsByClassName('txt-rotate');
            for (var i = 0; i < elements.length; i++) {
                var toRotate = elements[i].getAttribute('data-rotate');
                var period = elements[i].getAttribute('data-period');
                if (toRotate) {
                    new TxtRotate(elements[i], JSON.parse(toRotate), period);
                }
            }
        
            // INJECT CSS
            var css = document.createElement("style");
            css.type = "text/css";
            css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }"; // Adjust styling as needed
            document.body.appendChild(css);
        });
        

        // Code for number counting animation
        $('.counter').each(function() {
            const $this = $(this);
            const countTo = $this.attr('data-count');

            $({
                countNum: $this.text()
            }).animate({
                countNum: countTo
            }, {
                duration: 3000,
                easing: 'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });

        // Update footer copyright year
        const today = new Date();
        const year = today.getFullYear();
        $('#copyright').text('© Kens Bravo EngrAgency ' + year);
    });
})(jQuery);
