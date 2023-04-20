if (typeof(APP) == "undefined"){
    APP = {}
}
APP['manage_treasure_game'] = {
    "init": function(){
        $(".check_treasure_evidence").click(function(){
            window.location.href = TREASURE_EVIDENCE_URL
        })
        $(document).on("click", ".change_groups", function(){
            var group_id_list = $("#treasure_game_groups_input").val()
            console.log(group_id_list);
            $.ajax({
                method: "POST",
                url: BASE_URL + TREASURE_GAME_GROUPS_URL,
                data: {
                    "group_id_list": group_id_list,
                    "treasure_hunt_game_id": treasure_hunt_game_id
                },
                success: function(data){
                    location.reload()
                }
            })
        })
        $(".input_treasure_div").click(function(){
            $("#input_treasure")[0].click()
            
        })
        $("#input_treasure").change(function(){
            $(".input_treasure_div").empty()
            $(".input_treasure_div").append(`
                <img src='' alt='temporal image' id='temp_img'><br>
                <button id="upload_treasure" type="button" class="btn btn-outline-dark mt-3">Upload</button>
            `)

            var files = $("#input_treasure")[0].files
            $("#upload_treasure").click(function(e){
                e.preventDefault()
                e.stopPropagation()
                var fd = new FormData();
                fd.append('treasure_game', treasure_hunt_game_id);
                fd.append('object', files[0]);
                fd.append('action', "add_treasure");

                $.ajax({
                    method: "POST",
                    url: BASE_URL + TREASURE_GAME_TREASURES_URL,
                    data: fd,
                    processData: false,
                    contentType: false,
                    success: function(data){
                        location.reload()
                    }
                })
                
            })
            
            if (FileReader && files && files.length) {
                var fr = new FileReader();
                fr.onload = function () {
                    $("#temp_img").attr("src", fr.result);
                }
                fr.readAsDataURL(files[0]);
            }
        })
        $(document).on("click", ".add_new_hint", function(e){
            var fd = new FormData();
            fd.append('treasure_id', $(this).closest(".treasure").data("id"));
            fd.append('requirement', $(this).parent().find(".requirement_input").val());
            fd.append('hint', $(this).parent().find(".hint_input").val());
            if ($(this).parent().find(".hint_img_input")[0].files.length > 0){
                fd.append('hint_img', $(this).parent().find(".hint_img_input")[0].files[0]);
            }
            fd.append('action', "add_hint");
            if (fd.get("requirement").length==0 || fd.get("hint") == 0){
                return;
            }
            $.ajax({
                method: "POST",
                url: BASE_URL + TREASURE_GAME_TREASURES_URL,
                data: fd,
                processData: false,
                contentType: false,
                success: function(data){
                    location.reload()
                }
            })
            
        })
        $(document).on("click", ".start_treasure_game", function(e){
            
            $.ajax({
                method: "POST",
                url: BASE_URL + START_TREASURE_HUNT_GAME_URL,
                data: {"treasure_game_id": treasure_hunt_game_id},
                success: function(data){
                    location.reload()
                }
            })
            
        })
        $(document).on("click", ".delete_treasure", function(e){
            $.ajax({
                method: "POST",
                url: BASE_URL + DELETE_TREASURES_AND_HINTS_URL,
                data: {
                    "action": "delete_treasure",
                    "treasure_id": $(this).data("id"),
                },
                success: function(data){
                    location.reload()
                }
            })
            
        })
        $(document).on("click", ".delete_hint", function(e){
            
            $.ajax({
                method: "POST",
                url: BASE_URL + DELETE_TREASURES_AND_HINTS_URL,
                data: {
                    "action": "delete_hint",
                    "hint_id": $(this).data("id"),
                },
                success: function(data){
                    location.reload()
                }
            })
            
        })
    },
    "load_treasure_game": function(){
        $.ajax({
            method: "GET",
            url: BASE_URL + TREASURE_GAME_RETRIEVE_URL,
            success: function(data){
                $(".game_info").append(`
                    <div>Game: ${data["game"]["id"]}</div>
                    <div>Started: ${data["game"]["is_started"]}</div>
                    <div>Time started: ${data["game"]["time_started"]}</div>
                    <div>Time ended: ${data["game"]["time_ended"]}</div>
                `)
                if (!data["game"]["is_started"]){
                    $(".game_info").append(`
                        <button type="button" class="btn btn-dark mx-3 mb-3 start_treasure_game">Start Game</button>
                    `)
                }
                for (let i = 0; i < data["groups"].length; i++){
                    var usernames = []
                    for (let j = 0; j < data["groups"][i]["users"].length; j++){
                        usernames.push(data["groups"][i]["users"][j]["username"])
                    }
                    $("#treasure_game_groups_input").before(`
                        <div><strong>${data["groups"][i]["name"]}</strong>: ${usernames.join(", ")}</div>
                    `)
                }
                if (!data["game"]["is_started"]){
                    $(".group_info").append(`
                        <button type="button" class="btn btn-dark mx-3 mb-3 change_groups">Change groups</button>
                    `)
                } else {
                    $("#treasure_game_groups_input").addClass("d-none")
                }
            }
        })
    },
    "load_group_treasure_process": function(){
        
        $.ajax({
            method: "GET",
            url: BASE_URL + GROUP_TREASURE_PROCESS_URL,
            data:{"treasure_game_id":treasure_hunt_game_id},
            success: function(data){
                for (let i = 0; i < data.length; i++){
                    $(".group_process").prepend(`<div>${data[i]["group"]["name"]}: ${data[i]["number_completed_treasures"]}</div>`)
                }
            }
        })
    },
    "load_treasure_game_groups": function(){
        $.ajax({
            method: "GET",
            url: BASE_URL + TREASURE_GAME_GROUPS_URL,
            success: function(data){
                for (let i = 0; i < data.length; i++){
                    $("#treasure_game_groups_input").append(`
                        <option value="${data[i]["id"]}">${data[i]["name"]}</option>
                    `)
                }
            }
        })
    },
    "load_treasure_game_treasures_and_hints": function(){
        $.ajax({
            method: "GET",
            url: BASE_URL + TREASURE_GAME_TREASURES_URL,
            success: function(data){
                for (let i = 0; i < data.length; i++){
                    $(".treasures_list_row").append(`
                        <div class="treasure-${data[i]["id"]} treasure" data-id='${data[i]["id"]}'>
                        </div>
                    `)
                    $(`.treasure-${data[i]["id"]}`).append(`
                        <div class="col-12 mb-3">
                        Object:<br>
                            <img src="${data[i]["object"]}" class="object_img" alt="...">
                            <button type="button" class="btn btn-dark mx-3 mb-3 delete_treasure" data-id="${data[i]["id"]}">Delete Treasure</button>
                        </div>
                    `)
                    var hint_place = $(`.treasure-${data[i]["id"]}`)
                    for (let j = 0; j < data[i]["hints"].length; j++){
                        var img = ""
                        if (data[i]["hints"][j]["hint_img"] != null){
                            img = `<img src="${data[i]["hints"][j]["hint_img"]}" class="hint_img" alt="...">`
                        }

                        hint_place.append(`
                            <div class="col-12 ms-5 hint_col">
                                Hint # ${j+1} <br>
                                Requirement: ${data[i]["hints"][j]["requirement_for_hint"]}<br>
                                Hint:${data[i]["hints"][j]["hint"]}<br>
                                ${img}
                                <button type="button" class="btn btn-dark mx-3 mb-3 delete_hint" data-id="${data[i]["hints"][j]["id"]}">Delete Hint</button>
                            </div>
                        `)
                    }
                    hint_place.append(`
                        <div class="col-12 ms-5 hint_col">
                            New Hint <br>
                            Requirement: <input type="text" class="requirement_input">
                            Hint:<input type="text" class="hint_input">
                            <input type="file" class="hint_img_input">
                            <button type="button" class="btn btn-dark mx-3 mb-3 add_new_hint">Add Hint</button>
                        </div>
                    `)
                    
                }
            }
        })
    },
  
}