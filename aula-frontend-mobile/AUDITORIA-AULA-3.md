# Auditoria do build e da Aula 3

Data: 30/08/2026

## Resultado

A Aula 3 e os builds combinado (A1–A3) e isolado foram aprovados.

## Separação aluno/professor

### Aluno

- `LEIA-ME.txt` presente;
- nenhuma nota `.nota`;
- nenhum `data-so-professor`;
- nenhuma solução `data-papel="solucao"`;
- nenhum `data-correta`;
- nenhum `data-real` ou `data-explica`;
- nenhum `AVALIACAO.md`.

Os exercícios permanecem editáveis. Quizzes e achados podem ser selecionados para
discussão, mas a distribuição não revela respostas.

### Professor

- seis blocos de roteiro de fala;
- duas soluções de exercícios;
- duas respostas de quiz com explicação;
- auditoria com três problemas reais, dois decoys e justificativas;
- `AVALIACAO.md` com banco de perguntas e modificações ao vivo da A3;
- `LEIA-ME.txt` e todos os assets necessários.

## Revisão técnica

- Progressive enhancement é apresentado como piso essencial seguido por melhorias,
  em conformidade com a definição da MDN.
- A aula distingue feature detection de detecção por nome de navegador.
- `@supports` é tratado como teste de reconhecimento da sintaxe, não como prova de
  ausência de bugs ou adequação ao público.
- Baseline é explicado como sinal de interoperabilidade. “Widely available” usa a
  janela correta de pelo menos 30 meses e não é apresentado como suporte universal.
- O comportamento de recuperação de erros do CSS é usado corretamente: fallback
  reconhecido primeiro, declaração mais recente depois.
- Prefixos não são recomendados por hábito. Autoprefixer é descrito corretamente como
  gerador orientado por dados e navegadores-alvo, não como polyfill.
- A auditoria é de CSS e possui decoys genuínos: fallback literal antes de `var()` e
  Flex como piso antes de Grid são escolhas corretas.

## Exercícios do professor

### Exercício 1 — camadas

O erro inicial é `display:none` fora da feature query: sem Grid, o conteúdo desaparece.
A solução fornece Flex como piso e usa Grid somente dentro de `@supports`. A remoção
integral da feature query conserva conteúdo, ordem e legibilidade.

### Exercício 2 — fallback pela cascata

O erro inicial é depender somente de `color-mix()`. A solução acrescenta uma cor
literal e limita a melhoria a uma feature query. A remoção do bloco moderno preserva
fundo, texto, contraste e borda.

O mecanismo compartilhado foi validado para aplicar a solução no idioma definido por
`data-edita`; nesta aula, ambas são soluções CSS. As respostas aparecem somente no
pacote do professor.

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

- `dist/professor.zip`: A1–A3, com respostas;
- `dist/aluno.zip`: A1–A3, sem respostas;
- `dist/professor-0003-progressive-enhancement-e-retrocompatibilidade.zip`;
- `dist/aluno-0003-progressive-enhancement-e-retrocompatibilidade.zip`.

## Validações executadas

- sintaxe dos JavaScripts compartilhados e do empacotador;
- regeneração do índice curricular;
- build completo e build isolado;
- inspeção de todos os HTMLs gerados para aluno;
- presença dos recursos exclusivos na distribuição do professor;
- contagem de soluções, quizzes, problemas reais e decoys.

O controlador visual de navegador não estava disponível nesta sessão. Portanto, a
auditoria comprova estrutura, sintaxe, empacotamento e separação, mas não inclui captura
automatizada de cliques ou comparação visual em navegador real.
