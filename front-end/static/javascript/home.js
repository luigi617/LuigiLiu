if (typeof(APP) == "undefined"){
    APP = {}
}
APP['home'] = {
    "init": function(){
        $(".masonry_div").click(function(){
            window.location.href = $(this).data("url")
        })
    },
}