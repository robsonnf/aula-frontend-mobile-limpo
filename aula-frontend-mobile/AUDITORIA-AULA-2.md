# Auditoria do build e da Aula 2

Data: 30/08/2026

## Resultado

O build combinado (A1+A2) e o build isolado da A2 foram aprovados após correções.

### Pacote do aluno

Verificação executada em todos os HTMLs das duas distribuições do aluno:

- nenhum `<div class="nota">`;
- nenhum `data-so-professor`;
- nenhum `<template data-papel="solucao">`;
- nenhum `data-correta` de quiz;
- nenhum `data-real` ou `data-explica` de auditoria;
- nenhum `AVALIACAO.md`.

O aluno continua podendo editar, selecionar uma alternativa e marcar itens da
auditoria, mas a página não revela a resposta. A correção fica no pacote do professor.

### Pacote do professor

Foram preservados:

- roteiro de fala;
- solução do exercício HTML;
- respostas e explicações dos quizzes;
- classificação e explicação dos itens reais e decoys da auditoria;
- `AVALIACAO.md`, incluindo banco de perguntas e modificações ao vivo da A2.

## Defeitos encontrados e corrigidos

1. **Solução HTML aplicada como CSS.** O atelier assumia que toda solução pertencia
   ao editor CSS. Agora aplica a solução ao primeiro idioma declarado em `data-edita`.
2. **Quizzes sem interação.** As lessons continham alternativas em `<li>`, mas o
   JavaScript buscava botões inexistentes. Agora a lista legível sem JS é promovida
   a botões quando o script carrega.
3. **HTML do exercício exibido como texto.** A marcação estava escapada dentro dos
   templates. Foi convertida em HTML real para o iframe renderizar a atividade.
4. **Documento completo inserido dentro de outro body.** A auditoria do `<head>` agora
   usa `data-documento` e envia o documento completo ao `srcdoc` do iframe.
5. **Gabaritos no pacote do aluno.** O build agora remove globalmente soluções,
   respostas e explicações; a verificação falha se qualquer marcador sobreviver.
6. **Descrição restritiva de `nav`.** “Navegação principal” foi corrigido para
   “navegação importante”; uma página pode ter várias regiões de navegação nomeadas.

## Revisão técnica da Aula 2

- A separação entre semântica e apresentação está alinhada à MDN.
- A regra de `<main>` foi mantida com a ressalva correta: não pode existir mais de um
  sem o atributo `hidden`.
- `width=device-width, initial-scale=1` está descrito como configuração do viewport,
  não como solução automática de responsividade.
- O alerta contra `user-scalable=no` e `maximum-scale=1` está tecnicamente correto e
  preserva a ampliação para pessoas com baixa visão.
- A auditoria contém dois problemas reais e três decoys. Ela é de HTML/viewport — o
  recorte correto para a A2 — e não uma auditoria de CSS fora do conteúdo da aula.
- O roteiro soma 180 minutos: retomada 15, exposição 40, prática 30, intervalo 15,
  exposição 35, prática/projeto 40 e fechamento 5.

## Artefatos gerados

- `dist/professor.zip` e `dist/aluno.zip`: A1+A2.
- `dist/professor-0002-html-semantico-e-o-viewport.zip`: A2 com respostas.
- `dist/aluno-0002-html-semantico-e-o-viewport.zip`: A2 sem respostas.

## Limite da validação

Foram executados verificação de sintaxe JavaScript, geração do índice, build,
verificação automática de vazamentos e inspeção dos HTMLs resultantes. O controlador
visual de navegador não estava disponível nesta sessão; portanto, não foi registrada
uma prova automatizada de cliques ou captura visual.
