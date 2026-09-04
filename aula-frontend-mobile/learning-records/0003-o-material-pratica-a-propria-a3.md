# O material pratica a A3 em si mesmo

O canvas de exercício foi montado em três camadas, e isso é decisão didática, não
defensividade: (1) sem JS, o `<template>` não renderiza e a aula segue legível;
(2) com JS, um `<textarea>` real — tab, auto-indent, numeração, salvamento local —
mais `iframe` de prévia; (3) com rede, o CodeMirror 6 substitui o textarea e
preserva o que o aluno já digitou.

Dá para **mostrar isso em aula** desligando a rede no DevTools: o editor degrada e o
exercício continua funcionando. É progressive enhancement demonstrado no próprio
material, na aula que ensina progressive enhancement.

**Implicação:** nenhuma peça nova do material pode assumir rede, JS de módulo ou
navegador recente como requisito. Se assumir, a A3 perde o exemplo mais barato
que ela tem.
