import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const LESSONS = join(RAIZ, 'lessons');

const proibidos = [
  ['roteiro de fala', /<div class="nota">/],
  ['bloco exclusivo do professor', /data-so-professor/],
  ['solução oculta', /data-solucao="oculta"/],
  ['gabarito de exercício', /data-papel="solucao"/],
  ['resposta de quiz', /data-correta/],
  ['resposta de auditoria', /data-real=|data-explica=/],
];

const aulas = (await readdir(LESSONS)).filter((nome) => /^\d{4}-.*\.html$/.test(nome)).sort();
if (!aulas.length) throw new Error('nenhuma aula encontrada em lessons/');

for (const nome of aulas) {
  const html = await readFile(join(LESSONS, nome), 'utf8');
  for (const [rotulo, padrao] of proibidos) {
    if (padrao.test(html)) throw new Error(`VAZAMENTO em ${nome}: ${rotulo}`);
  }
  if (!html.includes('../assets/')) throw new Error(`referência de assets inesperada em ${nome}`);
}

console.log(`${aulas.length} aula(s) verificadas — nenhum conteúdo reservado ao professor.`);
