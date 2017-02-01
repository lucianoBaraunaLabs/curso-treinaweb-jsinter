$(document).ready(function(){

	var agenda = {
		nome: 'Contatos Pessoais',
		contatos: [],
		adicionar: function(contato){
			var emailValido = /^(\w+[._-]?)+@\w+(\w+[.]?)+$/; //ailton.santos@email.com
			var telefoneValido = /^\d{5}-\d{4}$/; // 98765-8765
			if(contato.nome && telefoneValido.test(contato.telefone) && emailValido.test(contato.email)){
				this.contatos.push(contato);
			}else{
				throw new Error('Erro ao adicionar o novo contato.');
			}
		},
		remover: function(nome){
			for(indice in this.contatos){
				var contato = this.contatos[indice];
				if(contato.nome === nome){
					this.contatos.splice(indice,1);
					return true;
				}
			}
			throw new Error('Erro ao remover usuario');
		},
		listar: function(){
			// this.pegarContatosSalvos();
			for(indice in this.contatos){
				var contato = this.contatos[indice];
				

			}
			criarNovoContato(contato);
		},
		salvar: function(){
			var contatosString = JSON.stringify(this.contatos);
			localStorage.contatos = contatosString;
		},
		pegarContatosSalvos: function(){
			this.contatos = JSON.parse(localStorage.contatos);
		}
	};

	var criarNovoContato = function(contato){
		console.log('criando');
		var cores = [
			'caixa-verde',
			'caixa-laranja',
			'caixa-azul',
			'caixa-roxa',
		]

		var cor = cores[Math.floor(Math.random() * cores.length)];

		var $caixa = $('<div>',{class:'caixa-contato '+cor});
		var $nome = $('<h3>',{text:contato.nome});
		var $email = $('<p>',{text:contato.email});
		var $telefone = $('<p>',{text:contato.telefone});
		var $pagina = $('<p>',{text:contato.pagina});
		var $contatos = $('#contatos');

		$caixa.append($nome);
		$caixa.append($email);
		$caixa.append($telefone);
		$caixa.append($pagina);

		$contatos.append($caixa);
	}
	

	$('#frmCadastro').on('submit', function(event){
		console.log('opa');	
		event.preventDefault();
		agenda.listar();
		agenda.salvar();
	})



	


});