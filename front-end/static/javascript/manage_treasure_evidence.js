if (typeof(APP) == "undefined"){
    APP = {}
}
APP['manage_treasure_evidence'] = {
    "init": function(){
        $(document).on("click", ".accept_evidence", function(){

            $.ajax({
                method: "POST",
                url: BASE_URL + TREASURE_EVIDENCES_LIST_URL,
                data: {
                    "type": $(this).closest(".treasure_evidence").data("type"),
                    "id": $(this).closest(".treasure_evidence").data("id"),
                    "status": 2,
                    "treasure_hunt_game_id": treasure_hunt_game_id
                },
                success: function(data){
                    
                }
            })
        })
        $(document).on("click", ".deny_evidence", function(){

            $.ajax({
                method: "POST",
                url: BASE_URL + TREASURE_EVIDENCES_LIST_URL,
                data: {
                    "type": $(this).closest(".treasure_evidence").data("type"),
                    "id": $(this).closest(".treasure_evidence").data("id"),
                    "status": 0,
                    "treasure_hunt_game_id": treasure_hunt_game_id
                },
                success: function(data){
                    
                }
            })
        })

    },
    "load_evidences": function(){
        $.ajax({
            method: "GET",
            url: BASE_URL + TREASURE_EVIDENCES_LIST_URL,
            success: function(data){
                var tenth = data[11]
                for (let i = 0; i < data.length; i++){
                    // if (data[i]["status"] != 1){return}
                    if (data[i] == tenth){break}
                    var object = data[i]["object"]
                    if (data[i]["object"].includes("treasure_hunt/treasure")){
                        object = `<img class="object_img" src="${data[i]["object"]}" alt="">`
                    }
                    var status = ""
                    if (data[i]["status"] == 0){
                        status = "Not found or Not activate"
                    } else if (data[i]["status"] == 1){
                        status = "Processing"
                    } else if (data[i]["status"] == 2){
                        status = "Found or Activated"
                    }
                    $(".treasure_evidence_list").append(`
                        <div class="row treasure_evidence ${status.toLowerCase().split(" ").join("-")}" data-type="${data[i]["type"]}" data-id="${data[i]["id"]}">
                            <div class="col">
                            Object:<br>${object}
                            </div>
                            <div class="col">
                            Evidence:<br>
                            <img class="evidence_img" src="${data[i]["evidence"]}" alt="">
                            </div>
                            <div class="col">
                            Status:<br>
                            ${status}
                            </div>
                            <div class="col">
                            Change Status:<br>
                            <button type="button" class="btn btn-success mx-3 mb-3 accept_evidence">okay</button>
                            <button type="button" class="btn btn-danger mx-3 mb-3 deny_evidence">Nope</button>
                            </div>
                        </div>
                    `)
                }
            }
        })
    }
  
}