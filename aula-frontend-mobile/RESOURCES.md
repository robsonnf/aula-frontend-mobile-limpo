# Desenvolvimento Web Mobile — Resources

Fontes de alta confiança para fundamentar as 22 aulas. Regra deste workspace:
**nenhuma afirmação em lesson sem citação daqui.** Blog de SEO, "guia definitivo
2026" e conteúdo de agência ficam de fora — vários deles erraram a versão atual do
WordPress na checagem de 2026-08-27.

## Knowledge

### Referência normativa da plataforma

- [MDN Web Docs](https://developer.mozilla.org/pt-BR/docs/Web)
  Referência primária de HTML, CSS e JS. Mantida por Mozilla + Google + Microsoft +
  Samsung (Open Web Docs). Tem tradução PT-BR parcial — sempre confira o inglês
  quando a página PT estiver marcada como desatualizada.
  Usar para: sintaxe, semântica, tabela de compatibilidade de qualquer feature.
- [MDN — Guia de CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout)
  Usar para: A8 (Grid). Os guias `Basic concepts` e `Auto-placement` são a espinha da aula.
- [MDN — Conceitos básicos de Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Basic_concepts)
  Usar para: A8. Linhas, trilhas, células, áreas, grades explícita e implícita e unidade `fr`.
- [MDN — Auto-placement em Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Auto-placement)
  Usar para: A8. Criação automática de trilhas, `repeat()`, `auto-fit` e `minmax()`.
- [MDN — Grid e acessibilidade](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Accessibility)
  Usar para: A8. Diferença entre colocação visual, ordem da fonte e navegação sequencial.
- [CSS Grid Layout Module Level 2](https://www.w3.org/TR/css-grid-2/)
  Usar para: A8. Definições normativas de grade, trilhas, mínimos e reordenação.
- [MDN — Guia de Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout)
  Usar para: A7 (Flexbox), especialmente `Basic concepts` e `Aligning items`.
- [MDN — Proporções dos itens flex](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Controlling_flex_item_ratios)
  Usar para: A7. Tamanho natural, espaço livre, `flex-basis`, crescimento e redução.
- [MDN — Ordenação de itens flex](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Ordering_items)
  Usar para: A7. Diferença entre ordem visual, ordem da fonte e navegação sequencial.
- [CSS Flexible Box Layout Module Level 1](https://www.w3.org/TR/css-flexbox-1/)
  Usar para: A7. Definição normativa do mínimo automático dos itens e proibição de
  usar `order` ou direções reversas como substituto de uma ordem lógica correta.
- [MDN — Viewport meta tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport)
  Usar para: A2. Documenta explicitamente por que `user-scalable=no` é hostil à acessibilidade.
- [MDN — Semantics](https://developer.mozilla.org/en-US/docs/Glossary/Semantics)
  Usar para: A2. Separa significado/estrutura de apresentação e comportamento.
- [MDN — HTML elements reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements)
  Usar para: A2. Referência dos papéis de `header`, `nav`, `main`, `section`,
  `article`, `footer` e dos elementos de título.
- [MDN — Document and website structure](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Structuring_documents)
  Usar para: A2. Guia aplicado de regiões semânticas e hierarquia do documento.
- [MDN — Baseline (glossário)](https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility)
  Usar para: A3 (retrocompatibilidade). Define `newly available` vs `widely available` (30 meses).
- [Can I use](https://caniuse.com/)
  Usar para: A3. Dado de suporte por navegador/versão, com uso real por região — dá para filtrar Brasil.

### Método e arquitetura front-end

- [web.dev — Learn Responsive Design](https://web.dev/learn/design)
  Curso da equipe do Chrome, por Jeremy Keith. Usar para: A1, A11, A12. É a fonte
  mais limpa sobre macro/micro layout e breakpoints derivados do conteúdo.
- [web.dev — Learn CSS](https://web.dev/learn/css)
  Usar para: bloco A4–A10. Bom para cascata, especificidade e herança sem folclore.
- [MDN — `<color>`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value)
  Usar para: A9. Formatos de cor CSS, alfa, espaços de cor e considerações de acessibilidade.
- [MDN — Usando gradientes CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Images/Using_gradients)
  Usar para: A9. Gradientes lineares, radiais, cônicos, stops e camadas.
- [MDN — `transform`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transform)
  Usar para: A9/A10. Funções de transformação, ordem, origem e contexto de empilhamento.
- [CSS Transforms Module Level 1](https://www.w3.org/TR/css-transforms-1/)
  Usar para: A9. Efeito após layout, preservação do fluxo, overflow e containing block.
- [W3C WAI — Uso de cor](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)
  Usar para: A9/A17. Cor não pode ser o único meio visual de comunicar informação.
- [W3C WAI — Contraste mínimo](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
  Usar para: A9/A17. 4,5:1 para texto comum e 3:1 para texto grande no nível AA.
- [MDN — Usando transições CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Transitions/Using)
  Usar para: A10. Propriedades, duração, timing function, atraso e eventos de transição.
- [MDN — `animation`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation)
  Usar para: A10. Shorthand, keyframes, iterações, direção, fill mode e acessibilidade.
- [MDN — Propriedades animáveis](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations/Animatable_properties)
  Usar para: A10. Tipos de interpolação e verificação por propriedade.
- [MDN — `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion)
  Usar para: A10/A17. Preferência informada pelo sistema e camada reduzida por componente.
- [CSS Animations Level 1](https://www.w3.org/TR/css-animations-1/)
  Usar para: A10. Definições normativas da linha do tempo, iterações e fill mode.
- [W3C WAI — Pausar, parar, ocultar](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
  Usar para: A10/A17. Controle para movimento automático prolongado apresentado com conteúdo.
- [MDN — Usando media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using)
  Usar para: A11. Tipos, features, operadores lógicos e sintaxe de faixas.
- [MDN — Fundamentos de media queries](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Media_queries)
  Usar para: A11. Estratégia mobile-first e escolha de breakpoints pelo conteúdo.
- [MDN — feature width](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/width)
  Usar para: A11. Largura do viewport ou caixa da página, não largura física do aparelho.
- [Media Queries Level 5](https://www.w3.org/TR/mediaqueries-5/)
  Usar para: A11. Features de faixa e discretas, hover, pointer e comparações.
- [web.dev — Media queries](https://web.dev/learn/design/media-queries)
  Usar para: A11. Breakpoints derivados do conteúdo em vez de catálogos de dispositivos.
- [MDN — Introduction to the CSS cascade](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction)
  Usar para: A4. Ordem normativa da cascata: relevância, origem/importância/camada,
  especificidade, proximidade de escopo e ordem de aparição.
- [MDN — Specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Specificity)
  Usar para: A4. Peso de IDs, classes, tipos e comportamento de `:is()`, `:not()`,
  `:has()` e `:where()`.
- [MDN — Inheritance](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Inheritance)
  Usar para: A4. Propriedades herdadas e valores globais como `inherit`, `initial`,
  `unset` e `revert`.
- [MDN — Selectors and combinators](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Selectors/Selectors_and_combinators)
  Usar para: A4. Seletores de atributo e combinadores descendente, filho e irmãos.
- [MDN — Pseudo-classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Pseudo-classes)
  Usar para: A5. Índice normativo de estados de interação, formulários, estrutura e
  pseudo-classes funcionais.
- [MDN — Pseudo-elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Pseudo-elements)
  Usar para: A5. Partes tipográficas, marcadores, seleção e conteúdo gerado.
- [MDN — `:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-visible)
  Usar para: A5. Heurística do agente para indicação de foco e orientação de
  acessibilidade para navegação por teclado.
- [MDN — `::before`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::before)
  Usar para: A5. Caixa gerada, sintaxe, limitações em elementos substituídos e alerta
  de que conteúdo gerado não é exposto de forma confiável a leitores de tela.
- [MDN — CSS values and units](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units)
  Usar para: A6. Unidades absolutas, relativas à fonte, percentuais e viewport.
- [MDN — `<length>`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length)
  Usar para: A6. Relações entre unidades absolutas, píxel CSS, `em`/`rem`, `ch` e
  unidades de viewport pequenas, grandes e dinâmicas.
- [MDN — CSS numeric data types](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Values_and_units/Numeric_data_types)
  Usar para: A6. Percentuais dependentes da propriedade e funções matemáticas como
  `min()`, `max()` e `clamp()`.
- [MDN — Progressive enhancement (glossário)](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement)
  Usar para: A3. Base da distinção enhancement × graceful degradation.
- [MDN — CSS error handling](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_syntax/Error_handling)
  Usar para: A3. Explica como declarações inválidas ou desconhecidas são ignoradas
  e por que fallbacks podem ser organizados pela cascata.
- [MDN — `@supports`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@supports)
  Usar para: A3. Referência de feature queries e condições de suporte.
- [Autoprefixer — documentação oficial](https://github.com/postcss/autoprefixer)
  Usar para: A3. Prefixos gerados por dados e navegadores-alvo; não é polyfill.
- [web.dev — Baseline 2026](https://web.dev/baseline/2026)
  Usar para: A3. O que virou seguro de usar neste ano; alimenta a discussão de prefixos.

### Acessibilidade

- [WCAG 2.2 (W3C Recommendation, 05/10/2023)](https://www.w3.org/TR/WCAG22/)
  Norma vigente. 86 critérios de sucesso, 4 princípios, níveis A/AA/AAA.
  Usar para: A17. Referência normativa — cite o número do critério, não a paráfrase.
- [W3C WAI — What's New in WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/)
  Usar para: A17. Os 9 critérios novos; vários são de alvo de toque e foco — mobile puro.
- [W3C WAI — Tutorials](https://www.w3.org/WAI/tutorials/)
  Usar para: A17. Padrões prontos de menu, formulário, tabela e imagem, com o porquê.
- [MDN — ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
  Usar para: A17. E a primeira regra do ARIA: não use ARIA se um elemento nativo serve.

### SEO

- [Google Search Central — Documentação](https://developers.google.com/search/docs)
  Fonte primária. Usar para: A18. Tudo que não estiver aqui é opinião de mercado.
- [Google Search Central — Mobile-first indexing](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing)
  Usar para: A1 e A18. Rollout concluído em 05/07/2024 — hoje é 100% dos sites, sem exceção de desktop.
- [Google Search Central — SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
  Usar para: A18. O escopo honesto do on-page; corta a maior parte do mito de SEO.

### Performance e otimização

- [web.dev — Core Web Vitals](https://web.dev/articles/vitals)
  Usar para: A18/A19. LCP ≤ 2,5s · INP ≤ 200ms · CLS ≤ 0,1, avaliados no percentil 75 de
  dados reais de usuário. INP substituiu o FID em 12/03/2024.
- [web.dev — Fast load times](https://web.dev/explore/fast)
  Usar para: A19. Compressão de texto, formatos de imagem, lazy-load.
- [Chrome DevTools docs](https://developer.chrome.com/docs/devtools)
  Usar para: praticamente toda aula. Device mode, throttling, coverage, performance panel.

### Framework e biblioteca

- [Bootstrap 5.3 — Documentação oficial](https://getbootstrap.com/docs/5.3/)
  Versão estável atual: 5.3.8 (26/08/2025). Usar para: A13, A14.
  A v6 está em alpha — não é a linha a ensinar.
- [Bootstrap — Versões](https://getbootstrap.com/docs/versions/)
  Usar para: A13. Mostrar à turma que docs de v3/v4 ainda estão no ar — e que é
  daí que vem metade do código errado que eles vão achar no Google.
- [jQuery API](https://api.jquery.com/)
  Usar para: A16. jQuery em si segue mantido.
- [jQuery Blog — Deprecação do jQuery Mobile (07/10/2021)](https://blog.jquery.com/2021/10/07/jquery-maintainers-continue-modernization-initiative-with-deprecation-of-jquery-mobile/)
  Usar para: A16. Anúncio oficial. jQuery Mobile é projeto **Emeritus** na OpenJS
  Foundation: arquivado, sem correção de segurança. A ementa cita "jQuery – funcionalidades
  para mobile"; a resposta honesta exige esta fonte.

### CMS

- [WordPress — Releases](https://wordpress.org/download/releases/)
  Versão atual verificada em 27/08/2026: **7.1** (19/08/2026). Usar para: A20.
  Confira antes de cada semestre — blog de terceiro erra isso o tempo todo.
- [WordPress Developer Resources](https://developer.wordpress.org/)
  Usar para: A20, A21. Theme Handbook, Plugin Handbook e Block Editor Handbook.
- [WordPress Theme Handbook — Child Themes](https://developer.wordpress.org/themes/advanced-topics/child-themes/)
  Usar para: A21. O caminho correto de customização sem perder tudo no update.
- [WordPress — Requisitos](https://wordpress.org/about/requirements/)
  Usar para: A20. PHP/MySQL/MariaDB mínimos — é o item "requisitos básicos" da ementa.

### Testes

- [Playwright — Documentação](https://playwright.dev/docs/intro)
  Usar para: A22. Roda Chromium, Firefox e WebKit com um arquivo de teste, em modo
  desktop e mobile — cobre "compatibilidade com navegadores" e "adequações para
  responsividade" da ementa de uma vez.
- [Playwright — Emulação de dispositivo](https://playwright.dev/docs/emulation)
  Usar para: A22. Viewport, `deviceScaleFactor`, `isMobile`, `hasTouch`.
- [Deque — axe-core](https://github.com/dequelabs/axe-core)
  Usar para: A17, A22. Motor por trás do axe DevTools e do `@axe-core/playwright`.
  **Advertência a passar à turma:** teste automatizado pega ~30–40% das violações
  reais de WCAG. O resto é humano.
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview)
  Usar para: A19, A22. Auditoria de performance, a11y, SEO e boas práticas.

## Wisdom (Communities)

Para os alunos — testar a habilidade fora da sala:

- [Frontend Brasil (Discord)](https://frontendbr.com.br/) — comunidade PT-BR ativa,
  com canais de dúvida e revisão de código. Usar para: pedir crítica do projeto integrador.
- [r/webdev](https://reddit.com/r/webdev) — volume alto, sinal médio. Usar para: panorama de mercado.
- [r/css](https://reddit.com/r/css) — melhor lugar para "por que meu layout quebrou".
- [Stack Overflow em Português](https://pt.stackoverflow.com/) — usar para dúvida
  fechada e reproduzível. Ensinar a turma a escrever pergunta com MCVE é parte da aula.
- [WordPress.org — Fóruns de suporte (PT-BR)](https://br.wordpress.org/support/) — usar para: A20/A21.

Para o Leo — como professor:

- [Comunidade MDN / Open Web Docs](https://github.com/mdn/content/discussions) —
  para checar se um comportamento mudou antes de ensiná-lo.

## Gaps

- **Material em PT-BR de alta confiança é escasso.** MDN PT-BR é parcial e às vezes
  desatualizado; web.dev e W3C são só em inglês. Consequência prática: as lessons
  precisam carregar a tradução conceitual, não só apontar o link. Isso é trabalho de
  Leo, não do aluno.
- **Não há fonte primária boa sobre "bibliotecas JS para mobile"** como categoria —
  o campo é fragmentado e as listas que existem são conteúdo de marketing. A aula A16
  precisa ensinar **critério de escolha** (peso, manutenção, acessibilidade, dependências)
  em vez de uma lista de bibliotecas que vai estar velha no semestre que vem.
- **Falta fonte primária sobre compressão de imagem** com números atuais de AVIF/WebP.
  Buscar antes de A19; enquanto isso, medir na mão com Squoosh e mostrar o resultado real.
- **Nenhum recurso avaliado ainda para a stack local de CMS multiplataforma**
  (XAMPP vs Local vs Docker vs `wp-env`). Decidir antes de A20 e registrar aqui.
