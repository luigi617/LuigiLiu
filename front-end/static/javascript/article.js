if (typeof(APP) == "undefined"){
    APP = {}
}
APP['article'] = {
    "init": function(){
        
    },
    "load_article": function(){
        $.ajax({
            method: "GET",
            url: BASE_URL + ARTICLE_RETRIEVE_URL,
            success: function(data){
                $(".text-title").text(data["title"])

                var diplay_content = APP.base.parse_article_content(data["content"])
                $(".text-content").empty()
                $(".text-content").append(diplay_content)
                
                MathJax.typesetPromise()

                
            }
        })
    },
}