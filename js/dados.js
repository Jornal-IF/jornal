// criando arrays de objetos para as notícias, vagas de estágio e editais.
// por enquanto estático, futuramente será dinâmico.
const noticias = [
    {
        id: 1,
        categoria: 'Eventos',
        titulo: 'Semana de Ciência e Tecnologia do IFPB',
        data: '2025-11-29',
        descrição: 'A Semana de Ciência e Tecnologia do IFPB é um evento anual que visa promover a divulgação científica e tecnológica entre os estudantes e a comunidade em geral. Durante essa semana, são realizadas palestras, workshops, exposições e atividades interativas que abordam temas relevantes nas áreas de ciência, tecnologia, engenharia e inovação.',
        curtidas: 0,
    },
    {
        id: 2,
        titulo: 'Novas Bolsas de pesquisa abertas',
        categoria: 'Oportunidades',
        descrição: 'O IFPB está com novas bolsas de pesquisa abertas para estudantes interessados em desenvolver projetos inovadores nas áreas de ciência e tecnologia. As bolsas oferecem suporte financeiro e orientação acadêmica para que os alunos possam explorar suas ideias e contribuir para o avanço do conhecimento.',
        data: '2025-10-18',
        curtidas: 0,
    }
]


const vagasEstagio = [
    {
        id: 1,
        titulo: 'Estágio em Desenvolvimento Web',
        empresa: 'Netline',
        cidade: 'Cajazeiras',
        curso: 'Análise e Desenvolvimento de Sistemas',
        curso_tag: 'ADS',
        salário: 'R$ 1.000,00',
        descrição: 'Vaga para estagiário em desenvolvimento web, com foco em front-end e back-end. O candidato ideal deve ter conhecimentos em HTML, CSS, JavaScript e frameworks modernos.',
        data: "2025-10-15",
    },
    {
        id: 2,
        titulo: 'Estágio em Engenharia Civil',
        empresa: 'Construtora Alfa',
        cidade: 'Sousa',
        curso: 'Engenharia Civil',
        curso_tag: 'CIVIL',
        salário: 'R$ 1.000,00',
        descrição: 'Vaga para estagiário em engenharia civil, com foco em projetos e obras. O candidato ideal deve ter conhecimentos em AutoCAD, planejamento e execução de obras.',
        data: "2025-10-15",
    },
    {
        id: 3,
        titulo: 'Estágio em Engenharia de Controle e Automação',
        empresa: 'Isis',
        cidade: 'Sousa',
        curso: 'Engenharia de Controle e Automação',
        curso_tag: 'BECA',
        salário: 'R$ 1.000,00',
        descrição: 'Vaga para estagiário em engenharia de controle e automação, com foco em sistemas automatizados e controle de processos. O candidato ideal deve ter conhecimentos em programação, eletrônica e sistemas de controle.',
        data: "2025-10-15",
    }
]


const editais = [
    {
        id: 1,
        titulo: 'Edital de Seleção para Bolsas de Iniciação Científica 2025',
        tipo_projeto: 'Pesquisa',
        cursos: ['Análise e Desenvolvimento de Sistemas', 'Técnico em Informática'],
        curso_tag: ['ADS', 'INTIN'],
        bolsa: 'R$ 700,00',
        prazo: '2025-10-25',
        descrição: 'O Instituto Federal da Paraíba (IFPB) torna público o edital de seleção para bolsas de Iniciação Científica destinadas a estudantes dos cursos de Análise e Desenvolvimento de Sistemas e Técnico em Informática. As bolsas visam incentivar a participação dos alunos em projetos de pesquisa, promovendo o desenvolvimento acadêmico e científico.',
        data_publicação: '2025-09-30',
    },
    {
        id: 2,
        titulo: 'Edital de Seleção para discentes - Projetos de Extensão 2025',
        tipo_projeto: 'Extensão',
        cursos: ['Engenharia de Controle e Automação', 'Engenharia Civil'],
        curso_tag: ['BECA', 'CIVIL'],
        bolsa: 'R$ 700,00',
        prazo: '2025-10-25',
        descrição: 'O Instituto Federal da Paraíba (IFPB) torna público o edital de seleção para bolsistas destinados a estudantes dos cursos de Engenharia de Controle e Automação e Engenharia Civil. As bolsas visam incentivar a participação dos alunos em projetos de extensão, promovendo o desenvolvimento acadêmico e social.',
        data_publicação: '2025-09-30',
    },
    {
        id: 3,
        titulo: 'Edital de Seleção para bolsistas - Projetos de Inovação 2025',
        tipo_projeto: 'Inovação',
        cursos: ['Análise e Desenvolvimento de Sistemas', 'Engenharia de Controle e Automação'],
        curso_tag: ['ADS', 'BECA'],
        bolsa: 'R$ 700,00',
        prazo: '2025-10-25',
        descrição: 'O Instituto Federal da Paraíba (IFPB) torna público o edital de seleção para bolsistas destinados a estudantes dos cursos de Análise e Desenvolvimento de Sistemas e Engenharia de Controle e Automação. As bolsas visam incentivar a participação dos alunos em projetos de inovação, promovendo o desenvolvimento acadêmico e tecnológico.',
        data_publicação: '2025-09-30',
    }
]

