if (typeof(APP) == "undefined"){
    APP = {}
}
APP['manage_treasure_game'] = {
    "init": function(){
        $.ajax({
            method: "GET",
            url: BASE_URL + TREASURE_HUNT_GAME_LIST_URL,
            success: function(data){
                for (let i = 0; i < data.length; i++){
                    var groups = ""
                    for (let j = 0; j < data[i]["groups"].length; j++){
                        groups = groups + data[i]["groups"][j]["name"] 
                        var usernames = []
                        for (let k = 0; k < data[i]["groups"][j]["users"].length; k++){
                            usernames.push(data[i]["groups"][j]["users"][k]["username"])
                        } 
                        groups = groups + " (" + usernames.join(", ") + "); "
                    }
                    var time_started = ""
                    if (data[i]["game"]["time_started"] != null){
                        time_started = data[i]["game"]["time_started"].replace("T", " ").replace("Z", "")
                    }
                    var time_ended = ""
                    if (data[i]["game"]["time_ended"] != null){
                        time_ended = data[i]["game"]["time_ended"].replace("T", " ").replace("Z", "")
                    }
                    $(".treasure_game_list").append(`
                    <div class="row treasure_game_row" data-id="${data[i]["game"]["id"]}">
                        <div class="col">
                            game: #${data[i]["game"]["id"]}, started: ${data[i]["game"]["is_started"]} <br>
                            time started: ${time_started} <br>
                            time ended: ${time_ended}
                        </div>
                        <div class="col game_group_info">
                            groups: <br>
                            ${groups}
                        </div>
                        <div class="col-2">
                            <button type="button" class="btn btn-dark mx-3 mb-3 manage_treasure_game">Manage Game</button>
                        </div>
                    </div>
                    `)
                    
                }
            }
        })
        $(".add_new_game").click(function(){
            console.log(BASE_URL + NEW_TREASURE_HUNT_GAME_URL);
            $.ajax({
                method: "POST",
                url: BASE_URL + NEW_TREASURE_HUNT_GAME_URL,
                success: function(data){
                    location.reload()
                }
            })
        })
        $(document).on("click", ".manage_treasure_game", function(){
            var id = $(this).closest(".treasure_game_row").data("id")
            window.location.href = TREASURE_HUNT_GAME_URL + id + "/"
        })
    },
  
}