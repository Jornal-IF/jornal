// renderizando as notícias na página inicial
function renderizandoNotícias() {
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
    for (const vaga of vagasEstagio.slice(0, 3)){
        let html = `<div class="sidebar-item">
                        <h4>${vaga.titulo}</h4>
                        <p class="item-meta">${vaga.curso}</p>
                    </div>`;
        document.getElementById("list-vagas-estagio").innerHTML += html;
    }
}

function renderizandoProjetosPaginaPrincipal(){
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