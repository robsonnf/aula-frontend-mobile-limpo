# Mission: Desenvolvimento Web Mobile (front-end) — 66h

> **Inversão:** este workspace não é para o Leo aprender. É para o Leo **ensinar**.
> Onde a skill `/teach` diz "o usuário", leia "os alunos". A zona de desenvolvimento
> proximal a calcular é a da turma, não a do Leo.

## Why

Leo ministra uma disciplina de curso técnico/graduação: 22 encontros de 3h (66h),
ao vivo, ele apresentando. A ementa é fechada e cobre 11 áreas, de mobile-first a
CMS a testes automatizados. O objetivo concreto: ao fim da disciplina, cada aluno
publicou na internet um site mobile-first de verdade — escrito à mão, depois
portado para CMS — e sabe provar que ele é acessível, rápido e responsivo com
ferramenta, não com opinião.

## Success looks like

- Cada aluno tem **uma URL pública** do Projeto UC15 - HTML Mobile first, funcionando no celular dele.
- O aluno escreve um layout responsivo do zero com Grid/Flexbox e media queries, sem framework, sem copiar.
- O aluno explica *por que* mobile-first e progressive enhancement são a ordem correta — não só *o que* são.
- O aluno audita o próprio site com Lighthouse, axe e DevTools e corrige o que a ferramenta apontou.
- O aluno instala, configura e publica um CMS (servidor local + banco), com tema filho customizado e usuários administrativos.
- O aluno distingue o que é padrão da plataforma (Baseline) do que é folclore (prefixos, hacks, jQuery Mobile).
- O aluno **audita uma resposta de IA** no domínio: separa o erro real da objeção decorada, e confere na fonte primária.
- Leo entra em cada uma das 22 aulas com material de projeção pronto e roteiro de fala, sem improvisar.

## Constraints

- **22 encontros × 3h = 66h.** Grade fechada; nada entra sem algo sair.
- **Ao vivo, Leo apresentando.** As lessons são material de projeção + roteiro de fala,
  não material auto-instrucional. Demos devem ser manipuláveis na frente da turma.
- **Ementa é contrato.** As 11 áreas do edital precisam ser cobertas, todas. A grade
  responde ao edital, não ao gosto.
- **Português do Brasil.** Termos técnicos em inglês quando é o nome real da coisa
  (`viewport`, `flexbox`), traduzidos quando existe termo consagrado em PT-BR.
- **Turma tem máquinas heterogêneas.** Stack local do CMS precisa funcionar em
  Windows/macOS/Linux sem drama.
- **IA é permitida e assumida.** Não se detecta, não se proíbe. A avaliação vive na
  defesa oral e na modificação ao vivo — ver `AVALIACAO.md`. O objetivo não é impedir
  o uso: é que o aluno saia sabendo **usar bem**, o que inclui revisar o que a
  ferramenta produziu.

## Out of scope

- Frameworks SPA (React, Vue, Angular). Não estão na ementa e comeriam 20h.
- Back-end além do mínimo que o CMS exige (servidor local + banco).
- Design gráfico / teoria de cor além do que a UI do projeto exige.
- Build tooling profundo (Vite/Webpack config). Entra só o suficiente para
  minificar e comprimir, na aula de otimização.
- Bootstrap 6 (em alpha). Ensina-se a linha suportada, 5.3.
