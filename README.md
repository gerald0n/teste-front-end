# Teste Econverse – Desenvolvedor Front-End

Página de e-commerce construída a partir do layout **Teste-Front-End-Jr** do Figma, com vitrine de produtos alimentada pelo JSON oficial do teste e modal com os detalhes do produto clicado.

## Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) para desenvolvimento e build
- [Sass (SCSS)](https://sass-lang.com/) como pré-processador, com variáveis e mixins compartilhados
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) para os testes
- Nenhuma biblioteca de UI: todos os componentes, ícones (SVG) e estilos foram feitos à mão

## Pré-requisitos

- Node.js 20.19 ou superior
- npm 10 ou superior

## Como rodar

```bash
# 1. Instalar as dependências
npm install

# 2. Ambiente de desenvolvimento (http://localhost:5173)
npm run dev
```

## Scripts

| Comando           | O que faz                                                    |
| ----------------- | ------------------------------------------------------------ |
| `npm run dev`     | Sobe o servidor de desenvolvimento com hot reload            |
| `npm run build`   | Checa os tipos com o TypeScript e gera o build em `dist/`    |
| `npm run preview` | Serve o build de produção localmente (http://localhost:4173) |
| `npm test`        | Roda os testes uma vez                                       |
| `npm run test:watch` | Roda os testes em modo observação                         |
| `npm run lint`    | Analisa o código com o oxlint                                |

## Estrutura

```
src/
├── components/        # Um diretório por componente (TSX + SCSS)
│   ├── Header/        # Barra de benefícios, busca, atalhos e menu
│   ├── Hero/          # Banner principal
│   ├── Categories/    # Departamentos
│   ├── ProductShowcase/ # Título, abas, estados de carregamento/erro
│   ├── ProductCarousel/ # Carrossel com scroll-snap e setas
│   ├── ProductCard/   # Card do produto
│   ├── ProductModal/  # Modal com detalhes e quantidade
│   ├── Partners/      # Banners de parceiros
│   ├── Brands/        # Navegue por marcas
│   ├── Newsletter/    # Formulário com validação
│   ├── Footer/
│   ├── Icon/          # Ícones SVG inline
│   └── Logo/
├── hooks/useProducts.ts   # Estado de carregamento dos produtos
├── services/products.ts   # Chamada à API e validação da resposta
├── types/product.ts
├── utils/formatPrice.ts   # Formatação de moeda e parcelas
└── styles/                # Variáveis, mixins e estilos globais
```

## Decisões técnicas

### Consumo da API

O endpoint oficial (`https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json`) não envia cabeçalhos CORS, então o navegador bloqueia uma chamada direta. Para resolver isso:

- Em `npm run dev` e `npm run preview`, o Vite faz **proxy** de `/api/produtos` para o endpoint oficial (`vite.config.ts`). Os dados exibidos vêm da API real.
- Na Vercel, o `vercel.json` faz o mesmo redirecionamento de `/api/produtos`, então a versão publicada também usa a API real.
- Se nenhum proxy estiver disponível, por exemplo ao hospedar o `dist/` em outro servidor estático, a aplicação usa uma cópia do mesmo JSON em `public/produtos.json`.

A resposta é validada antes de ser usada, e a vitrine trata os estados de **carregamento** (skeleton), **erro** (com botão "Tentar novamente") e **lista vazia**.

### Preços

O campo `price` vem em **centavos** (`149990` → `R$ 1.499,90`, valor que bate com o modal do layout). A formatação usa `Intl.NumberFormat` em `pt-BR`. O JSON não traz preço "de" nem parcelamento, então o card mostra o preço atual e o parcelamento em 2x calculado a partir dele, sem inventar um desconto.

### Modal do produto

- Abre ao clicar na imagem ou no botão "Comprar" de qualquer card e mostra os dados do produto clicado.
- Fecha com o botão **X**, a tecla **Esc** ou um clique fora da caixa.
- Ao abrir, o foco vai para o botão de fechar e fica preso dentro do modal (Tab e Shift+Tab). Ao fechar, volta para o elemento que o abriu, e o scroll da página fica travado enquanto ele está aberto.
- Seletor de quantidade com limites mínimo e máximo.

### Componentização e estilos

- Cada componente tem seu próprio arquivo `.scss` com nomenclatura **BEM**.
- Cores, tipografia, espaçamentos e breakpoints ficam centralizados em `styles/_variables.scss`, e padrões repetidos em `styles/_mixins.scss` (container, foco acessível, títulos de seção, media queries).
- A vitrine é o mesmo componente reutilizado nas três seções do layout, com a variação de abas ou do link "Ver todos" controlada por props.
- O layout é responsivo (mobile first): os carrosséis e listas viram rolagem horizontal com `scroll-snap` em telas menores.

### SEO e HTML semântico

- `lang="pt-BR"`, `title`, `meta description`, `theme-color` e tags Open Graph no `index.html`.
- Estrutura com `header`, `nav`, `main`, `section`, `article`, `figure`, `form` e `footer`, com uma hierarquia única de títulos (`h1` no banner, `h2` nas seções e `h3` nos produtos).
- Imagens com `width`/`height` definidos e `loading="lazy"` nas vitrines, para evitar mudança de layout e economizar banda.
- Acessibilidade: link "Pular para o conteúdo", `aria-label` nos botões só com ícone, abas com navegação por setas (padrão WAI-ARIA *tabs*), `aria-modal` no modal, rótulos em todos os campos e respeito a `prefers-reduced-motion`.

## Testes

```bash
npm test
```

Os testes cobrem a formatação de preços, a renderização dos produtos vindos da API, a abertura e o fechamento do modal (incluindo foco e tecla Esc), o controle de quantidade e o fluxo de erro com nova tentativa.

## Imagens

As fotos do banner principal e dos banners de parceiros foram exportadas do Figma e redimensionadas para a web (`src/assets`, JPEG de 1600 px e 1000 px de largura). As fotos dos produtos vêm do próprio JSON da API.
