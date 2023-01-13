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
                $(".text-content").text(data["content"])
                
                MathJax.typesetPromise()

                
            }
        })
    },
}