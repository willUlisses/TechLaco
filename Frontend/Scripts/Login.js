const todosOsInputs = document.querySelectorAll("input");

todosOsInputs.forEach(input => {
    // ele vai meio que percorrer todos os inputs do formulário e vai verificar se ta invalido, se tiver bota a classe de erro
    input.addEventListener('invalid', function(evento) { 
        evento.preventDefault()
        evento.target.classList.add('erro-validacao');
    });

    input.addEventListener('input', function(evento) { // faz a mesma coisa do primeiro loop mas ele vai tirar o fundo vermelho dos inputs que estão certos.
        evento.preventDefault()
        evento.target.classList.remove('erro-validacao');
    });
});