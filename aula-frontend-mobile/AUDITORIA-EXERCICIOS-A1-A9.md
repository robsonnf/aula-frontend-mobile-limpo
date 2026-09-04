# Auditoria funcional dos exercícios — A1 a A9

Data: 03/09/2026

## Resultado

Todos os exercícios, demonstrações, quizzes e auditorias das aulas A1–A9 foram
retestados após a correção do controlador compartilhado. Os builds completo e isolados
foram regenerados para professor e aluno.

## Erros de funcionamento corrigidos

### Expandir prévia no celular

O botão alterava o texto e o estado interno, mas o editor só era escondido dentro do
media query de desktop. Em viewport estreito, parecia que o botão não funcionava.

Correção: as regras de estado `.atelier--expandido` agora valem em todas as larguras.
O teste automatizado usa viewport de 390px e verifica o estilo calculado do editor ao
expandir e ao retornar.

### Reiniciar com a solução aberta

No pacote do professor, abrir “Ver solução” e clicar “Reiniciar” restaurava o código
inicial, mas deixava o botão como “Voltar ao meu”. Um clique posterior podia restaurar
um rascunho antigo e desfazer visualmente o reinício.

Correção: Reiniciar agora fecha o estado da solução, limpa o rascunho temporário e
restaura o rótulo e `aria-pressed` do botão.

### Estado acessível dos botões

Opções de quiz e auditoria agora começam com `aria-pressed="false"`. A opção escolhida
no quiz recebe o estado pressionado, e as seleções das auditorias do aluno alternam
entre verdadeiro e falso sem revelar o gabarito.

## Conteúdo dos exercícios

- todos os 17 exercícios possuem editor correspondente à linguagem declarada;
- todas as soluções do professor alteram o editor correto;
- “Voltar ao meu” restaura o código anterior;
- “Reiniciar” restaura o código inicial;
- alterações no editor atualizam o `srcdoc` da prévia;
- demonstrações geram documento válido na prévia;
- quizzes do aluno registram a resposta sem revelar a correção;
- auditorias do aluno permitem marcar e desmarcar achados sem revelar real/decoy;
- professor recebe respostas e explicações; aluno não recebe esses dados.

Os códigos inicialmente incorretos dentro dos exercícios foram preservados quando são
o objeto pedagógico do enunciado. Eles não são defeitos do controlador: o aluno deve
corrigi-los no editor e comparar o resultado na prévia.

## Teste executado em navegador

Chrome real, viewport 390 × 844:

- 18 páginas: fonte do professor + build do aluno para A1–A9;
- 72 ateliers;
- 52 instâncias editáveis;
- 34 quizzes;
- 18 auditorias;
- zero falhas.

Foram acionados: edição, atualização da prévia, Reiniciar, Expandir prévia, Mostrar
editor, Ver solução, Voltar ao meu, Reiniciar com solução aberta, quizzes e achados de
auditoria.

## Validação P10

Foram inspecionados `aluno.zip` e os nove ZIPs isolados de aluno. Todos retornaram:

- zero `.nota`;
- zero `data-so-professor`;
- zero `data-papel="solucao"` e `data-solucao="oculta"`;
- zero `data-correta`;
- zero `data-real` e `data-explica`;
- zero `AVALIACAO.md`;
- exatamente um `LEIA-ME.txt`.

Resultado: dez pacotes de aluno aprovados, nenhum pacote com falha.

## Arquivos alterados

- `assets/atelier.js`;
- `assets/atelier.css`;
- `assets/course.js`;
- `scripts/auditar-interacoes.mjs`;
- todos os diretórios e ZIPs de `dist/`, regenerados.
