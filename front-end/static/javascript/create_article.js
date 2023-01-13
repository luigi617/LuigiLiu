if (typeof(APP) == "undefined"){
    APP = {}
}
APP['create_article'] = {
    "init": function(){
        $("#input_article_content").change(function(){
            console.log($(this))
        })
        $("#input_article_content").on('change keyup paste', function() {
            $(".diplay_content").text($(this).val())
            MathJax.typesetPromise()

        })
        
    },
}