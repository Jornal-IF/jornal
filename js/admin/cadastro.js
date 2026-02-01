document.addEventListener('DOMContentLoaded', async () => {
    // Referências aos elementos principais
    const noticiaForm = document.getElementById('noticiaForm');
    const categoriaSelect = document.getElementById('categoria');
    const confirmacaoMensagem = document.getElementById('confirmacao-mensagem');
    
    // Elementos de agrupamento que controlam a visibilidade no HTML
    const camposNoticia = document.getElementById('campos-noticia');
    const camposVaga = document.getElementById('campos-vaga');
    const camposEdital = document.getElementById('campos-edital');

    // elemento da saudação
    const saudacao = document.getElementById('login-greeting')

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

    // Função para exibir/ocultar campos com base na categoria selecionada
    categoriaSelect.addEventListener('change', () => {
        const categoriaSelecionada = categoriaSelect.value;

        // Oculta todos os campos inicialmente
        camposNoticia.style.display = 'none';
        camposVaga.style.display = 'none';
        camposEdital.style.display = 'none';

        // Exibe os campos correspondentes à categoria selecionada
        if (categoriaSelecionada === 'Notícia') {
            camposNoticia.style.display = 'block';
        } else if (categoriaSelecionada === 'Vaga') {
            camposVaga.style.display = 'block';
        } else if (categoriaSelecionada === 'Edital') {
            camposEdital.style.display = 'block';
        }
    });

    // Inicializa a visibilidade com base na seleção atual
    categoriaSelect.dispatchEvent(new Event('change'));

    function validarFormulario(dados) {
        let valido = true;
        limparErros();

        // Validações Comuns (Título, Data, Descrição)
        if (dados.titulo.length < 3) {
            exibirErro('titulo', 'O título deve ter no mínimo 3 caracteres.');
            valido = false;
        }
        if (dados.categoria === "") {
            exibirErro('categoria', 'Selecione uma categoria válida.');
            valido = false;
        }
        if (!dados.data) {
            exibirErro('data', 'A data é obrigatória.');
            valido = false;
        } 
        if (dados.descricao.length < 10) {
            exibirErro('descricao', 'A descrição deve ter no mínimo 10 caracteres.');
            valido = false;
        }
        

        // Validações Específicas para Vagas
        if (dados.categoria === 'Vaga') {
            if (!dados.empresa.trim()) {
                exibirErro('empresa', 'O nome da empresa é obrigatório.');
                valido = false;
            }
            if (!dados.cidade.trim()) {
                exibirErro('cidade', 'A cidade é obrigatória.');
                valido = false;
            }
            if (!dados.curso.trim()) {
                exibirErro('curso', 'Selecione um curso ou área válida.');
                valido = false;
            }
            if (dados.salario <= 0) {
                exibirErro('salario', 'O salário deve ser maior que zero.');
                valido = false;
            }
        }
        
        // Validações Específicas para Editais
        if (dados.categoria === 'Edital') {
             if (!dados.tipoProjeto.trim()) {
                exibirErro('tipoProjeto', 'O tipo de projeto é obrigatório.');
                valido = false;
            }
            if (!dados.cursosEdital.trim()) {
                exibirErro('cursosEdital', 'Pelo menos um curso é obrigatório.');
                valido = false;
            }
            if (dados.bolsa <= 0) {
                exibirErro('bolsa', 'O valor da bolsa deve ser maior que zero.');
                valido = false;
            }
             if (!dados.prazo) {
                exibirErro('prazo', 'O prazo final é obrigatório.');
                valido = false;
            }
        }

        return valido;
    }


    if (noticiaForm) {
        noticiaForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Impede o recarregamento da página
            console.log('Formulário enviado!'); // DEBUG

            confirmacaoMensagem.style.display = 'none';
            confirmacaoMensagem.textContent = '';

            const categoria = categoriaSelect.value;
            console.log('Categoria:', categoria); // DEBUG

            // Objeto para coletar todos os campos possíveis
            const dadosColetados = {
                titulo: document.getElementById('titulo').value.trim(),
                data: document.getElementById('data').value,
                categoria: categoria,
                descricao: document.getElementById('descricao').value.trim(),
                
                // Coleta de Campos Vagas (apenas se visível)
                empresa: camposVaga.style.display === 'block' ? document.getElementById('empresa').value.trim() : '',
                cidade: camposVaga.style.display === 'block' ? document.getElementById('cidade').value.trim() : '',
                curso: camposVaga.style.display === 'block' ? document.getElementById('curso').value.trim() : '',
                salario: camposVaga.style.display === 'block' ? parseFloat(document.getElementById('salario').value) : 0,
                
                // Coleta de Campos Editais (apenas se visível)
                tipoProjeto: camposEdital.style.display === 'block' ? document.getElementById('tipoProjeto').value.trim() : '',
                cursosEdital: camposEdital.style.display === 'block' ? document.getElementById('cursosEdital').value.trim() : '',
                bolsa: camposEdital.style.display === 'block' ? parseFloat(document.getElementById('bolsa').value) : 0,
                prazo: camposEdital.style.display === 'block' ? document.getElementById('prazo').value : '',
            };

            if (validarFormulario(dadosColetados)) {
                
                let novaEntrada = {
                    titulo: dadosColetados.titulo,
                    data: dadosColetados.data,
                    categoria: categoria,
                    descricao: dadosColetados.descricao,
                };

                let tipo = '';
                let URL = 'http://localhost:3003/';

                // Define o endpoint e finaliza o objeto
                if (categoria === 'Notícia') {
                    URL += 'noticias';
                    tipo = 'Notícia';
                } else if (categoria === 'Vaga') {
                    URL += 'vagas';
                    tipo = 'Vaga de Estágio';
                    novaEntrada = {
                        ...novaEntrada,
                        empresa: dadosColetados.empresa,
                        cidade: dadosColetados.cidade,
                        curso: dadosColetados.curso,
                        salario: dadosColetados.salario,
                    };
                } else if (categoria === 'Edital') {
                    URL += 'projetos';
                    tipo = 'Edital de Projeto';
                    novaEntrada = {
                        ...novaEntrada,
                        tipoProjeto: dadosColetados.tipoProjeto,
                        cursos: dadosColetados.cursosEdital,
                        bolsa: dadosColetados.bolsa,
                        prazo: dadosColetados.prazo,
                    };
                }

                // Enviando para JSON Server
                try {
                    const response = await fetch(URL, {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(novaEntrada)
                    });
                    
                    if (response.ok) {
                        // Exibir mensagem de confirmação
                        confirmacaoMensagem.textContent = `${tipo} cadastrada com sucesso!`;
                        confirmacaoMensagem.style.display = 'block';
                        
                        // Após 3 segundos, limpar formulário e resetar a visibilidade
                        setTimeout(() => {
                            noticiaForm.reset();
                            categoriaSelect.dispatchEvent(new Event('change'));
                            confirmacaoMensagem.style.display = 'none';
                        }, 3000);
                    } else {
                        throw new Error('Erro ao salvar');
                    }
                } catch (error) {
                    confirmacaoMensagem.textContent = `Erro ao cadastrar. Verifique se o servidor está rodando.`;
                    confirmacaoMensagem.style.display = 'block';
                    console.error('Erro:', error);
                }
            }
            
        });
    }

    function mostrarSaudacao() {
        const usuario = sessionStorage.getItem('usuarioLogado')

        if(usuario){
            saudacao.textContent = `Olá, ${usuario}!`
        }
    }

    mostrarSaudacao()
});