/* course.js — comportamento compartilhado das lessons.
   Progressive enhancement de verdade: sem este arquivo a lesson continua
   legível; o quiz vira lista de opções e as notas ficam ocultas.
   (É a própria A3 sendo praticada no material da disciplina.) */

(function () {
  'use strict';

  /* --- roteiro de fala: tecla N, ou o botão --------------------------- */
  function montarNotas() {
    if (!document.querySelector('.nota')) return;

    var btn = document.createElement('button');
    btn.className = 'notas-toggle';
    btn.type = 'button';
    btn.textContent = 'roteiro (N)';
    btn.setAttribute('aria-pressed', 'false');

    function alternar() {
      var on = document.body.classList.toggle('notas-visiveis');
      btn.setAttribute('aria-pressed', String(on));
    }

    btn.addEventListener('click', alternar);
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'n' && e.key !== 'N') return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      var alvo = e.target;
      if (alvo.closest('input, textarea, select, [contenteditable]')) return;
      alternar();
    });

    document.body.appendChild(btn);
  }

  /* --- quiz de recuperação ativa -------------------------------------
     Marcação esperada:
       <div class="quiz" data-explica="...">
         <p class="quiz-q">Pergunta</p>
         <ul class="quiz-opts">
           <li><button data-correta>Alternativa</button></li>
           <li><button>Alternativa</button></li>
         </ul>
         <p class="quiz-feedback"></p>
       </div>
     Feedback é imediato — é o que fecha o laço. Errar e ver o porquê na hora
     vale mais que acertar. */
  function montarQuizzes() {
    document.querySelectorAll('.quiz').forEach(function (quiz) {
      var feedback = quiz.querySelector('.quiz-feedback');
      // Sem JS, as alternativas continuam sendo uma lista legível. Com JS,
      // cada <li> vira botão. Antes o código procurava botões inexistentes.
      quiz.querySelectorAll('.quiz-opts > li').forEach(function (li) {
        var b = document.createElement('button');
        b.type = 'button';
        b.innerHTML = li.innerHTML;
        b.setAttribute('aria-pressed', 'false');
        if (li.hasAttribute('data-correta')) b.setAttribute('data-correta', '');
        li.removeAttribute('data-correta');
        li.replaceChildren(b);
      });

      var botoes = quiz.querySelectorAll('.quiz-opts button');
      var temGabarito = Array.prototype.some.call(botoes, function (b) {
        return b.hasAttribute('data-correta');
      });
      if (!temGabarito) {
        var dica = document.createElement('details');
        dica.className = 'at-dica';
        var resumoDica = document.createElement('summary');
        resumoDica.textContent = 'Dica de raciocínio — sem resposta';
        var textoDica = document.createElement('p');
        textoDica.textContent = quiz.dataset.dica || 'Releia a pergunta e compare cada alternativa ao conceito estudado. Procure uma justificativa e um exemplo que confirmem ou contradigam cada hipótese antes de registrar sua escolha.';
        dica.append(resumoDica, textoDica);
        quiz.appendChild(dica);
      }
      function registrarEscolha(indice) {
        botoes.forEach(function (outro, i) {
          outro.dataset.state = i === indice ? 'selecionado' : '';
          outro.setAttribute('aria-pressed', String(i === indice));
        });
        if (feedback) {
          feedback.textContent = 'Resposta registrada. A correção será apresentada após o fim do exercício.';
          feedback.classList.add('visivel');
          feedback.setAttribute('role', 'status');
        }
      }

      botoes.forEach(function (b, indice) {
        b.addEventListener('click', function () {
          if (!temGabarito) {
            registrarEscolha(indice);
            return;
          }
          var acertou = b.hasAttribute('data-correta');

          botoes.forEach(function (outro) {
            outro.dataset.state = outro.hasAttribute('data-correta') ? 'certo' : 'errado';
            outro.setAttribute('aria-pressed', String(outro === b));
            outro.disabled = true;
          });

          if (feedback) {
            feedback.textContent = (acertou ? '✓ ' : '✗ ') + (quiz.dataset.explica || '');
            feedback.classList.add('visivel');
            feedback.setAttribute('role', 'status');
          }
        });
      });

    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { montarNotas(); montarQuizzes(); });
  } else {
    montarNotas();
    montarQuizzes();
  }
})();
