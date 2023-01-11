if (typeof(APP) == "undefined"){
    APP = {}
}
APP['articles_list'] = {
    "init": function(){
        
    },
    "load_articles": function(){
        $.ajax({
            method: "GET",
            url: BASE_URL + ARTICLE_LIST_URL,
            success: function(data){
                console.log(data.results)
                for (let i = 0; i < data.results.length; i++){
                    $(".articles_row").prepend(
                        `
                        <a href="${BASE_URL + ARTICLE_RETRIEVE_URL + data.results[i]["id"]}" class="list-group-item list-group-item-action">${data.results[i]["title"]}</a>
                        `
                    )
                  
                }
                MathJax.typeset()
                
            }
        })
    },
}