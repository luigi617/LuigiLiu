if (typeof(APP) == "undefined"){
    APP = {}
}
APP['home'] = {
    "init": function(){
        $(".masonry_div").click(function(){
            window.location.href = $(this).data("url")
        })
        $(document).on("click", ".article_card", function(){
            window.location.href = $(this).data("url")
        })
        $(document).on("click", ".game_card", function(){
            window.location.href = $(this).data("url")
        })
        $(".more_about_me_button").click(function(){
            window.location.href = ABOUT_ME_URL
        })
        $(".back_top_svg").click(function(){
            APP.base.scroll_to_top()
        })

       
    },
    "load_articles": function(){
        $.ajax({
            method: "GET",
            url: BASE_URL + DISPLAY_ARTICLE_LIST_URL,
            success: function(data){

                
                for (let i = 0; i < data.results.length; i++){
                    $(".ariticle_col").append(
                        `
                        <div class="article_card" data-url="${BASE_URL + ARTICLE_RETRIEVE_URL + data.results[i]["url_name"] + "/"}">
                            <img src="${data.results[i]["cover_img"]}" class="article_img" alt="...">
                            <div class="article_title">
                            ${data.results[i]["title"].toUpperCase()}
                            </div>
                            <div class="row">
                                <div class="col text-start">
                                    <div class="article_type">${data.results[i]["category"] == null ? "" : data.results[i]["category"]["name"]}</div>
                                </div>
                                <div class="col text-end">
                                    <div class="article_date">${APP.base.parse_time(data.results[i]["date_added"])}</div>
                                </div>
                            </div>
                            
                        </div>
                        `
                    )
                }
                var max_title_height = 0
                for (i = 0; i < $(".article_title").length; i++){
                    max_title_height = max_title_height < $($(".article_title")[i]).height() ? $($(".article_title")[i]).height() : max_title_height
                }
                $(".article_title").height(max_title_height)
            }
        })
    },

    "canva_dot": function(){
        var canvas = document.getElementById("dot_canvas"),
            ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight-72;
    
        function dot_num() {
            // return 50
            return Math.ceil((canvas.width * canvas.height) * 100/1077120)
        }
        

        var stars = []; // Array that contains the stars
        FPS = 120; // Frames per second
        x = dot_num(); // Number of stars
        mouse = {
            x: 0,
            y: 0
        };  // mouse location

        
        function init() {
            // Push stars to array
            x = dot_num();
            stars = [];
            for (var i = 0; i < x; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 2 + 1,
                    vx: Math.floor(Math.random() * 50) - 25,
                    vy: Math.floor(Math.random() * 50) - 25
                });
            }
        }

        // Draw the scene

        function draw() {
            ctx.clearRect(0,0,canvas.width,canvas.height);
            
            ctx.globalCompositeOperation = "lighter";
            
            for (var i = 0, x = stars.length; i < x; i++) {
                var s = stars[i];
            
                ctx.fillStyle = "#bcbcbc";
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
                ctx.fill();
                ctx.fillStyle = 'black';
                ctx.stroke();
            }
            
            ctx.beginPath();
            for (var i = 0, x = stars.length; i < x; i++) {
                var starI = stars[i];
                ctx.moveTo(starI.x,starI.y);
                var distance_num = 150
                // console.log(canvas.width)
                // if(canvas.width < 600) {
                //     distance_num = 50
                // } else if (canvas.width < 900){
                //     distance_num = 80
                // }
                if(distance(mouse, starI) < distance_num) ctx.lineTo(mouse.x, mouse.y-72+window.scrollY);
                for (var j = 0, x = stars.length; j < x; j++) {
                    var starII = stars[j];
                    if(distance(starI, starII) < distance_num) {
                        //ctx.globalAlpha = (1 / 150 * distance(starI, starII).toFixed(1));
                        ctx.lineTo(starII.x,starII.y); 
                    }
                }
            }
            ctx.lineWidth = 0.2;
            ctx.strokeStyle = 'gray';
            ctx.stroke();
            }

            function distance( point1, point2 ){
            var xs = 0;
            var ys = 0;
            
            xs = point2.x - point1.x;
            xs = xs * xs;
            
            ys = point2.y - point1.y;
            ys = ys * ys;
            
            return Math.sqrt( xs + ys );
        }

        // Update star locations

        function update() {
            for (var i = 0, x = stars.length; i < x; i++) {
                var s = stars[i];
            
                s.x += s.vx / FPS;
                s.y += s.vy / FPS;
                
                if (s.x < 0 || s.x > canvas.width) s.vx = -s.vx;
                if (s.y < 0 || s.y > canvas.height) s.vy = -s.vy;
            }
        }

        canvas.addEventListener('mousemove', function(e){
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        // Update and draw
        var requestId;
        function tick() {
            draw();
            update();
            requestId = requestAnimationFrame(tick);
        }
        init();
        tick();
        var resizeTimer;
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            $(window).on("orientationchange", function(){
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function() {
                    // Run code here, resizing has "stopped"      
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight-72;
                    
                    cancelAnimationFrame(requestId);
                    init();
                    tick();
                }, 100);
            })
        } else {
            window.addEventListener('resize', function(event) {
                if (Math.abs(canvas.height-window.innerHeight) < 105){return}
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function() {
                    // Run code here, resizing has "stopped"      
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight-72;
                    cancelAnimationFrame(requestId);
                    init();
                    tick();
                }, 100);
            }, true);
        }
    },

    "breaker_text_infinite":function(){
        var textElement = $('.breaker_text');
        var textWidthElement = $(".breaker_text_width")
        textWidthElement.removeClass("d-none")
        var textWidth = textWidthElement.outerWidth();

        textWidthElement.addClass("d-none")
        
        var totalDistance = 2 * textWidth;
        


        function startAnimation() {
            var speedPerPixel = totalDistance / 0.2
            textElement.css({
                'transition': 'none',
                'transform': `translateX(${textWidth}px)`
            });

            function updateTransition() {
                textElement.css({
                    'transition': `transform ${speedPerPixel}ms linear`,
                    'transform': `translateX(-${textWidth}px)`
                });
            }

            // Timeout to reset position without being visible
            var transition_time_out = setTimeout(updateTransition, 0);
            
            $(".breaker_row").on('mouseenter', function() {
                var current_position = textElement.css("transform").split(",")[4].trim()
                textElement.css('transition', 'none');
                textElement.css('transform', `translateX(${current_position}px)`);
    
                speedPerPixel = (parseFloat(current_position) + textWidth)/0.1
                clearTimeout(transition_time_out);
                transition_time_out = setTimeout(updateTransition, 0);
                // speedPerPixel = totalDistance / 0.2
    
                
            });
        

            $(".breaker_row").on('mouseleave', function() {
                var current_position = textElement.css("transform").split(",")[4].trim()
                textElement.css('transition', 'none');
                textElement.css('transform', `translateX(${current_position}px)`);

                speedPerPixel = (parseFloat(current_position) + textWidth)/0.2
                clearTimeout(transition_time_out);
                transition_time_out = setTimeout(updateTransition, 0);
                // speedPerPixel = totalDistance / 0.2
            });

        }

        textElement.on('transitionend', startAnimation);
        startAnimation(); // Initialize the animation

        

    }
}