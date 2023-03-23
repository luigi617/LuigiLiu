if (typeof(APP) == "undefined"){
    APP = {}
}
APP['dictionary'] = {
    "init": function(){
        var word = "hello"
        $.ajax({
            method: "GET",
            url: BASE_URL + SEARCH_WORD_DICTIONARY + word + "/",
            success: function(data){
                console.log(data)
            }
        })
    },
}