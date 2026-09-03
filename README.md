Desenvolvimento Web Mobile — material de aula
=============================================

Distribuição: aluno.


COMO ABRIR (o jeito rápido)
---------------------------
Descompacte a pasta INTEIRA e dê dois cliques em index.html.

Não abra o index.html de dentro do zip. A pasta assets/ precisa estar do
lado, senão a página abre sem estilo e sem os exercícios.

Funciona offline. Não instala nada. Não precisa de Node, npm nem
node_modules — isto aqui é HTML, CSS e JavaScript, e mais nada.


COMO ABRIR (o jeito completo)
-----------------------------
Aberto com dois cliques (endereço file://), alguns navegadores bloqueiam
por CORS o carregamento do CodeMirror, e o editor dos exercícios fica
sendo um campo de texto simples. Tudo funciona igual — só não tem
realce de sintaxe.

Para ter o editor completo, sirva a pasta por http. Escolha UMA:

  macOS / Linux — já vem instalado:
      cd <pasta descompactada>
      python3 -m http.server 8000
      abra http://localhost:8000

  Windows — já vem instalado (se tiver Python):
      cd <pasta descompactada>
      py -m http.server 8000
      abra http://localhost:8000

  Quem tem Node:
      cd <pasta descompactada>
      npx serve
      abra o endereço que aparecer

  VS Code:
      instale a extensão "Live Server", clique com o botão direito
      no index.html e escolha "Open with Live Server"

Nenhuma dessas opções instala dependência no projeto.


OS EXERCÍCIOS
-------------
Escreva no editor; o resultado aparece ao lado, na hora.

O controle deslizante muda a largura do viewport DE VERDADE: a prévia
roda num iframe, então as media queries disparam mesmo. Quando a largura
pedida não cabe no painel, a prévia é reduzida e o fator aparece ao lado
(por exemplo "1280px — desktop grande · 41%"). O botão "Expandir prévia"
esconde o editor e devolve a largura toda.

Seu código fica salvo no navegador. "Reiniciar" volta ao original.


USO DE IA
---------
A regra da disciplina: use à vontade, você responde pelo que entrega e
vai defender oralmente. Os exercícios não valem nota — são para errar à
vontade. A aula 1 tem uma auditoria de uma resposta de IA real, com
armadilhas plausíveis que NÃO são problema. Marcar tudo é o erro.


CONTEÚDO
--------
  - A1 — Mobile-first: por que a ordem importa
  - A2 — HTML semântico e o viewport
  - A3 — Progressive enhancement e retrocompatibilidade
  - A4 — Cascata, especificidade, herança e seletores complexos
  - A5 — Pseudo-classes e pseudo-elementos
  - A6 — Unidades absolutas e relativas
  - A7 — Flexbox
  - A8 — Grid
