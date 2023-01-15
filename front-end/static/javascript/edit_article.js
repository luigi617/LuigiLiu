if (typeof(APP) == "undefined"){
    APP = {}
}
APP['edit_article'] = {
    "init": function(){
        $(".edit_article").click(function(){
            var id = ARTICLE_ID
            var content = APP.base.parse_article_content($("#input_article_content").val())
            var title = $("#input_article_title").val()
            var cover = $("#input_article_cover")[0].files[0]
            
            var fd = new FormData();
            fd.append('id', id);
            fd.append('content', content);
            fd.append('title', title);
            fd.append('cover', cover);

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
                    console.log(data)
                }
            })

        })
        $("#input_article_content").on('change keyup paste', function() {
            var diplay_content = APP.base.parse_article_content($(this).val())
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
                $("#input_article_title").val(data["title"])
                $("#input_article_content").val(data["content"])
                var diplay_content = APP.base.parse_article_content(data["content"])
                $(".diplay_content").empty()
                $(".diplay_content").append(diplay_content)
                
                MathJax.typesetPromise()

                
            }
        })
    },
}