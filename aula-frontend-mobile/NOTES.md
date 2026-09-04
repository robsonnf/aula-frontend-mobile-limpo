# Notas

## Sobre este workspace

Uso invertido da skill `/teach`: Leo é o **professor**, não o aluno. Ao ler a SKILL.md,
traduza "o usuário" para "os alunos" em tudo que trate de zona de desenvolvimento
proximal, quiz e recuperação ativa. As decisões de formato são do Leo.

`CURRICULUM.md` é um arquivo extra deste workspace (não previsto na skill). Existe
porque uma ementa fechada de 66h precisa de um mapa aula→ementa, e a `MISSION.md`
tem que caber em uma tela.

## Preferências de formato

- **Lessons são material de projeção ao vivo**, não auto-instrucionais. Tipografia
  grande, uma ideia por seção, demo manipulável na frente da turma.
- Cada lesson carrega **roteiro de fala** do Leo, escondido por padrão (tecla `N`),
  para não aparecer na projeção.
- Reference docs (`reference/*.html`) são o que **o aluno leva**: densos, imprimíveis,
  para consulta. Lesson ≠ reference.
- PT-BR. Termo técnico em inglês quando é o nome real da coisa.

## Advertências a repetir na turma (contadas, não pressupostas)

- Docs de Bootstrap 3 e 4 continuam no ar e ranqueiam bem. Metade do código errado
  que o aluno acha no Google vem de lá.
- Teste automatizado de acessibilidade pega ~30–40% das violações reais de WCAG.
  Verde no axe não é site acessível.
- Blog "guia definitivo 2026" erra versão de software com frequência. Na checagem de
  27/08/2026 vários davam WordPress 6.8 como atual; a fonte oficial dava 7.1.
  Ensinar o aluno a ir na fonte primária é conteúdo, não etiqueta.

## Pendências antes de aulas específicas

- **A20:** decidir a stack local de CMS (XAMPP × Local × Docker × `wp-env`) e testar
  em Windows, macOS e Linux. Registrar em `RESOURCES.md`.
- **A19:** medir compressão AVIF/WebP na mão (Squoosh) e gerar números próprios —
  não há fonte primária boa com dados atuais.
- **A1:** confirmar se a turma terá celular próprio em sala para testar (muda a
  prática de fim de aula).

## Comandos

```bash
npm start          # serve em http://localhost:4321 (e no IP da rede, p/ celulares)
npm run indice     # regenera assets/aulas.js a partir de CURRICULUM.md
npm run build      # gera as DUAS distros de todas as aulas escritas
npm run build -- 1 # só a A1
```

`npm start` não é conforto: aberto por `file://`, alguns navegadores bloqueiam por
CORS o import ESM do CodeMirror e o editor cai no textarea. Servido por `http://`,
o CodeMirror carrega. O endereço de rede impresso serve para a turma abrir no
próprio celular — o que, num curso mobile-first, é o teste que vale.

## As duas distros

| | `dist/professor-*` | `dist/aluno-*` |
|---|---|---|
| Roteiro de fala (`.nota`, tecla N) | sim | **removido do HTML** |
| Blocos `data-so-professor` | sim | **removidos** |
| Soluções de exercícios | sim | **removidas do HTML** |
| Respostas de quizzes e auditorias | sim | **removidas do HTML** |

Remoção é do HTML, não por CSS — esconder deixaria o texto a um Ctrl+U de distância.
O build confere e **falha** se algum marcador de professor sobrar no pacote do aluno.

No pacote do professor, quiz e auditoria têm correção imediata. No pacote do aluno,
as respostas e explicações são removidas do HTML; a escolha continua interativa, mas
a correção acontece na discussão com o professor.

O pacote é autocontido e roda offline: caminhos de `assets/` reescritos, links para
aulas ausentes desembrulhados (texto fica, `<a>` some) e a nav some quando não tem
mais para onde ir. Quando houver mais de uma aula no pacote, o script gera o
`index.html` de sumário sozinho — a navegabilidade já está pronta, só faltam aulas.

`dist/` não é versionado. É build, reproduzível a partir de `lessons/` + `assets/`.

## Decisões técnicas que custaram tempo — não refaça o caminho

**CodeMirror 6 pelo esm.sh, com `?deps=@codemirror/state@6.5.2`.** O caminho óbvio
(jsDelivr `/+esm`) não funciona: cada pacote `@codemirror` vem com sua própria cópia
de `@codemirror/state`, e duas cópias quebram os `instanceof` internos —
`"Unrecognized extension value in extension set"`. Pinar **só o state** resolve;
pinar `view`/`language` junto quebra de outro jeito (`codemirror@6.0.2` exige um
`view` mais novo e falha com `does not provide an export named 'activateHover'`).

**Não use o cdnjs para CodeMirror.** Ele publica `codemirror 6.65.7`, que é código da
**linha 5** (build UMD, detecção de MSIE, global `window.CodeMirror`). No npm,
`latest` é `6.0.2`; a linha 5 vive sob a tag `version5` (`5.65.21`). A linha 5 foi
**arquivada em 16/04/2026** — e um curso que na A16 ensina "jQuery Mobile morreu
porque foi arquivado" não pode distribuir biblioteca arquivada. Vira exemplo na A16.

**O editor é o `<textarea>`; o CodeMirror é enhancement.** Sem rede, sem JS de
módulo, com bloqueador de conteúdo — o exercício roda igual. Isto não é defensividade
gratuita: é a A3 praticada pelo próprio material, e dá para mostrar em aula
desligando a rede no DevTools.

**Duas larguras, uma borda esquerda.** Prosa em `--col-texto` (46rem, ~74 caracteres);
exercício, comparação certo-×-errado e tabela em `--col-larga` (até 92rem). Tudo
ancorado à esquerda com `margin-inline: 0`.

O que incomodava antes não era a diferença de largura — era o **centramento**, que
produzia duas bordas esquerdas diferentes e fazia os blocos parecerem soltos.
Ancorados, os dois grupos partem do mesmo eixo e a diferença de largura lê como
intenção. Não volte a centralizar: a largura extra existe para o exercício, não
para a prosa, e prosa em 92rem passa de 130 caracteres por linha.

## Prévia em escala — por que não é `max-width: 100%`

O iframe da prévia renderiza **sempre na largura pedida pelo controle** e é reduzido
por `transform: scale()` quando não cabe no painel. O fator aparece no leitor
(`1280px — desktop grande · 41%`).

A alternativa óbvia — deixar `max-width: 100%` cortar — faz o controle **mentir**:
num painel de 400px, arrastar de 400 a 1280 não muda nada na tela, e o número ao
lado diz que mudou. Num material que ensina responsividade, um controle que mente
é pior que controle nenhum.

O botão **Expandir prévia** tira o editor e devolve ~80% de largura ao palco (a
escala sobe de ~41% para ~75% em 1280px). É o gesto de aula: escreve o código,
expande, mostra o resultado grande para a turma.

A escala é recalculada por `ResizeObserver` no palco — reage à janela, ao modo
apresentação e ao expandir sem nada para sincronizar à mão.

## O modo `auditoria` do atelier

Terceiro modo, ao lado de `demo` e `exercicio`. Mostra código plausível-mas-caro
(tipicamente uma resposta de IA real) com editor e prévia como o exercício, mais uma
lista de achados que o aluno julga um a um.

```html
<div class="atelier" data-modo="auditoria" data-id="..." data-titulo="...">
  <p data-papel="enunciado">…</p>
  <template data-papel="css">…</template>
  <template data-papel="html">…</template>
  <ol data-papel="achados">
    <li data-real="sim" data-explica="por que é problema">…</li>
    <li data-real="nao" data-explica="por que NÃO é problema">…</li>
  </ol>
</div>
```

**Sempre inclua decoys** (`data-real="nao"`). Sem eles o aluno aprende que marcar tudo
dá placar cheio, e a auditoria deixa de medir a única coisa que importa: separar erro
real de reclamação decorada. O placar conta os dois lados —
`2 de 3 problemas reais encontrados · 1 alarme(s) falso(s)`.

Os seletores de layout do atelier usam `:not([data-modo="demo"])` em vez de listar cada
modo. Um modo novo entra sem tocar no CSS.
