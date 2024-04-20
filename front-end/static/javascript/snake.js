if (typeof(APP) == "undefined"){
    APP = {}
}
APP['snake'] = {
    "init": function(){
        $("#restart").click(function(){
            gridSize = 30;
            snake = [{x: 15, y: 15}];
            apple = apple = { x: Math.floor(Math.random() * gridSize) + 1, y: Math.floor(Math.random() * gridSize) + 1 };
            direction = {x: 0, y: 0}; 
            speed = 10;
            APP.snake.startGame();
        })
        $(document).on('keydown', function(e){
            direction = APP.snake.getDirection(false);
            switch (e.key) {
                case 'ArrowUp':
                    if (direction.y == 0){next_directions.push({x: 0, y: -1});}
                    break;
                    case 'ArrowDown':
                    if (direction.y == 0){next_directions.push({x: 0, y: 1});}
                    break;
                    case 'ArrowLeft':
                    if (direction.x == 0){next_directions.push({x: -1, y: 0});}
                    break;
                    case 'ArrowRight':
                    if (direction.x == 0){next_directions.push({x: 1, y: 0});}
                    break;
            }
        })
        
    },
    "getDirection" : function(remove = false) {
        if (next_directions.length > 0){
            if (remove) {
                direction = next_directions.shift();
            } else {
                direction = next_directions[0];
            }
            return direction;
        }
        return previous_direction;
    },
    "startGame" : function() {
        var game_interval = setInterval(() => {
            let game_over = APP.snake.updateGame();
            if (game_over){clearInterval(game_interval);}
            APP.snake.drawGame();
        }, 1000 / speed);
    },
    "updateGame" : function() {
        function updateSnake() {
            for (let i = snake.length - 2; i >= 0; i--) {
                snake[i + 1] = { ...snake[i] };
            }
            direction = APP.snake.getDirection(true);
            snake[0].x += direction.x;
            snake[0].y += direction.y;
            previous_direction = direction;
        }
        function checkDeath() {
            function outsideGrid(position) {
                return position.x < 1 || position.x > gridSize || position.y < 1 || position.y > gridSize;
            }
            function snakeIntersection() {
                return snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y);
            }
            return outsideGrid(snake[0]) || snakeIntersection();
        }
        function updateApple() {
            if (snake.some(segment => segment.x === apple.x && segment.y === apple.y)) {
              snake.push({ ...snake[snake.length - 1] });
              apple.x = Math.floor(Math.random() * gridSize) + 1;
              apple.y = Math.floor(Math.random() * gridSize) + 1;
              speed += 0.5; // Increase speed slightly for more challenge
            }
        }
        updateSnake();
        if (checkDeath()){
            return true;
        }
        updateApple();
        return false;
    },
    "drawGame" : function() {
        function drawSnake() {
            snake.forEach(segment => { // Draw snake
                const snakeElement = document.createElement('div');
                snakeElement.style.gridColumnStart = segment.x;
                snakeElement.style.gridRowStart = segment.y;
                snakeElement.classList.add('snake');
                snake_board.append(snakeElement);
                snakeElement.show
            });
        }
        function drawApple() {
            const appleElement = document.createElement('div');
            appleElement.style.gridColumnStart = apple.x;
            appleElement.style.gridRowStart = apple.y;
            appleElement.classList.add('apple');
            snake_board.append(appleElement);
        }
        snake_board.innerHTML = ''; // Clear the game area
        drawSnake();
        drawApple();
        
      }
}