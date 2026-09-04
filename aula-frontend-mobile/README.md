# Desenvolvimento Web Mobile — 22 aulas, 66h

Material de uma disciplina de curso técnico/graduação: 22 encontros de 3h, ao vivo,
cobrindo mobile-first, HTML/CSS3, responsividade, JavaScript, jQuery, Bootstrap, SEO,
acessibilidade, otimização, CMS e testes. Cada aluno termina com um site publicado.

**Zero dependências.** Não existe `node_modules` aqui e nunca vai existir: o material é
HTML, CSS e JavaScript, e os scripts de build usam só a biblioteca padrão do Node.
`npm install` não é necessário.

## Rodar

```bash
npm start          # serve em http://localhost:4321 e no IP da rede (celulares da turma)
npm run build      # gera as duas distribuições de todas as aulas escritas
npm run build -- 1 # só a aula 1
npm run indice     # regenera assets/aulas.js a partir de CURRICULUM.md
npm run projeto    # empacota este repositório inteiro num zip
```

`npm start` não é conforto. Aberto por `file://`, alguns navegadores bloqueiam por CORS
o import ESM do CodeMirror e o editor dos exercícios cai no `<textarea>` — tudo funciona,
só sem realce de sintaxe. Servido por `http://`, o CodeMirror carrega.

Sem Node? As aulas abrem direto: `lessons/0001-*.html` no navegador.

## As duas distribuições

| | `dist/professor-*` | `dist/aluno-*` |
|---|---|---|
| Roteiro de fala (tecla `N`) | sim | **removido do HTML** |
| Blocos `data-so-professor` | sim | **removidos** |
| `AVALIACAO.md` (rubrica, banco de perguntas) | sim | não |
| Soluções de exercícios | sim | **removidas do HTML** |
| Respostas de quizzes e auditorias | sim | **removidas do HTML** |

A remoção é do HTML, não por CSS: esconder deixaria o texto a um Ctrl+U de distância.
O build **falha** se algum marcador de professor sobrar no pacote do aluno.

## Onde está o quê

| Arquivo | Papel |
|---|---|
| `MISSION.md` | Por que a disciplina existe e o que conta como sucesso |
| `CURRICULUM.md` | **Fonte da verdade da grade.** Mexeu aqui, rode `npm run indice` |
| `AVALIACAO.md` | Rubrica de defesa, banco de perguntas, política de uso de IA |
| `RESOURCES.md` | Fontes de alta confiança. Nada é ensinado de memória |
| `NOTES.md` | Preferências de formato e decisões técnicas que custaram tempo |
| `lessons/` | Uma aula por arquivo HTML |
| `assets/` | Componentes compartilhados (folha, casca, atelier) |
| `learning-records/` | Decisões de ensino, no estilo ADR |
| `scripts/` | Build. Só biblioteca padrão do Node |

## Teclas nas aulas

`N` mostra/esconde o roteiro de fala (começa escondido, não aparece na projeção).
`P` entra no modo apresentação: esconde a lateral e aumenta o corpo do texto.

## Uso de IA

A disciplina assume o uso: não se detecta e não se proíbe. O que muda é onde fica a
nota — defesa oral e modificação ao vivo, com os exercícios sem nota. Detalhes em
`AVALIACAO.md`; a regra vista pelo aluno está na seção 5 da aula 1.
