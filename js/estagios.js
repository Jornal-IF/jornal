// renderização dinâmica das vagas de estágio filtradas
function renderizarVagasEstagio(vagas){
    document.getElementById("vagas-list").innerHTML = "";
    for (const vaga of vagas){
        let html = `<article class="vaga-card">
                        <div class="vaga-header">
                            <h3 class="vaga-title">${vaga.titulo}</h3>
                            <span class="vaga-badge">${vaga.curso}</span>
                        </div>
                        <div class="vaga-info">
                            <div class="info-item">
                                <strong>Empresa:</strong> ${vaga.empresa}
                            </div>
                            <div class="info-item">
                                <strong>Salário:</strong> ${vaga.salário}
                            </div>
                            <div class="info-item">
                                <strong>Local:</strong> ${vaga.cidade}
                            </div>
                        </div>
                        <p class="vaga-description">
                            ${vaga.descrição}
                        </p>
                        <div class="vaga-footer">
                            <span class="vaga-date">Publicado em: ${vaga.data}</span>
                            <button class="btn-apply">Candidatar-se</button>
                        </div>
                </article>`;
        
        document.getElementById("vagas-list").innerHTML += html;
    }
}

// filtragem das vagas
function filtrarVagas(){
    const filtro_curso = document.getElementById('curso').value;
    const filtro_cidade = document.getElementById('cidade').value;

    const vagas_filtradas = vagasEstagio.filter(vaga => (filtro_curso === vaga.curso_tag || filtro_curso == "") && (filtro_cidade === vaga.cidade || filtro_cidade === "")); 
    if (vagas_filtradas.length == 0){
        document.getElementById("vagas-list").innerHTML = `<p>Nenhuma Vaga Disponível no Momento!</p>`;
        return;
    }
    renderizarVagasEstagio(vagas_filtradas);
}

filtrarVagas();