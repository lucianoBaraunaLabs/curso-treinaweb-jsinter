
$(function(){
    

    var SNAKE = SNAKE || { // namespacing criado para preservados o nome no escopo global.
        view: {},
        controller: {},
        config: {}
    };
    
    // Injecoes de dependencias
    // funcoes que se autoinvocao injetando o obj e a ordem de inicializacao nao pode ser alterada
    // 1 config, 2 view, 3 controller. Pois uma depende da outra para trabalhar
    (function initConfig(){ // controla as configuracoes
        this.$canvas = $('#snakeCanvas');
        this.gameWidth = this.$canvas.width();
        this.gameHeight = this.$canvas.height();
        this.cellWidth = 10;
        this.color = {
            background: '#ffffff',
            boardBorder: '#2c3e50',
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
        
        // Snake
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
        paintGameBoard();
        paintCell(10, 10, config.color.snake);


    }).call(SNAKE.view, SNAKE.config); // SNAKE.config é passado aqui com argumento
                                       // para nao termos um nested muito grande de nomes
    
    (function initController(){

    }).call(SNAKE.controller);
    
    


    
});



