$(document).ready(function(){
    var $busca = $('#txtBusca');
    var nomes = $('.nome');
    
    $busca.on('keyup', function(){
        for(var i = 0; i < nomes.length; i++){
            var $nome = $(nomes[i]);
            var nome = $nome.text();
            var nomeDigitado = $('#txtBusca').val();
            if(nome.substring(0,nomeDigitado.length) !== nomeDigitado){
                $nome.hide();
            } else if(!nomeDigitado){
                $nome.show();
            } else {
                $nome.show();
            }
        }
    });
    
});
