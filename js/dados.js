// criando arrays de objetos para as notícias, vagas de estágio e editais.

async function APINoticias() {
    let data = await fetch('http://localhost:3003/noticias');
    let noticiasAPI = await data.json();
    return noticiasAPI;
}
export const noticias = await APINoticias();


async function APIVagas() {
    let data = await fetch('http://localhost:3003/vagas');
    let vagasAPI = await data.json();
    return vagasAPI;
}
export const vagasEstagio = await APIVagas();

async function APIProjetos() {
    let data = await fetch('http://localhost:3003/projetos');
    let projetosAPI = await data.json();
    return projetosAPI;
}
export const editais = await APIProjetos();