if (typeof(APP) == "undefined"){
    APP = {}
}
APP['base'] = {
    "init": function(){
        
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
    "show_avatar": function show_avatar(avatar){
        if (avatar == null){
            return "/front-end/static/assets/img/default-user-image.png"
        }
        return avatar
    }
}


  

