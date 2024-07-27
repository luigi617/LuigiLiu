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
        $(document).on("click", ".article_category", function(){
            $(".article_category_list").find(".active").removeClass("active")
            $(this).addClass("active")
            var category_id = $(this).data("category_id")
            article_masonry.empty()
            article_masonry.masonry('destroy');
            article_masonry.masonry(masonryOptions);
            APP.articles_list.load_articles(category_id)
        })
        $(".article_category_select_list").on("change", function(){
            var category_id = $(this).val()
            article_masonry.empty()
            article_masonry.masonry('destroy');
            article_masonry.masonry(masonryOptions);
            APP.articles_list.load_articles(category_id)
        })
    },
    "load_article_categories": function(){
        
        $.ajax({
            method: "GET",
            url: BASE_URL + ARTICLE_CATEGORY_LIST_URL,
            success: async function(data){

                for (let i = 0; i < data.results.length; i++){
                    $(".article_category_list").append(`
                        <div class="article_category ${i == 0?"active":""}" data-category_id="${data.results[i]['id']}">
                            ${data.results[i]['name']}
                        </div>
                    `)
                    $(".article_category_select_list").append(`
                        <option ${i == 0?"selected":""} value="${data.results[i]['id']}">${data.results[i]['name']}</option>
                    `)
                      
                }
                
            }
        })
    },
    "load_articles": function(category_id=1){
        
        $.ajax({
            method: "GET",
            url: BASE_URL + ARTICLE_LIST_URL + "?category_id=" + category_id,
            success: async function(data){
                var elems=$();
                var article="";
                for (let i = data.results.length - 1; i >= 0; i--){
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
                                <div class="col-4 article_date text-end">
                                ${APP.base.parse_time(data.results[i]["date_added"])}
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
                    var elem = $(article);
                    elems = elems ? elems.add( elem ) : elem;
                    article = "";

                    // article_masonry.append( elem ).masonry('appended',elem);

                }
                article_masonry.append( elems );
                article_masonry.masonry('appended',elems);
                article_masonry.imagesLoaded( function() {
                    article_masonry.masonry();
                  });
                
            }
        })
    },
}