if (typeof(APP) == "undefined"){
    APP = {}
}
APP['edit_article'] = {
    "init": function(){
        $(".edit_article").click(function(){
            var id = $("#input_article_id").val()
            var content = APP.base.parse_article_content($("#input_article_content").val())
            var title = $("#input_article_title").val()
            var category = $("#input_article_category").val()
            var url_name = title.trim().toLowerCase().replaceAll(" ", "_").replace(/[^a-z0-9_]/g, '')
            var cover = $("#input_article_cover")[0].files[0]
            var pdf = $("#input_article_pdf")[0].files[0]
            
            if (title.length == 0) { return }
            var fd = new FormData();
            fd.append('id', id);
            fd.append('content', content);
            fd.append('title', title);
            fd.append('category', category);
            fd.append('url_name', url_name);
            fd.append('cover', cover);
            fd.append('pdf', pdf);

            $.ajax({
                method: "PUT",
                url: BASE_URL + ARTICLE_UPDATE_URL,
                data: fd,
                processData: false,
                contentType: false,
                // beforeSend: function (xhr, settings) {
                //     xhr.setRequestHeader('X-CSRFToken', CSRF_TOKEN)
                // },    
                success: function(data){
                    window.location.href = ARTICLE_LIST
                }
            })

        })
        // $("#input_article_content").on('change keyup paste', function() {
        //     var diplay_content = APP.base.parse_article_content($(this).val())
        //     $(".diplay_content").empty()
        //     $(".diplay_content").append(diplay_content)
        //     MathJax.typesetPromise()
        // })
        $('#input_article_content').keyup(function (event) {
            if (event.keyCode == 13 & event.shiftKey) {
                event.preventDefault()
                var diplay_content = APP.base.parse_article_content($(this).val())
                $(".diplay_content").empty()
                $(".diplay_content").append(diplay_content)
                MathJax.typesetPromise()
            }
        });
        $(".parse_article").click(function(){
            var diplay_content = APP.base.parse_article_content($("#input_article_content").val())
            $(".diplay_content").empty()
            $(".diplay_content").append(diplay_content)
            MathJax.typesetPromise()
        })
        
    },
    "load_article": function(){
        $.ajax({
            method: "GET",
            url: BASE_URL + ARTICLE_RETRIEVE_URL,
            success: function(data){
                console.log(data);
                $("#input_article_id").val(data["id"])
                $("#input_article_title").val(data["title"])
                $("#input_article_title").val(data["title"])
                $("#input_article_content").val(data["content"])
                var diplay_content = APP.base.parse_article_content(data["content"])
                $(".diplay_content").empty()
                $(".diplay_content").append(diplay_content)
                
                MathJax.typesetPromise()

                $.ajax({
                    method: "GET",
                    url: BASE_URL + ARTICLE_CATEGORY_LIST_URL,
                    success: async function(category_data){
                        for (let i = 0; i < category_data.results.length; i++){
                            if (data["category"] == category_data.results[i]['id']) {
                                $("#input_article_category").append(`<option value="${category_data.results[i]['id']}" selected >${category_data.results[i]['name']}</option>`)
                                } else {
                                $("#input_article_category").append(`<option value="${category_data.results[i]['id']}">${category_data.results[i]['name']}</option>`)
                            }
                        }
                    }
                })

                
            }
        })
    },
   
}