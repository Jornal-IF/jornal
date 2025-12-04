// renderizando as notícias na página inicial
function renderizandoNotícias() {
    //limpar o conteúdo interno do elemento HTML que possui o id="news-list"
    document.getElementById("news-list").innerHTML = '';
    for (const noticia of noticias){
        let html = `<article class="news-card">
                        <span class="news-category-badge">${noticia.categoria}</span>
                        <div class="news-header">
                            <h3 class="news-title">${noticia.titulo}</h3>
                            <time class="news-date" datetime="${noticia.data}">${noticia.data}</time>
                        </div>
                        <p class="news-summary">
                            ${noticia.descrição}
                        </p>
                        <div class="news-footer">
                            <span class="news-likes">
                                <span class="like-icon">♥</span> <span id="curtidas">${noticia.curtidas}</span> Curtidas
                            </span>
                        </div>
                    </article>`;
        document.getElementById("news-list").innerHTML += html;
    }
}

function renderizandoVagasEstagioPaginaPrincipal(){
    document.getElementById("list-vagas-estagio").innerHTML = '';
    for (const vaga of vagasEstagio.slice(0, 3)){
        let html = `<div class="sidebar-item">
                        <h4>${vaga.titulo}</h4>
                        <p class="item-meta">${vaga.curso}</p>
                    </div>`;
        document.getElementById("list-vagas-estagio").innerHTML += html;
    }
}

function renderizandoProjetosPaginaPrincipal(){
    document.getElementById("list-editais-projetos").innerHTML = '';
    for (const projeto of editais.slice(0, 3)){
        let html = `<div class="sidebar-item">
                        <h4>${projeto.titulo}</h4>
                        <p class="item-meta">${projeto.tipo_projeto} • Prazo: ${projeto.prazo}</p>
                    </div>`;
        document.getElementById("list-editais-projetos").innerHTML += html;
    }
}

renderizandoNotícias();
renderizandoVagasEstagioPaginaPrincipal();
renderizandoProjetosPaginaPrincipal();

document.addEventListener('DOMContentLoaded', () => {
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

    // Função para validar campos
    function validarFormulario(titulo, data, categoria, descricao) {
        let valido = true;

        limparErros();

        // 1. Validação de Título (mínimo 3 caracteres)
        if (titulo.length < 3) {
            exibirErro('titulo', 'O título deve ter no mínimo 3 caracteres.');
            valido = false;
        }

        // 2. Validação de Categoria
        if (categoria === "" || (categoria !== 'Notícia' && categoria !== 'Vaga')) {
            exibirErro('categoria', 'Selecione uma categoria válida (Notícia ou Vaga).');
            valido = false;
        }

        // 3. Validação de Data
        if (!data) {
            exibirErro('data', 'A data é obrigatória.');
            valido = false;
        } 

        // 4. Validação de Descrição (mínimo 10 caracteres)
        if (descricao.length < 10) {
            exibirErro('descricao', 'A descrição deve ter no mínimo 10 caracteres.');
            valido = false;
        }

        return valido;
    }

    // Evento de Submit
    if (noticiaForm) {
        noticiaForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita o recarregamento da página

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
                    descricao: descricao, // Corrigido para "descricao"
                    curtidas: 0,
                };

                let tipo = '';

                // Adiciona o item ao array correto e decide o que renderizar
                if (categoria === 'Notícia') {
                    // Assumindo que o array 'noticias' está disponível globalmente
                    noticias.push(novaEntrada); 
                    tipo = 'Notícia';
                    renderizandoNotícias(); // Re-renderiza a lista de notícias
                } else if (categoria === 'Vaga') {
                    // Assumindo que o array 'vagasEstagio' está disponível globalmente
                    // NOTA: Para vagas, você pode precisar de mais campos como 'curso'.
                    vagasEstagio.push(novaEntrada);
                    tipo = 'Vaga';
                    renderizandoVagasEstagioPaginaPrincipal(); // Re-renderiza a lista de vagas
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

