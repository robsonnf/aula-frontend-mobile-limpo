# Auditoria do build e da Aula 7

Data: 02/09/2026

## Resultado

A Aula 7, o build completo A1–A7 e o build isolado da A7 foram aprovados.

## Separação aluno/professor

### Aluno

- `LEIA-ME.txt` presente;
- nenhuma nota `.nota`;
- nenhum `data-so-professor`;
- nenhuma solução `data-papel="solucao"`;
- nenhum `data-correta`, `data-real` ou `data-explica`;
- nenhum `AVALIACAO.md`.

### Professor

- seis blocos de roteiro que totalizam 180 minutos;
- duas soluções de exercícios;
- dois quizzes com resposta e explicação;
- auditoria com três problemas reais, três decoys e justificativas;
- banco de avaliação da A7 e `LEIA-ME.txt`.

## Revisão técnica

- Flexbox é apresentado como modelo unidimensional para linha ou coluna.
- Apenas filhos diretos do contêiner são itens flex.
- Eixos principal e transversal são usados no lugar de atalhos fixos horizontal/vertical.
- `justify-content`, `align-items`, `align-content` e `gap` têm responsabilidades distintas.
- `flex-basis` é o tamanho principal inicial antes da distribuição de espaço.
- `flex-grow` distribui espaço positivo e `flex-shrink` participa da retirada de espaço negativo.
- `flex: auto` e `flex: 1` não são tratados como equivalentes.
- O mínimo automático baseado em conteúdo e o uso criterioso de `min-inline-size: 0` são explicitados.
- Wrapping é dirigido pelo conteúdo, sem inventar breakpoint de aparelho.
- `order` e direções reversas não são usados para corrigir ordem lógica do HTML.

## Exercícios do professor

### Exercício 1 — navegação e wrapping

Erros iniciais: `nowrap` força uma única linha e itens de 14rem criam overflow. A
solução usa `flex-wrap: wrap`, `gap` e `flex: 1 1 10rem`, preservando o HTML e permitindo
que o conteúdo determine a quebra.

### Exercício 2 — mínimo automático e mídia

Erros iniciais: o avatar pode encolher e o item textual conserva mínimo intrínseco
diante de uma URL longa. A solução fixa a base do avatar com `flex: 0 0 4rem`, libera
o conteúdo com `min-inline-size: 0` e fornece ponto de quebra com `overflow-wrap: anywhere`.

As duas respostas são CSS, correspondem a `data-edita="css"` e devem aparecer somente
no pacote do professor.

## Auditoria de CSS

Problemas reais:

1. `row-reverse` separa ordem visual de ordem lógica e de foco;
2. input rígido de 34rem impede a busca de encolher;
3. item de conta com `flex: 0 0 18rem` força overflow móvel.

Decoys corretos:

1. intervalo por `gap`;
2. alinhamento transversal por `align-items: center`;
3. margem automática no eixo inline.

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

- MDN: CSS flexible box layout;
- MDN: controlling flex item ratios;
- MDN: ordering flex items;
- W3C: CSS Flexible Box Layout Module Level 1.

## Pacotes

- `dist/professor.zip`: A1–A7 com respostas;
- `dist/aluno.zip`: A1–A7 sem respostas;
- `dist/professor-0007-flexbox.zip`;
- `dist/aluno-0007-flexbox.zip`.

## Validações executadas

- sintaxe dos scripts compartilhados;
- build completo A1–A7 e build isolado A7;
- busca dos marcadores do P10 em todos os HTMLs do aluno;
- presença de respostas no professor;
- contagem de notas, soluções, quizzes, problemas e decoys.

Os pacotes completo e isolado do aluno retornaram zero ocorrências para todos os sete
marcadores de vazamento. O pacote isolado do professor retornou seis notas, duas
soluções, dois quizzes, três problemas reais e três decoys. A validação cobriu conteúdo,
estrutura, sintaxe, empacotamento e isolamento; não incluiu automação visual em navegador real.
