if (typeof(APP) == "undefined"){
    APP = {}
}
APP['profile'] = {
    "init": function(){
        $(".profile_option").click(function(){
            $(".profile_option").removeClass("active")
            $(this).addClass("active")
        })
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
    }
}