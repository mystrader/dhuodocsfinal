# O que é esse tal de VUEPRESS ?

## Vuepress: Surgimento

O Vuepress é uma ferramenta que tem como objetivo gerar sites estáticos e focados em conteúdo. Além disso, outra premissa importantíssima do Vuepress é fazer isso tudo da maneira mais simples e rápida possível.

Esta ferramenta foi criada por Evan You (criador do Vue.js) para documentação de seus projetos. Durante seu trabalho ele não encontrou uma ferramenta que combinasse:

## Sites estáticos (Prerender)

- Linguagem Markdown
- Amigável para SEO
- Temas e plugins para customização
- Funcionar com Vue.js

::: warning
O Evan You fez um comparativo entre várias ferramentas e explicou o motivo de ter criado o Vuepress, clique aqui para conferir.
:::




```
.
├── docs
│   ├── .vuepress (Optional)
│   │   ├── components (Optional)
│   │   ├── theme (Optional)
│   │   │   └── Layout.vue
│   │   ├── public (Optional)
│   │   ├── styles (Optional)
│   │   │   ├── index.styl
│   │   │   └── palette.styl
│   │   ├── templates (Optional, Danger Zone)
│   │   │   ├── dev.html
│   │   │   └── ssr.html
│   │   ├── config.js (Optional)
│   │   └── enhanceApp.js (Optional)
│   │ 
│   ├── README.md
│   ├── guide
│   │   └── README.md
│   └── config.md
│ 
└── package.json
```