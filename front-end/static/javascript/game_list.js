if (typeof(APP) == "undefined"){
    APP = {}
}
APP['game_list'] = {
    "init": function(){
        $(".masonry_div").click(function(){
            window.location.href = $(this).data("url")
        })
       
    },
  
}