# Avaliação e uso de IA

## A premissa

Detectar IA não funciona e não vai funcionar. Proibir ensina a profissão errada — o
mercado usa. Então a disciplina assume o uso e move a avaliação para o que a
ferramenta **produz para o aluno mas não transfere a ele**: explicar, defender,
modificar sob restrição nova e diagnosticar defeito.

O objetivo não é garantir que ninguém passe sem aprender. É fazer com que **o caminho
mais curto até a nota passe por entender** — não por fiscalização, mas por desenho.

## A política, em uma frase

> Use a IA à vontade. Você responde pelo que entrega, e vai defender oralmente.

Sem declaração obrigatória de uso, sem caça a plágio, sem detector. O aluno que
terceirizou aparece na defesa, sem que ninguém precise acusá-lo.

## Onde a nota vive

| Peso | Instrumento | Por que |
|---|---|---|
| 50% | **Defesa oral do projeto** (F1–F6, ~10 min por fase entregue) | A IA não senta na banca |
| 25% | **Modificação ao vivo** sob restrição surpresa (~15 min, em aula) | Exige o modelo na cabeça, na hora |
| 15% | **Diagnóstico**: código quebrado para consertar, com justificativa | Ler e diagnosticar é a habilidade, não gerar |
| 10% | **Retomada** dos 15 min iniciais, em papel, sem máquina | Recuperação ativa, frequente e de baixo risco |

**Os exercícios dos ateliês não valem nota.** São formativos. Sem incentivo, não há
por que terceirizar — a fraude é removida em vez de policiada.

## Rubrica de defesa

Quatro níveis. O critério é sempre o mesmo: **o aluno consegue justificar a decisão
e prever a consequência de mudá-la?**

| Nível | O que se observa |
|---|---|
| **Domina** | Justifica a decisão pelo conteúdo do próprio projeto, cita a consequência de fazer diferente, e reconhece onde a escolha foi arbitrária. Modifica ao vivo sem hesitar. |
| **Entende** | Justifica corretamente, mas em termos gerais ("mobile-first é melhor") sem amarrar ao próprio conteúdo. Modifica ao vivo com uma dica. |
| **Reconhece** | Sabe nomear o que fez e apontar onde está no código, mas não explica por quê. Modifica só com condução passo a passo. |
| **Não sustenta** | Não localiza a decisão no próprio código, ou descreve algo que o código não faz. |

**"Não sustenta" não é acusação de fraude.** É a constatação de que a entrega não
tem lastro — e o encaminhamento é refazer com acompanhamento, não sanção.

## Como conduzir a defesa

- **5 a 10 minutos.** Mais que isso vira interrogatório e não acrescenta sinal.
- **Comece pelo que funciona.** "Me mostra a parte que você mais gostou de fazer."
  O aluno escolhe o terreno; quem entendeu se solta, quem não entendeu já trava aqui.
- **Depois, uma pergunta de consequência.** Sempre da forma "o que acontece se…".
- **Termine com uma modificação.** Pequena, ao vivo, no código dele.
- **Anote em uma linha.** Nível + a frase que decidiu. Leva 20 segundos e sustenta
  a nota se for questionada.

## Banco de perguntas — A1 (mobile-first)

Perguntas de consequência, não de definição. "O que é mobile-first?" tem resposta
decorada; "o que acontece se…" não tem.

1. Você escolheu o breakpoint em `___rem`. **Por que não 10rem a mais?** Me mostra
   na tela onde dói.
2. Apaga a media query inteira agora. **O que quebra?** (Em mobile-first, nada quebra
   no celular — só deixa de melhorar no desktop. É o teste mais rápido que existe.)
3. Um usuário abre isso num monitor de 27 polegadas. **Qual versão o Google indexou?**
4. Você escreveu a base com uma coluna. **Se eu pedir uma versão para relógio, de
   200px, o que muda no seu código?**
5. Me mostra uma regra sua que **desfaz** outra regra sua. (Se existir, por que existe?)
6. **Onde no seu site o conteúdo decidiu o layout**, e onde você decidiu por gosto?

### Modificação ao vivo — A1

Sorteie uma. O aluno tem 10 minutos, com a IA que quiser aberta:

- A home tem que virar duas colunas no tablet e três só no desktop grande.
- O cliente quer o rodapé em coluna única em **todas** as larguras.
- A terceira seção precisa aparecer **antes** da segunda no celular, e depois dela no
  desktop — sem mexer no HTML.

Quem entendeu resolve com ou sem IA. Quem não entendeu não sabe nem o que pedir a ela —
e é isso que a modificação ao vivo mede.

## O erro que a IA comete neste domínio

Casos verificados em 27/08/2026, usáveis como exercício de auditoria:

- O **cdnjs** publica `codemirror 6.65.7` que é código da **linha 5** (build UMD,
  detecção de MSIE, global `window.CodeMirror`). A linha 5 foi arquivada em 16/04/2026.
- **jQuery Mobile** foi deprecado em 07/10/2021 e é projeto arquivado — e ainda é
  sugerido como solução para mobile.
- Blogs "guia definitivo 2026" davam **WordPress 6.8** como atual; a fonte oficial
  dava **7.1** (19/08/2026).
- `user-scalable=no` ainda aparece como conselho de responsividade, apesar do custo
  de acessibilidade documentado na própria MDN.

Cada um vira um atelier `data-modo="auditoria"`: o aluno recebe a resposta plausível
e tem que achar o erro **e provar na fonte primária**. É a competência profissional
real — revisar o que a ferramenta produziu — e não um truque para pegar ninguém.

**Sempre inclua decoys** na lista de achados: objeções plausíveis que não são problema.
Sem eles, o aluno aprende a marcar tudo e a auditoria não mede nada.

## Banco de perguntas — A2 (HTML semântico e viewport)

1. Desative todo o CSS. **Que parte da estrutura ainda está explícita e por quê?**
2. Você usou `section` aqui. **Qual é o título e o tema próprio desta seção?** Se não
   houver, qual elemento representa melhor um agrupamento apenas visual?
3. Leia somente `h1`, `h2` e `h3`. **Que árvore eles formam?** Algum nível foi
   escolhido apenas por causa do tamanho visual?
4. Remova a meta `viewport` e abra no celular. **O que mudou: o conteúdo, o CSS ou a
   interpretação da largura pelo navegador?**
5. Por que `initial-scale=1` **não autoriza** acrescentar `user-scalable=no`?
6. Mostre uma `div` correta no seu documento. **Por que ela deve continuar genérica?**

### Modificação ao vivo — A2

Sorteie uma. O aluno tem 10 minutos, com a IA que quiser aberta:

- Receba uma home feita apenas com `div` e converta-a em documento semântico sem
  alterar o texto nem a ordem visual.
- Acrescente uma segunda navegação de rodapé e faça os dois `nav` terem nomes
  distinguíveis para tecnologia assistiva.
- Corrija um `head` que bloqueia zoom e explique cada token preservado ou removido.
- Reorganize uma hierarquia `h1 → h4 → h2` sem escolher níveis pelo tamanho da fonte.

O critério não é coincidir com uma árvore única imaginada pelo professor. É justificar
o papel de cada elemento e prever o que se perde quando ele volta a ser genérico.

## Banco de perguntas — A3 (progressive enhancement e retrocompatibilidade)

1. Remova o bloco `@supports`. **Qual tarefa continua possível e qual melhoria some?**
2. Mostre o piso desta interface. **Por que ele é funcional e não apenas visível?**
3. Esta feature está marcada como Baseline. **O que isso não prova sobre seu público?**
4. Explique cada prefixo presente. **Qual navegador-alvo e qual dado justificam a linha?**
5. Troque uma detecção por user agent por feature detection. **Que hipótese foi eliminada?**
6. Seu fallback repete uma propriedade. **Por que a ordem das declarações importa?**

### Modificação ao vivo — A3

Sorteie uma. O aluno tem 10 minutos, com a IA que quiser aberta:

- Receba um grid que esconde conteúdo sem suporte e construa um piso utilizável em Flex.
- Acrescente fallback literal antes de uma declaração com função CSS recente.
- Remova prefixos sem evidência e registre os navegadores-alvo que orientaram a decisão.
- Transforme uma regra `.safari` em melhoria protegida por `@supports`.

A resposta precisa demonstrar o piso com a camada moderna removida. Repetir “navegador
antigo” sem nome, requisito ou consequência não sustenta a decisão.

## Banco de perguntas — A4 (cascata, especificidade, herança e seletores)

1. Abra uma declaração riscada no DevTools. **Em qual etapa da cascata ela perdeu?**
2. Calcule a especificidade deste seletor. **Qual é a primeira coluna que decide?**
3. Mova a regra para o fim da folha. **Por que isso muda — ou não muda — o vencedor?**
4. Este valor aparece no filho. **Ele venceu no filho ou foi herdado do pai?**
5. Troque o seletor por `:where()`. **Que parte do peso desapareceu?**
6. Este combinador descreve uma relação necessária ou a estrutura acidental do DOM?

### Modificação ao vivo — A4

Sorteie uma. O aluno tem 10 minutos, com a IA que quiser aberta:

- Remova um `!important` e reorganize base/variação com classes de baixa especificidade.
- Faça uma regra atingir apenas filhos diretos sem alterar o HTML.
- Substitua um seletor preso a cinco wrappers por um contrato de componente.
- Corrija uma base tipográfica repetida usando herança sem herdar borda ou espaçamento.

O aluno precisa prever o vencedor antes de atualizar a página e confirmar no DevTools.
Acertar por tentativa até “pegar” não demonstra domínio da cascata.

## Banco de perguntas — A5 (pseudo-classes e pseudo-elementos)

1. Navegue apenas com teclado. **Onde o foco fica invisível e qual regra causou isso?**
2. Este efeito usa `:hover`. **Qual é a rota equivalente por teclado e toque?**
3. Calcule a especificidade de `a:hover::before`. **Em quais colunas entram as partes?**
4. Remova `::before` e `::after`. **Qual significado desaparece?** Se desaparecer,
   por que estava na camada errada?
5. Este `:nth-child()` conta quais irmãos? **Um novo elemento de outro tipo muda o resultado?**
6. O estado está em classe manual e em `:checked`. **Qual é a fonte de verdade?**

### Modificação ao vivo — A5

Sorteie uma. O aluno tem 10 minutos, com a IA que quiser aberta:

- Corrija um componente operável só por hover e acrescente foco visível.
- Mova texto essencial de `content` para HTML, preservando apenas a decoração gerada.
- Estilize o estado marcado de checkbox sem JavaScript nem classe duplicada.
- Restrinja uma faixa alternada aos itens corretos com `:nth-child()` e filtro adequado.

A resposta deve ser testada com mouse, teclado e CSS desativado. Aparência correta em
uma única modalidade não sustenta a decisão.

## Banco de perguntas — A6 (unidades absolutas e relativas)

1. Aponte um `px` correto e um `px` problemático. **Qual contrato distingue os dois?**
2. Calcule a fonte e o padding de dois componentes aninhados que usam `em`. **Qual
   referência muda em cada propriedade?**
3. Troque `em` por `rem`. **Qual cadeia de dependência foi eliminada e qual foi mantida?**
4. Este valor usa `%`. **A definição de qual propriedade determina a base do cálculo?**
5. Abra a hero num navegador móvel. **O que muda quando as barras aparecem e somem?**
6. Defenda os três argumentos de um `clamp()`. **Que falha o piso e o teto evitam?**

### Modificação ao vivo — A6

Sorteie uma. O aluno tem 10 minutos, com a IA que quiser aberta:

- Corrija cartões aninhados cuja tipografia cresce por composição involuntária de `em`.
- Faça uma hero sobreviver a 320px, fonte ampliada e barras móveis sem recortar conteúdo.
- Substitua uma fonte definida só em `vw` por uma escala fluida com limites justificados.
- Audite uma regra que troca todo `px` por `rem` e restaure as unidades cujo contrato é fixo.

A defesa precisa nomear a referência da unidade, prever o valor calculado e demonstrar
o teste que muda essa referência. “É responsivo” ou “é acessível” sem mecanismo não basta.

## Banco de perguntas — A7 (Flexbox)

1. Aponte o contêiner e seus itens flex. **Por que um neto não participa diretamente?**
2. Troque `row` por `column`. **Quais propriedades continuam atuando no eixo principal
   e transversal, e por que a aparência mudou?**
3. Explique `flex: 1 1 12rem`. **Qual é a base e quando crescimento ou redução atuam?**
4. Injete uma URL longa. **Qual mínimo impede o item de encolher e quando é correto zerá-lo?**
5. Desative `flex-wrap`. **Em qual largura o conteúdo deixa de caber e quem determinou esse ponto?**
6. Navegue com Tab após usar `order`. **Por que a ordem visual não alterou a lógica?**

### Modificação ao vivo — A7

Sorteie uma. O aluno tem 10 minutos, com a IA que quiser aberta:

- Transforme uma navegação rígida em itens flexíveis que quebram por conteúdo.
- Corrija um componente de mídia cujo texto longo causa overflow e cujo avatar deforma.
- Centralize um painel depois de identificar explicitamente os eixos em `column`.
- Remova `row-reverse` de uma sequência interativa e preserve a ordem lógica sem saltos de foco.

A resposta precisa ser testada em 320px, com fonte ampliada, conteúdo longo e teclado.
“Usei Flexbox” não basta: o aluno deve defender direção, base, fatores e política de quebra.

## Banco de perguntas — A8 (Grid)

1. Aponte linhas, trilhas, uma célula e uma área. **Qual diferença existe entre elas?**
2. Acrescente um item além da grade declarada. **Qual trilha implícita surgiu e como é dimensionada?**
3. Explique `1fr`. **Qual espaço está sendo distribuído e qual mínimo ainda pode dominar?**
4. Compare `auto-fit` e `auto-fill`. **O que acontece com trilhas repetidas vazias?**
5. Injete uma URL longa. **Por que `1fr` pode transbordar e quando usar `minmax(0, 1fr)`?**
6. Navegue com Tab depois de alterar áreas. **Por que a sequência não acompanha a colocação visual?**

### Modificação ao vivo — A8

Sorteie uma. O aluno tem 10 minutos, com a IA que quiser aberta:

- Troque três colunas rígidas por repetição responsiva orientada pelo conteúdo.
- Corrija uma grade cuja trilha `1fr` transborda diante de uma URL longa.
- Crie áreas nomeadas retangulares preservando a ordem lógica do documento.
- Controle linhas implícitas para que tenham piso, mas cresçam com texto ampliado.

A resposta deve sobreviver a 320px, fonte ampliada, conteúdo longo e navegação por
teclado. O aluno precisa distinguir tamanho de trilha, colocação de item e ordem lógica.

## Banco de perguntas — A9 (cor, gradientes e `transform`)

1. Meça este par de cores. **Qual fundo e qual primeiro plano entram no cálculo?**
2. Remova as cores. **Qual estado deixa de ser distinguível e que pista adicional falta?**
3. Desative `background-image`. **Qual cor-base sustenta o texto e por que ela vem antes?**
4. Troque a ordem de `translate()` e `rotate()`. **Por que o resultado muda?**
5. Remova `transform`. **Que espaço o fluxo sempre reservou para a caixa?**
6. Inspecione um `z-index` inesperado. **Qual transformação criou um contexto de empilhamento?**

### Modificação ao vivo — A9

Sorteie uma. O aluno tem 10 minutos, com a IA que quiser aberta:

- Corrija uma mensagem de erro de baixo contraste que depende apenas do vermelho.
- Acrescente cor-base a um gradiente e prove contraste em todos os pontos sob o texto.
- Remova uma transformação usada para corrigir layout e resolva o espaço no modelo correto.
- Reduza uma escala de hover que invade vizinhos e ofereça pista equivalente por teclado.

A resposta precisa incluir medição, teste sem cor, teste sem imagem e comparação do
espaço antes/depois do transform. Preferência estética sem mecanismo não demonstra domínio.

## Banco de perguntas — A10 (`transition`, `animation` e movimento acessível)

1. Remova a mudança de estado. **Por que a transição deixa de executar?**
2. Expanda o shorthand. **Quais propriedades, durações, curvas e atrasos foram definidos?**
3. Desative a animação. **O estado inicial, final e a informação continuam corretos?**
4. Ative redução de movimento. **Qual efeito é removido e qual feedback permanece?**
5. Esta animação é infinita. **Quando o usuário precisa de controle direto além da preferência?**
6. A propriedade não interpola. **Onde a definição formal informa seu tipo de animação?**

### Modificação ao vivo — A10

Sorteie uma. O aluno tem 10 minutos, com a IA que quiser aberta:

- Substitua `transition: all` por uma lista curta e justifique cada duração.
- Reduza uma escala intensa de hover e forneça feedback equivalente por teclado.
- Faça um indicador conservar o texto de status quando sua animação for removida.
- Acrescente tratamento de movimento reduzido sem apagar conteúdo ou estado final.

A defesa deve nomear gatilho, propriedades, duração, repetição e alternativa. “Coloquei
prefers-reduced-motion” não basta se o estado funcional desaparece junto do efeito.

## Banco de perguntas — A11 (media queries e breakpoints)

1. Desative todas as queries. Qual base continua funcionando e por quê?
2. Mostre o breakpoint. Qual falha observável do conteúdo justifica esse valor?
3. Teste antes, no ponto e depois. Quais consultas correspondem em cada caso?
4. Troque width por device-width. Que espaço relevante deixou de ser medido?
5. Gire o viewport. Por que landscape não prova a existência de mouse ou espaço para sidebar?
6. Desative hover. Qual conteúdo ou operação deixa de ter rota equivalente?

### Modificação ao vivo — A11

Sorteie uma. O aluno tem 10 minutos, com a IA que quiser aberta:

- converta uma folha desktop-first em base pequena com melhorias cumulativas;
- elimine sobreposição acidental entre faixas;
- substitua um breakpoint de aparelho por um ponto demonstrado pelo conteúdo;
- preserve instruções essenciais sem depender de hover.

A resposta deve ser testada imediatamente antes, no ponto e depois da fronteira, com
toque, teclado, mouse, zoom e conteúdo maior.
