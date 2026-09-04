# Auditoria do build e da Aula 6

Data: 01/09/2026

## Resultado

A Aula 6, o build completo A1–A6 e o build isolado da A6 foram aprovados.

## Separação aluno/professor

### Aluno

- `LEIA-ME.txt` presente;
- nenhuma nota `.nota`;
- nenhum `data-so-professor`;
- nenhuma solução `data-papel="solucao"`;
- nenhuma resposta `data-correta`;
- nenhum `data-real` ou `data-explica`;
- nenhum `AVALIACAO.md`.

Os editores, quizzes e auditoria permanecem operáveis, sem resposta embutida.

### Professor

- seis blocos de roteiro que totalizam 180 minutos;
- duas soluções de exercícios;
- dois quizzes com resposta e explicação;
- auditoria com três problemas reais, três decoys e justificativas;
- banco de avaliação da A6 e `LEIA-ME.txt`.

## Revisão técnica

- `px` é tratado como unidade CSS de referência, não como píxel físico garantido.
- As relações absolutas (`1in = 96px`) não são apresentadas como régua física confiável em tela.
- Em `font-size`, `em` usa a fonte do pai; em outras propriedades usa a fonte do elemento.
- `rem` usa a fonte da raiz e evita composição tipográfica por aninhamento.
- `ch` é limite aproximado de linha, não contagem exata de caracteres.
- `%` é ensinado como dependente da propriedade, sem uma base universal inventada.
- `vh`, `svh`, `lvh` e `dvh` são distinguidos no contexto das barras móveis.
- `clamp()` combina mínimo, valor preferido e máximo; `vw` isolado não recebe selo de responsividade.
- Unidades absolutas ou relativas não são classificadas como boas ou ruins sem contexto.

## Exercícios do professor

### Exercício 1 — composição de `em`

Erro inicial: `font-size: 1.25em` é reaplicado em cartões aninhados e multiplica a
tipografia; o padding em pixels não acompanha a escala local. A solução usa
`1.125rem` para fonte comum e `1em` para padding do componente.

### Exercício 2 — viewport e limites

Erros iniciais: largura fixa de 900px, altura fixa de 100vh com corte, padding rígido,
título apenas em `vw` e parágrafo de 700px. A solução permite encolhimento, usa
`min-block-size` com fallback `100vh` seguido de `100dvh`, remove o corte e limita
padding, título e medida da linha.

As duas soluções são CSS, correspondem a `data-edita="css"` e existem somente no
pacote do professor.

## Auditoria de CSS

Problemas reais:

1. painel rígido de 720px;
2. `height: 100vh` com `overflow: hidden` em conteúdo textual;
3. título em `8vw` sem piso nem teto.

Decoys corretos:

1. borda de `1px`;
2. medida de leitura em `65ch`;
3. gap compartilhado de `1rem`.

## Tempo

- retomada: 15 min;
- exposição 1: 40 min;
- prática 1: 30 min;
- intervalo: 15 min;
- exposição 2 e auditoria: 35 min;
- prática 2/projeto: 40 min;
- fechamento: 5 min;
- total: 180 min.

## Fontes primárias

- MDN: CSS values and units;
- MDN: `<length>`;
- MDN: CSS numeric data types.

## Pacotes

- `dist/professor.zip`: A1–A6 com respostas;
- `dist/aluno.zip`: A1–A6 sem respostas;
- `dist/professor-0006-unidades-absolutas-e-relativas.zip`;
- `dist/aluno-0006-unidades-absolutas-e-relativas.zip`.

## Validações executadas

- sintaxe dos scripts compartilhados;
- build completo A1–A6 e build isolado A6;
- busca de marcadores de professor em todos os HTMLs do aluno;
- presença de respostas apenas no professor;
- contagem de notas, soluções, quizzes, problemas e decoys.

O pacote isolado do aluno retornou zero ocorrências para todos os sete marcadores de
vazamento. O pacote do professor retornou seis notas, duas soluções, dois quizzes,
três problemas reais e três decoys. A validação cobriu conteúdo, estrutura, sintaxe,
empacotamento e isolamento; não incluiu automação visual em navegador real.
