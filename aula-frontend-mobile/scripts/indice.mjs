/* indice.mjs — gera assets/aulas.js a partir da tabela de CURRICULUM.md.
   A grade tem uma fonte da verdade só. Mexeu na tabela, rode `npm run indice`. */

import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');

const RE_LINHA = /^\|\s*A(\d+)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*$/;

const inline = (t) => t.replace(/`([^`]+)`/g, '<code>$1</code>');

export async function lerGrade() {
  const md = await readFile(join(RAIZ, 'CURRICULUM.md'), 'utf8');
  const aulas = [];
  for (const ln of md.split('\n')) {
    const m = RE_LINHA.exec(ln);
    if (!m) continue;
    aulas.push({
      n: Number(m[1]),
      bloco: m[2].trim(),
      titulo: inline(m[3].trim()),
      ementa: m[4].trim(),
    });
  }
  if (!aulas.length) {
    throw new Error('nenhuma aula encontrada em CURRICULUM.md — a tabela mudou de forma?');
  }
  return aulas.sort((a, b) => a.n - b.n);
}

export async function cruzarComArquivos(aulas) {
  const arquivos = (await readdir(join(RAIZ, 'lessons'))).filter((f) => /^\d{4}-.*\.html$/.test(f));
  for (const a of aulas) {
    const alvo = String(a.n).padStart(4, '0') + '-';
    a.arquivo = arquivos.find((f) => f.startsWith(alvo)) ?? null;
  }
  return aulas;
}

/** disponiveis=null -> vale o que existe em lessons/; array -> só esses arquivos. */
export async function gerar(aulas, disponiveis = null, destino = join(RAIZ, 'assets', 'aulas.js')) {
  for (const a of aulas) {
    a.disponivel = disponiveis ? disponiveis.includes(a.arquivo) : a.arquivo !== null;
  }
  await mkdir(dirname(destino), { recursive: true });
  await writeFile(
    destino,
    '/* aulas.js — GERADO por scripts/indice.mjs a partir de CURRICULUM.md.\n' +
    '   Não edite à mão: a próxima geração sobrescreve.\n' +
    '   Mexeu na grade? Edite CURRICULUM.md e rode `npm run indice`. */\n\n' +
    'window.AULAS = ' + JSON.stringify(aulas, null, 2) + ';\n',
    'utf8'
  );
  return destino;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const aulas = await cruzarComArquivos(await lerGrade());
  const destino = await gerar(aulas);
  const prontas = aulas.filter((a) => a.disponivel).length;
  console.log(`assets/aulas.js — ${aulas.length} aulas na grade, ${prontas} escrita(s)`);
}
