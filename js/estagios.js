import { vagasEstagio } from "./dados.js";

// renderização dinâmica das vagas de estágio filtradas
function renderizarVagasEstagio(vagas){
    document.getElementById("vagas-list").innerHTML = "";
    let conteudoHTML = "";

    for (const vaga of vagas){
        conteudoHTML += `<article class="vaga-card">
                        <div class="vaga-header">
                            <h3 class="vaga-title">${vaga.titulo}</h3>
                            <span class="vaga-badge">${vaga.curso}</span>
                        </div>
                        <div class="vaga-info">
                            <div class="info-item">
                                <strong>Empresa:</strong> ${vaga.empresa}
                            </div>
                            <div class="info-item">
                                <strong>Salário:</strong> ${vaga.salario}
                            </div>
                            <div class="info-item">
                                <strong>Local:</strong> ${vaga.cidade}
                            </div>
                        </div>
                        <p class="vaga-description">
                            ${vaga.descricao}
                        </p>
                        <div class="vaga-footer">
                            <span class="vaga-date">Publicado em: ${vaga.data}</span>
                            <button class="btn-apply">Candidatar-se</button>
                        </div>
                </article>`;
    }

    document.getElementById("vagas-list").innerHTML = conteudoHTML;
}

// filtragem das vagas
function filtrarVagas(){
    const curso = document.getElementById('curso').value;
    const cidade = document.getElementById('cidade').value;
    const termo_digitado = document.getElementById('buscador-vagas').value.toLowerCase();

    const vagas_filtradas = vagasEstagio.filter(vaga => {
        const filtro_curso = !curso || curso === vaga.curso;
        const filtro_cidade = !cidade || cidade === vaga.cidade;  
        const filtro_termo = !termo_digitado || vaga.titulo.toLowerCase().includes(termo_digitado);

        return filtro_curso && filtro_cidade && filtro_termo;
    });

    if (vagas_filtradas.length == 0){
        document.getElementById("vagas-list").innerHTML = `<p>Nenhuma Vaga Disponível no Momento!</p>`;
        return;
    }

    renderizarVagasEstagio(vagas_filtradas);
}

filtrarVagas();

// adicionando os eventlistener's
document.getElementById('buscador-vagas').addEventListener('input', filtrarVagas);
document.getElementById('curso').addEventListener('change', filtrarVagas);
document.getElementById('cidade').addEventListener('change', filtrarVagas);