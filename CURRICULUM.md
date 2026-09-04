# Grade — 22 encontros × 3h = 66h

Mapeia a ementa nas 22 aulas. Coluna **Ementa** cita o item que a aula quita, para
que nenhuma área do edital fique órfã.

## Como uma aula de 3h é montada

Cada encontro tem a mesma forma, porque previsibilidade é o que deixa a turma
gastar memória de trabalho no conteúdo e não no formato:

| Bloco | Tempo | O que acontece |
|---|---|---|
| Retomada | 15 min | Recuperação ativa da aula anterior. Perguntas, sem consulta. Nunca é revisão expositiva. |
| Exposição 1 | 40 min | Conhecimento novo, com demo ao vivo. |
| Prática 1 | 30 min | Aluno faz. Feedback imediato. |
| Intervalo | 15 min | — |
| Exposição 2 | 35 min | Segunda metade do conteúdo. |
| Prática 2 / Projeto | 40 min | Aplicação no projeto integrador. |
| Fechamento | 5 min | O que ficou de pé + o que vem. |

**Regra de retomada:** os 15 min iniciais nunca cobrem só a aula anterior. Intercalam
(interleaving) com uma aula de 3–4 encontros atrás. É o que converte fluência em
retenção de longo prazo.

## Projeto integrador — um site, cinco encarnações

Um único site real (institucional ou portfólio, tema escolhido pelo aluno na A1),
que atravessa o semestre e é reconstruído sob cada lente da ementa. Isso evita o
maior risco desta ementa: CMS, testes e otimização virarem módulos órfãos colados
no fim.

| Fase | Aulas | Entrega |
|---|---|---|
| F1 — À mão, mobile-first | A1–A12 | HTML semântico + CSS próprio, responsivo, zero framework. |
| F2 — Com framework | A13–A14 | A mesma home refeita em Bootstrap 5.3. Comparar peso, velocidade de escrita e controle. |
| F3 — Interativo | A15–A16 | Comportamento (menu, carrossel, formulário) com JS nativo; uma peça em jQuery para comparar. |
| F4 — Auditado | A17–A19 | Relatório de a11y (WCAG 2.2), SEO e performance do próprio site + correções aplicadas. |
| F5 — Publicado em CMS | A20–A21 | O site portado para WordPress como tema filho, no ar, com usuários administrativos configurados. |
| F6 — Testado e entregue | A22 | Suíte Playwright (cross-browser + viewports) verde + apresentação. |

## As 22 aulas

`bin/atualizar-indice.py` lê esta tabela e gera `assets/aulas.js`, que alimenta a
navegação lateral de todas as lessons. **Esta tabela é a fonte da verdade da grade** —
mexeu aqui, roda o script.

| # | Bloco | Aula | Ementa quitada |
|---|---|---|---|
| A1 | Fundamentos | Mobile-first: por que a ordem importa | Metodologias mobile |
| A2 | Fundamentos | HTML semântico e o `viewport` | HTML – viewport |
| A3 | Fundamentos | Progressive enhancement e retrocompatibilidade | Metodologias mobile; retrocompat., prefixos |
| A4 | CSS3 | Cascata, especificidade, herança e seletores complexos | CSS3 – seletores complexos |
| A5 | CSS3 | Pseudo-classes e pseudo-elementos | CSS3 – pseudo-classes, pseudo-elementos |
| A6 | CSS3 | Unidades absolutas e relativas | CSS3 – unidades de medida |
| A7 | CSS3 | Flexbox | CSS3 – flexbox |
| A8 | CSS3 | Grid | CSS3 – display grid |
| A9 | CSS3 | Cor, gradientes e `transform` | CSS3 – gradiente, transform |
| A10 | CSS3 | `transition`, `animation` e movimento acessível | CSS3 – transitions, animation |
| A11 | Responsividade | Media queries e estratégia de breakpoints | CSS3 – media queries; Responsividade |
| A12 | Responsividade | Imagens responsivas, tipografia fluida, container queries | Responsividade – técnicas |
| A13 | Bootstrap | Bootstrap 5.3 I: grid, breakpoints, utilities | Bootstrap – recursos mobile |
| A14 | Bootstrap | Bootstrap 5.3 II: componentes mobile e customização | Bootstrap – recursos mobile |
| A15 | JavaScript | DOM, eventos, delegação, `pointer` e `touch` | JavaScript – funcionalidades |
| A16 | JavaScript | jQuery e bibliotecas para mobile | JavaScript – bibliotecas; jQuery – mobile |
| A17 | Qualidade | Acessibilidade: WCAG 2.2 na prática | Acessibilidade |
| A18 | Qualidade | SEO para mobile | SEO |
| A19 | Qualidade | Otimização de front-end | Otimização de front end |
| A20 | CMS | Conceitos, requisitos, servidor local, banco, usuários | CMS – requisitos, servidor local, usuários |
| A21 | CMS | Tema filho, CSS, plug-ins, implantação e publicação | CMS – temas, plug-ins, publicação |
| A22 | Entrega | Testes: script, cross-browser, responsividade, automação | Testes em aplicações web |

## Decisões de grade que custaram algo — e o porquê

- **CSS3 leva 7 aulas (A4–A10).** É o maior item da ementa em número de subtópicos
  e é o que sustenta responsividade, Bootstrap e CMS depois. Cortar aqui derruba o resto.
- **Retrocompatibilidade e prefixos foram para a A3, junto com progressive enhancement.**
  São a mesma ideia — como lidar com a plataforma desigual — e ensinar juntas é mais
  barato que ensinar duas vezes. Custo: a A3 é densa.
- **jQuery e "bibliotecas para mobile" dividem a A16.** A ementa lista os dois; a
  resposta honesta a "jQuery Mobile" é que ele foi deprecado em 07/10/2021 e é
  projeto arquivado. Isso é 20 minutos de aula, não 3h. O resto do encontro vira
  critério de escolha de biblioteca, que envelhece muito mais devagar que uma lista.
- **Testes é uma aula só (A22), mas atravessa o curso.** Uma aula dedicada não segura
  a área; o que segura é fechar cada fase do projeto com uma verificação
  (DevTools na F1, Lighthouse na F4, Playwright na F6).
- **O que ficou de fora:** frameworks SPA, build tooling profundo, back-end. Ver
  `MISSION.md` → Out of scope.
