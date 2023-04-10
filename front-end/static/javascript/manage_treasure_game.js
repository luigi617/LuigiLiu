if (typeof(APP) == "undefined"){
    APP = {}
}
APP['manage_treasure_game'] = {
    "init": function(){
        $.ajax({
            method: "GET",
            url: BASE_URL + TREASURE_HUNT_GAME_LIST_URL,
            success: function(data){
                
            }
        })
    },
  
}