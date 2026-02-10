# 📰 Jornal IF

Portal de notícias do Instituto Federal da Paraíba (IFPB).

## 🚀 Como Rodar o Projeto

### 1. Instale o Node.js

Baixe e instale o Node.js: https://nodejs.org/

### 2. Clone o Projeto

```bash
git clone https://github.com/Jornal-IF/jornal.git
cd jornal
```

### 3. Instale as Dependências

```bash
npm install
```

### 4. Inicie o Servidor

```bash
npm run server
```

O servidor vai rodar em: `http://localhost:3000`

### 5. Abra o Site

**Opção A - VS Code (Recomendado):**
1. Instale a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. Clique com botão direito em `index.html`
3. Selecione "Open with Live Server"

**Opção B - Navegador:**
- Abra o arquivo `index.html` diretamente no navegador

## 📁 Estrutura do Projeto

```
jornal/
├── index.html       # Página principal
├── vagas.html       # Página de vagas
├── editais.html     # Página de editais
├── contato.html     # Página de contato
├── css/             # Estilos
├── js/              # Scripts
├── assets/          # Imagens
└── db.json          # Dados do site
```

## 🔧 Editando Conteúdo

Para adicionar ou editar notícias, vagas e editais, edite o arquivo `db.json`:

```json
{
  "noticias": [
    {
      "id": 1,
      "titulo": "Título da notícia",
      "data": "2025-02-10",
      "resumo": "Resumo curto...",
      "conteudo": "Texto completo...",
      "imagem": "assets/foto.jpg"
    }
  ]
}
```

## ❗ Problemas Comuns

**Erro de CORS:**
- Use o Live Server no VS Code em vez de abrir o arquivo diretamente

**Servidor não inicia:**
- Verifique se a porta 3000 está livre
- Rode `npm install` novamente

**Notícias não aparecem:**
- Confirme que o servidor está rodando (`npm run server`)
- Abra o console do navegador (F12) para ver erros

## 🎨 Tecnologias

- HTML5
- CSS3
- JavaScript
- JSON Server (API fake)

---

**Precisa de ajuda?** Abra uma [issue](https://github.com/Jornal-IF/jornal/issues)
