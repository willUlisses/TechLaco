const tiposDeCadastro = document.querySelectorAll('.cardOpcaoCadastro');
const inputGithub = document.querySelector("#inputGithub")

// comentando para caso vocês queiram dar uma olhada no que fiz aqui

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
        } else {
            containerParaAnimacaoGithub.classList.remove('ativo');
        }
    });
}