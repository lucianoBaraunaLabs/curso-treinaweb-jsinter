
$(function(){

    var SNAKE = SNAKE || { // namespacing criado para preservados o nome no escopo global.
        view: {},
        controller: {},
        config: {}
    };
    
    // Injecoes de dependencias
    // funcoes que se autoinvocao injetando o obj, ordem de inicializacao nao pode ser alterada
    // 1 config, 2 view, 3 controller. As funcoes dependem uma da outra para trabalhar
    (function initConfig(){ // controla as configuracoes
        this.$canvas = $('#snakeCanvas');
        this.gameWidth = this.$canvas.width();
        this.gameHeight = this.$canvas.height();
        this.cellWidth = 10;
        this.scoreTextStyle = '15px Verdana';
        this.snakeLength = 5;
        this.speed = 60;
        this.color = {
            background: '#ffffff',
            boardBorder: '#2c3e50',
            score: '#895434',
            snake: {
                fill: '#e67e22',
                border: '#e357ee'
            },
            food: {
                fill: '#160a32',
                border: '#2e45ff'
            }
        }
        this.keyCode = {
            UP: '38',
            DOWN: '40',
            LEFT: '37',
            RIGHT: '39',
            P: '80',
            C: '67'
        }

    }).call(SNAKE.config);
    
    (function initView(config){ // controla a forma de mostrar os resultados para o usuario
        var $canvas = config.$canvas[0],
            context = $canvas.getContext('2d');
        
        // Celula snake ou comida
        var paintCell = function(x, y, color){
            var cellWidth = config.cellWidth;

            context.fillStyle = color.fill;
            context.fillRect(x*cellWidth, y*cellWidth, cellWidth, cellWidth);
            context.strokeStyle = color.border;
            context.strokeRect(x*cellWidth, y*cellWidth, cellWidth, cellWidth);
        }

        // Area quadrado
        var paintGameBoard = function(){
            var background = config.color.background,
                gameWidth = config.gameWidth,
                gameHeight = config.gameHeight,
                boardBorder = config.color.boardBorder;

            context.fillStyle = background;
            context.fillRect(0,0, gameWidth, gameHeight);
            context.strokeStyle = boardBorder;
            context.strokeRect(0,0, gameWidth, gameHeight);
        }

        // Snake
        var paintSnake = function(snake){
            var snakeColor = config.color.snake;

            for(indice in snake){
                var snakeCell = snake[indice];
                paintCell(snakeCell.x, snakeCell.y, snakeColor);
            }

        }
        

        // Placar
        var paintScore = function(score) {
            var scoreColor = config.color.score,
                scoreTextStyle = config.scoreTextStyle;
            
            context.font = scoreTextStyle;
            context.fillStyle = scoreColor;
            context.fillText(score, 5, 20);
            
        }

        // O this aqui referencia a function view
        this.refresh = function(food, snake, score){
            var foodColor = config.color.food;

            paintGameBoard();
            paintSnake(snake);
            paintCell(food.x, food.y, foodColor);
            paintScore(score);
        }

    }).call(SNAKE.view, SNAKE.config); // SNAKE.config sao passado aqui com argumento
                                       // para nao termos um nested muito grande de nomes
                                       // e para termos o acesso ao obj
    
    (function initController(config, view){ // Controla o jogo com as regras
        var food,
            snake,
            score,
            direction,
            gameLoop,
            that = this;
        
        var createSnake = function(){ // Criando a snake
            var snakeLength = config.snakeLength;
            
            snake = [];

            for(var i = snakeLength-1; i >=0; i--){
                snake.push({
                    x: i,
                    y: 0
                });
            }
        }

        var createFood = function(){
            var cellWidth = config.cellWidth,
                gameWidth = config.gameWidth,
                gameHeight = config.gameHeight,
                randomX = Math.round(Math.random() * (gameWidth - cellWidth)/cellWidth);
                randomY = Math.round(Math.random() * (gameHeight - cellWidth)/cellWidth);
            
            food = {
                x: randomX,
                y: randomY
            }
        }

        var addKeyEventListeners = function(){
            var keyCode = config.keyCode;
            // o off acrescetando aqui tem a funcao
            // de nao permitir que dois o mesmo evento
            // seja criado mais de uma vez sendo assim ele 
            // e criado uma nova vez quando executado
            $(document).off('keydown').on('keydown', function(event){ 
                var pressedKey = event.which;

                if(pressedKey == keyCode.LEFT && direction != 'right'){
                    direction = 'left';
                }else if(pressedKey == keyCode.UP && direction != 'down'){
                    direction = 'up';
                }else if(pressedKey == keyCode.RIGHT && direction != 'left'){
                    direction = 'right';
                }else if(pressedKey == keyCode.DOWN && direction != 'up'){
                    direction = 'down';
                }else if(pressedKey == keyCode.P){
                    that.stopLooping();
                }else if(pressedKey == keyCode.C){
                    that.startLooping();
                }
            });
        }
        
        var checkBodyCollision = function(head){
            for(indice in snake){
                var snakeCell = snake[indice];
                if(snakeCell.x == head.x && snakeCell.y == head.y){
                    return true;
                }
            }
            return false;
        }

        var checkCollision = function(head){
            var leftCollision = head.x == -1,
                rightCollision = head.x == Math.round(config.gameWidth/config.cellWidth),
                bottomCollision = head.y == -1,
                topCollision = head.y == Math.round(config.gameHeight/config.cellWidth);

                if(leftCollision || rightCollision || bottomCollision || topCollision || checkBodyCollision(head)){
                    throw new Error('Voce perdeu =D.')
                }
               
        }

        var chooseSnakeDirecation = function(){
            var head = {
                x: snake[0].x,
                y: snake[0].y
            }

            if(direction == 'right'){
                head.x++;
            }else if(direction == 'left'){
                head.x--;
            }else if(direction == 'up'){
                head.y--;
            }else if(direction == 'down'){
                head.y++;
            }

            return head;
        }

        var incrementScore = function(){
            score++;
        }

        var checkSnakeEatFood = function(head){

            if(head.x == food.x && head.y == food.y){
                var tail = {
                    x: head.x,
                    y: head.y
                };
                incrementScore();
                createFood();
            }else{
                var tail = snake.pop();
                tail.x = head.x;
                tail.y = head.y;
            }
            return tail;
        };

        var makeSnakeMovement = function(tail){
            snake.unshift(tail);
        }

        var gameRefresh = function(){
            try{
                var newHeadPosition,
                    tail;

                newHeadPosition = chooseSnakeDirecation();
                checkCollision(newHeadPosition);
                tail = checkSnakeEatFood(newHeadPosition);
                makeSnakeMovement(tail);
                view.refresh(food, snake, score);
            }catch(e){
                alert(e.message);
                SNAKE.init(SNAKE.controller, SNAKE.config, SNAKE.view);
            }
        }
        
        // Inicia o jogo default
        this.initGameDefault = function(){
            var snakeLength = config.snakeLength;
            
            addKeyEventListeners();
            direction = 'right';
            createSnake();
            createFood();
            score = snakeLength;
        }

        // Controla o looping do jogo
        this.startLooping =  function(){
            if(typeof gameLoop != "undefined") clearInterval(gameLoop);
            gameLoop = setInterval(gameRefresh, config.speed)
        }

        this.stopLooping = function(){
            if(typeof gameLoop != "undefined") clearInterval(gameLoop);
            gameRefresh();
        }

    }).call(SNAKE.controller, SNAKE.config, SNAKE.view);
    
    // Incia o jogo
    SNAKE.init = function(controller, config, view){
        controller.initGameDefault();
        controller.startLooping();
    }

    SNAKE.init(SNAKE.controller, SNAKE.config, SNAKE.view);


    
});



