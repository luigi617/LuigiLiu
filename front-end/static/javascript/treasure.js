if (typeof(APP) == "undefined"){
    APP = {}
}
APP['treasure'] = {
    "init": function(){
        $(".input_treasure_evidence_div").click(function(){
            $("#input_treasure_evidence")[0].click()
            
        })
        $("#input_treasure_evidence").change(function(){
            $(".input_treasure_evidence_div").empty()
            $(".input_treasure_evidence_div").append(`
                <img src='' alt='evidence temporal image' id='evidence_temp_img'><br>
                <button id="upload_evidence_image" type="button" class="btn btn-outline-dark mt-3">Upload</button>
            `)

            var files = $("#input_treasure_evidence")[0].files
            $("#upload_evidence_image").click(function(e){
                e.preventDefault()
                e.stopPropagation()
                var fd = new FormData();
                fd.append('treasure', treasure_id);
                fd.append('evidence_img', files[0]);

                $.ajax({
                    method: "POST",
                    url: BASE_URL + UPDATE_GROUP_TREASURE_URL,
                    data: fd,
                    processData: false,
                    contentType: false,
                    success: function(data){
                        console.log(data);
                    }
                })
                
            })
            
            if (FileReader && files && files.length) {
                var fr = new FileReader();
                fr.onload = function () {
                    $("#evidence_temp_img").attr("src", fr.result);
                }
                fr.readAsDataURL(files[0]);
            }
        })
    },
    "load_treasure": function(){
        $.ajax({
            method: "GET",
            url: BASE_URL + RETRIVE_TREASURE_URL,
            success: function(data){
                $(".object_img").prop("src", data['object'])
            }
        })
    },
    "load_treasure_hints": function(){
        $.ajax({
            method: "GET",
            url: BASE_URL + RETRIVE_TREASURE_HINTS_URL,
            success: function(data){
                for (let i = 0; i < data.length; i++){
                    if (data[i]["is_activate"] == true){
                        var img = ""
                        if (data[i]["hint_img"].length != 0){
                            img = `<img src="${BASE_URL + "/" +data[i]["hint_img"]}" class="hint_img" alt="...">`
                        }
                        $(".hint_section").append(`
                            <div class="hint_row">
                            N.${i+1} hint: ${data[i]["hint"]}<br>${img}
                        </div>
                        `)
                    } else {
                        $(".hint_section").append(`
                            <div class="hint_row">
                                N.${i+1} hint: Task for unlocking the hint: ${data[i]["requirement_for_hint"]}
                                <div class="input_treasure_hint_evidence_div mt-3">
                                    Upload image for hint
                                </div>
                                <input type="file" id="input_treasure_hint_evidence" class="d-none">
                            </div>
                        `)

                        $(".input_treasure_hint_evidence_div").click(function(){
                            $("#input_treasure_hint_evidence")[0].click()
                            
                        })
                        $("#input_treasure_hint_evidence").change(function(){
                            $(".input_treasure_hint_evidence_div").empty()
                            $(".input_treasure_hint_evidence_div").append(`
                                <img src='' alt='hint evidence temporal image' id='hint_evidence_temp_img'><br>
                                <button id="upload_hint_evidence_image" type="button" class="btn btn-outline-dark mt-3">Upload</button>
                            `)
                            var files = $("#input_treasure_hint_evidence")[0].files

                            $("#upload_hint_evidence_image").click(function(e){
                                e.preventDefault()
                                e.stopPropagation()

                                var fd = new FormData();
                                fd.append('treasure_hint_id', data[i]["id"]);
                                fd.append('evidence_img', files[0]);

                                $.ajax({
                                    method: "POST",
                                    url: BASE_URL + UPDATE_GROUP_TREASURE_HINT_URL,
                                    data: fd,
                                    processData: false,
                                    contentType: false,
                                    success: function(data){
                                        console.log(data);
                                    }
                                })
                                
                            })
                            if (FileReader && files && files.length) {
                                var fr = new FileReader();
                                fr.onload = function () {
                                    $("#hint_evidence_temp_img").attr("src", fr.result);
                                }
                                fr.readAsDataURL(files[0]);
                            }
                        })
                        break
                    }
                }
            }
        })
    }
}