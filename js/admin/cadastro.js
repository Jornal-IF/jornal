document.addEventListener('DOMContentLoaded', () => {
    // Referências aos elementos principais
    const noticiaForm = document.getElementById('noticiaForm');
    const categoriaSelect = document.getElementById('categoria');
    const confirmacaoMensagem = document.getElementById('confirmacao-mensagem');
    const loginTrigger = document.getElementById('login-trigger');
    const loginModal = document.getElementById('login-modal');
    const loginClose = document.getElementById('login-close');
    const loginForm = document.getElementById('loginForm');
    const loginMensagem = document.getElementById('login-mensagem');
    const loginGreeting = document.getElementById('login-greeting');
    
    // Elementos de agrupamento que controlam a visibilidade no HTML
    const camposVaga = document.getElementById('campos-vaga');
    const camposEdital = document.getElementById('campos-edital');

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

    function limparErrosLogin() {
        const loginErros = ['erro-loginUsuario', 'erro-loginSenha'];
        loginErros.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.textContent = '';
            }
        });
    }

    function abrirModalLogin() {
        if (!loginModal) return;
        loginModal.classList.add('open');
        loginModal.setAttribute('aria-hidden', 'false');
    }

    function fecharModalLogin() {
        if (!loginModal) return;
        loginModal.classList.remove('open');
        loginModal.setAttribute('aria-hidden', 'true');
        if (loginForm) {
            loginForm.reset();
        }
        limparErrosLogin();
        if (loginMensagem) {
            loginMensagem.textContent = '';
        }
    }

    function registrarSessaoLogin(usuario) {
        try {
            sessionStorage.setItem('adminUsuario', usuario);
        } catch (err) {
            // Fallback: cookie de sessão válido até fechar o navegador
            document.cookie = `adminUsuario=${encodeURIComponent(usuario)}; path=/; SameSite=Lax`;
        }
        atualizarSaudacao(usuario);
    }

    function obterUsuarioPersistido() {
        const armazenado = sessionStorage.getItem('adminUsuario');
        if (armazenado) return armazenado;

        const cookie = document.cookie
            .split(';')
            .map(part => part.trim())
            .find(part => part.startsWith('adminUsuario='));
        if (cookie) {
            return decodeURIComponent(cookie.split('=')[1]);
        }
        return '';
    }

    function atualizarSaudacao(usuario) {
        if (!loginGreeting) return;
        loginGreeting.textContent = usuario ? `Olá, ${usuario}` : '';
    }

    function toggleCampos() {
        const categoria = categoriaSelect.value;
        
        // Esconde todos os grupos por padrão
        if (camposVaga) camposVaga.style.display = 'none';
        if (camposEdital) camposEdital.style.display = 'none';

        limparErros(); // Limpa mensagens de erro ao trocar de categoria

        // Mostra o grupo correto
        if (categoria === 'Vaga') {
            if (camposVaga) camposVaga.style.display = 'block';
        } else if (categoria === 'Edital') { 
            if (camposEdital) camposEdital.style.display = 'block'; 
        }
    }

    // Inicializa a visibilidade e adiciona o listener de mudança
    toggleCampos();
    if (categoriaSelect) {
        categoriaSelect.addEventListener('change', toggleCampos);
    }

    atualizarSaudacao(obterUsuarioPersistido());

    if (loginTrigger) {
        loginTrigger.addEventListener('click', event => {
            event.preventDefault();
            abrirModalLogin();
        });
    }

    if (loginClose) {
        loginClose.addEventListener('click', fecharModalLogin);
    }

    if (loginModal) {
        loginModal.addEventListener('click', event => {
            if (event.target === loginModal) {
                fecharModalLogin();
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', event => {
            event.preventDefault();
            limparErrosLogin();

            const usuario = document.getElementById('loginUsuario')?.value.trim() || '';
            const senha = document.getElementById('loginSenha')?.value.trim() || '';

            let valido = true;
            if (!usuario) {
                exibirErro('loginUsuario', 'Informe o usuário.');
                valido = false;
            }
            if (!senha) {
                exibirErro('loginSenha', 'Informe a senha.');
                valido = false;
            }

            if (valido && loginMensagem) {
                registrarSessaoLogin(usuario);
                loginMensagem.textContent = 'Login realizado com sucesso.';
            }
        });
    }


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
                exibirErro('curso', 'O curso/área é obrigatório.');
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
        noticiaForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o recarregamento da página

            confirmacaoMensagem.style.display = 'none';
            confirmacaoMensagem.textContent = '';

            const categoria = categoriaSelect.value;

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

                let targetArray;
                let tipo = '';

                // Define o array de destino e finaliza o objeto
                if (categoria === 'Notícia') {
                    targetArray = noticias;
                    tipo = 'Notícia';
                } else if (categoria === 'Vaga') {
                    targetArray = vagasEstagio;
                    tipo = 'Vaga de Estágio';
                    novaEntrada = {
                        ...novaEntrada,
                        empresa: dadosColetados.empresa,
                        cidade: dadosColetados.cidade,
                        curso: dadosColetados.curso,
                        salario: dadosColetados.salario,
                    };
                } else if (categoria === 'Edital') {
                    targetArray = editaisProjetos; // O array deve existir em dados.js
                    tipo = 'Edital de Projeto';
                    novaEntrada = {
                        ...novaEntrada,
                        tipoProjeto: dadosColetados.tipoProjeto,
                        cursos: dadosColetados.cursosEdital,
                        bolsa: dadosColetados.bolsa,
                        prazo: dadosColetados.prazo,
                    };
                }

                // Adiciona ao array global
                if (targetArray) {
                    targetArray.push(novaEntrada);
                }

                // Exibir mensagem de confirmação
                confirmacaoMensagem.textContent = `${tipo} cadastrada com sucesso! (Dados adicionados ao array)`;
                confirmacaoMensagem.style.display = 'block';
                
                // Limpar formulário e resetar a visibilidade
                noticiaForm.reset();
                toggleCampos(); 
            }
        });
    }
});