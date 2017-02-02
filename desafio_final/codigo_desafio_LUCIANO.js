
$(function(){
    var $canvas = $('#snake'),
        ctx = $canvas[0].getContext('2d');
    
    // Ponto
ctx.beginPath();
ctx.fillStyle = '#ff0000';
ctx.rect(235,235,15,15);
ctx.fill();

// var snake = {
//     criar: function(){
//         ctx.beginPath();
//         ctx.fillStyle = '#0000ff';
//         ctx.rect(0,0,15,15);
//         ctx.fill();
//     },
//     start: function(tempo){
//         var count = 0;
//         setInterval(function(){
//             console.log(count);
//             ctx.moveTo(0,count++,15,15);
//             // count++
            
//         },tempo)
//     }
// }

// snake.criar(0,0,15,15);
// snake.start(500);

ctx.beginPath();
        ctx.fillStyle = '#0000ff';
        ctx.rect(0,0,15,15);
        ctx.moveTo(10,150);
        ctx.fill();


});

















window.addEventListener('keypress', function(event){
    console.log(event.keyCode);

    function direcao(){
        switch(event.keyCode){
            case 119:
                console.log('cima')
                break;
            case 115:
                console.log("baixo");
                break;
            case 97:
                console.log('esq');
                break;
            case 100:
                console.log('dir');
                break;
        }
    }
    
});






