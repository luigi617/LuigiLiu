if (typeof(APP) == "undefined"){
    APP = {}
}
APP['sudoku'] = {
    "init": function(){
        for (let i = 0; i <= 8; i++){
            for (let j = 0; j <= 8; j++){
                if ($(window).width() < 768) {
                    $("td#cell-" + i.toString() + "-" + j.toString() + " input").prop('readonly', true);
                }
                $("td#cell-" + i.toString() + "-" + j.toString()).click(function(){
                    $(".sudoku_board td").removeClass("selected")
                    $(this).addClass("selected")
                })
                $("td#cell-" + i.toString() + "-" + j.toString() + " input").keypress(function(e){
                    var charCode = e.which;
                    if (String.fromCharCode(charCode).match(/[^1-9]/g)){
                        return false;
                    }
                })
            }
        }

        $("#inpur_table td button").click(function(){
            if ($(".sudoku_board td.selected input").hasClass("fixed")){return}
            if ($(this).hasClass("cancel")){
                $(".sudoku_board td.selected input")[0].value = ""    
            } else {
                $(".sudoku_board td.selected input")[0].value = $(this).text()
            }
        })

        $(".reset_sudoku").click(function(){
            for (let i = 0; i <= 8; i++){
                for (let j = 0; j <= 8; j++){
                    $("td#cell-" + i.toString() + "-" + j.toString() + " input")[0].value = ""
                    $("td#cell-" + i.toString() + "-" + j.toString() + " input").removeClass("fixed")
                }
            }
        })
        $(".solve_sudoku").click(async function(){
            $(".solving_spinner").removeClass("d-none")
            await APP.base.sleep(50)
            var sudoku = []
            for (let i = 0; i <= 8; i++){
                sudoku.push([])
                for (let j = 0; j <= 8; j++){
                    sudoku[i].push(parseInt($("td#cell-" + i.toString() + "-" + j.toString() + " input")[0].value))
                }
            }
            if (!check_validity(sudoku)) return false
            if ($(".animation_checkbox")[0].checked || $(".animation_checkbox")[1].checked){
                var solved_sudoku = await solve_sudoku_async(sudoku)
            } else {
                var solved_sudoku = solve_sudoku(sudoku)
                if (solved_sudoku){
                    for (let i = 0; i <= 8; i++){
                        for (let j = 0; j <= 8; j++){
                            $("td#cell-" + i.toString() + "-" + j.toString() + " input")[0].value = solved_sudoku[i][j].toString()
                        }
                    }
                }
            }
            $(".solving_spinner").addClass("d-none")
            if (!solved_sudoku){
                $(".no-solution").text("No Sulution")
            } else {
                $(".no-solution").text("")
            }
        })
        function solve_sudoku(sudoku_par){
            var sudoku = JSON.parse(JSON.stringify(sudoku_par))
            for (let i = 0; i <= 8; i++){
                for (let j = 0; j <= 8; j++){
                    if(sudoku[i][j] == null){
                        sudoku[i][j] = NaN
                    }
                }
            }
            var res = false
            var next = next_step(sudoku)

            if (next == "finished"){
                return sudoku
            }
            var candidates = get_possible_candidates(sudoku, [next[1][0], next[1][1]])
            for (let i = 0; i < candidates.length; i++){
                let trial = candidates[i]
                sudoku[next[1][0]][next[1][1]] = trial
                if (check_validity(sudoku)){
                    res = solve_sudoku(sudoku)
                }
                if (res){
                    return res
                } else {
                    sudoku[next[1][0]][next[1][1]] = NaN
                }
            }
            return false
        }
        async function solve_sudoku_async(sudoku){
            var res = false
            var next = next_step(sudoku)

            if (next == "finished"){
                return sudoku
            }
            var candidates = get_possible_candidates(sudoku, [next[1][0], next[1][1]])
            for (let i = 0; i < candidates.length; i++){
                let trial = candidates[i]
                sudoku[next[1][0]][next[1][1]] = trial
                $("td#cell-" + next[1][0].toString() + "-" + next[1][1].toString() + " input")[0].value = trial.toString()
                await APP.base.sleep(50)
                if (check_validity(sudoku)){
                    res = await solve_sudoku_async(sudoku)
                }
                if (res){
                    return sudoku
                } else {
                    sudoku[next[1][0]][next[1][1]] = NaN
                    $("td#cell-" + next[1][0].toString() + "-" + next[1][1].toString() + " input")[0].value = ""
                }
            }
            return false
        }
        function next_step(sudoku){
            var all_combination = get_all_list_sudoku(sudoku, pos = true)
            var mins = Array(10)
            for (i = 0; i < all_combination.length; i++){
                var current = all_combination[i].filter(function(e){return isNaN(e[0])})
                if (current.length == 0){ continue }
                if (current.length < mins.length){
                    mins = current
                }
            }
            if (mins.length == 10){
                return "finished"
            }
            return mins[0];
        }
        function get_possible_candidates(sudoku, position){

            var already_candidates = []
            already_candidates = already_candidates.concat(sudoku[position[0]])
            for (let i = 0; i <= 8; i++){
                already_candidates.push(sudoku[i][position[1]])
            }
            var square_pos = get_square_pos(sudoku)
            for (let i = 0; i < square_pos.length; i++){
                for (let j = 0; j < square_pos[i].length; j++){
                    if (square_pos[i][j][0] == position[0] & square_pos[i][j][1] == position[1]){
                        for (let pos = 0; pos < square_pos[i].length; pos++){
                            var row_i = square_pos[i][pos][0]
                            var col_i = square_pos[i][pos][1]
                            already_candidates.push(sudoku[row_i][col_i])
                        }
                        break
                    }
                }
            }

            for (let i = 0; i < restrictions.length; i++){
                for (let j = 0; j < restrictions[i].length; j++){
                    if (restrictions[i][j][0] == position[0] & restrictions[i][j][1] == position[1]){
                        for (let position = 0; position < restrictions[i].length; position++){
                            var row_i = restrictions[i][position][0]
                            var col_i = restrictions[i][position][1]
                            already_candidates.push(sudoku[row_i][col_i])
                        }
                        break
                    }
                }
            }
            var already_candidates_set = new Set(already_candidates)
            var intersection = []
            for (let elem of new Set([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
                if (!already_candidates_set.has(elem)){
                    intersection.push(elem)
                }
            }
            return intersection
        }

        function check_validity(sudoku){
            var all_combination = get_all_list_sudoku(sudoku)
            for (i = 0; i < all_combination.length; i++){
                if (!check_array_validity(all_combination[i])) return false
            }
            return true
        }
        function get_all_list_sudoku(sudoku, pos = false){
            // if pos == true, it returns also the position. [[value, [row, column]], [value, [row, column]]]
            // if pos == false, it returns only the values. [[value, value, value], [value, value,  value]]
            var res = []

            var row = []
            for (let i = 0; i <= 8; i++){
                row = []
                for (let j = 0; j <= 8; j++){
                    if (pos){
                        row.push([sudoku[i][j], [i, j]])
                    } else {
                        row.push(sudoku[i][j])
                    }
                }
                res.push(row)
            }
            var column = []
            for (let i = 0; i <= 8; i++){
                column = []
                for (let j = 0; j <= 8; j++){
                    if (pos){
                        column.push([sudoku[j][i], [j, i]])
                    } else {
                        column.push(sudoku[j][i])
                    }
                }
                res.push(column)
            }
            var square = []
            var square_pos = get_square_pos(sudoku)
            for (let i = 0; i < square_pos.length; i++){
                square = []
                for (let position = 0; position < square_pos[i].length; position++){
                    var row_i = square_pos[i][position][0]
                    var col_i = square_pos[i][position][1]
                    if (pos){
                        square.push([sudoku[row_i][col_i], [row_i, col_i]])
                    } else {
                        square.push(sudoku[row_i][col_i])
                    }
                }
                res.push(square)
            }
            // custom restrictions
            var restriction_array = []
            for (let i = 0; i < restrictions.length; i++){
                restriction_array = []
                for (let position = 0; position < restrictions[i].length; position++){
                    var row_i = restrictions[i][position][0]
                    var col_i = restrictions[i][position][1]
                    if (pos){
                        restriction_array.push([sudoku[row_i][col_i], [row_i, col_i]])
                    } else {
                        restriction_array.push(sudoku[row_i][col_i])
                    }
                }
                res.push(restriction_array)
            }
            return res
        }
        function get_square_pos(sudoku){
            var square = []
            for (let i = 0; i <= 2; i++){
                for (let j = 0; j <= 2; j++){
                    square.push([
                        [j*3+0, i*3+0],
                        [j*3+0, i*3+1],
                        [j*3+0, i*3+2],
                        [j*3+1, i*3+0],
                        [j*3+1, i*3+1],
                        [j*3+1, i*3+2],
                        [j*3+2, i*3+0],
                        [j*3+2, i*3+1],
                        [j*3+2, i*3+2],
                    ])
                }
            }
            return square
        }
        function check_array_validity(array){
            var new_array = array.filter(function(e) { return !isNaN(e) })
            return new Set(new_array).size == new_array.length;
        }




        $(".generate_sudoku").click(async function(){
            $(".reset_sudoku").click()
            $(".generating_spinner").removeClass("d-none")
            if ($(".generate_sudoku").prop('disabled')){return}
            $(".generate_sudoku").prop('disabled', true);
            await APP.base.sleep(50)
            count = 3
            while (count){
                var new_sudoku = empty_sudoku()
                var temp_pos = position.slice()
                for (let i = 0; i < Math.floor(Math.random() * 11) + 15; i++){
                    pos = temp_pos[Math.floor(Math.random() * temp_pos.length)]
                    temp_pos.splice(Math.floor(Math.random() * temp_pos.length), 1)
                    var row = pos[0]
                    var col = pos[1]
                    let candidates = get_possible_candidates(new_sudoku, [row, col])
                    new_sudoku[row][col] = candidates[Math.floor(Math.random() * candidates.length)];
                }
                console.log(solve_sudoku(new_sudoku))
                if (solve_sudoku(new_sudoku)){
                    break
                }
                count--
            }

            for (let i = 0; i <= 8; i++){
                for (let j = 0; j <= 8; j++){
                    if (!isNaN(new_sudoku[i][j])){
                        $("td#cell-" + i.toString() + "-" + j.toString() + " input")[0].value = new_sudoku[i][j].toString()
                        $("td#cell-" + i.toString() + "-" + j.toString() + " input").addClass("fixed")
                    }
                }
            }
            $(".generating_spinner").addClass("d-none")
            $(".generate_sudoku").prop('disabled', false);
        
        })

        function empty_sudoku(){
            var sudoku = []
            for (let i = 0; i <= 8; i++){
                sudoku.push([])
                for (let j = 0; j <= 8; j++){
                    sudoku[i].push(NaN)
                }
            }
            return sudoku
        }

        $(".hyper_sudoku_checkbox").change(function(){
            if (this.checked){
                restrictions = []
                restrictions.push([], [], [], [])
                for(let i = 0; i < 3; i++){
                    for (let j = 0; j < 3; j++){
                        restrictions[0].push([i+1, j+1])
                        restrictions[1].push([i+5, j+1])
                        restrictions[2].push([i+1, j+5])
                        restrictions[3].push([i+5, j+5])
                        $("td#cell-"+(i+1).toString()+"-"+(j+1).toString()+" input").addClass("restricted")
                        $("td#cell-"+(i+5).toString()+"-"+(j+1).toString()+" input").addClass("restricted")
                        $("td#cell-"+(i+1).toString()+"-"+(j+5).toString()+" input").addClass("restricted")
                        $("td#cell-"+(i+5).toString()+"-"+(j+5).toString()+" input").addClass("restricted")
                    }
                }
            } else {
                restrictions = []
                $("td input").removeClass("restricted")
            }
        })

    },
}