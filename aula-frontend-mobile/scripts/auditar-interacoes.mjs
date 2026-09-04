/* Auditoria end-to-end dos componentes compartilhados das aulas.
   Executa contra a fonte do professor e contra o build do aluno.
   Uso: node scripts/auditar-interacoes.mjs */

import { chromium } from 'file:///C:/Users/robso/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { RAIZ } from './indice.mjs';

const base = process.env.AUDIT_BASE ?? 'http://127.0.0.1:4321';
const arquivos = (await readdir(join(RAIZ, 'lessons')))
  .filter((nome) => /^\d{4}-.*\.html$/.test(nome))
  .sort();

const falhas = [];
let paginas = 0;
let ateliers = 0;
let editores = 0;
let quizzes = 0;
let auditorias = 0;

function exigir(condicao, contexto, mensagem) {
  if (!condicao) falhas.push(`${contexto}: ${mensagem}`);
}

async function auditarPagina(page, url, tipo) {
  const contexto = `${tipo} ${url.split('/').pop()}`;
  const erros = [];
  const aoErro = (erro) => erros.push(`pageerror: ${erro.message}`);
  page.on('pageerror', aoErro);

  const resposta = await page.goto(url, { waitUntil: 'domcontentloaded' });
  exigir(resposta?.ok(), contexto, `HTTP ${resposta?.status()}`);
  await page.waitForFunction(() =>
    [...document.querySelectorAll('.atelier')].every((no) => no.classList.contains('atelier--pronto'))
  );
  paginas++;

  const hosts = page.locator('.atelier');
  const totalHosts = await hosts.count();
  ateliers += totalHosts;

  for (let i = 0; i < totalHosts; i++) {
    const host = hosts.nth(i);
    const modo = await host.getAttribute('data-modo');
    const id = (await host.getAttribute('data-id')) || `${contexto}#${i + 1}`;
    const editavel = modo === 'exercicio' || modo === 'auditoria';
    exigir(await host.locator('iframe.at-frame').count() === 1, id, 'prévia iframe ausente');
    exigir(await host.locator('input.at-slider').count() === 1, id, 'controle de viewport ausente');

    const frame = host.locator('iframe.at-frame');
    await frame.evaluate((no) => new Promise((resolve) => {
      if (no.contentDocument?.readyState === 'complete') resolve();
      else no.addEventListener('load', resolve, { once: true });
    }));
    const temDocumento = await frame.evaluate((no) => Boolean(no.contentDocument?.documentElement));
    exigir(temDocumento, id, 'prévia não recebeu documento');

    if (!editavel) continue;
    editores++;
    const campos = host.locator('textarea.at-campo');
    exigir(await campos.count() >= 1, id, 'editor textarea de fallback ausente');
    exigir(await host.getByRole('button', { name: 'Reiniciar' }).count() === 1, id, 'botão Reiniciar ausente');
    exigir(await host.getByRole('button', { name: 'Expandir prévia' }).count() === 1, id, 'botão Expandir ausente');

    const campo = campos.first();
    const original = await campo.inputValue();
    await campo.fill(`${original}\n/* auditoria-e2e */`);
    await campo.dispatchEvent('input');
    await page.waitForTimeout(320);
    const atualizado = await frame.evaluate((no) => no.getAttribute('srcdoc') || '');
    exigir(atualizado.includes('auditoria-e2e'), id, 'edição não atualizou a prévia');

    await host.getByRole('button', { name: 'Reiniciar' }).click();
    exigir((await campo.inputValue()) === original, id, 'Reiniciar não restaurou o código inicial');

    const expandir = host.getByRole('button', { name: 'Expandir prévia' });
    await expandir.click();
    exigir(await host.evaluate((no) => no.classList.contains('atelier--expandido')), id, 'Expandir não mudou o estado');
    exigir(await host.locator('.at-editor').evaluate((no) => getComputedStyle(no).display === 'none'), id, 'Expandir não escondeu o editor');
    exigir(await host.getByRole('button', { name: 'Mostrar editor' }).count() === 1, id, 'rótulo de retorno ausente');
    await host.getByRole('button', { name: 'Mostrar editor' }).click();
    exigir(!(await host.evaluate((no) => no.classList.contains('atelier--expandido'))), id, 'Mostrar editor não restaurou o estado');
    exigir(await host.locator('.at-editor').evaluate((no) => getComputedStyle(no).display !== 'none'), id, 'Mostrar editor não tornou o editor visível');

    const solucao = host.getByRole('button', { name: 'Ver solução' });
    if (tipo === 'professor' && modo === 'exercicio') {
      exigir(await solucao.count() === 1, id, 'botão Ver solução ausente no professor');
      if (await solucao.count()) {
        await solucao.click();
        exigir((await campo.inputValue()) !== original, id, 'Ver solução não alterou o editor');
        exigir(await host.getByRole('button', { name: 'Voltar ao meu' }).count() === 1, id, 'retorno ao código do professor ausente');
        await host.getByRole('button', { name: 'Voltar ao meu' }).click();
        exigir((await campo.inputValue()) === original, id, 'Voltar ao meu não restaurou o código');

        await solucao.click();
        await host.getByRole('button', { name: 'Reiniciar' }).click();
        exigir((await campo.inputValue()) === original, id, 'Reiniciar com solução aberta não restaurou o início');
        exigir(await host.getByRole('button', { name: 'Ver solução' }).count() === 1, id, 'Reiniciar não fechou o estado da solução');
      }
    } else {
      exigir(await solucao.count() === 0, id, 'botão/solução vazou para o aluno');
    }

    if (modo === 'auditoria') {
      auditorias++;
      const opcoes = host.locator('.at-achado-btn');
      exigir(await opcoes.count() > 0, id, 'auditoria sem opções');
      if (await opcoes.count()) {
        await opcoes.first().click();
        if (tipo === 'professor') {
          exigir(await host.locator('.at-achado-veredito.visivel').count() === 1, id, 'veredito não apareceu');
        } else {
          exigir(await host.locator('.at-achado.selecionado').count() === 1, id, 'seleção do aluno não alternou');
          await opcoes.first().click();
          exigir(await host.locator('.at-achado.selecionado').count() === 0, id, 'seleção do aluno não desmarcou');
        }
      }
    }
  }

  const blocosQuiz = page.locator('.quiz');
  const totalQuiz = await blocosQuiz.count();
  quizzes += totalQuiz;
  for (let i = 0; i < totalQuiz; i++) {
    const quiz = blocosQuiz.nth(i);
    const opcoes = quiz.locator('.quiz-opts button');
    exigir(await opcoes.count() >= 2, contexto, `quiz ${i + 1} não virou botões`);
    if (!(await opcoes.count())) continue;
    await opcoes.first().click();
    const feedback = (await quiz.locator('.quiz-feedback').textContent())?.trim() || '';
    exigir(feedback.length > 0, contexto, `quiz ${i + 1} não mostrou feedback`);
    if (tipo === 'aluno') {
      exigir(feedback.includes('Resposta registrada'), contexto, `quiz ${i + 1} revelou ou omitiu feedback neutro`);
    }
  }

  erros.filter((e) => !e.includes('CodeMirror')).forEach((e) => falhas.push(`${contexto}: ${e}`));
  page.off('pageerror', aoErro);
}

const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
});
try {
  // 390px garante que o teste de Expandir cubra a implementação móvel — foi
  // exatamente abaixo do breakpoint de desktop que a regressão apareceu.
  const context = await browser.newContext({
    serviceWorkers: 'block',
    viewport: { width: 390, height: 844 },
  });
  await context.route('https://esm.sh/**', (route) => route.abort());
  const page = await context.newPage();

  for (const arquivo of arquivos) {
    await auditarPagina(page, `${base}/lessons/${arquivo}`, 'professor');
    await auditarPagina(page, `${base}/dist/aluno/${arquivo}`, 'aluno');
  }
} finally {
  await browser.close();
}

console.log(JSON.stringify({ paginas, ateliers, editores, quizzes, auditorias, falhas }, null, 2));
if (falhas.length) process.exitCode = 1;
