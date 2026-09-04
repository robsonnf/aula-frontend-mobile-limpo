/* zip.mjs — escritor de ZIP sem dependência.

   Node não traz escritor de ZIP, e `archiver` custaria um `npm install` antes
   de qualquer build. Como o material precisa ser empacotável numa máquina de
   laboratório recém-formatada, o formato foi escrito à mão: são ~80 linhas de
   cabeçalho e um deflate que o próprio zlib do Node faz.

   Referência do formato: APPNOTE.TXT (PKWARE), seções 4.3.7 (local file
   header), 4.3.12 (central directory) e 4.3.16 (end of central directory). */

import { deflateRaw } from 'node:zlib';
import { promisify } from 'node:util';

const comprimir = promisify(deflateRaw);

const TABELA_CRC = (() => {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[i] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = TABELA_CRC[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

/** Data/hora no formato MS-DOS, que é o que o ZIP guarda. */
function dosDataHora(d) {
  const hora = (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1);
  const data = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
  return { hora, data };
}

/**
 * @param {{nome: string, dados: Buffer, mtime?: Date}[]} entradas
 * @returns {Promise<Buffer>}
 */
export async function criarZip(entradas) {
  const locais = [];
  const centrais = [];
  let offset = 0;

  for (const e of entradas) {
    const nome = Buffer.from(e.nome, 'utf8');
    const bruto = e.dados;
    const comprimido = await comprimir(bruto);
    // Arquivo minúsculo às vezes cresce ao comprimir. Nesse caso, guarda cru.
    const usarDeflate = comprimido.length < bruto.length;
    const corpo = usarDeflate ? comprimido : bruto;
    const metodo = usarDeflate ? 8 : 0;
    const crc = crc32(bruto);
    const { hora, data } = dosDataHora(e.mtime ?? new Date());

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);   // assinatura
    local.writeUInt16LE(20, 4);           // versão necessária
    local.writeUInt16LE(0x0800, 6);       // flag: nome em UTF-8
    local.writeUInt16LE(metodo, 8);
    local.writeUInt16LE(hora, 10);
    local.writeUInt16LE(data, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(corpo.length, 18);
    local.writeUInt32LE(bruto.length, 22);
    local.writeUInt16LE(nome.length, 26);
    local.writeUInt16LE(0, 28);           // sem campo extra
    locais.push(local, nome, corpo);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);         // versão de quem escreveu
    central.writeUInt16LE(20, 6);         // versão necessária
    central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(metodo, 10);
    central.writeUInt16LE(hora, 12);
    central.writeUInt16LE(data, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(corpo.length, 20);
    central.writeUInt32LE(bruto.length, 24);
    central.writeUInt16LE(nome.length, 28);
    central.writeUInt16LE(0, 30);         // extra
    central.writeUInt16LE(0, 32);         // comentário
    central.writeUInt16LE(0, 34);         // disco inicial
    central.writeUInt16LE(0, 36);         // atributos internos
    central.writeUInt32LE(0o644 << 16, 38); // atributos externos (permissão unix)
    central.writeUInt32LE(offset, 42);
    centrais.push(central, nome);

    offset += local.length + nome.length + corpo.length;
  }

  const blocoCentral = Buffer.concat(centrais);
  const fim = Buffer.alloc(22);
  fim.writeUInt32LE(0x06054b50, 0);
  fim.writeUInt16LE(0, 4);                 // disco
  fim.writeUInt16LE(0, 6);                 // disco do diretório central
  fim.writeUInt16LE(entradas.length, 8);
  fim.writeUInt16LE(entradas.length, 10);
  fim.writeUInt32LE(blocoCentral.length, 12);
  fim.writeUInt32LE(offset, 16);
  fim.writeUInt16LE(0, 20);                // sem comentário

  return Buffer.concat([...locais, blocoCentral, fim]);
}
