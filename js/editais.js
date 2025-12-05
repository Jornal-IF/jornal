function renderizarEditais(editais){
    document.getElementById("editais-list").innerHTML = "";
    for (const edital of editais){
        let html = `<article class="edital-card">
                    <div class="edital-header">
                        <h4 class="edital-title">${edital.titulo}</h4>
                        <span class="edital-badge pesquisa">${edital.tipo_projeto}</span>
                    </div>
                    <div class="edital-info">
                        <div class="info-item">
                            <strong>Curso:</strong> ${edital.cursos}
                        </div>
                        <div class="info-item">
                            <strong>Bolsa:</strong> ${edital.bolsa}
                        </div>
                        <div class="info-item">
                            <strong>Prazo:</strong> ${edital.prazo}
                        </div>
                    </div>
                    <p class="edital-description">
                        ${edital.descrição}
                    </p>
                    <div class="edital-footer">
                        <span class="edital-number">${edital.data_publicação}</span>
                        <button class="btn-apply">Inscrever-se</button>
                    </div>
                </article>`
        
        document.getElementById("editais-list").innerHTML += html;
    }
}

function filtrarEditais(){
    const filtro_tipo = document.getElementById('tipo').value;
    const filtro_curso = document.getElementById('curso').value;

    const editais_filtrados = editais.filter(edital => (filtro_curso === "" || edital.curso_tag.includes(filtro_curso)) && (filtro_tipo === "" || filtro_tipo === edital.tipo_projeto))

    if (editais_filtrados.length == 0){
        document.getElementById('editais-list').innerHTML = `<p>Nenhum edital/projeto encontrado!</p>`;
        return;
    }

    renderizarEditais(editais_filtrados);
}

filtrarEditais();