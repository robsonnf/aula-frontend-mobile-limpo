/* atelier.js — canvas de código das aulas.

   Dois modos numa peça só:
     data-modo="demo"       preview + controle de viewport, sem editor
     data-modo="exercicio"  editor + preview ao vivo, com reiniciar e solução

   Substitui o antigo viewport-demo.js: fazia metade disto e sobrepunha o resto.

   ── Camadas (a própria A3 praticada no material) ─────────────────────────
   1. Sem JS: o <template> não renderiza, o atelier não aparece, a aula
      continua legível. O código exemplo já está no <pre> da seção.
   2. Com JS: <textarea> + iframe. Editor de verdade — tab, auto-indent,
      numeração de linha, salvamento local. Funciona offline, em file://,
      para sempre.
   3. Com JS + rede: CodeMirror 6 substitui o textarea. Realce de sintaxe,
      dobra, seleção múltipla.

   ── Por que CodeMirror 6 e não 5 ─────────────────────────────────────────
   A linha 5 foi ARQUIVADA em 16/04/2026. Distribuir biblioteca arquivada num
   curso que na A16 ensina "jQuery Mobile morreu porque foi arquivado" seria
   contradição visível. A 6 é mantida, mais acessível e mais amigável a toque —
   e este é um curso mobile.

   ── Armadilha de CDN, registrada ─────────────────────────────────────────
   O cdnjs publica "codemirror 6.65.7" que é CÓDIGO DA LINHA 5 (build UMD,
   detecção de MSIE, global window.CodeMirror). No npm, `latest` é 6.0.2 e a
   linha 5 vive sob a tag `version5` (5.65.21). Por isso a versão abaixo é
   fixada e vem do jsDelivr, não do cdnjs. Vira exemplo na A16.
*/

(function () {
  'use strict';

  // esm.sh com ?deps= — a razão é específica, não é gosto:
  //
  // O caminho óbvio (jsDelivr /+esm) NÃO funciona. Cada pacote @codemirror
  // servido lá traz sua própria cópia de @codemirror/state, e duas cópias de
  // state quebram os instanceof internos do CodeMirror. O erro é
  //   "Unrecognized extension value in extension set ([object Object]).
  //    This sometimes happens because multiple instances of @codemirror/state
  //    are loaded, breaking instanceof checks."
  //
  // O esm.sh aceita ?deps=, que força os pacotes a compartilharem a MESMA
  // instância. Pinar só o state basta — é a duplicação dele que quebra tudo.
  // Pinar view/language junto quebra de outro jeito: o codemirror@6.0.2 exige
  // um view mais novo e falha com "does not provide an export named
  // 'activateHover'". Ou seja: este pino é estreito de propósito.
  var CM_BASE = 'https://esm.sh/';
  var CM_DEPS = '?deps=@codemirror/state@6.5.2';
  var CM_VERSAO = '6.0.2';

  // 15s, não 4s: o grafo de módulos do CM6 é grande e o primeiro carregamento
  // (cache frio, wifi de laboratório) passa de 4s com folga. Esperar mais é de
  // graça — o textarea funciona desde o primeiro frame, e a promoção preserva
  // o que o aluno já digitou.
  var ESPERA_CM = 15000;

  var PONTOS = [
    { rotulo: 'celular', max: 575 },
    { rotulo: 'celular grande', max: 767 },
    { rotulo: 'tablet', max: 991 },
    { rotulo: 'desktop', max: 1199 },
    { rotulo: 'desktop grande', max: Infinity }
  ];

  function rotuloPara(w) {
    for (var i = 0; i < PONTOS.length; i++) if (w <= PONTOS[i].max) return PONTOS[i].rotulo;
    return '';
  }

  function el(tag, cls, txt) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  }

  function dedent(s) {
    var linhas = s.replace(/^\n/, '').replace(/\s+$/, '').split('\n');
    var min = Infinity;
    linhas.forEach(function (l) {
      if (!l.trim()) return;
      min = Math.min(min, l.match(/^ */)[0].length);
    });
    if (!isFinite(min)) min = 0;
    return linhas.map(function (l) { return l.slice(min); }).join('\n');
  }

  /* ---------------------------------------------------------------- CM6 */

  var promessaCM = null;

  function carregarCM() {
    if (promessaCM) return promessaCM;

    // import() dinâmico falha por CORS quando a página abre em file:// em
    // alguns navegadores. É esperado: cai no textarea. Rode `npm start`
    // para servir por http:// e ter o CodeMirror junto.
    var carga = Promise.all([
      import(CM_BASE + 'codemirror@' + CM_VERSAO + CM_DEPS),
      import(CM_BASE + '@codemirror/lang-css@6' + CM_DEPS),
      import(CM_BASE + '@codemirror/lang-html@6' + CM_DEPS),
      import(CM_BASE + '@codemirror/language@6' + CM_DEPS),
      import(CM_BASE + '@lezer/highlight@1' + CM_DEPS),
      import(CM_BASE + '@codemirror/state@6.5.2')
    ]).then(function (m) {
      return { core: m[0], css: m[1].css, html: m[2].html,
               lang: m[3], lezer: m[4], state: m[5] };
    });

    var prazo = new Promise(function (_, rejeita) {
      setTimeout(function () { rejeita(new Error('timeout')); }, ESPERA_CM);
    });

    promessaCM = Promise.race([carga, prazo]).catch(function (erro) {
      // Falhar aqui é normal e previsto: offline, file:// com CORS, bloqueador
      // de conteúdo. O textarea assume e o exercício roda igual. Mas o motivo
      // vai para o console — falha silenciosa é péssima num material didático,
      // e este console é conteúdo da A22.
      console.warn('[atelier] CodeMirror não carregou; seguindo no textarea. Motivo:', erro && erro.message ? erro.message : erro);
      return null;
    });
    return promessaCM;
  }

  /* ------------------------------------------------------------ editor */

  function montarEditor(painel, valorInicial, linguagem, aoMudar) {
    var wrap = el('div', 'at-campo-wrap');
    var linhas = el('pre', 'at-linhas');
    var campo = el('textarea', 'at-campo');
    campo.value = valorInicial;
    campo.spellcheck = false;
    campo.setAttribute('aria-label', 'Editor de ' + linguagem);
    campo.autocapitalize = 'off';
    campo.autocomplete = 'off';
    campo.setAttribute('autocorrect', 'off');

    function numerar() {
      var n = campo.value.split('\n').length;
      var out = '';
      for (var i = 1; i <= n; i++) out += i + '\n';
      linhas.textContent = out;
    }

    campo.addEventListener('input', function () { numerar(); aoMudar(campo.value); });
    campo.addEventListener('scroll', function () { linhas.scrollTop = campo.scrollTop; });

    // Tab indenta em vez de sair do campo. Shift+Tab desindenta.
    // Escape antes de Tab devolve a navegação por teclado — sem isso o
    // exercício vira armadilha para quem navega sem mouse (WCAG 2.1.2,
    // "No Keyboard Trap"). É o assunto da A17, aplicado aqui.
    var escapou = false;
    campo.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { escapou = true; return; }
      if (e.key !== 'Tab' || escapou) { escapou = false; return; }
      e.preventDefault();
      var ini = campo.selectionStart, fim = campo.selectionEnd, v = campo.value;
      if (e.shiftKey) {
        var linhaIni = v.lastIndexOf('\n', ini - 1) + 1;
        if (v.slice(linhaIni, linhaIni + 2) === '  ') {
          campo.value = v.slice(0, linhaIni) + v.slice(linhaIni + 2);
          campo.selectionStart = campo.selectionEnd = Math.max(linhaIni, ini - 2);
        }
      } else {
        campo.value = v.slice(0, ini) + '  ' + v.slice(fim);
        campo.selectionStart = campo.selectionEnd = ini + 2;
      }
      numerar();
      aoMudar(campo.value);
    });

    wrap.appendChild(linhas);
    wrap.appendChild(campo);
    painel.appendChild(wrap);

    var hospedeCM = el('div', 'at-cm');
    painel.appendChild(hospedeCM);
    numerar();

    var api = {
      valor: function () { return campo.value; },
      define: function (v) {
        campo.value = v;
        numerar();
        if (api._cm) {
          api._cm.dispatch({ changes: { from: 0, to: api._cm.state.doc.length, insert: v } });
        }
        aoMudar(v);
      },
      _cm: null,
      hospede: hospedeCM,
      linguagem: linguagem
    };
    return api;
  }

  /* Tema do editor, em cima das variáveis do curso — assim ele acompanha
     claro/escuro sem uma segunda paleta para manter. O padrão do CodeMirror
     é um branco que briga com tudo em volta. */
  var temaCache = null;

  function temaDoCurso(mods) {
    if (temaCache) return temaCache;

    var EditorView = mods.core.EditorView;
    var t = mods.lezer.tags;

    var visual = EditorView.theme({
      '&': {
        color: 'var(--ink)',
        backgroundColor: 'var(--code-bg)',
        fontSize: '.78rem'
      },
      '.cm-content': {
        fontFamily: 'var(--mono)',
        padding: '.8rem 0',
        caretColor: 'var(--accent)'
      },
      '.cm-scroller': { fontFamily: 'var(--mono)', lineHeight: '1.65' },
      '&.cm-focused': { outline: '2px solid var(--accent)', outlineOffset: '-2px' },
      '.cm-cursor, .cm-dropCursor': { borderLeftColor: 'var(--accent)', borderLeftWidth: '2px' },

      /* as linhas: gutter discreto, número da linha ativa em destaque */
      '.cm-gutters': {
        backgroundColor: 'var(--code-bg)',
        color: 'color-mix(in oklab, var(--ink-faint) 70%, transparent)',
        border: 'none',
        borderRight: '1px solid var(--rule)',
        paddingRight: '.15rem'
      },
      '.cm-lineNumbers .cm-gutterElement': { padding: '0 .55rem 0 .8rem', minWidth: '2.6rem' },
      '.cm-activeLineGutter': {
        backgroundColor: 'transparent',
        color: 'var(--accent)',
        fontWeight: '700'
      },
      '.cm-activeLine': { backgroundColor: 'color-mix(in oklab, var(--ink) 4%, transparent)' },
      '.cm-foldGutter .cm-gutterElement': { color: 'var(--ink-faint)' },

      '.cm-selectionBackground, &.cm-focused .cm-selectionBackground, ::selection': {
        backgroundColor: 'color-mix(in oklab, var(--accent) 28%, transparent)'
      },
      '.cm-matchingBracket, &.cm-focused .cm-matchingBracket': {
        backgroundColor: 'color-mix(in oklab, var(--accent) 22%, transparent)',
        outline: 'none'
      },
      '.cm-tooltip': {
        backgroundColor: 'var(--paper-sunk)',
        border: '1px solid var(--rule)',
        borderRadius: '6px'
      }
    }, { dark: true });

    /* Paleta de tokens deliberadamente curta. Editor de aula não é IDE: cor
       demais vira ruído quando a turma está olhando de longe, projetado. */
    var realce = mods.lang.HighlightStyle.define([
      { tag: [t.comment, t.lineComment, t.blockComment], color: 'var(--ink-faint)', fontStyle: 'italic' },
      { tag: [t.propertyName, t.definition(t.propertyName)], color: 'var(--cm-prop)' },
      { tag: [t.number, t.unit, t.literal, t.bool], color: 'var(--cm-num)' },
      { tag: [t.string, t.special(t.string)], color: 'var(--cm-str)' },
      { tag: [t.keyword, t.atom, t.modifier], color: 'var(--cm-key)', fontWeight: '600' },
      { tag: [t.tagName, t.className, t.typeName], color: 'var(--cm-tag)' },
      { tag: [t.attributeName], color: 'var(--cm-prop)' },
      { tag: [t.function(t.variableName), t.macroName], color: 'var(--cm-fn)' },
      { tag: [t.operator, t.punctuation, t.separator, t.bracket], color: 'var(--ink-soft)' },
      { tag: t.invalid, color: 'var(--accent)' }
    ]);

    temaCache = [
      visual,
      mods.state.Prec.highest(mods.lang.syntaxHighlighting(realce))
    ];
    return temaCache;
  }

  function promoverParaCM(api, mods, aoMudar) {
    var EditorView = mods.core.EditorView;
    var linguagem = api.linguagem === 'html' ? mods.html() : mods.css();

    // basicSetup NÃO vincula Tab a indentar — indentWithTab é opt-in no CM6 e
    // fica de fora de propósito: Tab tem que continuar movendo o foco, senão o
    // exercício vira armadilha de teclado (WCAG 2.1.2, "No Keyboard Trap").
    // É a A17 valendo para o próprio material.
    var v = new EditorView({
      doc: api.valor(),
      parent: api.hospede,
      extensions: [
        mods.core.basicSetup,
        linguagem,
        temaDoCurso(mods),
        EditorView.lineWrapping,
        EditorView.updateListener.of(function (u) {
          if (u.docChanged) aoMudar(u.state.doc.toString());
        })
      ]
    });

    api._cm = v;
    api.valor = function () { return v.state.doc.toString(); };
  }

  /* ----------------------------------------------------------- atelier */

  function montar(host) {
    var modo = host.dataset.modo || 'demo';
    var id = host.dataset.id || '';
    var chave = 'atelier:' + location.pathname + ':' + (id || Array.prototype.indexOf.call(
      document.querySelectorAll('.atelier'), host));

    var editavel = modo === 'exercicio' || modo === 'auditoria';

    var partes = {};
    host.querySelectorAll('template[data-papel]').forEach(function (t) {
      partes[t.dataset.papel] = dedent(t.innerHTML);
    });
    var enunciadoNo = host.querySelector('[data-papel="enunciado"]');
    var enunciadoHTML = enunciadoNo ? enunciadoNo.innerHTML : '';
    var dicaNo = host.querySelector('[data-papel="dica"]');
    var dicaHTML = dicaNo ? dicaNo.innerHTML : '';

    var listaAchados = null;
    var achadosNo = host.querySelector('[data-papel="achados"]');
    if (achadosNo) {
      listaAchados = Array.prototype.map.call(achadosNo.querySelectorAll('li'), function (li) {
        return { texto: li.innerHTML, real: li.dataset.real === 'sim', explica: li.dataset.explica || '' };
      });
      // Fisher–Yates embaralha objetos completos: a justificativa acompanha o item.
      // Não usa a classificação, que nem existe no HTML sanitizado do aluno.
      var ordemOriginal = listaAchados.slice();
      for (var i = listaAchados.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temporario = listaAchados[i];
        listaAchados[i] = listaAchados[j];
        listaAchados[j] = temporario;
      }
      if (listaAchados.length > 1 && listaAchados.every(function (item, indice) {
        return item === ordemOriginal[indice];
      })) listaAchados.push(listaAchados.shift());
    }

    var htmlBase = partes.html || '';
    var cssBase = partes.css || '';
    var editaveis = (host.dataset.edita || 'css').split(',').map(function (s) { return s.trim(); });
    var solucao = partes.solucao || null;
    // A solução pertence ao primeiro editor declarado. Antes ela era sempre
    // aplicada em CSS, o que quebrava exercícios data-edita="html" (como A2).
    var linguagemSolucao = editaveis[0];

    host.innerHTML = '';
    host.classList.add('atelier--pronto');

    /* cabeça */
    var cabeca = el('div', 'at-cabeca');
    cabeca.appendChild(el('span', 'at-selo',
      modo === 'exercicio' ? 'exercício' : modo === 'auditoria' ? 'auditoria' : 'demonstração'));
    if (host.dataset.titulo) cabeca.appendChild(el('p', 'at-titulo', host.dataset.titulo));
    host.appendChild(cabeca);

    if (enunciadoHTML) {
      var enun = el('div', 'at-enunciado');
      enun.innerHTML = enunciadoHTML;
      host.appendChild(enun);
    }

    var temMaterialProfessor = !!solucao || (listaAchados && listaAchados.some(function (item) {
      return !!item.explica;
    }));
    if (editavel && !temMaterialProfessor) {
      var dicas = el('details', 'at-dica');
      dicas.appendChild(el('summary', '', 'Dica de raciocínio — sem resposta'));
      var textoDica = el('div', 'at-dica-texto');
      textoDica.innerHTML = dicaHTML || (modo === 'auditoria'
        ? 'Examine uma afirmação de cada vez. Localize a regra citada, compare-a ao requisito e teste a hipótese na prévia. Nem toda técnica diferente é um erro; registre a evidência, não uma sequência de marcações.'
        : 'Divida o enunciado em requisitos observáveis. Altere uma regra por vez, compare o resultado antes e depois e teste larguras diferentes. Uma aparência melhor não basta: confira todos os requisitos.');
      dicas.appendChild(textoDica);
      host.appendChild(dicas);
    }

    var corpo = el('div', 'at-corpo');
    var editorCol = el('div', 'at-editor');
    var previewCol = el('div', 'at-preview');

    /* preview */
    var barra = el('div', 'at-barra');
    var slider = el('input', 'at-slider');
    slider.type = 'range';
    slider.min = host.dataset.vpMin || '320';
    slider.max = host.dataset.vpMax || '1280';
    slider.value = host.dataset.vp || '390';
    slider.setAttribute('aria-label', 'Largura do viewport, em pixels');
    var leitura = el('output', 'at-leitura');
    barra.appendChild(slider);
    barra.appendChild(leitura);

    var palco = el('div', 'at-palco');
    var moldura = el('div', 'at-moldura');
    var frame = el('iframe', 'at-frame');
    frame.title = modo === 'demo' ? 'Demonstração' : 'Resultado do seu código';
    moldura.appendChild(frame);
    palco.appendChild(moldura);
    previewCol.appendChild(barra);
    previewCol.appendChild(palco);

    var estado = { html: htmlBase, css: cssBase };

    function pintar() {
      if (host.hasAttribute('data-documento')) {
        var documento = estado.html;
        if (estado.css && /<\/head>/i.test(documento)) {
          documento = documento.replace(/<\/head>/i, '<style>' + estado.css + '</style></head>');
        }
        frame.srcdoc = documento;
        return;
      }
      frame.srcdoc =
        '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">' +
        '<meta name="viewport" content="width=device-width, initial-scale=1">' +
        '<style>*,*::before,*::after{box-sizing:border-box}' +
        'body{margin:0;font:16px/1.5 ui-sans-serif,-apple-system,"Segoe UI",Roboto,sans-serif;color:#1a1a1a;background:#fff}' +
        '</style><style>' + estado.css + '</style></head><body>' + estado.html + '</body></html>';
    }

    var timer = null;
    function pintarDepois() {
      clearTimeout(timer);
      timer = setTimeout(function () { pintar(); salvar(); }, 250);
    }

    function salvar() {
      if (!editavel) return;
      try {
        localStorage.setItem(chave, JSON.stringify(estado));
        marcarEstado('salvo');
      } catch (e) { /* modo privado, cota cheia: seguir sem salvar */ }
    }

    /* editor */
    var editores = {};
    if (editavel) {
      var abas = el('div', 'at-abas');
      if (editaveis.length < 2) abas.classList.add('at-abas--unica');
      abas.setAttribute('role', 'tablist');
      editorCol.appendChild(abas);

      // restaura trabalho anterior antes de montar
      try {
        var salvo = JSON.parse(localStorage.getItem(chave) || 'null');
        if (salvo) {
          editaveis.forEach(function (k) { if (salvo[k] != null) estado[k] = salvo[k]; });
        }
      } catch (e) { /* ignorar */ }

      editaveis.forEach(function (ling, i) {
        var aba = el('button', 'at-aba', ling.toUpperCase());
        aba.type = 'button';
        aba.setAttribute('role', 'tab');
        aba.setAttribute('aria-selected', String(i === 0));

        var painel = el('div', 'at-painel');
        painel.hidden = i !== 0;

        editores[ling] = montarEditor(painel, estado[ling], ling, function (v) {
          estado[ling] = v;
          pintarDepois();
        });

        aba.addEventListener('click', function () {
          abas.querySelectorAll('.at-aba').forEach(function (b) { b.setAttribute('aria-selected', 'false'); });
          editorCol.querySelectorAll('.at-painel').forEach(function (p) { p.hidden = true; });
          aba.setAttribute('aria-selected', 'true');
          painel.hidden = false;
        });

        abas.appendChild(aba);
        editorCol.appendChild(painel);
      });

      corpo.appendChild(editorCol);
    }

    corpo.appendChild(previewCol);
    host.appendChild(corpo);

    /* ações */
    var marcarEstado = function () {};
    if (editavel) {
      var acoes = el('div', 'at-acoes');

      // Estado compartilhado pelos botões Reiniciar e Ver solução. Sem isto,
      // reiniciar enquanto a solução estava aberta restaurava o código base,
      // mas deixava o botão em "Voltar ao meu"; o clique seguinte ressuscitava
      // um rascunho antigo e parecia desfazer o reinício.
      var bSolucao = null;
      var meu = null;

      var bReiniciar = el('button', 'at-btn', 'Reiniciar');
      bReiniciar.type = 'button';
      bReiniciar.addEventListener('click', function () {
        estado.html = htmlBase;
        estado.css = cssBase;
        editaveis.forEach(function (k) { editores[k].define(estado[k]); });
        try { localStorage.removeItem(chave); } catch (e) {}
        if (bSolucao) {
          bSolucao.setAttribute('aria-pressed', 'false');
          bSolucao.textContent = 'Ver solução';
          meu = null;
        }
        pintar();
        marcarEstado('reiniciado');
      });
      acoes.appendChild(bReiniciar);

      if (solucao) {
        bSolucao = el('button', 'at-btn', 'Ver solução');
        bSolucao.type = 'button';
        bSolucao.setAttribute('aria-pressed', 'false');
        bSolucao.addEventListener('click', function () {
          var mostrando = bSolucao.getAttribute('aria-pressed') === 'true';
          if (!mostrando) {
            meu = editores[linguagemSolucao]
              ? editores[linguagemSolucao].valor()
              : estado[linguagemSolucao];
            estado[linguagemSolucao] = solucao;
            if (editores[linguagemSolucao]) editores[linguagemSolucao].define(solucao);
            bSolucao.setAttribute('aria-pressed', 'true');
            bSolucao.textContent = 'Voltar ao meu';
            marcarEstado('mostrando a solução');
          } else {
            estado[linguagemSolucao] = meu;
            if (editores[linguagemSolucao]) editores[linguagemSolucao].define(meu);
            bSolucao.setAttribute('aria-pressed', 'false');
            bSolucao.textContent = 'Ver solução';
            marcarEstado('seu código');
          }
          pintar();
        });
        acoes.appendChild(bSolucao);
      }

      var bExpandir = el('button', 'at-btn', 'Expandir prévia');
      bExpandir.type = 'button';
      bExpandir.setAttribute('aria-pressed', 'false');
      bExpandir.addEventListener('click', function () {
        var aberto = host.classList.toggle('atelier--expandido');
        bExpandir.setAttribute('aria-pressed', String(aberto));
        bExpandir.textContent = aberto ? 'Mostrar editor' : 'Expandir prévia';
      });
      acoes.appendChild(bExpandir);

      var selo = el('span', 'at-modo-editor', 'textarea');
      acoes.appendChild(selo);

      var estadoNo = el('span', 'at-estado', '');
      estadoNo.setAttribute('role', 'status');
      acoes.appendChild(estadoNo);
      marcarEstado = function (t) { estadoNo.textContent = t; };

      host.appendChild(acoes);

      /* camada 3: promove para CodeMirror se a rede deixar */
      carregarCM().then(function (mods) {
        if (!mods) return;
        try {
          editaveis.forEach(function (ling) {
            promoverParaCM(editores[ling], mods, function (v) {
              estado[ling] = v;
              pintarDepois();
            });
          });
          host.classList.add('atelier--cm');
          selo.textContent = 'CodeMirror 6';
        } catch (e) {
          /* promoção falhou: o textarea já está de pé, nada a fazer */
        }
      });
    }

    /* O iframe renderiza SEMPRE na largura pedida — é isso que faz a media
       query disparar na largura verdadeira. Quando não cabe no painel, ele é
       reduzido por transform e o fator aparece ao lado. A alternativa (deixar
       max-width:100% cortar) faria o slider mentir: arrastar até 1280px num
       painel de 400px não mudaria nada. */
    /* Auditoria: a lista de achados.
       Entre os achados verdadeiros vão DECOYS — objeções plausíveis que não são
       problema nenhum. É a parte difícil e a que importa: revisar resposta de IA
       exige separar erro real de reclamação decorada. Uma lista só de acertos
       treinaria o aluno a marcar tudo. */
    if (modo === 'auditoria' && listaAchados) {
      var temGabarito = listaAchados.some(function (i) { return i.explica; });
      var box = el('div', 'at-achados');
      var titulo = el('p', 'at-achados-titulo', temGabarito
        ? 'O que está errado aqui?'
        : 'Marque para discutir com o professor');
      box.appendChild(titulo);

      var itens = [];
      listaAchados.forEach(function (dados) {
        var linha = el('div', 'at-achado');
        var btn = el('button', 'at-achado-btn');
        btn.type = 'button';
        btn.innerHTML = dados.texto;
        btn.setAttribute('aria-pressed', 'false');
        var veredito = el('p', 'at-achado-veredito');

        btn.addEventListener('click', function () {
          if (!temGabarito) {
            var marcado = linha.classList.toggle('selecionado');
            btn.setAttribute('aria-pressed', String(marcado));
            atualizarRegistro();
            return;
          }
          if (linha.dataset.julgado) return;
          linha.dataset.julgado = '1';
          linha.dataset.real = dados.real ? 'sim' : 'nao';
          btn.disabled = true;
          veredito.innerHTML = (dados.real ? '<b>É problema.</b> ' : '<b>Não é problema.</b> ') + dados.explica;
          veredito.classList.add('visivel');
          placar();
        });

        linha.appendChild(btn);
        linha.appendChild(veredito);
        box.appendChild(linha);
        itens.push({ linha: linha, real: dados.real });
      });

      var resumo = el('p', 'at-achados-placar');
      resumo.setAttribute('role', 'status');
      box.appendChild(resumo);

      function atualizarRegistro() {
        if (temGabarito) return;
        var quantidade = itens.filter(function (i) {
          return i.linha.classList.contains('selecionado');
        }).length;
        resumo.classList.toggle('registrado', quantidade > 0);
        if (!quantidade) {
          resumo.textContent = 'Nenhum item marcado para discussão.';
          return;
        }
        resumo.textContent = quantidade + (quantidade === 1
          ? ' item marcado para discussão. '
          : ' itens marcados para discussão. ') +
          'Resposta registrada. ' +
          'A correção será apresentada após o fim do exercício.';
      }

      if (!temGabarito) atualizarRegistro();

      function placar() {
        var julgados = itens.filter(function (i) { return i.linha.dataset.julgado; });
        var reaisMarcados = julgados.filter(function (i) { return i.real; }).length;
        var reaisTotal = itens.filter(function (i) { return i.real; }).length;
        var falsosMarcados = julgados.filter(function (i) { return !i.real; }).length;
        var txt = reaisMarcados + ' de ' + reaisTotal + ' problemas reais encontrados';
        if (falsosMarcados) txt += ' · ' + falsosMarcados + ' alarme(s) falso(s)';
        resumo.textContent = txt;
      }

      host.appendChild(box);
    }

    function aplicarLargura() {
      var w = parseInt(slider.value, 10);
      var min = parseInt(slider.min, 10);
      var max = parseInt(slider.max, 10);

      var estilo = getComputedStyle(palco);
      var respiro = parseFloat(estilo.paddingLeft) + parseFloat(estilo.paddingRight);
      var disponivel = palco.clientWidth - respiro;
      var escala = disponivel > 0 ? Math.min(1, disponivel / w) : 1;

      palco.style.setProperty('--at-w', w + 'px');
      palco.style.setProperty('--at-e', escala.toFixed(4));
      slider.style.setProperty('--at-pct', ((w - min) / (max - min) * 100).toFixed(1) + '%');

      leitura.textContent = w + 'px — ' + rotuloPara(w);
      if (escala < 0.995) {
        var reduzido = el('span', 'at-escala', '  ·  ' + Math.round(escala * 100) + '%');
        leitura.appendChild(reduzido);
      }
    }

    slider.addEventListener('input', aplicarLargura);

    // O painel muda de largura quando a janela muda, quando a lateral some no
    // modo apresentação e quando o layout do atelier troca de uma para duas
    // colunas. A escala tem que reagir a tudo isso, não só ao slider.
    if (window.ResizeObserver) {
      new ResizeObserver(aplicarLargura).observe(palco);
    } else {
      window.addEventListener('resize', aplicarLargura);
    }

    aplicarLargura();
    pintar();
  }

  function iniciar() { document.querySelectorAll('.atelier').forEach(montar); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
