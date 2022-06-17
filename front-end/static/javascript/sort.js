$("#column_nums").change(function(){
    $("#column_num_span").text(this.value)
    words_num = this.value
    generate_random_array(words_num)
})

$("#sort").click(async function(){
    var method = $("#select_sort_method").val()
    switch (method) {
        case "bubble_sort":
            var sorted = await bubble_sort()
            break;
        case "insert_sort":
            var sorted = await insert_sort()
            break;
        default:
            break;
    }

})

async function bubble_sort(){
    var temp;
    for (let i = 0; i < unsorted_array.length - 1; i++){
        for (let j = 0; j < unsorted_array.length - i - 1; j++){
            if (unsorted_array[j] > unsorted_array[j+1]){
                temp = unsorted_array[j+1]
                unsorted_array[j+1] = unsorted_array[j]
                unsorted_array[j] = temp
                await change_display(j, j+1)
                
            }
        }
    }
    return unsorted_array
}
async function insert_sort(){
    var temp;
    for (let i = 1; i < unsorted_array.length; i++){
        temp = unsorted_array[i]; 
        j = i - 1; 
        while (j >= 0 && unsorted_array[j] > temp)
        { 
            unsorted_array[j + 1] = unsorted_array[j];
            await change_display(j, j+1)
            j = j - 1; 
        } 
        unsorted_array[j + 1] = temp; 
    } 
    return unsorted_array
}
async function change_display(pos1, pos2){
    var col1 = $(`div.col-index-${pos1}`)
    var col2 = $(`div.col-index-${pos2}`)
    col1.removeClass(`col-index-${pos1}`).addClass(`col-index-${pos2}`)
    col2.removeClass(`col-index-${pos2}`).addClass(`col-index-${pos1}`)
    col1.replaceWith(col2.clone())
    col2.replaceWith(col1.clone())
    await Base.sleep(1)
}


function generate_random_array(counts){
    var array = []
    unsorted_array = []
    var sort_display_width = parseFloat($("#row_display").css("width"))
    var sort_display_height = parseFloat($("#row_display").css("height"))
    var column_width = sort_display_width / (counts*2-1)
    var column_height = 0
    for (let i = 0; i < counts; i++){
        unsorted_array.push(Math.floor(Math.random() * counts) + 1)
    }
    var array = [...unsorted_array]
    array.sort(function(a, b){return a - b})
    var max_width = array[array.length - 1]
    $("#row_display").empty()
    for (let i = 0; i < unsorted_array.length; i++){
        column_height = sort_display_height/max_width * unsorted_array[i]
        $("#row_display").append(
            `<div class="col-index-${i} column" style="height:${column_height}px; width:${column_width}px; margin-top:${sort_display_height-column_height}px"></div>`
        )
        if (i != unsorted_array.length - 1)
        $("#row_display").append(`<div class="column_space" style="height:${sort_display_height}px; width:${column_width}px"></div>`)
    }
}

