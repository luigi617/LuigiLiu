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
            window.location.href = BASE_URL + EDIT_ARTICLE_URL + $(this).parents(".article").data("article_url_name")

        })
    },
    "load_articles": function(){
        
        $.ajax({
            method: "GET",
            url: BASE_URL + ARTICLE_LIST_URL,
            success: async function(data){

                for (let i = 0; i < data.results.length; i++){
                    article = `
                    <div class="col-sm-12 col-md-6 py-3 article"
                        data-url="${BASE_URL + ARTICLE_RETRIEVE_URL + data.results[i]["url_name"] + "/"}" 
                        data-article_url_name="${ data.results[i]["url_name"]}" >
                        <div class="article_card">
                            <img src="${data.results[i]["cover_img"]}" class="article_cover_img" alt="...">
                            <div class="row mt-3">
                                <div class="col-8 article_title text-start">
                                ${data.results[i]["title"]}
                                </div>
                                <div class="col-4 article_date text-end article_date_modified">
                                ${APP.base.parse_time(data.results[i]["date_modified"])}
                                </div>
                    `
                    if (AUTHENTICATED ){
                        article = article + 
                        `<div class="edit_article">
                            <img src="${EDIT_ARTICLE_SVG}" class="edit_article_svg" alt="...">
                        </div>`
                    }
                    article = article + `
                            </div>
                        
                        </div>
                    </div>`
                    $(".articles_row").prepend(article)
                }
                $(".articles_row").masonry({
                    // columnWidth: 942,
                    itemSelector: '.article',
                    gutter: 0,
                    // horizontalOrder: true,
                    percentPosition: true
                  });
            }
        })
    },
}