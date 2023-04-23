if (typeof(APP) == "undefined"){
    APP = {}
}
APP['treasure'] = {
    "init": function(){
        $(document).on("click", ".input_treasure_evidence_div", function(){
            $("#input_treasure_evidence")[0].click()
            
        })
        $(document).on("change", "#input_treasure_evidence", function(){
            $(".input_treasure_evidence_div").empty()
            $(".input_treasure_evidence_div").append(`
                <img src='' alt='evidence temporal image' id='evidence_temp_img'><br>
                <button id="upload_evidence_image" type="button" class="btn btn-outline-dark mt-3">Upload</button>
            `)

            var files = $("#input_treasure_evidence")[0].files

            const MAX_WIDTH = 500;
            const MAX_HEIGHT = 500;
            const MIME_TYPE = "image/jpg";
            const QUALITY = 0.7;
            const blobURL = URL.createObjectURL(files[0]);
            const img = new Image();
            img.src = blobURL;
            upload_file = null
            img.onload = function () {
                URL.revokeObjectURL(this.src);
                const [newWidth, newHeight] = APP.base.calculate_size(img, MAX_WIDTH, MAX_HEIGHT);
                const canvas = document.createElement("canvas");
                canvas.width = newWidth;
                canvas.height = newHeight;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, newWidth, newHeight);
                canvas.toBlob(
                    (blob) => {

                        upload_file = new File([blob], files[0]["name"])
                        blob = blob.slice(0, blob.size, MIME_TYPE)
                        if (FileReader && upload_file) {
                            var fr = new FileReader();
                            
                            fr.onload = function () {
                                $("#evidence_temp_img").attr("src", fr.result);
                            }
                            fr.readAsDataURL(upload_file);
                        }
                    },
                    MIME_TYPE,
                    QUALITY
                );
            };

            $("#upload_evidence_image").click(function(e){
                e.preventDefault()
                e.stopPropagation()
                var fd = new FormData();
                fd.append('treasure', treasure_id);
                fd.append('evidence_img', upload_file);

                $.ajax({
                    method: "POST",
                    url: BASE_URL + UPDATE_GROUP_TREASURE_URL,
                    data: fd,
                    processData: false,
                    contentType: false,
                    success: function(data){
                        location.reload()
                    }
                })
                
            })
            
           
        })
        $(document).on("click", ".input_treasure_hint_evidence_div", function(){
            $("#input_treasure_hint_evidence")[0].click()
            
        })
        $(document).on("change", "#input_treasure_hint_evidence", function(){
            $(".input_treasure_hint_evidence_div").empty()
            $(".input_treasure_hint_evidence_div").append(`
                <img src='' alt='hint evidence temporal image' id='hint_evidence_temp_img'><br>
                <button id="upload_hint_evidence_image" type="button" class="btn btn-outline-dark mt-3">Upload</button>
            `)
            var files = $("#input_treasure_hint_evidence")[0].files

            const MAX_WIDTH = 500;
            const MAX_HEIGHT = 500;
            const MIME_TYPE = "image/jpg";
            const QUALITY = 0.7;
            const blobURL = URL.createObjectURL(files[0]);
            const img = new Image();
            img.src = blobURL;
            upload_file = null
            img.onload = function () {
                URL.revokeObjectURL(this.src);
                const [newWidth, newHeight] = APP.base.calculate_size(img, MAX_WIDTH, MAX_HEIGHT);
                const canvas = document.createElement("canvas");
                canvas.width = newWidth;
                canvas.height = newHeight;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, newWidth, newHeight);
                canvas.toBlob(
                    (blob) => {

                        upload_file = new File([blob], files[0]["name"])
                        blob = blob.slice(0, blob.size, MIME_TYPE)
                        if (FileReader && upload_file) {
                            var fr = new FileReader();
                            
                            fr.onload = function () {
                                $("#hint_evidence_temp_img").attr("src", fr.result);
                            }
                            fr.readAsDataURL(upload_file);
                        }
                    },
                    MIME_TYPE,
                    QUALITY
                );
            };


            $("#upload_hint_evidence_image").click(function(e){
                e.preventDefault()
                e.stopPropagation()
                var fd = new FormData();
                fd.append('group_treasure_hint_id', $(this).closest(".hint_row").data("group_treasure_hint_id"));
                fd.append('evidence_img', upload_file);

                $.ajax({
                    method: "POST",
                    url: BASE_URL + UPDATE_GROUP_TREASURE_HINT_URL,
                    data: fd,
                    processData: false,
                    contentType: false,
                    success: function(data){
                        location.reload()
                    }
                })
                
            })
            // if (FileReader && files && files.length) {
            //     var fr = new FileReader();
                
            //     fr.onload = function () {
            //         $("#hint_evidence_temp_img").attr("src", fr.result);
            //     }
            //     fr.readAsDataURL(files[0]);
            // }
            
        })
    },
    "load_treasure": function(){
        $.ajax({
            method: "GET",
            url: BASE_URL + RETRIVE_TREASURE_URL,
            success: function(data){
                $(".object_img").prop("src", data['object'])
                if (data["status"] == 0){
                    $(".action").append(`
                        <div class="input_treasure_evidence_div mt-3">
                            <strong>Upload image</strong>
                        
                        </div>
                        <input type="file" id="input_treasure_evidence" class="d-none" accept="image/png, image/gif, image/jpeg">
                    `)
                } else if (data["status"] == 1){
                    $(".action").append(`
                        <strong>Waiting for the Result</strong>
                    `)
                } else {
                    $(".action").append(`
                        <strong>Congrat. You found it</strong>
                    `)
                }
            }
        })
    },
    "load_treasure_hints": function(){
        $.ajax({
            method: "GET",
            url: BASE_URL + RETRIVE_TREASURE_HINTS_URL,
            success: function(data){
                for (let i = 0; i < data.length; i++){
                    console.log(data);
                    if (data[i]["status"] == 2){
                        var img = ""
                        if (data[i]["hint_img"] != null && data[i]["hint_img"] != ""){
                            img = `<img src="${BASE_URL + "/" +data[i]["hint_img"]}" class="hint_img" alt="...">`
                        }
                        $(".hint_section").append(`
                            <div class="hint_row">
                            N.${i+1} hint: ${data[i]["hint"]}<br>${img}
                        </div>
                        `)
                    } else {
                        var action = `<div class="input_treasure_hint_evidence_div mt-3">
                                            Upload image for hint
                                        </div>
                                        <input type="file" id="input_treasure_hint_evidence" class="d-none" accept="image/png, image/gif, image/jpeg">`
                        if (data[i]["status"] == 1){
                            action = "<div><strong>Waiting for Responce</strong></div>"
                        }
                        $(".hint_section").append(`
                            <div class="hint_row" data-group_treasure_hint_id="${data[i]["id"]}">
                                N.${i+1} hint: Task for unlocking the hint: ${data[i]["requirement_for_hint"]}
                                <div class="hint_action">
                                    ${action}
                                </div>
                            </div>
                        `)
                        break
                    }
                }
            }
        })
    }
}