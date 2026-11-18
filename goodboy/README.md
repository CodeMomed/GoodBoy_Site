# Goodboy — Base Vol.1

Site estático (HTML, CSS e JavaScript puros, sem build) da marca Goodboy: banner animado com modelos, catálogo com filtro de preço, carrinho e pedido por WhatsApp (M-Pesa, e-Mola ou conta bancária).

## Estrutura
```
index.html          página
css/style.css       estilos
js/data.js          CONFIGURAÇÃO e catálogo (preços, nomes, WhatsApp, fotos)
js/app.js           banner, filtro, carrinho e mensagem do WhatsApp
assets/img/models   fotos de modelos (banner; a cor de fundo de cada foto está em js/data.js)
assets/img/products fotos só do produto, todas sobre o mesmo cinzento (catálogo)
assets/img/logo.png logotipo
```

## Editar
Tudo o que muda com frequência está em `js/data.js`: número de WhatsApp, preços (atualmente fictícios), peças e fotos. Para adicionar uma peça, copia a foto para `assets/img/products/` e acrescenta um bloco em `products`.

## Testar localmente
Abre `index.html` no navegador, ou corre `python3 -m http.server` na pasta do projeto.

## Publicar no GitHub Pages
1. Cria um repositório no GitHub e envia estes ficheiros (`git init`, `git add .`, `git commit`, `git push`).
2. No repositório: **Settings → Pages → Source: GitHub Actions**.
3. Cada `push` para a branch `main` publica o site (workflow em `.github/workflows/pages.yml`).

Quando tiveres domínio próprio, põe-no em `site` no `js/data.js`, para os links das peças na mensagem do WhatsApp apontarem para ele.
