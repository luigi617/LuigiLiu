if (typeof(APP) == "undefined"){
    APP = {}
}
APP['profile'] = {
    "init": function(){
        $(".profile_option").click(function(){
            APP.profile.change_option($(this).data("option"))
        })
        $("#profile_edit").click(function(){
            $("#input_username").removeClass("d-none")
            $("#input_email").removeClass("d-none")
            $("#input_lastname").removeClass("d-none")
            $("#input_firstname").removeClass("d-none")
            $("#input_phone").removeClass("d-none")
            $(".update_button_div").removeClass("d-none")
            $(".change_avatar_div").removeClass("d-none")

            $("#original_username").addClass("d-none")
            $("#original_email").addClass("d-none")
            $("#original_lastname").addClass("d-none")
            $("#original_firstname").addClass("d-none")
            $("#original_phonenumber").addClass("d-none")
            $(".edit_button_div").addClass("d-none")

            APP.profile.fill_profile()
        })
        $("#profile_edit_cancel").click(function(){
            $("#input_username").addClass("d-none")
            $("#input_email").addClass("d-none")
            $("#input_lastname").addClass("d-none")
            $("#input_firstname").addClass("d-none")
            $("#input_phone").addClass("d-none")
            $(".update_button_div").addClass("d-none")
            $(".change_avatar_div").addClass("d-none")

            $("#original_username").removeClass("d-none")
            $("#original_email").removeClass("d-none")
            $("#original_lastname").removeClass("d-none")
            $("#original_firstname").removeClass("d-none")
            $("#original_phonenumber").removeClass("d-none")
            $(".edit_button_div").removeClass("d-none")

            APP.profile.fill_profile()
        })
        $("#profile_update").click(function(){
            var username = $("#input_username").val()
            var email = $("#input_email").val()
            var lastname = $("#input_lastname").val()
            var firstname = $("#input_firstname").val()
            var phone = $("#input_phone").val()
            var avatar = $("#input_avatar")[0].files[0]
            var fd = new FormData();
            fd.append('username', username);
            fd.append('email', email);
            fd.append('last_name', lastname);
            fd.append('first_name', firstname);
            fd.append('phone', phone);
            if (avatar){
                fd.append('avatar_thumbnail', avatar);
            }

            $.ajax({
                method: "PUT",
                url: BASE_URL + PROFILE_URL,
                data: fd,
                processData: false,
                contentType: false,
                success: function(data){
                    PROFILE_DATA = data
                    APP.profile.fill_profile()
                    $("#profile_edit_cancel").click()
                }
            })
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
        console.log(BASE_URL + PROFILE_URL);
        $.ajax({
            method: "GET",
            url: BASE_URL + PROFILE_URL,
            success: function(data){
                PROFILE_DATA = data
                APP.profile.fill_profile()
            }
        })
    },
    "fill_profile": function(){
        $("#input_username").val(PROFILE_DATA["username"])
        $("#original_username").text(PROFILE_DATA["username"])
        $("#input_email").val(PROFILE_DATA["email"])
        $("#original_email").text(PROFILE_DATA["email"])
        $("#input_lastname").val(PROFILE_DATA["last_name"])
        $("#original_lastname").text(PROFILE_DATA["last_name"])
        $("#input_firstname").val(PROFILE_DATA["first_name"])
        $("#original_firstname").text(PROFILE_DATA["first_name"])
        $("#input_phone").val(PROFILE_DATA["phone"])
        $("#original_phonenumber").text(PROFILE_DATA["phone"])
        $(".avatar_img").prop("src", APP.base.show_avatar(PROFILE_DATA["avatar_thumbnail"]))
    }
}