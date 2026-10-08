# Desenvolvimento Web Mobile — projeto do aluno

Este projeto contém somente o material destinado aos alunos. As aulas ficam em
`lessons/`, os recursos compartilhados em `assets/` e não há gabaritos, soluções,
roteiros de fala ou documentos internos de avaliação.

## Projeto integrador

O trabalho único da disciplina está em [PROJETO-INTEGRADOR.md](PROJETO-INTEGRADOR.md).
Use as tarefas T00–T12 para evoluir o mesmo produto até a publicação e os testes finais.

## Rodar

```bash
npm start
```

Abra `http://localhost:4321`. Também é possível abrir `index.html` diretamente,
mas o servidor local oferece a experiência completa dos editores interativos.

O endereço `/lessons/` também redireciona para o índice inicial, evitando erro 404.

## Verificar e empacotar

```bash
npm run verificar
npm run build
```

O build verifica novamente que não existem marcadores reservados ao professor e
gera `dist/aula-frontend-mobile-aluno.zip`.

## Organização

- `lessons/`: aulas disponíveis para estudo;
- `assets/`: estilos e comportamentos compartilhados;
- `scripts/`: servidor, verificação e empacotamento;
- `CURRICULUM.md`: mapa completo da disciplina;
- `MISSION.md`: objetivos da disciplina;
- `PROJETO-INTEGRADOR.md`: trabalho único e lista pública de tarefas.

Este projeto é publicado a partir do projeto do professor. As aulas geradas não
devem ser corrigidas manualmente aqui, pois uma nova publicação poderá substituí-las.
