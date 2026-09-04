/* shell.js — casca de curso: navegação lateral + modo apresentação.

   A lesson é escrita como um documento simples: conteúdo direto no <body>.
   Este script embrulha esse conteúdo numa casca de curso. Ou seja, as 22
   lessons não repetem markup de navegação — a grade vive em CURRICULUM.md,
   vira assets/aulas.js e é lida aqui.

   Sem JS: nada disto acontece e a aula continua sendo um documento legível,
   com todo o conteúdo. A navegação é enhancement, não requisito.

   Modo apresentação (tecla P): esconde a lateral e aumenta o corpo. A lateral
   serve quem lê sozinho e atrapalha quem projeta — em vez de escolher um dos
   dois usos, uma tecla alterna. O estado fica em localStorage.
*/

(function () {
  'use strict';

  var CHAVE_MODO = 'curso:apresentacao';

  function el(tag, cls, txt) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  }

  function aulaAtual() {
    var arq = location.pathname.split('/').pop();
    if (!window.AULAS) return null;
    for (var i = 0; i < window.AULAS.length; i++) {
      if (window.AULAS[i].arquivo === arq) return window.AULAS[i];
    }
    return null;
  }

  function montarLateral(atual) {
    var aside = el('aside', 'curso-lateral');
    aside.id = 'curso-lateral';
    aside.setAttribute('aria-label', 'Aulas do curso');

    var topo = el('div', 'lateral-topo');
    topo.appendChild(el('p', 'lateral-curso', 'Desenvolvimento Web Mobile'));
    topo.appendChild(el('p', 'lateral-carga', '22 aulas · 66h'));
    aside.appendChild(topo);

    if (!window.AULAS) return aside;

    var lista = el('ol', 'lateral-aulas');
    var blocoAtual = null;

    window.AULAS.forEach(function (a) {
      if (a.bloco !== blocoAtual) {
        blocoAtual = a.bloco;
        var cab = el('li', 'lateral-bloco');
        cab.appendChild(el('span', null, blocoAtual));
        lista.appendChild(cab);
      }

      var li = el('li', 'lateral-aula');
      var ehAtual = atual && a.n === atual.n;
      if (ehAtual) li.classList.add('e-atual');
      if (!a.disponivel) li.classList.add('indisponivel');

      var num = el('span', 'lateral-num', 'A' + a.n);
      var alvo;

      if (a.disponivel && !ehAtual) {
        alvo = el('a');
        alvo.href = a.arquivo;
      } else {
        // Aula ainda não escrita, ou é esta. Vira texto — link que dá 404 na
        // mão do aluno é pior que nenhum link.
        alvo = el('span');
      }
      alvo.className = 'lateral-titulo';
      alvo.innerHTML = a.titulo;
      if (ehAtual) alvo.setAttribute('aria-current', 'page');
      if (!a.disponivel) alvo.title = 'Ainda não disponível neste pacote';

      li.appendChild(num);
      li.appendChild(alvo);

      if (ehAtual) {
        var sec = montarSecoes();
        if (sec) li.appendChild(sec);
      }

      lista.appendChild(li);
    });

    aside.appendChild(lista);
    return aside;
  }

  /* Sumário da aula corrente, a partir dos <h2>. */
  function montarSecoes() {
    var h2s = document.querySelectorAll('main.curso-conteudo h2, body > h2');
    if (h2s.length < 2) return null;

    var ol = el('ol', 'lateral-secoes');
    h2s.forEach(function (h, i) {
      if (!h.id) h.id = 'sec-' + (i + 1);
      var li = el('li');
      var a = el('a', null, h.textContent.replace(/^\d+\.\s*/, ''));
      a.href = '#' + h.id;
      a.dataset.alvo = h.id;
      li.appendChild(a);
      ol.appendChild(li);
    });
    return ol;
  }

  function ligarScrollspy(aside) {
    var links = aside.querySelectorAll('.lateral-secoes a');
    if (!links.length || !window.IntersectionObserver) return;

    var porId = {};
    links.forEach(function (a) { porId[a.dataset.alvo] = a; });

    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        var a = porId[e.target.id];
        if (!a) return;
        if (e.isIntersecting) {
          links.forEach(function (o) { o.removeAttribute('aria-current'); });
          a.setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-10% 0px -75% 0px' });

    Object.keys(porId).forEach(function (id) {
      var h = document.getElementById(id);
      if (h) obs.observe(h);
    });
  }

  function montar() {
    var atual = aulaAtual();

    var app = el('div', 'curso-app');
    var main = el('main', 'curso-conteudo');
    main.id = 'conteudo';

    while (document.body.firstChild) main.appendChild(document.body.firstChild);

    var aside = montarLateral(atual);
    app.appendChild(aside);
    app.appendChild(main);
    document.body.appendChild(app);

    // secções só existem depois do conteúdo estar em main
    var li = aside.querySelector('.lateral-aula.e-atual');
    if (li && !li.querySelector('.lateral-secoes')) {
      var sec = montarSecoes();
      if (sec) li.appendChild(sec);
    }
    ligarScrollspy(aside);

    /* pular para o conteúdo — teclado primeiro */
    var pular = el('a', 'pular-para', 'Pular para o conteúdo');
    pular.href = '#conteudo';
    document.body.insertBefore(pular, app);

    /* abrir/fechar no celular */
    var hamb = el('button', 'lateral-botao');
    hamb.type = 'button';
    hamb.setAttribute('aria-expanded', 'false');
    hamb.setAttribute('aria-controls', 'curso-lateral');
    hamb.innerHTML = '<span aria-hidden="true">☰</span> Aulas';
    hamb.addEventListener('click', function () {
      var aberto = document.body.classList.toggle('lateral-aberta');
      hamb.setAttribute('aria-expanded', String(aberto));
    });
    document.body.insertBefore(hamb, app);

    aside.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        document.body.classList.remove('lateral-aberta');
        hamb.setAttribute('aria-expanded', 'false');
      }
    });

    /* modo apresentação */
    function aplicarModo(on) {
      document.body.classList.toggle('modo-apresentacao', on);
      try { localStorage.setItem(CHAVE_MODO, on ? '1' : '0'); } catch (e) {}
    }
    try {
      if (localStorage.getItem(CHAVE_MODO) === '1') aplicarModo(true);
    } catch (e) {}

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'p' && e.key !== 'P') return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.target.closest('input, textarea, select, [contenteditable], .cm-editor')) return;
      aplicarModo(!document.body.classList.contains('modo-apresentacao'));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', montar);
  } else {
    montar();
  }
})();
