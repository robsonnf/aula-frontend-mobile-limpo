# Auditoria do build e da Aula 8

Data: 03/09/2026

## Resultado

A Aula 8, o build completo A1–A8 e o build isolado da A8 foram aprovados.

## Separação aluno/professor

### Aluno

- `LEIA-ME.txt` presente;
- nenhuma `.nota`, nenhum `data-so-professor` e nenhuma solução;
- nenhum `data-correta`, `data-real` ou `data-explica`;
- nenhum `AVALIACAO.md`.

### Professor

- seis blocos de roteiro que totalizam 180 minutos;
- duas soluções de exercícios;
- dois quizzes com resposta e explicação;
- auditoria com três problemas reais, três decoys e justificativas;
- banco de avaliação da A8 e `LEIA-ME.txt`.

## Revisão técnica

- Grid é apresentado como sistema bidimensional, sem tratar Flexbox como concorrente.
- Linhas, trilhas, células e áreas são distinguidas.
- Grades explícita e implícita, auto-placement e `grid-auto-*` são explicados.
- `fr` distribui espaço flexível disponível; não é descrito como fração bruta do contêiner.
- `minmax()`, `repeat()` e `auto-fit` são usados com mínimos orientados pelo conteúdo.
- O mínimo intrínseco de `1fr` e a alternativa `minmax(0, 1fr)` são demonstrados.
- Áreas nomeadas precisam formar retângulos.
- Alinhamento de itens é separado do alinhamento da grade inteira.
- Colocação visual não é apresentada como substituta da ordem lógica do HTML.

## Exercícios do professor

### Exercício 1 — repetição responsiva

Erro inicial: três colunas rígidas de 18rem transbordam em viewport estreito. A solução
usa `repeat(auto-fit, minmax(min(100%, 14rem), 1fr))` e `gap`, permitindo que quantidade
e largura das trilhas respondam ao contêiner.

### Exercício 2 — mínimo intrínseco

Erros iniciais: segunda trilha `1fr` conserva mínimo influenciado pelo conteúdo e
`white-space: nowrap` impede a URL de quebrar. A solução usa `minmax(0, 1fr)`, libera o
item, permite quebra e empilha a grade em viewport estreito.

As duas soluções são CSS, correspondem a `data-edita="css"` e devem existir somente
no pacote do professor.

## Auditoria de CSS

Problemas reais:

1. três colunas rígidas de 20rem;
2. áreas visuais em ordem contrária à sequência lógica numerada;
3. altura rígida com `overflow: hidden` em conteúdo variável.

Decoys corretos:

1. espaçamento por `gap`;
2. alinhamento dos itens no início;
3. mínimo inline zero num item que deve poder encolher.

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

- MDN: CSS Grid Layout e conceitos básicos;
- MDN: auto-placement e acessibilidade;
- W3C: CSS Grid Layout Module Level 2.

## Pacotes

- `dist/professor.zip`: A1–A8 com respostas;
- `dist/aluno.zip`: A1–A8 sem respostas;
- `dist/professor-0008-grid.zip`;
- `dist/aluno-0008-grid.zip`.

## Validações executadas

- sintaxe dos scripts compartilhados;
- build completo A1–A8 e build isolado A8;
- busca dos marcadores do P10 em todos os HTMLs do aluno;
- presença de respostas no professor;
- contagem de notas, soluções, quizzes, problemas e decoys.

Os pacotes completo e isolado do aluno retornaram zero ocorrências para todos os sete
marcadores de vazamento. O pacote isolado do professor retornou seis notas, duas
soluções, dois quizzes, três problemas reais e três decoys. A validação cobriu conteúdo,
estrutura, sintaxe, empacotamento e isolamento; não incluiu automação visual em navegador real.
