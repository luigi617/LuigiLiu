if (typeof(APP) == "undefined"){
    APP = {}
}
APP['profile'] = {
    "init": function(){
        
        $(".profile_option").click(function(){
            APP.profile.change_option($(this).data("option"))
        })
    },
    "change_option": function(option){
        $(".profile_option").removeClass("active")
        $(`.profile_option[data-option=${option}]`).addClass("active")
        $(".option_content_col").children().addClass("d-none")
        switch (option) {
            case "profile":
                if (typeof MY_PROFILE_URL != "undefined"){
                    window.location.href = MY_PROFILE_URL + "?option=profile"
                }
                $(".my_profile").removeClass("d-none")
                break;
            case "credit":
                if (typeof MY_PROFILE_URL != "undefined"){
                    window.location.href = MY_PROFILE_URL  + "?option=credit"
                }
                $(".credit").removeClass("d-none")
                break;
            case "change_password":
                window.location.href = CHANGE_PASSWORD
                break;
            case "log_out":
                window.location.href = LOG_OUT
                    
                break;
        
            default:
                if (typeof MY_PROFILE_URL != "undefined"){
                    window.location.href = MY_PROFILE_URL + "?option=profile"
                }
                $(`.profile_option[data-option=profile]`).addClass("active")
                $(".my_profile").removeClass("d-none")
                break;
        }
    },
    "load_profile": function(){
        $.ajax({
            method: "GET",
            url: BASE_URL + PROFILE_URL,
            success: function(data){
                console.log(data)
                $("#input_username").val(data["username"])
                $("#input_email").val(data["email"])
                $("#input_lastname").val(data["last_name"])
                $("#input_firstname").val(data["first_name"])
                $("#input_phone").val(data["phone"])
                $(".avatar_img").prop("src", data["avatar_thumbnail"])
            }
        })
    },
}