document.addEventListener('DOMContentLoaded', () => {
    // Garante que o script só roda após o carregamento do HTML

    // Referências aos elementos do formulário (ID: noticiaForm)
    const noticiaForm = document.getElementById('noticiaForm');
    const confirmacaoMensagem = document.getElementById('confirmacao-mensagem');
    
    // Funções auxiliares para mensagens de erro
    function exibirErro(idCampo, mensagem) {
        const erroEl = document.getElementById(`erro-${idCampo}`);
        if (erroEl) {
            erroEl.textContent = mensagem;
        }
    }

    function limparErros() {
        document.querySelectorAll('.erro-mensagem').forEach(el => el.textContent = '');
    }

    // Função para validar campos com base nos requisitos da tarefa
    function validarFormulario(titulo, data, categoria, descricao) {
        let valido = true;
        limparErros();

        // Validação de Título
        if (titulo.length < 3) {
            exibirErro('titulo', 'O título deve ter no mínimo 3 caracteres.');
            valido = false;
        }

        // Validação de Categoria
        if (categoria === "" || (categoria !== 'Notícia' && categoria !== 'Vaga')) {
            exibirErro('categoria', 'Selecione uma categoria válida (Notícia ou Vaga).');
            valido = false;
        }

        // Validação de Data
        if (!data) {
            exibirErro('data', 'A data é obrigatória.');
            valido = false;
        } 

        // Validação de Descrição
        if (descricao.length < 10) {
            exibirErro('descricao', 'A descrição deve ter no mínimo 10 caracteres.');
            valido = false;
        }

        return valido;
    }

    // Evento de Submit principal
    if (noticiaForm) {
        noticiaForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o recarregamento da página

            confirmacaoMensagem.style.display = 'none';
            confirmacaoMensagem.textContent = '';

            const titulo = document.getElementById('titulo').value.trim();
            const data = document.getElementById('data').value;
            const categoria = document.getElementById('categoria').value;
            const descricao = document.getElementById('descricao').value.trim();

            if (validarFormulario(titulo, data, categoria, descricao)) {
                
                const novaEntrada = {
                    titulo: titulo,
                    data: data,
                    categoria: categoria,
                    descricao: descricao,
                    curtidas: 0,
                };

                let tipo = '';

                // Adiciona o item ao array correto (presume-se que 'noticias' e 'vagasEstagio' 
                // estão definidos em 'js/dados.js' e são globais)
                if (categoria === 'Notícia') {
                    // Adiciona à lista de notícias
                    noticias.push(novaEntrada); 
                    tipo = 'Notícia';
                } else if (categoria === 'Vaga') {
                    // Adiciona à lista de vagas
                    vagasEstagio.push(novaEntrada);
                    tipo = 'Vaga';
                }

                // Exibir mensagem de confirmação
                confirmacaoMensagem.textContent = `${tipo} cadastrada com sucesso!`;
                confirmacaoMensagem.style.display = 'block';
                
                // Limpar formulário
                noticiaForm.reset();
            }
        });
    }
});