# Auditoria do build e da Aula 4

Data: 01/09/2026

## Resultado

A Aula 4, o build completo A1–A4 e o build isolado da A4 foram aprovados.

## Separação aluno/professor

### Aluno

- `LEIA-ME.txt` presente;
- nenhuma nota `.nota`;
- nenhum `data-so-professor`;
- nenhuma solução `data-papel="solucao"`;
- nenhuma resposta `data-correta`;
- nenhum `data-real` ou `data-explica` da auditoria;
- nenhum `AVALIACAO.md`.

Os editores, quizzes e itens de auditoria permanecem utilizáveis, mas não revelam
respostas ou justificativas no HTML do aluno.

### Professor

- seis blocos de roteiro de fala;
- duas soluções de exercícios;
- um quiz com resposta e explicação;
- auditoria com três problemas reais, três decoys e justificativas;
- `AVALIACAO.md` com banco de perguntas e modificações ao vivo da A4;
- `LEIA-ME.txt` e assets compartilhados.

## Revisão técnica

- A cascata é apresentada na ordem correta: relevância; origem, importância e camada;
  especificidade; proximidade de escopo; ordem de aparição.
- A aula deixa explícito que especificidade não é a primeira etapa da cascata.
- Especificidade é comparada por colunas ID–classe–tipo, sem falsa conversão entre elas.
- `:where()` tem peso zero; `:is()`, `:not()` e `:has()` recebem o peso do argumento
  mais específico da lista.
- Ordem de aparição é usada somente após empate nas etapas anteriores.
- Herança é separada da disputa direta da cascata e os valores `inherit`, `initial`,
  `unset` e `revert` são descritos corretamente.
- Combinadores descendente, filho, irmão adjacente e irmãos seguintes são tratados
  como relações estruturais, não como forma de aumentar peso.
- A auditoria inclui decoys tecnicamente corretos: `:where()`, seletor de estado por
  atributo e combinador de filho.

## Exercícios do professor

### Exercício 1 — especificidade

Erro inicial: a base usa `#pagina main .acoes .botao` (1–3–1), obrigando a variação
simples a recorrer a `!important`. A solução reduz a base para `.botao` e mantém
`.botao--promocao` depois dela; há empate 0–1–0 e a ordem expressa a variação.

### Exercício 2 — seletores complexos

A solução atende separadamente aos três contratos:

- `h2 + p` alcança apenas o primeiro parágrafo imediatamente posterior;
- `a[href^="http"]` distingue os links externos fornecidos no exercício;
- `nav > ul` atinge apenas a lista diretamente filha, sem atingir a lista aninhada.

As duas soluções são CSS, correspondem ao idioma declarado em `data-edita` e aparecem
somente no pacote do professor.

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

- `dist/professor.zip`: A1–A4 com respostas;
- `dist/aluno.zip`: A1–A4 sem respostas;
- `dist/professor-0004-cascata-especificidade-heranca-e-seletores-complexos.zip`;
- `dist/aluno-0004-cascata-especificidade-heranca-e-seletores-complexos.zip`.

## Validações executadas

- sintaxe dos JavaScripts e do empacotador;
- regeneração do índice;
- build completo e isolado;
- inspeção de todos os HTMLs gerados para aluno;
- presença dos recursos exclusivos no professor;
- contagem de soluções, notas, problemas reais e decoys.

O controlador visual de navegador não estava disponível nesta sessão. A validação
cobre estrutura, sintaxe, conteúdo, empacotamento e isolamento, mas não inclui captura
automatizada de cliques em navegador real.
