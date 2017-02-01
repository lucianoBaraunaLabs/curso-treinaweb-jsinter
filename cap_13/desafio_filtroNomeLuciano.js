
var listaNomes = ['joao', 'maria', 'carlos'];
var form = document.forms[0];


var filtro = function(campo, lista){
    var validador = false;
    for(var i = 0; i < lista.length; i++){
        if(campo == lista[i]){
            console.log('Encontrado');
            break;
        }else{
            console.log('Nada encontrado')
        }
    }
}

form.addEventListener('submit', function(event){
    event.preventDefault();
    var campoPesq = document.getElementById('campoPesq').value;
    filtro(campoPesq, listaNomes);
});