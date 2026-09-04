# Auditoria do build e da Aula 10

Data: 04/09/2026

## Resultado

A Aula 10, o build completo A1–A10 e o build isolado da A10 foram aprovados.

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
- banco de avaliação da A10 e `LEIA-ME.txt`.

## Revisão técnica

- Transição depende de mudança de valor; animação usa linha do tempo por keyframes.
- Propriedades, duração, curva e atraso são explicitados; `transition: all` é evitado.
- A aula não afirma que somente `transform` e `opacity` são animáveis.
- Duração é tratada junto de distância, escala, repetição e tarefa.
- Duração inicial de animação é `0s`; iteração, direção, play state e fill mode são distintos.
- Estado funcional permanece no CSS/HTML mesmo quando o efeito não executa.
- `prefers-reduced-motion: reduce` é preferência do usuário, não ordem para apagar informação.
- Movimento automático prolongado é associado a mecanismo de pausa, parada ou ocultação quando aplicável.

## Exercícios do professor

### Exercício 1 — transição e foco

Erros iniciais: `transition: all 2s`, escala invasiva e foco removido. A solução lista
cor e transform por 160ms, usa deslocamento pequeno, preserva foco visível e remove o
movimento sob preferência reduzida.

### Exercício 2 — animação de status

Erros iniciais: pulso quatro vezes por segundo e escala até 2, sem alternativa reduzida.
A solução usa ciclo de 900ms, máximo 1.2 e remove somente a animação no modo reduzido;
o texto de status permanece no HTML.

As duas soluções são CSS, correspondem a `data-edita="css"` e devem existir somente
no pacote do professor.

## Auditoria de CSS

Problemas reais:

1. `transition: all` com duração de dois segundos;
2. escala e rotação intensas acionadas somente por hover;
3. pulso rápido infinito sem alternativa reduzida ou controle.

Decoys corretos:

1. transição curta e explícita de cor;
2. outline de foco visível;
3. ornamento pequeno cuja animação é removida em movimento reduzido.

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

- MDN: transições, animation, propriedades animáveis e prefers-reduced-motion;
- W3C: CSS Animations Level 1;
- W3C WAI: Pausar, parar, ocultar.

## Pacotes

- `dist/professor.zip`: A1–A10 com respostas;
- `dist/aluno.zip`: A1–A10 sem respostas;
- `dist/professor-0010-transition-animation-e-movimento-acessivel.zip`;
- `dist/aluno-0010-transition-animation-e-movimento-acessivel.zip`.

## Validações executadas

- sintaxe dos scripts compartilhados;
- build completo A1–A10 e build isolado A10;
- auditoria funcional em Chrome dos módulos professor e aluno;
- busca dos marcadores do P10 em todos os HTMLs do aluno;
- contagem de notas, soluções, quizzes, problemas e decoys.

Os pacotes completo e isolado do aluno retornaram zero ocorrências para todos os sete
marcadores de vazamento. O professor isolado contém seis notas, duas soluções, dois
quizzes, três problemas reais e três decoys.

A auditoria funcional em Chrome, com viewport 390 × 844, percorreu a fonte do professor
e o build do aluno das aulas A1–A10: 20 páginas, 80 ateliers, 58 componentes editáveis,
38 quizzes e 20 auditorias. Edição, prévia, Reiniciar, Expandir, solução/retorno e
seleções foram acionados; nenhuma falha foi encontrada.
