# O cdnjs serve CodeMirror 5 rotulado como 6

Verificado em 27/08/2026: `cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/` entrega
build **UMD**, com detecção de MSIE e global `window.CodeMirror` — código da linha 5.
No npm, a tag `latest` do pacote `codemirror` é **6.0.2**, e a linha 5 vive sob a tag
`version5` (**5.65.21**). A linha 5 foi **arquivada em 16/04/2026**.

Duas consequências:

1. **Para o material:** o CodeMirror vem do esm.sh com `?deps=@codemirror/state@6.5.2`.
   Sem esse pino, duas cópias de `@codemirror/state` quebram os `instanceof` internos.
   Com pino largo demais (incluindo `view`/`language`), quebra de outro jeito.
2. **Para a aula:** isto é exemplo de sala, não nota de rodapé. A A16 ensina que
   jQuery Mobile morreu por estar arquivado; a A3 ensina a checar o que a plataforma
   realmente suporta. Um CDN que rotula código arquivado com o número da versão nova
   é a lição inteira num caso concreto, verificável ao vivo com `curl`.

**Implicação:** antes de qualquer semestre, reconferir versões na fonte primária
(npm/registro oficial), nunca no CDN e nunca em blog.
