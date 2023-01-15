if (typeof(APP) == "undefined"){
    APP = {}
}
APP['create_article'] = {
    "init": function(){
        $(".create_article").click(function(){

            var content = APP.base.parse_article_content($("#input_article_content").val())
            var title = $("#input_article_title").val()
            var cover = $("#input_article_cover")[0].files[0]
            
            var fd = new FormData();
            fd.append('content', content);
            fd.append('title', title);
            fd.append('cover', cover);

            $.ajax({
                method: "POST",
                url: BASE_URL + ARTICLE_CREATION_URL,
                data: fd,
                processData: false,
                contentType: false,
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
}