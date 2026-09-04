# Auditoria do build e da Aula 9

Data: 03/09/2026

## Resultado

A Aula 9, o build completo A1–A9 e o build isolado da A9 foram aprovados.

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
- banco de avaliação da A9 e `LEIA-ME.txt`.

## Revisão técnica

- Formatos hex, `rgb()`, `hsl()` e `oklch()` não são confundidos com qualidade da cor.
- Contraste é avaliado no par real; os limites AA de texto comum e grande são distinguidos.
- Cor pode reforçar um estado, mas não é sua única pista visual.
- Tokens são nomeados por papel, sem alegar que variáveis garantem contraste.
- Gradientes são tratados como imagens CSS; fundo sólido é mantido como base.
- Stops, transparência e camadas são apresentados sem confundir gradiente com cor.
- `transform` atua depois do layout e não faz vizinhos recalcularem o fluxo.
- Ordem das funções é relevante e qualquer transform diferente de `none` cria stacking context.
- Overflow, containing block e redução visual de alvos são incluídos como consequências testáveis.

## Exercícios do professor

### Exercício 1 — cor e significado

Erros iniciais: texto `#aaa` sobre branco tem contraste insuficiente e o estado depende
de uma borda vermelha fina. A solução usa par escuro/claro, borda mais evidente e
sublinhado no rótulo textual que já permanece no HTML.

### Exercício 2 — transformação e fluxo

Erros iniciais: `scale(1.4)` invade cartões vizinhos e o botão deslocado por
`translateX()` deixa o espaço original reservado. A solução remove o deslocamento e
usa elevação pequena tanto em hover quanto em `:focus-within`.

As duas soluções são CSS, correspondem a `data-edita="css"` e devem aparecer somente
no pacote do professor.

## Auditoria de CSS

Problemas reais:

1. texto cinza-claro sobre branco com contraste insuficiente;
2. falha comunicada apenas pela cor vermelha;
3. botão essencial reduzido visualmente a 65% por `scale()`.

Decoys corretos:

1. cor-base antes do gradiente;
2. borda que reutiliza `currentColor`;
3. rotação pequena de caixa explicitamente decorativa.

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

- MDN: `<color>`, gradientes e `transform`;
- W3C: CSS Transforms Module Level 1;
- W3C WAI: uso de cor e contraste mínimo.

## Pacotes

- `dist/professor.zip`: A1–A9 com respostas;
- `dist/aluno.zip`: A1–A9 sem respostas;
- `dist/professor-0009-cor-gradientes-e-transform.zip`;
- `dist/aluno-0009-cor-gradientes-e-transform.zip`.

## Validações executadas

- sintaxe dos scripts compartilhados;
- build completo A1–A9 e build isolado A9;
- busca dos marcadores do P10 em todos os HTMLs do aluno;
- presença de respostas no professor;
- contagem de notas, soluções, quizzes, problemas e decoys.

Os pacotes completo e isolado do aluno retornaram zero ocorrências para todos os sete
marcadores de vazamento. O pacote isolado do professor retornou seis notas, duas
soluções, dois quizzes, três problemas reais e três decoys. A validação cobriu conteúdo,
estrutura, sintaxe, empacotamento e isolamento; não incluiu automação visual em navegador real.
