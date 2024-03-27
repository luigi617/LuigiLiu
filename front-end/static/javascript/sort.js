if (typeof(APP) == "undefined"){
    APP = {}
}
APP['sort'] = {
    "init": function(){

        $("#column_nums").change(function(){
            $("#column_num_span").text(this.value)
            words_num = this.value
            APP.sort.generate_random_array(words_num)
        })

        $("#shuffle").click( function(){
            $("#column_nums").change();
        })
        $("#sort").click(async function(){
            var method = $("#select_sort_method").val()
            var sorted;
            switch (method) {
                case "bubble_sort":
                    sorted = await APP.sort.bubble_sort()
                    break;
                case "insert_sort":
                    sorted = await APP.sort.insert_sort()
                    break;
                case "selection_sort":
                    sorted = await APP.sort.selection_sort()
                    break;
                case "quick_sort":
                    sorted = await APP.sort.quick_sort()
                    break;
                default:
                    break;
            }
            console.log(sorted)
        })
        
    },

    "generate_random_array": function(counts){
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
    },

    "change_display": async function change_display(pos1, pos2, sleep_time = 1){
        var col1 = $(`div.col-index-${pos1}`)
        var col2 = $(`div.col-index-${pos2}`)
        col1.removeClass(`col-index-${pos1}`).addClass(`col-index-${pos2}`)
        col2.removeClass(`col-index-${pos2}`).addClass(`col-index-${pos1}`)
        col1.replaceWith(col2.clone())
        col2.replaceWith(col1.clone())
        await APP.base.sleep(sleep_time)
    },

    "insert_sort": async function insert_sort(){
        var temp;
        for (let i = 1; i < unsorted_array.length; i++){
            temp = unsorted_array[i]; 
            j = i - 1; 
            while (j >= 0 && unsorted_array[j] > temp)
            { 
                unsorted_array[j + 1] = unsorted_array[j];
                await APP.sort.change_display(j, j+1)
                j = j - 1; 
            } 
            unsorted_array[j + 1] = temp; 
        } 
        return unsorted_array
    },

    "bubble_sort": async function bubble_sort(){
        var temp;
        for (let i = 0; i < unsorted_array.length - 1; i++){
            for (let j = 0; j < unsorted_array.length - i - 1; j++){
                if (unsorted_array[j] > unsorted_array[j+1]){
                    temp = unsorted_array[j+1]
                    unsorted_array[j+1] = unsorted_array[j]
                    unsorted_array[j] = temp
                    await APP.sort.change_display(j, j+1)
                    
                }
            }
        }
        return unsorted_array
    },
    "selection_sort": async function selection_sort(){
        var min_idx; 
        for (let i = 0; i < unsorted_array.length-1; i++) { 
            min_idx = i; 
            for (let j = i + 1; j < unsorted_array.length; j++) {
                if (unsorted_array[j] < unsorted_array[min_idx]) {
                    min_idx = j; 
                }
            }
            temp = unsorted_array[i]
            unsorted_array[i] = unsorted_array[min_idx]
            unsorted_array[min_idx] = temp
            await APP.sort.change_display(i, min_idx, 20)
        } 
        return unsorted_array
    },
    "quick_sort": async function quick_sort(){
        async function swap(arr, i, j) {
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            await APP.sort.change_display(i, j, 5)
        }

        async function partition(arr, low, high) {
            const pivot = arr[high];
            let i = (low - 1);
            for (let j = low; j < high; j++) {
                if (arr[j] <= pivot) {
                    i++;
                    await swap(arr, i, j);
                }
            }
            await swap(arr, i + 1, high);
            return (i + 1);
        }

        async function quickSort(arr, low, high) {
            if (low < high) {
                let pi = await partition(arr, low, high);
                await quickSort(arr, low, pi - 1);
                await quickSort(arr, pi + 1, high);
            }
            return arr;
        }

        return await quickSort(unsorted_array, 0, unsorted_array.length-1)
    },
    
}

