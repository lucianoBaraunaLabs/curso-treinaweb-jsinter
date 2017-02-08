
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
        this.cellWidth = 15;
        this.scoreTextStyle = '15px Verdana';
        this.snakeLength = 5;
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

        // Snake
        var paintSnake = function(snake){
            var snakeColor = config.color.snake;
            for(indice in snake){
                var snakeCell = snake[indice];
                paintCell(snakeCell.x, snakeCell.y, snakeColor);
            }

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

        // Placar
        var paintScore = function(score) {
            var scoreColor = config.color.score,
                scoreTextStyle = config.scoreTextStyle;
            
            context.font = scoreTextStyle;
            context.fillStyle = scoreColor;
            context.fillText(score, 5, 20);
            
        }


        paintGameBoard();
        paintScore(300);
        


    }).call(SNAKE.view, SNAKE.config); // SNAKE.config é passado aqui com argumento
                                       // para nao termos um nested muito grande de nomes
                                       // e para termos o acesso ao obj
    
    (function initController(config){ // Controla o jogo com as regras
        var food,
            snake,
            score;
        
        var createSnake = function(){
            var snakeLength = config.snakeLength;
            
            snake = [];
            for(var i = snakeLength - 1; i >= 0; i--){
                snake.push({
                    x: i,
                    y: 0
                });
            }
        }

        var createFood = function(){
            var cellWidth = config.cellWidth,
                gameHeight = config.gameWidth,
                gameHeight = config.gameHeight
                randomX = Math.round(Math.;
        }
    }).call(SNAKE.controller, SNAKE.config);
    
    


    
});



