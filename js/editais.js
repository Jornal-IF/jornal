function renderizarEditais(editais){
    document.getElementById("editais-list").innerHTML = "";
    let conteudoHTML = "";

    for (const edital of editais){
        conteudoHTML += `<article class="edital-card">
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
    }

    document.getElementById("editais-list").innerHTML = conteudoHTML;
}

function filtrarEditais(){
    const tipo = document.getElementById('tipo').value;
    const curso = document.getElementById('curso').value;
    const termo_digitado = document.getElementById('buscador-editais').value.toLowerCase();

    const editais_filtrados = editais.filter(edital => {
        const filtro_tipo = tipo === "" || tipo === edital.tipo_projeto;
        const filtro_curso = curso === "" || edital.curso_tag.includes(curso);
        const filtro_termo = termo_digitado === "" || edital.titulo.toLowerCase().includes(termo_digitado);

        return filtro_curso && filtro_tipo && filtro_termo;
    })

    if (editais_filtrados.length == 0){
        document.getElementById('editais-list').innerHTML = `<p>Nenhum edital/projeto encontrado!</p>`;
        return;
    }

    renderizarEditais(editais_filtrados);
}

filtrarEditais();

document.getElementById('buscador-editais').addEventListener('input', filtrarEditais);
document.getElementById('tipo').addEventListener('change', filtrarEditais);
document.getElementById('curso').addEventListener('change', filtrarEditais);