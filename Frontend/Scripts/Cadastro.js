const tiposDeCadastro = document.querySelectorAll('.cardOpcaoCadastro');
const caixaInputGithub = document.querySelector("#inputGithub");
const campoInputGithub = document.querySelector("#github");
const todosOsInputs = document.querySelectorAll("input");

// comentando para caso vocês queiram dar uma olhada no que fiz aqui já que o wagner ainda não passou o javascript

for (let opcao of tiposDeCadastro) { // pego cada uma das opções de cadastro (cliente e dev)
    opcao.addEventListener('click', function() { // adiciono um evento nessas opções do tipo click
        for (let tipo of tiposDeCadastro) { //quando clicados vão chamar uma função que vai remover a classe de ativo
            tipo.classList.remove('cardOpcaoCadastroAtivo');

            let img = tipo.querySelector("img");
            img.src = img.src.replace("blue-", "gray-"); // vai trocar o prefixo do src da imagem do ícone de blue pra gray (inativo)
        }

        this.classList.add('cardOpcaoCadastroAtivo');
        let imgDaOpcaoClicada = this.querySelector("img");
        imgDaOpcaoClicada.src = imgDaOpcaoClicada.src.replace("gray-", "blue-"); // vai trocar o prefixo do icone de gray pra blue (ativo)
        
        if (this.textContent.includes("Quero Construir")) {
            containerParaAnimacaoGithub.classList.add('ativo');
            campoInputGithub.required = true; // se o cara tiver selecionado que ele é dev, o input do github vai ficar obrigatório
        } else {
            containerParaAnimacaoGithub.classList.remove('ativo');
            campoInputGithub.required = false; // se ele não for dev ai num vai ser obrigat´rio
            campoInputGithub.value = "";
            campoInputGithub.classList.remove("erro-validacao"); // essa parte é pra se o cara invalidar algum input, quando ele for digitar dnv ele tira o fundo vermelho
        }
    });
}

// aqui é só pra caso dê um disparo de invalidação em algum input
todosOsInputs.forEach(input => {
    // ele vai meio que percorrer todos os inputs do formulário e vai verificar se ta invalido, se tiver bota a classe de erro
    input.addEventListener('invalid', function(evento) { 
        evento.preventDefault();
        evento.target.classList.add('erro-validacao');
    });

    input.addEventListener('input', function(evento) { // faz a mesma coisa do primeiro loop mas ele vai tirar o fundo vermelho dos inputs que estão certos.
        evento.preventDefault();
        evento.target.classList.remove('erro-validacao');
    });
});