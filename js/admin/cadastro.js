document.addEventListener('DOMContentLoaded', async () => {
    // Referências aos elementos principais
    const noticiaForm = document.getElementById('noticiaForm');
    const categoriaSelect = document.getElementById('categoria');
    const confirmacaoMensagem = document.getElementById('confirmacao-mensagem');
    const btnSalvar = document.getElementById('btn-salvar');
    const btnCancelarEdicao = document.getElementById('btn-cancelar-edicao');
    const adminList = document.getElementById('admin-list');
    const adminFilter = document.getElementById('admin-filter');
    const adminListStatus = document.getElementById('admin-list-status');
    
    // Elementos de agrupamento que controlam a visibilidade no HTML
    const camposNoticia = document.getElementById('campos-noticia');
    const camposVaga = document.getElementById('campos-vaga');
    const camposEdital = document.getElementById('campos-edital');

    // elemento da saudação
    const saudacao = document.getElementById('login-greeting')

    const API_BASE = 'http://localhost:3003';
    const ENDPOINTS = {
        'Notícia': 'noticias',
        'Vaga': 'vagas',
        'Edital': 'projetos'
    };

    let editState = null;
    let itensCache = [];

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

    function escaparHTML(valor) {
        return String(valor ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function formatarData(data) {
        if (!data) return 'Data não informada';
        const dataObj = new Date(data);
        if (Number.isNaN(dataObj.getTime())) return 'Data inválida';
        return dataObj.toLocaleDateString('pt-BR');
    }

    function obterEndpointPorCategoria(categoria) {
        return ENDPOINTS[categoria] || '';
    }

    function obterCategoriaPorEndpoint(endpoint) {
        if (endpoint === 'noticias') return 'Notícia';
        if (endpoint === 'vagas') return 'Vaga';
        if (endpoint === 'projetos') return 'Edital';
        return '';
    }

    function limparFormulario() {
        noticiaForm.reset();
        categoriaSelect.dispatchEvent(new Event('change'));
        if (confirmacaoMensagem) {
            confirmacaoMensagem.style.display = 'none';
            confirmacaoMensagem.textContent = '';
        }
    }

    function ativarModoEdicao(item) {
        if (!item) return;
        const categoria = obterCategoriaPorEndpoint(item.__endpoint);
        categoriaSelect.value = categoria;
        categoriaSelect.dispatchEvent(new Event('change'));

        document.getElementById('titulo').value = item.titulo ?? '';
        document.getElementById('data').value = item.data ?? '';
        document.getElementById('descricao').value = item.descricao ?? '';

        const categoriaNoticia = document.getElementById('categoriaNoticia');
        if (categoriaNoticia) {
            categoriaNoticia.value = item.categoriaNoticia ?? '';
        }

        if (categoria === 'Vaga') {
            document.getElementById('empresa').value = item.empresa ?? '';
            document.getElementById('cidade').value = item.cidade ?? '';
            document.getElementById('curso').value = item.curso ?? '';
            document.getElementById('salario').value = item.salario ?? 0;
        }

        if (categoria === 'Edital') {
            document.getElementById('tipoProjeto').value = item.tipoProjeto ?? '';
            document.getElementById('cursosEdital').value = item.cursos ?? '';
            document.getElementById('bolsa').value = item.bolsa ?? 0;
            document.getElementById('prazo').value = item.prazo ?? '';
        }

        editState = { endpoint: item.__endpoint, id: item.id };

        if (btnSalvar) {
            btnSalvar.textContent = 'Atualizar Conteúdo';
        }
        if (btnCancelarEdicao) {
            btnCancelarEdicao.style.display = 'inline-flex';
        }
    }

    function limparModoEdicao() {
        editState = null;
        if (btnSalvar) {
            btnSalvar.textContent = 'Cadastrar Conteúdo';
        }
        if (btnCancelarEdicao) {
            btnCancelarEdicao.style.display = 'none';
        }
    }

    function renderizarListaAdmin() {
        if (!adminList) return;
        const filtro = adminFilter ? adminFilter.value : 'Todos';
        const itensFiltrados = filtro === 'Todos'
            ? itensCache
            : itensCache.filter(item => item.__tipo === filtro);

        if (itensFiltrados.length === 0) {
            adminList.innerHTML = '';
            if (adminListStatus) {
                adminListStatus.textContent = 'Nenhum conteúdo encontrado.';
            }
            return;
        }

        if (adminListStatus) {
            adminListStatus.textContent = `${itensFiltrados.length} item(s) encontrado(s).`;
        }

        adminList.innerHTML = itensFiltrados.map(item => {
            const titulo = escaparHTML(item.titulo ?? 'Sem título');
            const descricao = escaparHTML(item.descricao ?? '');
            const metaExtra = item.empresa ? ` • ${escaparHTML(item.empresa)}` : '';
            return `
                <article class="admin-item" data-id="${item.id}" data-endpoint="${item.__endpoint}">
                    <div class="admin-item-header">
                        <span class="admin-item-title">${titulo}</span>
                        <span class="admin-badge">${item.__tipo}</span>
                    </div>
                    <div class="admin-item-meta">${formatarData(item.data)}${metaExtra}</div>
                    <div class="admin-item-meta">${descricao}</div>
                    <div class="admin-item-actions">
                        <button type="button" class="btn-edit" data-action="editar">Editar</button>
                        <button type="button" class="btn-delete" data-action="excluir">Excluir</button>
                    </div>
                </article>
            `;
        }).join('');
    }

    async function carregarConteudo() {
        if (adminListStatus) {
            adminListStatus.textContent = 'Carregando conteúdo...';
        }
        try {
            const [noticiasRes, vagasRes, projetosRes] = await Promise.all([
                fetch(`${API_BASE}/noticias`),
                fetch(`${API_BASE}/vagas`),
                fetch(`${API_BASE}/projetos`)
            ]);

            const [noticias, vagas, projetos] = await Promise.all([
                noticiasRes.json(),
                vagasRes.json(),
                projetosRes.json()
            ]);

            itensCache = [
                ...noticias.map(item => ({ ...item, __tipo: 'Notícia', __endpoint: 'noticias' })),
                ...vagas.map(item => ({ ...item, __tipo: 'Vaga', __endpoint: 'vagas' })),
                ...projetos.map(item => ({ ...item, __tipo: 'Edital', __endpoint: 'projetos' }))
            ];

            renderizarListaAdmin();
        } catch (erro) {
            if (adminListStatus) {
                adminListStatus.textContent = 'Não foi possível carregar o conteúdo. Verifique o servidor.';
            }
            console.error('Erro ao carregar conteúdo:', erro);
        }
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
                categoriaNoticia: document.getElementById('categoriaNoticia')?.value ?? '',
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
                let endpoint = obterEndpointPorCategoria(categoria);

                // Define o endpoint e finaliza o objeto
                if (categoria === 'Notícia') {
                    tipo = 'Notícia';
                    novaEntrada = {
                        ...novaEntrada,
                        categoriaNoticia: dadosColetados.categoriaNoticia
                    };
                } else if (categoria === 'Vaga') {
                    tipo = 'Vaga de Estágio';
                    novaEntrada = {
                        ...novaEntrada,
                        empresa: dadosColetados.empresa,
                        cidade: dadosColetados.cidade,
                        curso: dadosColetados.curso,
                        salario: dadosColetados.salario,
                    };
                } else if (categoria === 'Edital') {
                    tipo = 'Edital de Projeto';
                    novaEntrada = {
                        ...novaEntrada,
                        tipoProjeto: dadosColetados.tipoProjeto,
                        cursos: dadosColetados.cursosEdital,
                        bolsa: dadosColetados.bolsa,
                        prazo: dadosColetados.prazo,
                    };
                }

                if (!endpoint) {
                    confirmacaoMensagem.textContent = 'Selecione uma categoria válida.';
                    confirmacaoMensagem.style.display = 'block';
                    return;
                }

                if (editState && endpoint !== editState.endpoint) {
                    confirmacaoMensagem.textContent = 'Para mudar o tipo de conteúdo, cancele a edição primeiro.';
                    confirmacaoMensagem.style.display = 'block';
                    return;
                }

                // Enviando para JSON Server
                try {
                    const metodo = editState ? 'PUT' : 'POST';
                    const urlFinal = editState
                        ? `${API_BASE}/${endpoint}/${editState.id}`
                        : `${API_BASE}/${endpoint}`;

                    const payload = editState
                        ? { id: editState.id, ...novaEntrada }
                        : novaEntrada;

                    const response = await fetch(urlFinal, {
                        method: metodo,
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload)
                    });
                    
                    if (response.ok) {
                        // Exibir mensagem de confirmação
                        confirmacaoMensagem.textContent = editState
                            ? `${tipo} atualizada com sucesso!`
                            : `${tipo} cadastrada com sucesso!`;
                        confirmacaoMensagem.style.display = 'block';
                        
                        // Após 3 segundos, limpar formulário e resetar a visibilidade
                        setTimeout(() => {
                            limparFormulario();
                            confirmacaoMensagem.style.display = 'none';
                        }, 3000);

                        limparModoEdicao();
                        await carregarConteudo();
                    } else {
                        throw new Error('Erro ao salvar');
                    }
                } catch (error) {
                    confirmacaoMensagem.textContent = `Erro ao salvar. Verifique se o servidor está rodando.`;
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

    if (btnCancelarEdicao) {
        btnCancelarEdicao.addEventListener('click', () => {
            limparModoEdicao();
            limparFormulario();
        });
    }

    if (adminFilter) {
        adminFilter.addEventListener('change', renderizarListaAdmin);
    }

    if (adminList) {
        adminList.addEventListener('click', async (event) => {
            const botao = event.target.closest('button');
            if (!botao) return;

            const itemEl = event.target.closest('.admin-item');
            if (!itemEl) return;

            const id = itemEl.dataset.id;
            const endpoint = itemEl.dataset.endpoint;
            const acao = botao.dataset.action;

            const item = itensCache.find(
                registro => String(registro.id) === String(id) && registro.__endpoint === endpoint
            );

            if (!item) return;

            if (acao === 'editar') {
                ativarModoEdicao(item);
                return;
            }

            if (acao === 'excluir') {
                const confirmar = window.confirm('Tem certeza que deseja excluir este conteúdo?');
                if (!confirmar) return;

                try {
                    const response = await fetch(`${API_BASE}/${endpoint}/${id}`, {
                        method: 'DELETE'
                    });

                    if (!response.ok) {
                        throw new Error('Erro ao excluir');
                    }

                    confirmacaoMensagem.textContent = 'Conteúdo excluído com sucesso!';
                    confirmacaoMensagem.style.display = 'block';
                    limparModoEdicao();
                    await carregarConteudo();
                } catch (error) {
                    confirmacaoMensagem.textContent = 'Erro ao excluir. Verifique o servidor.';
                    confirmacaoMensagem.style.display = 'block';
                    console.error('Erro:', error);
                }
            }
        });
    }

    carregarConteudo();
});