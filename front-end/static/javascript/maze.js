$("#select_size").click(function(){
    if ($("#row_size")[0].value.length == 0 | $("#col_size")[0].value.length == 0){
        $("#message").text("Select size")
        return
    }
    
    if ($("#row_size")[0].value < 0 || $("#row_size")[0].value > 80  ||
        $("#col_size")[0].value < 0 || $("#col_size")[0].value > 80){
        $("#message").text("Size must be between 0 and 80")
        return
    }

    var row_size = parseInt($("#row_size")[0].value)
    var col_size = parseInt($("#col_size")[0].value)
    $("#maze_table").empty()
    MAZE = []
    for (let i = 0; i < row_size; i++){
        MAZE.push([])
        $("#maze_table").append("<tbody></tbody>")
        for (let j = 0; j < col_size; j++){
            MAZE[i].push(0)
            $("#maze_table").last().append(`<td id='cell-${i}-${j}'></td>`)
            $(`#maze_table td#cell-${i}-${j}`).click(function(){
                if (!$(this).hasClass("to_be_operated")){
                    return
                }
                var row = null
                var col = null
                if (START_MODE){
                    if ($("#maze_table td.starting_point").length > 0){
                        row = parseInt($("#maze_table td.starting_point")[0].id.split("-")[1])
                        col = parseInt($("#maze_table td.starting_point")[0].id.split("-")[2])
                        MAZE[row][col] = 0
                        update_cell_classes([row, col])
                    }

                    row = parseInt(this.id.split("-")[1])
                    col = parseInt(this.id.split("-")[2])
                    MAZE[row][col] = 1
                    update_cell_classes([row, col])

                    cell_to_be_operated(false)
                } else if (END_MODE){
                    if ($("#maze_table td.ending_point").length > 0){
                        row = parseInt($("#maze_table td.ending_point")[0].id.split("-")[1])
                        col = parseInt($("#maze_table td.ending_point")[0].id.split("-")[2])
                        MAZE[row][col] = 0
                        update_cell_classes([row, col])
                    }


                    row = parseInt(this.id.split("-")[1])
                    col = parseInt(this.id.split("-")[2])
                    MAZE[row][col] = 2
                    update_cell_classes([row, col])

                    cell_to_be_operated(false)
                } else if (OBSTACLES_MODE){
                    row = parseInt(this.id.split("-")[1])
                    col = parseInt(this.id.split("-")[2])
                    if (MAZE[row][col] == 3){
                        MAZE[row][col] = 0
                        update_cell_classes([row, col])
                    } else if (MAZE[row][col] == 0) {
                        MAZE[row][col] = 3
                        update_cell_classes([row, col])
                    }
                }
            })

            $(`#maze_table td#cell-${i}-${j}`).mousedown(function(){
                OBSTACLES_CLICK_MODE = true
            })
            $(`#maze_table td#cell-${i}-${j}`).mouseup(function(){
                OBSTACLES_CLICK_MODE = false
            })
            $(`#maze_table td#cell-${i}-${j}`).mousemove(function(){
                if (OBSTACLES_CLICK_MODE & OBSTACLES_MODE){
                    var row = parseInt(this.id.split("-")[1])
                    var col = parseInt(this.id.split("-")[2])
                    if (OBSTACLES_AVOID_DUPLICATE == `${row}-${col}`){
                        return
                    }
                    if (MAZE[row][col] == 3){
                        MAZE[row][col] = 0
                        update_cell_classes([row, col])
                    } else if (MAZE[row][col] == 0) {
                        MAZE[row][col] = 3
                        update_cell_classes([row, col])
                    }
                    OBSTACLES_AVOID_DUPLICATE = `${row}-${col}`
                }
            })
        }
    }
})
$("#select_starting_point").click(function(){
    cell_to_be_operated(false)
    START_MODE = true
    cell_to_be_operated(true)
})
$("#select_ending_point").click(function(){
    cell_to_be_operated(false)
    END_MODE = true
    cell_to_be_operated(true)
})
$("#select_obstacles").click(function(){
    cell_to_be_operated(false)
    OBSTACLES_MODE = true
    cell_to_be_operated(true)
})

function cell_to_be_operated(status){
    if (status){
        $("#maze_table td").addClass("to_be_operated")
    } else {
        $("#maze_table td").removeClass("to_be_operated")
        START_MODE = false
        END_MODE = false
        OBSTACLES_MODE = false
    }
}
function update_cell_classes(pos){
    // 0 is empty cell
    // 1 is starting cell
    // 2 is ending cell
    // 3 is obstacle
    if (MAZE[pos[0]][pos[1]] == 0){
        $(`#maze_table td#cell-${pos[0]}-${pos[1]}`).removeClass("starting_point")
        $(`#maze_table td#cell-${pos[0]}-${pos[1]}`).removeClass("ending_point")
        $(`#maze_table td#cell-${pos[0]}-${pos[1]}`).removeClass("obstacle_point")
    } else if (MAZE[pos[0]][pos[1]] == 1){
        $(`#maze_table td#cell-${pos[0]}-${pos[1]}`).addClass("starting_point")
        $(`#maze_table td#cell-${pos[0]}-${pos[1]}`).removeClass("ending_point")
        $(`#maze_table td#cell-${pos[0]}-${pos[1]}`).removeClass("obstacle_point")
    } else if (MAZE[pos[0]][pos[1]] == 2){
        $(`#maze_table td#cell-${pos[0]}-${pos[1]}`).removeClass("starting_point")
        $(`#maze_table td#cell-${pos[0]}-${pos[1]}`).addClass("ending_point")
        $(`#maze_table td#cell-${pos[0]}-${pos[1]}`).removeClass("obstacle_point")
    } else if (MAZE[pos[0]][pos[1]] == 3){
        $(`#maze_table td#cell-${pos[0]}-${pos[1]}`).removeClass("starting_point")
        $(`#maze_table td#cell-${pos[0]}-${pos[1]}`).removeClass("ending_point")
        $(`#maze_table td#cell-${pos[0]}-${pos[1]}`).addClass("obstacle_point")
    }
}


$("#find_path").click(async function(){
    if ($("#maze_table td.starting_point").length == 0 | $("#maze_table td.ending_point").length == 0){
        return
    }
    var starting_point = [
        parseInt($("#maze_table td.starting_point")[0].id.split("-")[1]),
        parseInt($("#maze_table td.starting_point")[0].id.split("-")[2])
    ]
    var visited_point = new Set()
    visited_point.add(`cell-${starting_point[0]}-${starting_point[1]}`)
    var path = await find_path([starting_point], visited_point, {})
    var last_list = [
        parseInt($("#maze_table td.ending_point")[0].id.split("-")[1]),
        parseInt($("#maze_table td.ending_point")[0].id.split("-")[2])
    ]
    var last = `cell-${last_list[0]}-${last_list[1]}`
    var start = `cell-${starting_point[0]}-${starting_point[1]}`
    if (path){
        var id = null
        while (!(path[last] == start) & last in path) {
            id = path[last]
            $(`#maze_table td#${id}`).addClass("true_path")
            last = id
        }
        
    } else {
        $("#message").text("No path")
    }

})

async function find_path(current_points, visited_point, path){
    // find unvisited adjacencies
    var to_be_visited_points_and_update_path = get_unvisited_adjacencies(current_points, visited_point, path)
    var new_path = to_be_visited_points_and_update_path[1]
    // visit adjancencies

    var new_visited_points = []
    for (let i = 0; i< to_be_visited_points_and_update_path[0].length; i++){
        current = to_be_visited_points_and_update_path[0][i]
        if (visited_point.has(`cell-${current[0]}-${current[1]}`)){
            continue
        }
        if (MAZE[current[0]][current[1]] == 0){
            new_visited_points.push(current)
            visited_point.add(`cell-${current[0]}-${current[1]}`)
            $(`#maze_table td#cell-${current[0]}-${current[1]}`).addClass("visited_point")
            await APP.base.sleep(10)
        } else if (MAZE[current[0]][current[1]] == 2){
            return new_path
        } else if (MAZE[current[0]][current[1]] == 3){
            visited_point.add(`cell-${current[0]}-${current[1]}`)
        }
    }
    if (new_visited_points.length == 0){
        return false
    }
    var res = await find_path(new_visited_points, visited_point, new_path)
    return res

    

}

function get_unvisited_adjacencies(points, visited_point, path){
    var adjacencies = []
    for (let i = 0; i < points.length; i ++){
        if (points[i][0]+1 < MAZE.length & !visited_point.has(`cell-${points[i][0]+1}-${points[i][1]}`)){
            adjacencies.push([points[i][0]+1, points[i][1]])
            path[`cell-${points[i][0]+1}-${points[i][1]}`] = `cell-${points[i][0]}-${points[i][1]}`
        }
        if (points[i][0]-1 >= 0 & !visited_point.has(`cell-${points[i][0]-1}-${points[i][1]}`)){
            adjacencies.push([points[i][0]-1, points[i][1]  ])
            path[`cell-${points[i][0]-1}-${points[i][1]}`] = `cell-${points[i][0]}-${points[i][1]}`
        }
        if (points[i][1]+1 < MAZE[0].length & !visited_point.has(`cell-${points[i][0]}-${points[i][1]+1}`)){
            adjacencies.push([points[i][0]  , points[i][1]+1])
            path[`cell-${points[i][0]}-${points[i][1]+1}`] = `cell-${points[i][0]}-${points[i][1]}`
        }
        if (points[i][1]-1 >= 0 & !visited_point.has(`cell-${points[i][0]}-${points[i][1]-1}`)){
            adjacencies.push([points[i][0]  , points[i][1]-1])
            path[`cell-${points[i][0]}-${points[i][1]-1}`] = `cell-${points[i][0]}-${points[i][1]}`
        }
    }
    return [adjacencies, path]
}