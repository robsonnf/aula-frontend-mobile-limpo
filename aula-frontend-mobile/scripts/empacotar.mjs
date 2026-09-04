/* empacotar.mjs — gera as duas distribuições do material.

     npm run build            -- todas as aulas escritas, nas duas distros
     npm run build -- 1       -- só a A1
     npm run build -- 1 2 3   -- um recorte

   Duas distros, sempre as duas:

     dist/professor/  material completo, com o roteiro de fala (tecla N)
     dist/aluno/      o mesmo material, sem o roteiro

   O que é do professor é REMOVIDO do HTML na distro do aluno, não escondido
   por CSS — esconder deixaria o texto no arquivo, a um Ctrl+U de distância.

   O que sai na distro do aluno:
     · <div class="nota">            roteiro de fala
     · [data-so-professor]           qualquer bloco marcado (gabarito, aviso interno)
     · todas as soluções de exercícios
     · respostas e explicações de quizzes e auditorias

   Depois de montar, o script confere que nenhum marcador de resposta ou de
   professor sobrou no pacote do aluno e falha se sobrar.

   Limite honesto: o pacote do professor contém o gabarito no HTML, por
   construção. No pacote do aluno, as escolhas continuam interativas, mas a
   correção depende da discussão com o professor.

   Três coisas que a árvore do repo não resolve e o pacote precisa resolver:
     · `../assets/` quebra fora do repo  -> reescrito para `assets/`
     · link para aula ausente vira 404   -> desembrulhado (texto fica, <a> some)
     · nav que ficou sem destino         -> removida (afordância mentirosa é pior)
*/

import { readFile, writeFile, mkdir, rm, readdir, stat } from 'node:fs/promises';
import { join, basename } from 'node:path';
import { criarZip } from './zip.mjs';
import { RAIZ, lerGrade, cruzarComArquivos, gerar as gerarIndice } from './indice.mjs';

const LESSONS = join(RAIZ, 'lessons');
const ASSETS = join(RAIZ, 'assets');
const DIST = join(RAIZ, 'dist');

const RE_TITULO = /<title>([\s\S]*?)<\/title>/;
const RE_DECK = /<p class="deck">([\s\S]*?)<\/p>/;
const RE_NOTA = /\s*<div class="nota">[\s\S]*?<\/div>\s*/g;
const RE_SO_PROFESSOR = /\s*<(\w+)[^>]*\sdata-so-professor[^>]*>[\s\S]*?<\/\1>\s*/g;
const RE_ATELIER = /<div class="atelier"[\s\S]*?<\/div>\s*(?=\n)/g;
const RE_SOLUCAO = /\s*<template data-papel="solucao">[\s\S]*?<\/template>\s*/g;
const RE_QUIZ = /<div class="quiz"[\s\S]*?<\/div>\s*(?=\n)/g;

/* Marcadores que jamais podem chegar ao pacote do aluno. */
const VAZAMENTOS = [
  ['roteiro de fala', /<div class="nota">/],
  ['bloco só-professor', /data-so-professor/],
  ['solução marcada como oculta', /data-solucao="oculta"/],
  ['gabarito de exercício', /data-papel="solucao"/],
  ['resposta de quiz', /data-correta/],
  ['resposta de auditoria', /data-real=|data-explica=/],
];
const RE_LINK_AULA = /<a href="(\d{4}-[^"]*\.html)"[^>]*>([\s\S]*?)<\/a>/g;
const RE_NAV = /\s*<nav class="aula-nav">([\s\S]*?)<\/nav>\s*/g;

const semTags = (t) => t.replace(/<[^>]+>/g, '').trim();

async function resolver(argv) {
  const todas = (await readdir(LESSONS)).filter((f) => /^\d{4}-.*\.html$/.test(f)).sort();
  if (!todas.length) throw new Error('nenhuma lesson em lessons/');
  if (!argv.length) return todas;

  const escolhidas = [];
  for (const arg of argv) {
    const alvo = String(Number(arg)).padStart(4, '0') + '-';
    const achou = todas.find((f) => f.startsWith(alvo));
    if (!achou) throw new Error(`lesson ${alvo.slice(0, 4)} não existe em lessons/`);
    escolhidas.push(achou);
  }
  return escolhidas;
}

function preparar(html, nomesNoPacote, semRoteiro) {
  html = html.replaceAll('../assets/', 'assets/');

  if (semRoteiro) {
    html = html.replace(RE_NOTA, '\n\n');
    html = html.replace(RE_SO_PROFESSOR, '\n\n');
    // Remoção global, sem depender da estrutura interna do atelier: templates
    // HTML podem conter muitos </div>, portanto regex de bloco seria frágil.
    html = html.replace(RE_SOLUCAO, '\n');
    html = html
      .replace(/\sdata-solucao="oculta"/g, '')
      .replace(/\sdata-correta(?:="[^"]*")?/g, '')
      .replace(/\sdata-real="[^"]*"/g, '')
      .replace(/\sdata-explica="[^"]*"/g, '');
  }

  html = html.replace(RE_LINK_AULA, (todo, destino, texto) =>
    nomesNoPacote.has(destino) ? todo : texto
  );

  // A nav só faz sentido se sobrou para onde navegar.
  html = html.replace(RE_NAV, (todo, dentro) => (dentro.includes('<a href=') ? todo : '\n\n'));

  return html;
}

function montarSumario(metas) {
  const itens = metas
    .map(
      (m) =>
        `    <li>\n      <a href="${m.arquivo}">${m.titulo}</a>\n` +
        `      <p class="sumario-deck">${m.deck}</p>\n    </li>`
    )
    .join('\n');

  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Desenvolvimento Web Mobile — aulas</title>
<link rel="stylesheet" href="assets/course.css">
<style>
  .sumario { list-style: none; padding: 0; max-width: 42rem; }
  .sumario li { border-top: 1px solid var(--rule); padding: 1.2rem 0; }
  .sumario a { font-family: var(--sans); font-weight: 650; font-size: 1.05rem; text-decoration: none; }
  .sumario-deck { margin: .35rem 0 0; font-size: .9rem; color: var(--ink-soft); font-style: italic; max-width: none; }
</style>
</head>
<body class="reference">
<p class="aula-tag">Desenvolvimento Web Mobile · 66h</p>
<h1>Aulas</h1>
<ol class="sumario">
${itens}
</ol>
</body>
</html>
`;
}

function leiaMe(distro, metas, semRoteiro) {
  const lista = metas.map((m) => `  - ${m.titulo}`).join('\n');
  return `Desenvolvimento Web Mobile — material de aula
=============================================

Distribuição: ${distro}.


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
${semRoteiro ? '' : `

TECLAS (só nesta distribuição)
------------------------------
  N   mostra/esconde o roteiro de fala. Começa escondido, não aparece
      na projeção.
  P   modo apresentação: esconde a lateral e aumenta o corpo do texto.

Para gerar o pacote da turma (sem roteiro e sem respostas):
      npm run build
e use o zip que começa com "aluno-".

O arquivo AVALIACAO.md, incluído aqui, traz a rubrica de defesa, o banco
de perguntas e a política de uso de IA. Ele NÃO vai no pacote da turma.`}

USO DE IA
---------
A regra da disciplina: use à vontade, você responde pelo que entrega e
vai defender oralmente. Os exercícios não valem nota — são para errar à
vontade. A aula 1 tem uma auditoria de uma resposta de IA real, com
armadilhas plausíveis que NÃO são problema. Marcar tudo é o erro.


CONTEÚDO
--------
${lista}
`;
}

async function construir(arquivos, { semRoteiro, pasta, rotulo }) {
  const nomes = new Set(arquivos);
  const destino = join(DIST, pasta);
  await rm(destino, { recursive: true, force: true });
  await mkdir(join(destino, 'assets'), { recursive: true });

  for (const nome of await readdir(ASSETS)) {
    const origem = join(ASSETS, nome);
    if ((await stat(origem)).isFile()) {
      await writeFile(join(destino, 'assets', nome), await readFile(origem));
    }
  }

  // aulas.js do pacote: a grade inteira aparece, mas só o que veio junto
  // é navegável. O aluno vê o mapa do curso e sabe o que ainda não tem.
  const grade = await cruzarComArquivos(await lerGrade());
  await gerarIndice(grade, [...nomes], join(destino, 'assets', 'aulas.js'));

  const metas = [];
  for (const nome of arquivos) {
    const html = preparar(await readFile(join(LESSONS, nome), 'utf8'), nomes, semRoteiro);
    const alvo = arquivos.length === 1 ? 'index.html' : nome;
    await writeFile(join(destino, alvo), html, 'utf8');
    if (semRoteiro) {
      for (const [rotulo, padrao] of VAZAMENTOS) {
        if (padrao.test(html)) {
          throw new Error(`VAZAMENTO em ${nome}: ${rotulo} sobrou no pacote do aluno`);
        }
      }
    }

    metas.push({
      arquivo: alvo,
      titulo: semTags(RE_TITULO.exec(html)?.[1] ?? basename(nome, '.html')),
      deck: semTags(RE_DECK.exec(html)?.[1] ?? ''),
    });
  }

  if (arquivos.length > 1) {
    await writeFile(join(destino, 'index.html'), montarSumario(metas), 'utf8');
  }
  await writeFile(join(destino, 'LEIA-ME.txt'), leiaMe(rotulo, metas, semRoteiro), 'utf8');

  // A rubrica e o banco de perguntas são do professor. A POLÍTICA de uso de IA
  // não é segredo — ela está dentro da própria aula, que o aluno recebe.
  if (!semRoteiro) {
    await writeFile(join(destino, 'AVALIACAO.md'), await readFile(join(RAIZ, 'AVALIACAO.md')));
  }

  // zip com a pasta na raiz, para não explodir na Área de Trabalho de ninguém
  const entradas = [];
  async function varrer(dir, prefixo) {
    for (const nome of (await readdir(dir)).sort()) {
      const caminho = join(dir, nome);
      if ((await stat(caminho)).isDirectory()) await varrer(caminho, `${prefixo}${nome}/`);
      else entradas.push({ nome: `${prefixo}${nome}`, dados: await readFile(caminho) });
    }
  }
  await varrer(destino, `${pasta}/`);

  const zipPath = join(DIST, `${pasta}.zip`);
  await writeFile(zipPath, await criarZip(entradas));
  return { zipPath, entradas };
}

const argv = process.argv.slice(2);
const arquivos = await resolver(argv);
const sufixo = arquivos.length === 1 ? '-' + basename(arquivos[0], '.html') : '';

for (const distro of [
  { semRoteiro: false, pasta: `professor${sufixo}`, rotulo: 'professor (com roteiro de fala)' },
  { semRoteiro: true, pasta: `aluno${sufixo}`, rotulo: 'aluno' },
]) {
  const { zipPath, entradas } = await construir(arquivos, distro);
  const kb = ((await stat(zipPath)).size / 1024).toFixed(0);
  const selo = distro.semRoteiro ? ' · sem vazamento de professor (conferido)' : '';
  console.log(`  dist/${basename(zipPath)}  —  ${kb} KB · ${entradas.length} arquivos · ${distro.rotulo}${selo}`);
}
console.log(`\n${arquivos.length} aula(s) empacotada(s) nas duas distribuições.`);
