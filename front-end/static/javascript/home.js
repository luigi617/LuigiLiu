if (typeof(APP) == "undefined"){
    APP = {}
}
APP['home'] = {
    "init": function(){
        $(".masonry_div").click(function(){
            window.location.href = $(this).data("url")
        })
       
    },
    // "load_articles": function(){
    //     $.ajax({
    //         method: "GET",
    //         url: BASE_URL + RANDOM_ARTICLE_LIST_URL,
    //         success: function(data){

    //             for (let i = 0; i < data.results.length; i++){
    //                 $(".article_row").append(
    //                     `
    //                     <div class="card article_card" data-url="${BASE_URL + ARTICLE_RETRIEVE_URL + data.results[i]["id"] + "/"}">
    //                         <img src="${data.results[i]["cover_img"]}" class="card-img-top article_img" alt="...">
    //                         <div class="card-body">
    //                         <p class="card-text fw-bold my-2">${data.results[i]["title"]}</p>
    //                         <p class="card-text fw-light text-end mx-2 article_date_modified">${APP.base.parse_time(data.results[i]["date_modified"])}</p>
    //                         </div>
    //                     </div>
    //                     `
    //                 )
    //             }
                
    //         }
    //     })
    // },

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
            ctx.lineWidth = 0.1;
            ctx.strokeStyle = 'white';
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
                    console.log(requestId)
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
}