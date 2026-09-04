import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { basename, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { criarZip } from './zip.mjs';

const RAIZ = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const DIST = join(RAIZ, 'dist');
const IGNORAR = new Set(['.git', 'dist', 'node_modules', '.DS_Store']);

async function varrer(dir, entradas = []) {
  for (const nome of (await readdir(dir)).sort()) {
    if (IGNORAR.has(nome)) continue;
    const caminho = join(dir, nome);
    const info = await stat(caminho);
    if (info.isDirectory()) await varrer(caminho, entradas);
    else entradas.push({
      nome: `aula-frontend-mobile-aluno/${relative(RAIZ, caminho).split(/[\\/]/).join('/')}`,
      dados: await readFile(caminho),
      mtime: info.mtime,
    });
  }
  return entradas;
}

await mkdir(DIST, { recursive: true });
const alvo = join(DIST, 'aula-frontend-mobile-aluno.zip');
const entradas = await varrer(RAIZ);
await writeFile(alvo, await criarZip(entradas));
console.log(`dist/${basename(alvo)} — ${entradas.length} arquivos`);
