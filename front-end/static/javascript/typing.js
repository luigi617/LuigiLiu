$("#words_num").change(function(){
    $("#words_num_span").text(this.value)
    words_num = this.value
    generate_words(words_num)
})
$("#typing_input").click(function(){
    $("#typing_input").removeClass("selected")
})


$("#typing_input").keydown(function(e){
    if ($("span.char.written").length == 0){
        start_time = performance.now()
    }
    var char_code = e.which
    console.log(char_code)
    if (!lettersOnly(char_code)){
        return
    }
    // delete
    if (char_code == 8){
        delete_char()
    } else {
        var char = String.fromCharCode(char_code)
        if (e.shiftKey){
            char = char.toUpperCase();
        } else {
            char = char.toLowerCase();
        }
        var finished = write_char(char)
        if (finished){
            generate_words(words_num)
            var gross_WPM = (char_num/5)/(performance.now() - start_time)*1000*60
            var net_WPM = gross_WPM - wrong_word/(performance.now() - start_time)*1000*60
            
            var accuracy = (1-(wrong_word/$("span.char").length)).toFixed(2) * 100
            $("#gross_speed").text(gross_WPM.toFixed(2).toString())
            $("#net_speed").text(net_WPM.toFixed(2).toString())
            $("#accuracy").text(accuracy.toString() + "%")

        }
    }
})

function delete_char(){
    if ($("span.blink").prev().hasClass("error")){
        $("span.blink").prev().remove()
    }
}

function write_char(char){
    if ($("span.char.error").length > 0){
        if ($("span.char.error").length >5){
            return
        }
        if (char == " "){
            char = "&nbsp"
        }
        $("span.blink").before(`<span class='char error'>${char}</span>`)
    } else if ($("span.blink").next().hasClass("space")){
        if (char == " "){
            $("span.blink").next().addClass("written")
            $("span.blink").remove()
            $("span.char:not(.written)").first().before(blink_line)
        }
    } else if (char == $("span.blink").next().text()){
        $("span.blink").next().addClass("written")
        $("span.blink").remove()
        if ($("span.char:not(.written)").length == 0){
            return true
        }
        $("span.char:not(.written)").first().before(blink_line)
    } else {
        wrong_word += 1
        if (char == " "){
            char = "&nbsp"
        }
        $("span.blink").before(`<span class='char error'>${char}</span>`)
    }
    return false
}

function generate_words(count = 20){
    $.getJSON( json_url, function( data ) {
        var result = []
        var el = null
        for (let i = 0; i < count; i++){
            el = data[Math.floor(Math.random()*data.length)];
            result.push(el)

        }
        $("#typing_input").empty()
        char_num = result.join(" ").length
        wrong_word = 0
        for (let i = 0; i < result.length; i++){
            $("#typing_input").append(`<div class='words word-${result[i]}'></div>`)
            if (i == 0){
                $(`#typing_input div.word-${result[i]}`).append(blink_line)
            }
            for (let j = 0; j < result[i].length; j++){
                
                $(`#typing_input div.word-${result[i]}`).append(`<span class='char char-${i}-${result[i][j]}'>${result[i][j]}</span>`)
            }
            if (i < result.length - 1){
                $("#typing_input").append(`<span class='char char-${i}-_ space'>&nbsp</span>`)
            }
        }
    });
}

function lettersOnly(char_code) {
    var charCode = char_code;

    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8 || charCode == 32)
        return true;
    else
        return false;
}