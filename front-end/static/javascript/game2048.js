if (typeof(APP) == "undefined"){
    APP = {}
}
APP['game2048'] = {
    "init": function(){
        $("#select_size").click(function(){
            let size = parseInt($("#size").val());
            $("#message").text("Use keyboard to play the game");
            APP.game2048.changeSize(size);
            APP.game2048.updateGameBoard();
        })
        $(document).on('keydown', function(e){
            switch (e.key) {
                case 'ArrowUp':
                    APP.game2048.updateBoardAction("up");
                    break;
                case 'ArrowDown':
                    APP.game2048.updateBoardAction("down");
                    break;
                case 'ArrowLeft':
                    APP.game2048.updateBoardAction("left");
                    break;
                case 'ArrowRight':
                    APP.game2048.updateBoardAction("right");
                    break;
            }
        })
    },
    "startGame":function(size){
        $("#message").text("Use keyboard to play the game");
        APP.game2048.changeSize(size);
        APP.game2048.updateGameBoard();
    },
    "changeSize": function(size){
        board = Array(size).fill().map(() => Array(size).fill(0));
    },
    "drawBoard": function(){
        game_board = $("#game_board");
        game_board.empty();
        for (let i = 0; i<board.length; i++){
            game_board.append("<tr>")
            for (let j = 0; j<board[i].length; j++){
                value = board[i][j] > 0 ? board[i][j] : "";
                background_color = "rgb(255, 255, 255)"
                if (value == 2){
                    background_color = "rgb(224, 224, 224)"
                } else if (value == 4) {
                    background_color = "rgb(220, 220, 180)"
                } else if (value == 8) {
                    background_color = "rgb(255, 255, 153)"
                } else if (value == 16) {
                    background_color = "rgb(255, 204, 153)"
                } else if (value == 32) {
                    background_color = "rgb(255, 153, 51)"
                } else if (value == 64) {
                    background_color = "rgb(255, 153, 153)"
                } else if (value == 128) {
                    background_color = "rgb(255, 102, 102)"
                } else if (value == 256) {
                    background_color = "rgb(255, 51, 51)"
                } else if (value == 512) {
                    background_color = "rgb(204, 0, 0)"
                } else if (value == 1024){
                    background_color = "rgb(153, 0, 0)"
                } else if (value == 1024){
                    background_color = "rgb(255, 0, 127)"
                } else if (value == 2048){
                    background_color = "rgb(173, 0, 76)"
                } else if (value == 4096){
                    background_color = "rgb(0, 0, 204)"
                } else if (value == 8192){
                    background_color = "rgb(0, 0, 153)"
                } else if (value == 16384){
                    background_color = "rgb(102, 204, 0)"
                } else if (value == 32768){
                    background_color = "rgb(51, 102, 0)"
                }

                game_board.append(`<td style="background-color: ${background_color};">${value}</td>`)
            }
            game_board.append("</tr>")
        }
    },
    "inBoard": function(i, j){
        return i>=0 && j>=0 && i<board.length && j<board[0].length;
    },
    "checkDeath": function(){
        for (let i = 0; i<board.length; i++){
            for (let j = 0; j<board[i].length; j++){
                if (board[i][j] == 0){return true;}
                if (APP.game2048.inBoard(i+1, j) && board[i][j] == board[i+1][j]){return true;}
                if (APP.game2048.inBoard(i-1, j) && board[i][j] == board[i-1][j]){return true;}
                if (APP.game2048.inBoard(i, j+1) && board[i][j] == board[i][j+1]){return true;}
                if (APP.game2048.inBoard(i, j-1) && board[i][j] == board[i][j-1]){return true;}
            }
        }
        return false;
    },
    "createRandomNumber": function(){
        zero_places = []
        for (let i = 0; i<board.length; i++){
            for (let j = 0; j<board[i].length; j++){
                if (board[i][j] == 0) {zero_places.push([i, j]);}
            }
        }
        let rand_zero_place = zero_places[Math.floor(Math.random()*zero_places.length)];
        let random_value = Math.random() < 0.8 ? 2 : 4;
        board[rand_zero_place[0]][rand_zero_place[1]] = random_value;
        if (!APP.game2048.checkDeath()){
            $("#message").text("game over!!!");
            return;
        }
    },
    "updateGameBoard": async function(){
        APP.game2048.drawBoard();
        await new Promise(r => setTimeout(r, 100));
        APP.game2048.createRandomNumber();
        APP.game2048.drawBoard();
    },
    "updateBoardAction": function(direction){
        changed = false;
        switch (direction) {
            case "up":
                for (let i = 0; i<board[0].length; i++){
                    new_changed = APP.game2048.updateBoardRowColumn(0, i, "up");
                    changed = changed || new_changed
                }
                break;
            case "down":
                for (let i = 0; i<board[0].length; i++){
                    new_changed = APP.game2048.updateBoardRowColumn(board.length - 1, i, "down");
                    changed = changed || new_changed
                }
                break;
            case "left":
                for (let i = 0; i<board.length; i++){
                    new_changed = APP.game2048.updateBoardRowColumn(i, 0, "left");
                    changed = changed || new_changed
                }
                break;
            case "right":
                for (let i = 0; i<board.length; i++){
                    new_changed = APP.game2048.updateBoardRowColumn(i, board[0].length - 1, "right");
                    changed = changed || new_changed
                }
                break;
        }
        if (!changed) {return;}
        APP.game2048.updateGameBoard();
    },

    "getNext": function(i, j, direction){
        switch (direction) {
            case "up":
                return [i+1, j];
            case "down":
                return [i-1, j];
            case "left":
                return [i, j+1];
            case "right":
                return [i, j-1];
        }
        return null;
    },
    "getNextNonZero": function(i, j, direction){
        let next = APP.game2048.getNext(i, j, direction);
        while (APP.game2048.inBoard(next[0], next[1])) {
            if (board[next[0]][next[1]] != 0){
                return [next[0], next[1], board[next[0]][next[1]]];
            }
            next = APP.game2048.getNext(next[0], next[1], direction);
        }
        return null;
    },
    "updateBoardRowColumn": function(i, j, direction, changed = false){
        if (!APP.game2048.inBoard(i, j)) {return changed;}
        nextNonZero = APP.game2048.getNextNonZero(i, j, direction)
        if (nextNonZero == null){return changed;}
        const ni = nextNonZero[0];
        const nj = nextNonZero[1];
        const nv = nextNonZero[2];
        next = APP.game2048.getNext(i, j, direction);
        if (board[i][j] == 0) {
            changed = true;
            board[i][j] = board[ni][nj];
            board[ni][nj] = 0;
            changed = APP.game2048.updateBoardRowColumn(i, j, direction, changed);
            return changed;
        } else if (board[i][j] == nv){
            changed = true;
            board[i][j] *= 2;
            board[ni][nj] = 0;
        }
        changed = APP.game2048.updateBoardRowColumn(next[0], next[1], direction, changed);
        return changed;
    },
    "printBoard": function(){
        for (let i = 0; i<board.length; i++){
            console.log(board[i]);
        }
    }
}