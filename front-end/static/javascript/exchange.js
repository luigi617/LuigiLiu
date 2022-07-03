if (typeof(APP) == "undefined"){
    APP = {}
}
APP['exchange'] = {
    "init": function(){

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
                        <div class="image_div">
                    `
                    for (let j = 0; j < data["results"][i]['post_images'].length; j++){
                        post = post + `<img src="${data["results"][i]['post_images'][j]["file"]}" class="post_img" alt="...">`
                    }
                    post = post + `
                        </div>
                        <div class="d-flex justify-content-end me-3">
                            <span>Comments</span>
                        </div>
                    </div>
                    `
                    $("#post_row").append(post)
                }

            }
        })
    }
}