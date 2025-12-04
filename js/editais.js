function renderizarEditais(editais){
    document.getElementById("editais-list").innerHTML = "";
    for (const edital of editais){
        let html = `<article class="edital-card">
                    <div class="edital-header">
                        <h4 class="edital-title">${edital.titulo}</h4>
                        <span class="edital-badge pesquisa">Tipo de projeto</span>
                    </div>
                    <div class="edital-info">
                        <div class="info-item">
                            <strong>Curso:</strong> Curso relacionado
                        </div>
                        <div class="info-item">
                            <strong>Bolsa:</strong> Valor da Bolsa
                        </div>
                        <div class="info-item">
                            <strong>Prazo:</strong> Data de encerramento
                        </div>
                    </div>
                    <p class="edital-description">
                        Descrição do projeto
                    </p>
                    <div class="edital-footer">
                        <span class="edital-number">data de publicação</span>
                        <button class="btn-apply">Inscrever-se</button>
                    </div>
                </article>`
        
        document.getElementById("editais-list").innerHTML += html;
    }
}

renderizarEditais(editais);