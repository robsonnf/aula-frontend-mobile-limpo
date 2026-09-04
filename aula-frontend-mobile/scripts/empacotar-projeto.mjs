/* empacotar-projeto.mjs — zipa este repositório inteiro, com a pasta na raiz.

     npm run projeto              # inclui o histórico do git
     npm run projeto -- --sem-git # instantâneo limpo, sem .git

   O que fica DE FORA, sempre:
     node_modules/  não existe aqui (o projeto tem zero dependências) e não deve
                    passar a existir num zip só porque alguém rodou npm install
     dist/          build reproduzível com `npm run build`; e zipar a pasta onde
                    o zip está sendo escrito é recursão
     .DS_Store      lixo do Finder
*/

import { readFile, writeFile, readdir, stat, mkdir } from 'node:fs/promises';
import { join, relative, basename } from 'node:path';
import { criarZip } from './zip.mjs';
import { RAIZ } from './indice.mjs';

const semGit = process.argv.includes('--sem-git');

const IGNORAR = new Set(['node_modules', 'dist', '.DS_Store']);
if (semGit) IGNORAR.add('.git');

const PASTA = basename(RAIZ);
const DIST = join(RAIZ, 'dist');

async function varrer(dir, entradas = []) {
  for (const nome of (await readdir(dir)).sort()) {
    if (IGNORAR.has(nome)) continue;
    const caminho = join(dir, nome);
    const info = await stat(caminho);
    if (info.isDirectory()) await varrer(caminho, entradas);
    else if (info.isFile()) {
      entradas.push({
        nome: `${PASTA}/${relative(RAIZ, caminho).split(/[\\/]/).join('/')}`,
        dados: await readFile(caminho),
        mtime: info.mtime,
      });
    }
  }
  return entradas;
}

const entradas = await varrer(RAIZ);
await mkdir(DIST, { recursive: true });

const alvo = join(DIST, `${PASTA}${semGit ? '-limpo' : ''}.zip`);
await writeFile(alvo, await criarZip(entradas));

const kb = ((await stat(alvo)).size / 1024).toFixed(0);
const comGit = semGit ? 'sem histórico git' : 'com histórico git';
console.log(`  dist/${basename(alvo)}  —  ${kb} KB · ${entradas.length} arquivos · ${comGit}`);
console.log(`  raiz do zip: ${PASTA}/`);
console.log(`  fora: ${[...IGNORAR].join(', ')}`);
