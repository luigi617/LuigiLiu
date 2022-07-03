if (typeof(APP) == "undefined"){
    APP = {}
}
APP['exchange'] = {
    "init": function(){
        $(document).click(function(e){
            if ($(e.target).hasClass("comment")){
                var svg_el = $(e.target)
                if ($(e.target).children().length == 1){
                    svg_el = $(e.target).children()
                }
                if (svg_el.prop("src").toString().endsWith(EXPAND_MORE_SVG)){
                    svg_el.prop("src", EXPAND_LESS_SVG)
                    svg_el.parent().parent().next().removeClass("d-none")
                } else {
                    svg_el.prop("src", EXPAND_MORE_SVG)
                    svg_el.parent().parent().next().addClass("d-none")
                }
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
                                Title: <span class="ms-2">${data["results"][i]['books'][j]["title"]}</span><br>
                                Author: <span class="ms-2">${data["results"][i]['books'][j]["author"]}</span><br>
                                ISBN: <span class="ms-2">${data["results"][i]['books'][j]["ISBN"]}</span><br>
                                Price: <span class="ms-2">${data["results"][i]['books'][j]["price"]} €</span>
                            </div>
                        `
                    }
                    for (let j = 0; j < data["results"][i]['dispenses'].length; j++){
                    post = post + `
                        <div class="dispense_div">
                            Price: ${data["results"][i]['dispenses'][j]["price"]} €
                            <br>
                            <img src="${PDF_SVG}" data-pdf_id= "
                            ${data["results"][i]['dispenses'][j]["id"]} " class="pdf_svg" >

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
                        <div class="d-flex justify-content-between mx-3 mt-3">
                            <span>${APP.exchange.calc_time(data["results"][i]["date_added"])}</span>
                            <span class="comment">
                            Comments (${APP.exchange.calc_time(data["results"][i]["comments"].length)})
                            <img src="${EXPAND_MORE_SVG}" class="expand_svg comment" >
                            </span>
                        </div>
                        <div class="comment_div d-none">
                        `
                        console.log(data["results"][i]['comments'][0]["user"])
                    for (let j = 0; j < data["results"][i]['comments'].length; j++){
                        post = post +`
                        <div class="mb-2" >
                        <span class="comment_user">${data["results"][i]['comments'][j]["user"]}</span>:
                        ${data["results"][i]['comments'][j]["text"]}
                        </div>
                        `
                    }
                        post = post + `
                        </div>
                    </div>
                    `
                    $("#post_row").append(post)
                }

            }
        })
    },
    "calc_time": function(time){
        return time
    }
}