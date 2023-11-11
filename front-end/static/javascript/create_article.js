if (typeof(APP) == "undefined"){
    APP = {}
}
APP['create_article'] = {
    "init": function(){
        $(".create_article").click(function(){

            var content = APP.base.parse_article_content($("#input_article_content").val())
            var title = $("#input_article_title").val()
            var url_name = title.trim().toLowerCase().replaceAll(" ", "_").replace(/[^a-z0-9_]/g, '')
            var cover = $("#input_article_cover")[0].files[0]

            var fd = new FormData();
            fd.append('content', content);
            fd.append('title', title);
            fd.append('url_name', url_name);
            fd.append('cover', cover);

            $.ajax({
                method: "POST",
                url: BASE_URL + ARTICLE_CREATION_URL,
                data: fd,
                processData: false,
                contentType: false,
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
}