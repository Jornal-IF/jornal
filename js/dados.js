// criando arrays de objetos para as notícias, vagas de estágio e editais.
// por enquanto estático, futuramente será dinâmico.
export const noticias =  JSON.parse(localStorage.getItem('noticia')) || [] 


export const vagasEstagio =  JSON.parse(localStorage.getItem('vagas')) || [] 


 export const editais =  JSON.parse(localStorage.getItem('projetos')) || [] 