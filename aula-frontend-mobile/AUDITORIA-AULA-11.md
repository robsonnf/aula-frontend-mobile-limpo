# Auditoria do build e da Aula 11

Data: 04/09/2026

## Resultado

A Aula 11, o build completo A1–A11 e o build isolado da A11 foram aprovados.

## Separação dos módulos

Aluno:

- LEIA-ME.txt presente;
- nenhuma nota, dado só-professor, solução ou gabarito;
- nenhum AVALIACAO.md.

Professor:

- seis blocos de roteiro, totalizando 180 minutos;
- duas soluções, dois quizzes e auditoria 3×3;
- banco de avaliação, justificativas e LEIA-ME.txt.

## Revisão técnica

- breakpoint deriva do conteúdo, não de modelo de aparelho;
- width consulta viewport ou caixa de página;
- base mobile-first funciona antes das condições;
- regras condicionais continuam submetidas à cascata;
- min-width e max-width são inclusivos;
- sintaxe de faixa explicita fronteiras inclusivas e exclusivas;
- orientation não é sinônimo de desktop;
- hover e pointer descrevem capacidades do apontador;
- impressão e preferências do usuário são casos válidos de media queries;
- consulta não correspondente não garante que uma folha externa deixe de baixar.

## Exercícios

Exercício 1 — erro inicial: layout nasce em duas colunas e é desfeito por max-width.
Solução do professor: base de uma coluna e melhoria em 48rem com segunda trilha flexível.

Exercício 2 — erro inicial: faixas fechadas se sobrepõem em 40rem e 64rem.
Solução do professor: base de uma coluna e camadas cumulativas em 40rem e 64rem.

As soluções editam CSS e devem existir somente no professor.

## Auditoria CSS

Problemas reais:

1. landscape usado como sinônimo de desktop;
2. instrução essencial disponível somente em hover;
3. ARIA usado para tentar compensar conteúdo com display none.

Decoys:

1. menu com wrapping e gap;
2. melhoria cumulativa em min-width;
3. consultas de impressão e movimento reduzido.

## Tempo

- retomada: 15 min;
- exposição 1: 40 min;
- prática 1: 30 min;
- intervalo: 15 min;
- exposição 2 e auditoria: 35 min;
- prática 2/projeto: 40 min;
- fechamento: 5 min;
- total: 180 min.

## Pacotes

- dist/professor.zip: A1–A11 com respostas;
- dist/aluno.zip: A1–A11 sem respostas;
- dist/professor-0011-media-queries-e-estrategia-de-breakpoints.zip;
- dist/aluno-0011-media-queries-e-estrategia-de-breakpoints.zip.

## Validações executadas

- sintaxe dos scripts;
- build A1–A11 e A11 isolada;
- teste funcional no Chrome dos módulos professor e aluno;
- P10 em todos os HTMLs do aluno;
- contagem de notas, soluções, quizzes, problemas e decoys.

Os builds completo e isolado do aluno retornaram zero ocorrências para todos os
marcadores do P10. O professor retornou seis notas, duas soluções, dois quizzes, três
problemas reais e três decoys.

A suíte funcional em Chrome, viewport 390 × 844, percorreu 22 páginas, 88 ateliers,
64 componentes editáveis, 42 quizzes e 22 auditorias dos módulos professor e aluno.
Edição, prévia, reinício, expansão, soluções e seleções terminaram com zero falhas.
