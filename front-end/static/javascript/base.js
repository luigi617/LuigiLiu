if (typeof(APP) == "undefined"){
    APP = {}
}
APP['base'] = {
    "init": function(){
        $(".nav-phone-li").click(function(){
            if ($(this).data("href") == "game"){
                nav_first_layer.toggle()
                if (typeof nav_second_layer == "undefined"){
                    nav_second_layer = new bootstrap.Offcanvas($("#offcanvasRightGame")[0])
                }
                nav_second_layer.toggle()
                return
            }
            window.location.href = $(this).data("href")
        })

        $("#toggle_side_navbar").click(function(){
            if (typeof nav_first_layer == "undefined"){
                nav_first_layer = new bootstrap.Offcanvas($("#offcanvasRight")[0])
            }
            nav_first_layer.toggle()
        })
        $(".nav-phone-backbutton").click(function(e){
            e.preventDefault()
            nav_second_layer.toggle()
            nav_first_layer.toggle()
        })
    },
    "sleep": function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    "keyboard_disable": function disable(){
        document.onkeydown = function (e){
            return false;
        }
    },
    "keyboard_enable": function enable(){
        document.onkeydown = function (e) {
            return true;
        }
    },
    "get_url_parameter": function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
    
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
    
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
        return false;
    },
}


  

