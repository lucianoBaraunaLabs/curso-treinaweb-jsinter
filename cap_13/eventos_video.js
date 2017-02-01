
// Colocando o return para prevenir o loader da página
// var cadastrar = function(){
//     alert('teste');
//     return false;
// }

// Isolando em um escopo e externando o metodo
// com this
// (function(){
//     var cadastrar = function(event){
//         event.preventDefault();
//         alert('teste');
//     }
//     this.cadastrar = cadastrar;
// })();

// submit
// var form = document.forms[0];
// form.addEventListener('submit', function cadastrar(event){
//     event.preventDefault();
//     alert('Teste');
// })


// var txt = document.getElementById('txt');

// blur
// txt.addEventListener('blur', function cadastrar(event){
//     event.preventDefault();
//     alert('Teste');
// })

// change
// txt.addEventListener('change', function cadastrar(event){
//     event.preventDefault();
//     alert('Teste');
// })

// focus
// txt.addEventListener('focus', function cadastrar(event){
//     event.preventDefault();
//     alert('Teste');
// })


// var textoClick = document.getElementById('textClick');
// click
// textoClick.addEventListener('click', function clique(event){
//     window.location.href = "http://www.google.com.br";
// })

// double click
// textoClick.addEventListener('dblclick', function clique(event){
//     window.location.href = "http://www.google.com.br";
// })

// mouseover ou mouseout
// textoClick.addEventListener('mouseover', function clique(event){
//     alert('teste');
// })



// window.addEventListener('keypress', function(event){
//     event.preventDefault();
//     alert(event.keyCode);
//     alert(event.ctrlKey); // checa se o ctrl ficou aprtado
//     alert(event.altKey); // checa se o alt foi apertado
//     alert(event.shiftKey); // checa se o alt foi apertado
// })

