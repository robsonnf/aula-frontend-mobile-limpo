# Projeto UC15 - HTML Mobile first

## Missão

Construir, publicar e defender um portal mobile-first para acompanhar uma temporada
esportiva. O mesmo produto deve evoluir do protótipo sem framework até uma versão em
WordPress, preservando conteúdo, tarefas, acessibilidade e desempenho.

O repositório deve permitir que outra pessoa instale, execute, teste e compreenda o
projeto sem depender de explicação oral. Não versione senha, token, cookie, chave,
dados pessoais, dump do banco ou arquivo de configuração com segredo.

## Produto mínimo

O portal deve oferecer:

- home com destaque, notícias, calendário e classificação;
- navegação responsiva e utilizável por teclado e toque;
- busca ou filtro de conteúdo com atualização de estado visível;
- galeria ou trilho operável por botões e gesto de ponteiro, sem depender só do gesto;
- formulário com rótulos, instruções, validação e mensagem de resultado;
- área de favoritos persistida apenas quando houver consentimento/necessidade definida;
- conteúdo administrável em WordPress por usuários com papéis adequados;
- versão publicada, documentação e testes reproduzíveis.

Use conteúdo fictício ou licenciado e registre autoria/fonte. O projeto não deve copiar
identidade visual, logotipos, fotos ou dados oficiais sem permissão.

## Estrutura esperada do repositório

```text
/
├─ README.md
├─ DECISOES.md
├─ TESTES.md
├─ CMS.md
├─ docs/
│  ├─ evidencias/
│  └─ relatorio-final.md
├─ prototipo/
│  ├─ index.html
│  ├─ assets/
│  └─ js/
├─ wordpress/
│  └─ tema-filho/
└─ tests/
```

Não versione WordPress Core, `node_modules`, credenciais, banco de produção nem
artefatos com dados pessoais. Se a estrutura precisar mudar, explique em `DECISOES.md`.

## Quadro de entrega

As tarefas abaixo formam uma única entrega. Cada caixa só pode ser marcada quando os
critérios de aceite correspondentes estiverem demonstráveis no repositório ou na URL
publicada.

### T00 — Preparar repositório e fluxo de trabalho

- [ ] Criar o repositório do produto com `README.md`, `.gitignore` e licença definida.
- [ ] Registrar objetivo, público, três tarefas críticas e escopo que ficou de fora.
- [ ] Trabalhar em branches por etapa e integrar por Pull Request revisável.
- [ ] Manter commits pequenos, mensagens descritivas e `main` executável.
- [ ] Documentar comandos para abrir, testar e gerar a entrega.

**Aceite:** clone limpo, instruções reproduzíveis e histórico que permite localizar cada
decisão sem arquivos secretos ou dependências geradas.

### T01 — Modelar conteúdo, HTML semântico e viewport

- [ ] Criar landmarks e hierarquia de títulos coerentes.
- [ ] Usar elementos nativos para links, botões, listas, tabelas e formulários.
- [ ] Configurar `meta viewport` sem bloquear zoom.
- [ ] Entregar conteúdo e tarefas essenciais antes de CSS e JavaScript.
- [ ] Registrar fallback e melhoria progressiva de ao menos um recurso.

**Aceite:** conteúdo compreensível sem CSS, navegação acionável sem JavaScript e zoom
permitido. Relaciona A1–A3.

### T02 — Construir o sistema CSS

- [ ] Definir tokens de cor, espaço, tipografia, borda e movimento com custom properties.
- [ ] Demonstrar cascata, herança e especificidade sem `!important` global.
- [ ] Usar seletores complexos, pseudo-classes e pseudo-elementos com função clara.
- [ ] Combinar unidades relativas e absolutas de acordo com o requisito.
- [ ] Preservar foco, contraste, zoom e conteúdo em estados interativos.

**Aceite:** `DECISOES.md` aponta a origem de uma regra, justifica unidades e mostra os
estados normal, hover, foco, ativo, inválido e desabilitado. Relaciona A4–A6.

### T03 — Montar layouts com Flexbox e Grid

- [ ] Usar Flexbox em um componente unidimensional com quebra quando necessário.
- [ ] Usar Grid na composição bidimensional principal ou em seção equivalente.
- [ ] Evitar larguras rígidas que gerem overflow da página.
- [ ] Testar conteúdo curto, longo, vazio e repetido.
- [ ] Manter ordem visual compatível com leitura e foco.

**Aceite:** layout funciona a partir de 320 CSS px, sem rolagem horizontal da página e
sem alterar a ordem semântica para obter composição visual. Relaciona A7–A8.

### T04 — Aplicar linguagem visual e movimento acessível

- [ ] Definir cores em formatos adequados e verificar contraste dos estados.
- [ ] Usar gradiente como apresentação, nunca como única fonte de informação.
- [ ] Aplicar `transform` sem supor mudança no fluxo do documento.
- [ ] Usar `transition`/`animation` com propósito e duração justificável.
- [ ] Respeitar `prefers-reduced-motion` e oferecer estado final compreensível.

**Aceite:** nenhum dado depende apenas de cor ou movimento; foco não é removido e a
interface continua utilizável com movimento reduzido. Relaciona A9–A10.

### T05 — Implementar responsividade completa

- [ ] Criar media queries orientadas pelo conteúdo, não por modelos de aparelho.
- [ ] Testar antes, no ponto e depois de cada breakpoint.
- [ ] Entregar imagens com dimensões, `srcset`/`sizes` ou `<picture>` quando aplicável.
- [ ] Aplicar tipografia fluida com limites legíveis.
- [ ] Usar container query em um componente reutilizado em contêineres diferentes.
- [ ] Validar zoom, orientação, textos longos, teclado virtual e celular real.

**Aceite:** matriz em `TESTES.md` registra dimensões e condições; não há conteúdo
suprimido apenas para caber. Relaciona A11–A12.

### T06 — Integrar Bootstrap 5.3 com customização controlada

- [ ] Usar grid, breakpoints e utilities onde reduzem código sem apagar a intenção.
- [ ] Implementar ao menos dois componentes mobile com contratos completos de alvo,
  ARIA, foco e fechamento.
- [ ] Customizar tokens/variáveis e estados sem sobrescritas globais frágeis.
- [ ] Carregar CSS e bundle de versão fixa com licença e origem documentadas.
- [ ] Comparar pelo menos uma decisão Bootstrap com a solução CSS própria anterior.

**Aceite:** componentes funcionam offline quando os assets são locais, por teclado e nos
limites de breakpoint; `DECISOES.md` registra custo e escolha. Relaciona A13–A14.

### T07 — Criar interações JavaScript nativas

- [ ] Consultar e alterar DOM sem inserir texto do usuário como HTML.
- [ ] Usar eventos sem duplicar ação entre `touch` e `click`.
- [ ] Aplicar delegação a uma lista com itens criados dinamicamente.
- [ ] Implementar gesto com Pointer Events, cancelamento e alternativa por botão.
- [ ] Atualizar nome, estado e mensagens acessíveis após cada interação.
- [ ] Desmontar listeners quando o ciclo de vida exigir.

**Aceite:** menu, filtro/favorito, galeria e formulário operam por teclado, mouse e toque;
Console fica sem erros no fluxo principal. Relaciona A15.

### T08 — Usar jQuery ou biblioteca com justificativa

- [ ] Escolher uma interação pequena e isolada para implementar com jQuery 4.
- [ ] Usar delegação, propriedades atuais e namespace de eventos quando necessário.
- [ ] Evitar adicionar biblioteca para recurso já resolvido de forma mais simples.
- [ ] Registrar versão, licença, manutenção, tamanho, alternativa e plano de remoção.
- [ ] Não usar jQuery Mobile ou biblioteca arquivada como base do produto.

**Aceite:** a funcionalidade tem requisito explícito, não duplica listeners e pode ser
comparada com uma implementação nativa. Relaciona A16.

### T09 — Auditar acessibilidade, SEO e desempenho

- [ ] Executar jornada somente por teclado e inspecionar a árvore de acessibilidade.
- [ ] Registrar achados WCAG 2.2 com critério, evidência, impacto e correção.
- [ ] Revisar title, description, canonical, robots, links e conteúdo mobile equivalente.
- [ ] Medir LCP, INP e CLS em condições registradas, distinguindo laboratório e campo.
- [ ] Corrigir dimensões de mídia, prioridade, carregamento, cadeia crítica e trabalho JS.
- [ ] Repetir medidas comparáveis e registrar limites das ferramentas automáticas.

**Aceite:** `docs/relatorio-final.md` contém antes/depois e não promete conformidade,
ranking ou ganho universal com base em pontuação isolada. Relaciona A17–A19.

### T10 — Portar e publicar em WordPress

- [ ] Registrar ambiente local, versões, banco, diferenças do host e HTTPS.
- [ ] Separar banco, uploads, tema e plug-ins no plano de backup/restauração.
- [ ] Criar usuários de teste com menor privilégio para suas tarefas.
- [ ] Implementar tema filho sem editar arquivos do pai.
- [ ] Enfileirar assets e usar `theme.json`/CSS com escopo conforme o tema.
- [ ] Justificar cada plug-in por requisito, procedência, dados, impacto e rollback.
- [ ] Implantar primeiro em staging; migrar URLs com ferramenta apropriada.
- [ ] Publicar, executar smoke test, monitorar e manter retorno praticável.

**Aceite:** `CMS.md` documenta ambiente, tema, plug-ins, usuários, backup, restauração,
staging, produção e rollback sem revelar segredos. Relaciona A20–A21.

### T11 — Criar plano e automação de testes

- [ ] Definir riscos, tarefas e navegadores/dispositivos-alvo em `TESTES.md`.
- [ ] Escrever scripts manuais com pré-condição, passos, esperado e observado.
- [ ] Automatizar fluxos críticos com locators semânticos e assertions web-first.
- [ ] Configurar projetos Chromium, Firefox, WebKit e perfis móveis relevantes.
- [ ] Manter testes isolados e sem dependência de ordem ou atraso fixo.
- [ ] Guardar relatório/trace de falha sem cookies, tokens ou dados pessoais.
- [ ] Confirmar que uma mutação intencional faz o teste correspondente falhar.

**Aceite:** outra pessoa executa a suíte, reproduz uma falha e distingue motor emulado,
navegador de marca e aparelho real. Relaciona A22.

### T12 — Preparar release e defesa

- [ ] Congelar uma versão identificável por tag.
- [ ] Confirmar links, formulários, 404, HTTPS, console e fluxos críticos publicados.
- [ ] Revisar README, decisões, CMS, testes e evidências.
- [ ] Listar limitações e débitos conhecidos em vez de escondê-los.
- [ ] Preparar demonstração de cinco minutos e alteração ao vivo.
- [ ] Manter uma rota de rollback para a versão anterior.

**Aceite:** URL publicada, tag, relatório e suíte apontam para o mesmo estado do produto;
o projeto pode ser demonstrado, testado e revertido.

## Definition of Done da entrega única

- [ ] T00–T12 possuem evidência rastreável.
- [ ] `main` corresponde à versão publicada e possui tag de entrega.
- [ ] Instalação e testes funcionam a partir de clone limpo.
- [ ] O portal conclui as tarefas críticas em 320px, desktop, teclado e celular real.
- [ ] A matriz automatizada está verde ou possui falhas abertas justificadas.
- [ ] Não existem segredos nem dados pessoais no histórico ou nos artefatos.
- [ ] Limitações, decisões e fontes estão documentadas.

## Como trabalhar no GitHub

1. Escolha a próxima tarefa não bloqueada deste arquivo ou da tarefa-mestra.
2. Crie uma branch curta, por exemplo `feature/t07-interacoes`.
3. Abra um Pull Request e relacione a tarefa.
4. Inclua na descrição: mudança, como testar, evidência e risco de regressão.
5. Só marque a caixa depois do merge e da verificação na versão publicada.

Uma caixa marcada sem evidência deve ser reaberta. A entrega é o produto integrado,
não a soma de capturas nem vinte e duas demonstrações desconectadas.
