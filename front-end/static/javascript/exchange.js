if (typeof(APP) == "undefined"){
    APP = {}
}
APP['exchange'] = {
    "init": function(){
        $(document).on("click",".comment",function(){
            var svg_el = $(this).children()
            if (svg_el.prop("src").toString().endsWith(EXPAND_MORE_SVG)){
                svg_el.prop("src", EXPAND_LESS_SVG)
                // svg_el.parent().parent().next().css({"visibility":"hidden"})
                svg_el.parent().parent().next().css({
                    "transform":"scaleY(1)",
                    "height":"auto",
            })
            } else {
                svg_el.prop("src", EXPAND_MORE_SVG)
                svg_el.parent().parent().next().css({
                    "transform": "scaleY(0)",
                    "transform-origin": "top",
                    "transition": "transform 0.26s ease",
                    "height":"0",
                })
            }
        })
    
    },
    "load_post": function(page = 1){
        console.log(BASE_URL + POST_URL)
        $.ajax({
            method: "GET",
            url: BASE_URL + POST_URL + "?page=" + page,
            success: function(data){

                for (let i = 0; i < data["results"].length; i++){
                    var post = `
                    <div class="post"> 
                      <h5>${data["results"][i]['title']}</h5>
                      <p>${data["results"][i]['text']}</p>
                      <div style="display:inline-flex">
                      `
                    for (let j = 0; j < data["results"][i]['books'].length; j++){
                    post = post + `
                            <div class="book_div">
                                Title: <span class="book_info ms-2">${data["results"][i]['books'][j]["title"]}</span><br>
                                Author: <span class="book_info ms-2">${data["results"][i]['books'][j]["author"]}</span><br>
                                ISBN: <span class="book_info ms-2">${data["results"][i]['books'][j]["ISBN"]}</span><br>
                                School: <span class="book_info ms-2">${data["results"][i]['books'][j]["school"]}</span><br>
                                Course: <span class="book_info ms-2">${data["results"][i]['books'][j]["course"]}</span><br>
                                Price: <span class="book_info ms-2">${data["results"][i]['books'][j]["price"]} €</span>
                            </div>
                        `
                    }
                    for (let j = 0; j < data["results"][i]['dispenses'].length; j++){
                    post = post + `
                        <div class="dispense_div">
                            School: <span class="dispense_info ms-2">${data["results"][i]['dispenses'][j]["school"]}</span><br>
                            Course: <span class="dispense_info ms-2">${data["results"][i]['dispenses'][j]["course"]}</span><br>
                            Description: <span class="dispense_info ms-2">${data["results"][i]['dispenses'][j]["description"]}</span><br>
                            <img src="${PDF_SVG}" data-pdf_id= "
                            ${data["results"][i]['dispenses'][j]["id"]} " class="pdf_svg" ><br>
                            Price: <span class="dispense_info ms-2">${data["results"][i]['dispenses'][j]["price"]} €</span>

                        </div>
                        `
                    }
                    post = post + `
                    </div>
                    `


                    post = post + `
                        <div class="image_div">
                    `
                    for (let j = 0; j < data["results"][i]['post_images'].length; j++){
                        post = post + `<img src="${data["results"][i]['post_images'][j]["file"]}" class="post_img" alt="...">`
                    }
                    post = post + `
                        </div>
                        <div class="d-flex justify-content-between me-3 mt-3">
                            <span class="post_date">${APP.exchange.calc_time(data["results"][i]["date_added"])}</span>
                            <span class="comment">
                            Comments (${data["results"][i]["comments"].length})
                            <img src="${EXPAND_MORE_SVG}" class="expand_svg" >
                            </span>
                        </div>
                        <div class="comment_div">
                        `
                    for (let j = 0; j < data["results"][i]['comments'].length; j++){
                        post = post +`
                        <div class="mb-2" >
                        <span class="comment_user">${data["results"][i]['comments'][j]["user"]["username"]}</span>:
                        ${data["results"][i]['comments'][j]["text"]}
                        </div>
                        `
                    }
                        post = post + `
                        <div class="form-floating">
                            <textarea class="form-control comment_textarea" placeholder="Leave a comment here"  style="height: 100px"></textarea>
                            <label>Leave a comment here</label>
                            <div class="d-flex justify-content-end mt-2">
                                <button type="button" class="btn btn-outline-dark">
                                    Comment
                                </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    `
                    $("#post_row").append(post)
                }

            }
        })
    },
    "calc_time": function(time){
        var now = new Date($.now());
        var post_time = new Date(time);
        var difference = now - post_time
        var minutes_difference = difference / 60000
        if (minutes_difference >= 60){
            var hour_difference = minutes_difference / 60
        } else {
            return Math.ceil(minutes_difference) + " minutes ago"
        }
        if (hour_difference >=24){
            var days_difference = hour_difference / 24
        } else {
            return Math.ceil(hour_difference) + " hours ago"
        }
        return Math.ceil(days_difference) + " days ago"
    },
    "create_post": function(){
        $("#input_post_images").change(function(){
            var files = $(this).prop("files")
            if (files.length > 4){
                $(this).val("")
                alert("images length must be lower or equal to 4")
                return
            }
            $(".images_display").empty()
            for (let i = 0; i< files.length; i++){
                var temp_img = document.createElement("img");
                temp_img.src = URL.createObjectURL(files[i]);
                temp_img.style.maxHeight = "100%"
                temp_img.style.maxWidth = "100%"
                temp_img.onload = function() {
                    URL.revokeObjectURL(temp_img.src) // free memory
                  }
                // $(".images_display")[0].appendChild(temp_img)
                $(".images_display").append(`<div class="col"></div>`)
                $(".images_display").children().last()[0].appendChild(temp_img)
            }
        })
        $(".add_input_dispense_button").click(function(){
            $(".dispense_information").append(`
                <div class="input_dispense_div">
                    <div class="d-flex justify-content-end mb-2">
                        <button class="btn btn-close btn_delete_input_dispense"></button>
                    </div>
                    <div class="row g-3 align-items-center mb-2">
                        <div class="col-2">
                        <label class="col-form-label">School</label>
                        </div>
                        <div class="col">
                        <input type="text" class="form-control input_dispense_school">
                        </div>
                    </div>
                    <div class="row g-3 align-items-center mb-2">
                        <div class="col-2">
                        <label class="col-form-label">Course</label>
                        </div>
                        <div class="col">
                        <input type="text" class="form-control input_dispense_course">
                        </div>
                    </div>
                    <div class="row g-3 align-items-center mb-2">
                        <div class="col-2">
                            <label  class="col-form-label">Dispense</label>
                        </div>
                        <div class="col">
                            <input type="file" accept="application/pdf" class="form-control input_dispense_file">
                        </div>
                    </div>
                    <div class="row g-3 align-items-center mb-2">
                        <div class="col-3">
                        <label  class="col-form-label">Description</label>
                        </div>
                        <div class="col">
                        <input type="text" class="form-control input_dispense_description">
                        </div>
                    </div>
                    <div class="row g-3 align-items-center mb-2">
                        <div class="col-2">
                        <label class="col-form-label">Price</label>
                        </div>
                        <div class="col">
                        <input type="number" class="form-control input_book_price" step="0.01" min="0.00">
                        </div>
                    </div>
                </div>
            `)

        })
        $(".add_input_book_button").click(function(){
            $(".book_information").append(`
                <div class="input_book_div">
                    <div class="d-flex justify-content-end mb-2">
                        <button class="btn btn-close btn_delete_input_book"></button>
                    </div>
                    <div class="row g-3 align-items-center mb-2">
                        <div class="col-2">
                        <label class="col-form-label">Title</label>
                        </div>
                        <div class="col">
                        <input type="text" class="form-control input_book_title">
                        </div>
                    </div>
                    <div class="row g-3 align-items-center mb-2">
                        <div class="col-2">
                        <label class="col-form-label">Author</label>
                        </div>
                        <div class="col">
                        <input type="text" class="form-control input_book_author">
                        </div>
                    </div>
                    <div class="row g-3 align-items-center mb-2">
                        <div class="col-2">
                        <label  class="col-form-label">ISBN</label>
                        </div>
                        <div class="col">
                        <input type="text" class="form-control input_book_ISBN">
                        </div>
                    </div>
                    <div class="row g-3 align-items-center mb-2">
                        <div class="col-2">
                        <label  class="col-form-label">School</label>
                        </div>
                        <div class="col">
                        <input type="text" class="form-control input_book_school">
                        </div>
                    </div>
                    <div class="row g-3 align-items-center mb-2">
                        <div class="col-2">
                        <label  class="col-form-label">Course</label>
                        </div>
                        <div class="col">
                        <input type="text" class="form-control input_book_Course">
                        </div>
                    </div>
                    <div class="row g-3 align-items-center mb-2">
                        <div class="col-2">
                        <label class="col-form-label">Price</label>
                        </div>
                        <div class="col">
                        <input type="number" class="form-control input_book_price" step="0.01" min="0.00">
                        </div>
                    </div>
                </div>
            `)
        })
        $(document).on("click",".btn_delete_input_book",function(){
            $(this).parent().parent().remove()
        })
        $(document).on("click",".btn_delete_input_dispense",function(){
            $(this).parent().parent().remove()
        })
        $("input[type=radio][name=post_type]").change(function(){
            if ($(this).val() == "book_selling"){
                $(".insert_book_div").removeClass("d-none")
                $(".insert_dispense_div").addClass("d-none")
            } else if ($(this).val() == "dispense_selling"){
                $(".insert_book_div").addClass("d-none")
                $(".insert_dispense_div").removeClass("d-none")
                
            } else if ($(this).val() == "no_radio"){
                $(".insert_book_div").addClass("d-none")
                $(".insert_dispense_div").addClass("d-none")
            }
        })
    }
}