if (typeof(APP) == "undefined"){
    APP = {}
}
APP['treasure_hunt'] = {
    "init": function(){
        $(".manage_treasure_game").click(function(){
            window.location.href = MANAGE_TREASURE_GAME_LIST
        })
    },
    "load_treasures": function(){
        $.ajax({
            method: "GET",
            url: BASE_URL + GET_TREASURE_LIST_URL,
            success: function(data){
                if (data.length == 0){
                    $(".treasure_list").append(`
                        <center>This section is only for invited people</center>`
                    )
                    return;
                }

                for (let i = 0; i < data["treasures"].length; i++){
                    var class_row = i==0 ? "first_treasure_row": ""
                    var status = NOT_DONE
                    if (data["treasures"][i]["status"] == 1){
                        status = PROCESSING
                    } else if (data["treasures"][i]["status"] == 2){
                        status = DONE
                    }
                    $(".treasure_list").append(`
                        <div class="row treasure_row ${class_row}" data-id="${data["treasures"][i]["treasure"]}">
                            <div class="col-1">
                            <img src="${status}" class="svg_img" alt="...">
                            </div>
                            <div class="col">
                            Treasury ${i+1}
                            </div>
                            <div class="col-1">
                            <img src="${ARROW_URL}" class="svg_img" alt="...">
                            </div>
                        </div>
                    `)
                }
                $(".treasure_row").click(function(){
                    window.location.href = BASE_URL + TREASURE_URL + $(this).data("id")
                })

                var users_name = []
                for (let i = 0; i < data["group"]["users"].length; i++){
                    users_name.push(data["group"]["users"][i]["username"])
                }
                $(".group_info").append(`
                    <div class="col-6 col-sm-4 text-center">
                        Team: <strong>${data["group"]["name"]}</strong> (${users_name.join(", ")})
                    </div>
                    <div class="col-6 col-sm-4 time_display text-center">
                        
                    </div>
                    <div class="col-12 col-sm-4 mt-3 mt-sm-0 text-center">
                        Every x minutes you can see others procedures (you need to refresh)
                    </div>
                `)
                var started_time = Date.parse(data["game"]["time_started"])
                APP.treasure_hunt.real_time(started_time)
                
            },
            error: function (request, status, error) {
                $(".treasure_list").append(`
                    <center>This section is only for invited people</center>`
                )
            }
        })
    },
    "real_time": function real_time(started_time) {
        

        var timeDisplay = $(".time_display")

        function refreshTime(started_time) {
            var difference = Date.now() - started_time
            var days = Math.floor(difference / (1000 * 60 * 60 * 24))
            difference = difference % (1000 * 60 * 60 * 24)
            var hours = Math.floor(difference / (1000 * 60 * 60))
            difference = difference % (1000 * 60 * 60)
            var minutes = Math.floor(difference / (1000 * 60))
            difference = difference % (1000 * 60)
            var seconds = Math.floor(difference / (1000))
            var times = []
            if (days != 0){times.push(`${days} gg`)}
            if (hours != 0){times.push(`${hours} h`)}
            if (minutes != 0){times.push(`${minutes} min`)}
            if (seconds != 0){times.push(`${seconds} sec`)}
            timeDisplay.empty()
            timeDisplay.append(`Time: <strong>${times.join(", ")}</strong>`)
        }

        refreshTime(started_time)
        setInterval(function(){refreshTime(started_time)}, 1000);
    }
}