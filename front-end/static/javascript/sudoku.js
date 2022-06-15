
for (let i = 0; i <= 8; i++){
    for (let j = 0; j <= 8; j++){
        $("td#cell-" + i.toString() + "-" + j.toString()).click(function(){
            $(".sudoku_board td").removeClass("selected")
            $(this).addClass("selected")
        })
        $("td#cell-" + i.toString() + "-" + j.toString() + " input").keypress(function(e){
            var charCode = e.which;
            if (String.fromCharCode(charCode).match(/[^0-9]/g)){
                return false;
            }
        })
    }
}

$("#inpur_table td button").click(function(){
    if ($(this).hasClass("cancel")){
        $(".sudoku_board td.selected input")[0].value = ""    
    } else {
        $(".sudoku_board td.selected input")[0].value = $(this).text()
    }
})

$("#reset_sudoku").click(function(){
    for (let i = 0; i <= 8; i++){
        for (let j = 0; j <= 8; j++){
            $("td#cell-" + i.toString() + "-" + j.toString() + " input")[0].value = ""
        }
    }
})
$("#solve_sudoku").click(function(){
    var sudoku = []
    for (let i = 0; i <= 8; i++){
        sudoku.push([])
        for (let j = 0; j <= 8; j++){
            sudoku[i].push(parseInt($("td#cell-" + i.toString() + "-" + j.toString() + " input")[0].value))
        }
    }
    solve_sudoku(sudoku)
})

function solve_sudoku(sudoku){
    check_validity(sudoku)
}

function check_validity(sudoku, pos = NaN){
    if (isNaN(pos)){
        for (let i = 0; i <= 8; i++){
            if (!check_array_validity(sudoku[i])) return false
        }
        var column = []
        for (let i = 0; i <= 8; i++){
            column = []
            for (let j = 0; j <= 8; j++){
                column.push(sudoku[j][i])
            }
            if (!check_array_validity(column)) return false
        }
        for (let i = 0; i <= 2; i++){
            for (let j = 0; j <= 2; j++){
            }
        }
    }
}
function check_array_validity(array){
    var new_array = array.filter(function(e) { return !isNaN(e) })
    return new Set(new_array).size == new_array.length;
}