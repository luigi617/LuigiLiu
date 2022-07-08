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
        $(document).on("click",".pdf_svg",function(){
            var pdf_id = $(this).data("pdf_id")
            $.ajax({
                url: BASE_URL + DISPENSE_URL + pdf_id + "/",
                method: "GET",
                success: function(result){
                    console.log(result["dispense"])
                    window.location.href = result["dispense"]
                }
            })
        })
    
    },
    "load_post": function(page = 1){

        $.ajax({
            method: "GET",
            url: BASE_URL + POST_URL + "?page=" + page,
            success: function(data){
                for (let i = 0; i < data["results"].length; i++){

                    var post = `
                    <div class="post"> 
                        <div class="post_content">
                            <img class="avatar_img" src="${data["results"][i]["user"]["avatar_thumbnail"]}" alt="">
                        <div>
                            <h3>${data["results"][i]['title']}</h3>
                            <p>${data["results"][i]['text']}</p>
                        
                            </div>
                        </div>
                      
                        <div style="display:inline-flex">
                      `
                    for (let j = 0; j < data["results"][i]['books'].length; j++){
                        var book = {
                            "Title": data["results"][i]['books'][j]["title"],
                            "Author": data["results"][i]["books"][j]["author"],
                            "ISBN": data["results"][i]["books"][j]["ISBN"],
                            "School": data["results"][i]["books"][j]["school"],
                            "Course": data["results"][i]["books"][j]["course"],
                            "Price": data["results"][i]["books"][j]["price"],
                        }
                        post = post + "<div class='book_div'>"
                        for (let key in book){
                            if (book[key] == ""){ continue }
                            post = post + `${key}: <span class="book_info ms-2">${book[key]}</span>`
                            if (key != "Price"){
                                post = post + `<br>`
                            }
                        }
                        post = post + "</div>"
                        
                    }
                    for (let j = 0; j < data["results"][i]['dispenses'].length; j++){
                        var dispense = {
                            "School": data["results"][i]['dispenses'][j]["school"],
                            "Course": data["results"][i]["dispenses"][j]["course"],
                            "Description": data["results"][i]["dispenses"][j]["description"],
                            "Price": data["results"][i]["dispenses"][j]["price"],
                        }
                        post = post + "<div class='dispense_div'>"
                        for (let key in dispense){
                            if (key == "Price"){
                                post = post + `<img src="${PDF_SVG}" data-pdf_id= "${data["results"][i]['dispenses'][j]["id"]}" class="pdf_svg" ><br>`
                            }
                            if (dispense[key] == ""){ continue }
                            post = post + `${key}: <span class="dispense_info ms-2">${dispense[key]}</span>`
                            if (key != "Price"){
                                post = post + `<br>`
                            }
                        }
                        post = post + "</div>"
                    }
                    post = post + `</div>`


                    post = post + `<div class="image_div">`
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
        $(".create_post").click(function(){
            var data = new FormData();
            var error = []
            $(".input_error").removeClass("input_error")
            if ($("#input_post_text").val().trim() == ""){
                error.push($("#input_post_text"))
            }
            data.append("post_title", $("#input_post_title").val())
            data.append("post_content", $("#input_post_text").val())
            for (let j = 0; j < $("#input_post_images").prop('files').length; j++){
                data.append("post_images", $("#input_post_images").prop('files')[j])
            }
            var post_type = $("input[type=radio][name=post_type]:checked").val()
            data.append("post_type", post_type)
            if (post_type == "book_selling"){
                var input_book = $(".input_book_div")
                data.append("post_book_num", input_book.length)
                for (let i = 0; i < input_book.length; i++){
                    data.append(`post_book_title_${i}`, $(input_book[i]).find(".input_book_title").val())
                    data.append(`post_book_author_${i}`, $(input_book[i]).find(".input_book_author").val())
                    data.append(`post_book_ISBN_${i}`, $(input_book[i]).find(".input_book_ISBN").val())
                    data.append(`post_book_school_${i}`, $(input_book[i]).find(".input_book_school").val())
                    data.append(`post_book_course_${i}`, $(input_book[i]).find(".input_book_course").val())
                    data.append(`post_book_price_${i}`, $(input_book[i]).find(".input_book_price").val())
                    if ($(input_book[i]).find(".input_book_price").val().trim() == ""){
                        error.push($(input_book[i]).find(".input_book_price"))
                    }
                }
            } else if (post_type == "dispense_selling"){
                var input_dispense = $(".input_dispense_div")
                data.append("post_dispense_num", input_dispense.length)
                if (input_dispense.length == 0){
                    error.push($(".add_input_dispense_button"))
                }
                for (let i = 0; i < input_dispense.length; i++){
                    data.append(`post_dispense_school_${i}`, $(input_dispense[i]).find(".input_dispense_school").val())
                    data.append(`post_dispense_course_${i}`, $(input_dispense[i]).find(".input_dispense_course").val())
                    data.append(`post_dispense_files_${i}`, $(input_dispense[i]).find(".input_dispense_file").prop('files')[0])
                    data.append(`post_dispense_description_${i}`, $(input_dispense[i]).find(".input_dispense_description").val())
                    data.append(`post_dispense_price_${i}`, $(input_dispense[i]).find(".input_dispense_price").val())
                    if ($(input_dispense[i]).find(".input_dispense_file").prop('files').length == 0){
                        error.push($(input_dispense[i]).find(".input_dispense_file"))
                    }
                    if ($(input_dispense[i]).find(".input_dispense_price").val().trim() == ""){
                        error.push($(input_dispense[i]).find(".input_dispense_price"))
                    }
                }
   
            }
            if (error.length > 0){
                console.log(error)
                for (let i = 0; i < error.length; i++){
                    $(error[i]).addClass("input_error")
                }
                return
            }
            $.ajax({
                url: BASE_URL + CREATE_POST_URL,
                method: "POST",
                data: data,
                processData: false,
                contentType: false,

                headers: {
                    "X-CSRFToken": CSRF
                },
                success: function(result){
                    location.reload();
                },
                error: function(xhr, status, error) {
                    console.log(xhr.responseText)
                  }
            })
            console.log(...data)
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
                        <input type="number" class="form-control input_dispense_price" step="0.01" min="0.00">
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
                        <input type="text" class="form-control input_book_course">
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