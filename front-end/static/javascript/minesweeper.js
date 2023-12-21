if (typeof(APP) == "undefined"){
    APP = {}
}
APP['minesweeper'] = {
    "init": function(){
        $("#select_size").click(function(){
            if ($("#row_size")[0].value.length == 0 | $("#col_size")[0].value.length == 0){
                $("#message").text("Select size")
                return
            }
            if ($("#row_size")[0].value < 0 || $("#row_size")[0].value > 70  ||
                $("#col_size")[0].value < 0 || $("#col_size")[0].value > 70){
                $("#message").text("Size must be between 0 and 70")
                return
            }
            $("#message").text("")
            var row_size = parseInt($("#row_size")[0].value)
            var col_size = parseInt($("#col_size")[0].value)
            minesweeper = []
            for (let i = 0; i < row_size; i++){
                minesweeper.push([])
                for (let j = 0; j < col_size; j++){
                    minesweeper[i].push(0)
                }
            }
            var mines_num = Math.ceil(row_size*col_size/10)
            // mines_num =300
            var row_mine, col_mine
            while (mines_num > 0) {
                row_mine = Math.floor(Math.random() * row_size)
                col_mine = Math.floor(Math.random() * col_size)
                if (minesweeper[row_mine][col_mine] == -1){
                    continue
                }
                minesweeper[row_mine][col_mine] = -1
                var adjecencies = [
                    [row_mine+1, col_mine],
                    [row_mine-1, col_mine],
                    [row_mine, col_mine+1],
                    [row_mine, col_mine-1],
                    [row_mine+1, col_mine+1],
                    [row_mine+1, col_mine-1],
                    [row_mine-1, col_mine+1],
                    [row_mine-1, col_mine-1],
                ]
                for (let i = 0; i < adjecencies.length; i++){
                    if (adjecencies[i][0] < 0 || adjecencies[i][0] >= row_size || 
                        adjecencies[i][1] < 0 || adjecencies[i][1] >= col_size ||
                        minesweeper[adjecencies[i][0]][adjecencies[i][1]] == -1
                        ){
                            continue
                        }
                        minesweeper[adjecencies[i][0]][adjecencies[i][1]]++
                }
                mines_num--
            }

            $("#minesweeper_table").empty()
            for (let i = 0; i < row_size; i++){
                $("#minesweeper_table").append("<tr></tr>")
                for (let j = 0; j < col_size; j++){
                    $("#minesweeper_table").children().last().append(`<td id='cell-${i}-${j}'></td>`)
                    $(`#minesweeper_table td#cell-${i}-${j}`).click(function(){
                        if ($(this).hasClass("visited")){
                            return
                        }
                        var row = parseInt(this.id.split("-")[1])
                        var col = parseInt(this.id.split("-")[2])

                        if (minesweeper[row][col] == -1){
                            lose(row_size, col_size)
                            $("#message").text("You lose!!!")
                            return
                        } else if (minesweeper[row][col] > 0){
                            $(this).text(minesweeper[row][col].toString())
                            $(this).addClass("visited")
                            $(this).addClass("number")
                        } else if (minesweeper[row][col] == 0){
                            var currents = [[row, col]]
                            var row_i, col_i, pos, adjacencies, hint_adjacencies = []
                            while (currents.length>0) {
                                pos = currents.shift()
                                row_i = pos[0]
                                col_i = pos[1]

                                
                                if (row_i < 0 || row_i >= row_size || 
                                    col_i < 0 || col_i >= col_size ||
                                    minesweeper[row_i][col_i] < 0 ||
                                    $(`#minesweeper_table td#cell-${row_i}-${col_i}`).hasClass("visited")
                                ){
                                    continue
                                }
                                if (minesweeper[row_i][col_i] > 0){
                                    hint_adjacencies.push([row_i, col_i])
                                    continue
                                }
                                    adjacencies = [
                                        [row_i+1, col_i],
                                        [row_i-1, col_i],
                                        [row_i, col_i+1],
                                        [row_i, col_i-1],
                                        
                                    ]
                                $(`#minesweeper_table td#cell-${row_i}-${col_i}`).addClass("visited")
                                
                                currents = currents.concat(adjacencies)
                            }
                            for (let i = 0; i< hint_adjacencies.length; i++){
                                row_i = hint_adjacencies[i][0]
                                col_i = hint_adjacencies[i][1]
                                $(`#minesweeper_table td#cell-${row_i}-${col_i}`).text(minesweeper[row_i][col_i].toString())
                                $(`#minesweeper_table td#cell-${row_i}-${col_i}`).addClass("visited")
                                $(`#minesweeper_table td#cell-${row_i}-${col_i}`).addClass("number")
                            }
                        }
                        var win = check_win()
                        if (win){
                            $("#message").text("You win!!!")
                        }
                    })
                    $(`#minesweeper_table td#cell-${i}-${j}`).contextmenu(function(e){
                        e.preventDefault()

                        if ($(this).hasClass("flagged")){
                            $(this).empty()
                        } else {
                            $(this).addClass("flagged")
                            $(this).append(`<img src="${flag}" style="width:15px">`)
                        }
                    })
                }
            }
        })

        // $("#minesweeper_hint").click(function(){
        //     var percentage_mine_board = []
        //     var available_adjecencies = {}
        //     for (let i = 0; i < minesweeper.length; i++){
        //         percentage_mine_board.push([])
        //         for (let j = 0; j < minesweeper[i].length; j++){
        //             percentage_mine_board[i].push(0)
        //             if ($(`#minesweeper_table td#cell-${i}-${j}`).hasClass("visited") &&
        //             $(`#minesweeper_table td#cell-${i}-${j}`).hasClass("number")){
        //                 percentage_mine_board[i][j] = parseInt($(`#minesweeper_table td#cell-${i}-${j}`).text())
        //                 var adjecencies = [
        //                     [i+1, j],
        //                     [i-1, j],
        //                     [i, j+1],
        //                     [i, j-1],
        //                     [i+1, j+1],
        //                     [i+1, j-1],
        //                     [i-1, j+1],
        //                     [i-1, j-1],
        //                 ]
        //                 for (let k = 0; k < adjecencies.length; k++){
        //                     if (adjecencies[k][0] < 0 || adjecencies[k][0] >= row_size || 
        //                         adjecencies[k][1] < 0 || adjecencies[k][1] >= col_size ||
        //                         $(`#minesweeper_table td#cell-${adjecencies[k][0]}-${adjecencies[k][1]}`).hasClass("visited")
        //                         ){
        //                             continue
        //                         }
        //                     if (!(`${i}-${j}` in available_adjecencies)){
        //                         available_adjecencies[`${i}-${j}`] = []
        //                     }
        //                     available_adjecencies[`${i}-${j}`].push(adjecencies[k])
        //                 }

        //             }
        //         }
        //     }
        //     console.log(available_adjecencies)
        //     for (let el in available_adjecencies){
        //         for (let i = 0; i < available_adjecencies[el].length; i++){
        //             var origin_row = el.split("-")[0]
        //             var origin_col = el.split("-")[1]
        //             var row = available_adjecencies[el][i][0]
        //             var col = available_adjecencies[el][i][1]
        //             console.log(percentage_mine_board[row][col])
        //             var numerator = parseInt($(`#minesweeper_table td#cell-${origin_row}-${origin_col}`).text())
        //             percentage_mine_board[row][col] = Math.max(
        //                 numerator/available_adjecencies[el].length,
        //                 percentage_mine_board[row][col]
        //             ).toFixed(2)

        //         }
        //     }
        //     console.log(percentage_mine_board)

        // })

        function lose(row_size, col_size){
            $("#minesweeper_table").empty()
            for (let i = 0; i < row_size; i++){
                $("#minesweeper_table").append("<tr></tr>")
                for (let j = 0; j < col_size; j++){
                    var text = minesweeper[i][j]
                    if (text == 0){
                        text = ""
                    } else if (text == -1){
                        text = `<img src="${bomb}" style='width:15px'">`
                    }
                    $("#minesweeper_table").children().last().append(`<td id='cell-${i}-${j}' class='visited'>${text}</td>`)

                }
            }
        }
        function check_win(){
            var unvisited = $(`#minesweeper_table td:not(.visited)`)
            for (let i = 0; i < unvisited.length; i++){
                var row = unvisited[i].id.split("-")[1]
                var col = unvisited[i].id.split("-")[2]
                if (minesweeper[row][col] != -1){
                    return false
                }
            }
            return true
        }
    },
}