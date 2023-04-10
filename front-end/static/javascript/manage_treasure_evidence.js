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
                    "status": 2
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
                    "status": 0
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
                for (let i = 0; i < data.length; i++){
                    if (data[i]["status"] != 1){return}
                    var object = data[i]["object"]
                    if (data[i]["object"].includes("treasure_hunt/treasure")){
                        object = `<img class="object_img" src="${data[i]["object"]}" alt="">`
                    }
                    $(".treasure_evidence_list").append(`
                        <div class="row treasure_evidence" data-type="${data[i]["type"]}" data-id="${data[i]["id"]}">
                            <div class="col">
                            Object:<br>${object}
                            </div>
                            <div class="col">
                            Evidence:<br>
                            <img class="evidence_img" src="${data[i]["evidence"]}" alt="">
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