if (typeof(APP) == "undefined"){
    APP = {}
}
APP['nonogram'] = {
    "init": function(){
        $("#select_size").click(function(){
            if ($("#size")[0].value.length == 0){
                $("#message").text("Select size")
                return
            }

            $("#message").text("")
            var row_size = parseInt($("#size")[0].value)
            var col_size = parseInt($("#size")[0].value)


            $("#nonogram_table").empty()
            for (let i = 0; i < row_size; i++){
                if (i == 0){
                    $("#nonogram_table").append("<tr></tr>")
                    $("#nonogram_table").children().last().append(`<td id='cell--' style="background-color:black"></td>`)
                    for (let j = 0; j < col_size; j++){
                        $("#nonogram_table").children().last().append(
                            `<td id='cell--${j}' class="column_input_td" style="border-bottom: 1.5px solid black;">
                                <input type="number" id="input-cell--${j}" name="nonogram_input">
                            </td>`
                        )
                        $(`#input-cell--${j}`).keyup(function(e){
                            $(this)[0].value = String($(this)[0].value).replace(/[^\d]/g, '')
                            if (parseInt($(this)[0].value) > row_size){
                                $(this)[0].value = ""
                            }
                            if(e.keyCode==13 & $(this)[0].value != ""){
                                $(this).before("<div class='hint_number'>" + $(this)[0].value + "<\div>")
                                $(".hint_number").click(function(){$(this).remove()})
                                $(this)[0].value = ""
                            }
                        });
                    }
                }
                $("#nonogram_table").append("<tr></tr>")
                $("#nonogram_table").children().last().append(
                    `<td id='cell-${i}-' class="row_input_td" style="border-right: 1.5px solid black;">
                        <input type="number" id="input-cell-${i}-" name="nonogram_input">
                    </td>`
                )
                $(`#input-cell-${i}-`).keyup(function(e){
                    $(this)[0].value = String($(this)[0].value).replace(/[^\d]/g, '')
                    if (parseInt($(this)[0].value) > row_size){
                        $(this)[0].value = ""
                    }
                    if(e.keyCode==13 & $(this)[0].value != ""){
                        $(this).before("<span class='hint_number_row'>" + $(this)[0].value + " <\span>")
                        $(".hint_number_row").click(function(){$(this).remove()})
                        $(this)[0].value = ""
                    }
                });

                for (let j = 0; j < col_size; j++){
                    $("#nonogram_table").children().last().append(`<td id='cell-${i}-${j}'></td>`)
                }
            }
        }),
        $("#solve").click(function(){

            var row_size = parseInt($("#size")[0].value)
            var col_size = parseInt($("#size")[0].value)
            var row = []
            for (let i = 0; i < row_size; i++){
                row.push([])
                for (let j = 0; j < $(`#cell--${i}`).children().length - 1; j++){
                    row[row.length - 1].push(parseInt($(`#cell--${i}`).children()[j].textContent))
                }
                if (row[row.length - 1].length == 0){
                    $("#message").text("Fill all hint numbers")
                    return
                }
            }
            $("#message").text("Wait")
            var column = []
            for (let i = 0; i < col_size; i++){
                column.push([])
                for (let j = 0; j < $(`#cell-${i}-`).children().length - 1; j++){
                    column[column.length - 1].push(parseInt($(`#cell-${i}-`).children()[j].textContent))
                }
                if (column[column.length - 1].length == 0){
                    $("#message").text("Fill all hint numbers")
                    return
                }
            }
            $("#message").text("")
            $.ajax({
                method: "POST",
                url: BASE_URL + NONOGRAM_SOLVER_API_URL,
                data: {
                    "row": JSON.stringify(row),
                    "column": JSON.stringify(column),
                },
   
                success: function(data){
                    for (let row = 0; row < data.length; row++){
                        for (let col = 0; col < data[row].length; col++){
                            if (data[row][col] == 1){
                                $(`#cell-${row}-${col}`).css({"background-color": "grey"})
                            } else {
                                $(`#cell-${row}-${col}`).text("X")
                            }
                        }
                    }
                    $("#message").text("Done")
                },
                error: function (request, status, error) {
                    $("#message").text(request.responseText)
                }
            })


        })
    },
    "insert_hint_number": function(row, column){
        console.log(row);
        for (let i = 0; i < row.length; i++){
            for (let j = 0; j < row[i].length; j++){
                $(`#input-cell--${i}`).before("<div class='hint_number'>" + String(row[i][j]) + "<\div>")
                $(".hint_number").click(function(){$(this).remove()})
            }
        }
        for (let i = 0; i < column.length; i++){
            for (let j = 0; j < column[i].length; j++){
                $(`#input-cell-${i}-`).before("<span class='hint_number_row'>" + String(column[i][j]) + "<\span>")
                $(".hint_number_row").click(function(){$(this).remove()})
            }
        }
    }
}