$(document).ready(function(){

	var agenda = {
		nome: 'Contatos Pessoais',
		contatos: [],
		adicionar: function(contato){
			var emailValido = /^(\w+[._-]?)+@\w+(\w+[.]?)+$/; //ailton.santos@email.com
			var telefoneValido = /^\d{5}-\d{4}$/; // 98765-8765
			if(contato.nome && telefoneValido.test(contato.telefone) && emailValido.test(contato.email)){
				this.contatos.push(contato);
				this.salvar();
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
			this.pegarContatosSalvos();
			for(indice in this.contatos){
				// console.log(this.contatos[indice]);
				var contato = this.contatos[indice];
				criarNovoContato(contato);
			}
		},
		salvar: function(){
			var contatosString = JSON.stringify(this.contatos);
			// console.log('SALVANDO ------');
			// console.log(contatosString);
			// console.log('SALVANDO ------');
			localStorage.contatos = contatosString;
		},
		pegarContatosSalvos: function(){
			this.contatos = JSON.parse(localStorage.contatos);
			// console.log('PEGANDO ------');
			// console.log(this.contatos);
			// console.log('PEGANDO ------');
		}
	};

	$('#frmCadastro').submit(function(event){
		event.preventDefault();
		var contato = {
			nome: $('#txtNome').val(),
			email: $('#txtEmail').val(),
			telefone: $('#txtTelefone').val(),
			pagina: $('#txtPagina').val(),
		}
		try{
			agenda.adicionar(contato);
			criarNovoContato(contato);
		}catch(e){
			alert(e.message);
		}
		
		$('#txtNome').val();
		$('#txtEmail').val();
		$('#txtTelefone').val();
		$('#txtPagina').val();
	});

	var criarNovoContato = function(contato){
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

	agenda.listar();

});