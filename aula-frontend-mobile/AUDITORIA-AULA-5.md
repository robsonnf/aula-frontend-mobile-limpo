# Auditoria do build e da Aula 5

Data: 01/09/2026

## Resultado

A Aula 5, o build completo A1–A5 e o build isolado da A5 foram aprovados.

## Separação aluno/professor

### Aluno

- `LEIA-ME.txt` presente;
- nenhuma nota `.nota`;
- nenhum `data-so-professor`;
- nenhuma solução `data-papel="solucao"`;
- nenhuma resposta `data-correta`;
- nenhum `data-real` ou `data-explica`;
- nenhum `AVALIACAO.md`.

Os exercícios permanecem editáveis e quizzes/auditorias aceitam seleção, mas não
revelam a correção no HTML distribuído ao aluno.

### Professor

- seis blocos de roteiro;
- duas soluções de exercícios;
- dois quizzes com resposta e explicação;
- auditoria com três problemas reais, três decoys e justificativas;
- `AVALIACAO.md` atualizado para A5;
- `LEIA-ME.txt` e assets compartilhados.

## Revisão técnica

- Pseudo-classe é apresentada como seleção por estado, relação ou informação fora da
  árvore; pseudo-elemento como seleção de parte ou caixa gerada.
- Pseudo-classes contribuem na coluna de classes da especificidade; pseudo-elementos
  contribuem na coluna de tipos, com a ressalva correta de `:where()`.
- `:hover`, `:active`, `:focus`, `:focus-visible` e `:focus-within` têm papéis distintos.
- A aula não proíbe hover; proíbe depender exclusivamente dele para informação ou ação.
- `:focus-visible` preserva a heurística do agente e nunca é usado para eliminar foco.
- Estados nativos como `:checked`, `:required` e `:user-invalid` são tratados como
  fontes de verdade, evitando classes duplicadas.
- `::before`/`::after` são limitados a decoração quando o significado precisa
  sobreviver sem CSS; o alerta de exposição inconsistente a leitores de tela foi mantido.
- `::marker`, `::first-line`, `::selection` e `::placeholder` são apresentados como
  partes específicas, não como estados.

## Exercícios do professor

### Exercício 1 — estados

Erro inicial: `outline:none` remove o indicador de foco e o componente só tem retorno
visual por hover. A solução mantém hover, acrescenta `:active` e fornece anel visível
com `:focus-visible`. O teste exigido cobre mouse e teclado.

### Exercício 2 — conteúdo e ornamento

Erro inicial: “Novo” e “Obrigatório” eram criados apenas por `content`. O HTML corrigido
contém os dois significados. A solução usa `content:""` para uma faixa e um marcador
geométrico; perder os pseudo-elementos não remove nenhuma informação.

As duas soluções são CSS, correspondem a `data-edita="css"` e aparecem somente no
pacote do professor.

## Auditoria de CSS

Problemas reais:

1. link distinguível apenas em hover;
2. indicador de foco removido;
3. condição comercial essencial criada apenas em `::before`.

Decoys corretos:

1. estilização de `::marker`;
2. estado `:checked` combinado ao `label` adjacente;
3. seta decorativa feita com `::after` vazio.

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

- `dist/professor.zip`: A1–A5 com respostas;
- `dist/aluno.zip`: A1–A5 sem respostas;
- `dist/professor-0005-pseudo-classes-e-pseudo-elementos.zip`;
- `dist/aluno-0005-pseudo-classes-e-pseudo-elementos.zip`.

## Validações executadas

- sintaxe dos scripts compartilhados;
- regeneração do índice;
- build completo e isolado;
- inspeção de todos os HTMLs do aluno;
- presença das respostas no professor;
- contagem de soluções, notas, quizzes, problemas e decoys.

O controlador visual de navegador não estava disponível nesta sessão. A validação
cobre conteúdo, estrutura, sintaxe, empacotamento e isolamento, sem captura automatizada
de cliques em navegador real.
