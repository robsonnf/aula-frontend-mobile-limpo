/* servir.mjs — servidor estático para dar aula e revisar.

   Existe por um motivo concreto: abrindo por file://, alguns navegadores
   bloqueiam por CORS o import ESM do CodeMirror, e o editor cai no textarea.
   Servido por http:// o CodeMirror carrega. Também deixa o material acessível
   aos celulares da turma na mesma rede — o endereço de rede é impresso abaixo.

   Sem dependência: http + fs do Node. */

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';
import { networkInterfaces } from 'node:os';
import { RAIZ } from './indice.mjs';

const PORTA = Number(process.env.PORTA ?? 4321);

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/plain; charset=utf-8',
};

function enderecoDeRede() {
  for (const faixas of Object.values(networkInterfaces())) {
    for (const f of faixas ?? []) {
      if (f.family === 'IPv4' && !f.internal) return f.address;
    }
  }
  return null;
}

createServer(async (req, res) => {
  try {
    let caminho = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (caminho.endsWith('/')) caminho += 'index.html';

    // normalize + prefixo: impede ../../ sair da raiz servida
    const alvo = join(RAIZ, normalize(caminho));
    if (!alvo.startsWith(RAIZ)) {
      res.writeHead(403).end('403');
      return;
    }

    const info = await stat(alvo).catch(() => null);
    if (!info || info.isDirectory()) {
      res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
      res.end('404 — não encontrado: ' + caminho);
      return;
    }

    res.writeHead(200, {
      'content-type': TIPOS[extname(alvo)] ?? 'application/octet-stream',
      'cache-control': 'no-cache',
    });
    res.end(await readFile(alvo));
  } catch (e) {
    res.writeHead(500).end('500');
  }
}).listen(PORTA, () => {
  const rede = enderecoDeRede();
  console.log(`\n  Material servido:`);
  console.log(`    http://localhost:${PORTA}/lessons/`);
  if (rede) console.log(`    http://${rede}:${PORTA}/lessons/   (celulares na mesma rede)`);
  console.log(`\n  Ctrl+C para parar.\n`);
});
