if (typeof(APP) == "undefined"){
    APP = {}
}
APP['articles_list'] = {
    "init": function(){
        $(".create_article").click(function(){
            window.location.href = BASE_URL + CREATE_ARTICLE_URL
        })
        $(document).on("click", ".article", function(el){
            if ($(el.target).hasClass("edit_article_svg")){ return }
            window.location.href = $(this).data("url")
        })
        $(document).on("click", ".edit_article_svg", function(){
            window.location.href = BASE_URL + EDIT_ARTICLE_URL + $(this).parents(".article").data("article_id")

        })
    },
    "load_articles": function(){
        $.ajax({
            method: "GET",
            url: BASE_URL + ARTICLE_LIST_URL,
            success: function(data){
                var article = ""
                
                for (let i = 0; i < data.results.length; i++){
                    article = 
                    `
                    <li class="article list-group-item d-flex justify-content-between align-items-start"
                        data-url="${BASE_URL + ARTICLE_RETRIEVE_URL + data.results[i]["id"] + "/"}"
                        data-article_id="${ data.results[i]["id"]}">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">${data.results[i]["title"]}</div>
                        </div>
                        <p class="card-text fw-light text-end mx-2 article_date_modified">${APP.base.parse_time(data.results[i]["date_modified"])}</p>
                    `
                    if (AUTHENTICATED ){
                        article = article + 
                        `<div class="edit_article">
                            <img src="${EDIT_ARTICLE_SVG}" class="edit_article_svg" alt="...">
                        </div>`
                    }
                    article = article + "</li>"
                    $(".articles_row").prepend(article)
                }
                
            }
        })
    },
}