const fs = require('fs');
const path = require('path');
const { JSDOM, ResourceLoader, VirtualConsole } = require('jsdom');

const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'chart-exports');
fs.mkdirSync(outDir, { recursive: true });

const pages = [
  ['landscape', 'dist/landscape/index.html'],
  ['regular-resources', 'dist/regular-resources/index.html'],
  ['other-resources', 'dist/other-resources-partnerships/index.html'],
];

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

class LocalLoader extends ResourceLoader {
  fetch(url) {
    if (url.startsWith('https://cdn.jsdelivr.net/npm/echarts@')) return null;
    if (/^https?:/.test(url) && !url.startsWith('http://127.0.0.1')) return null;
    return super.fetch(url);
  }
}

async function exportPage(pageName, relativeHtml) {
  const htmlPath = path.join(root, relativeHtml);
  const cleanHtml = fs.readFileSync(htmlPath, 'utf8').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  const vc = new VirtualConsole();
  vc.on('jsdomError', (e) => {
    if (!/Could not load|Not implemented/.test(String(e.message))) console.error(e);
  });
  const dom = new JSDOM(cleanHtml, {
    url: `file://${htmlPath}`,
    runScripts: 'outside-only',
    pretendToBeVisual: true,
    virtualConsole: vc,
    beforeParse(window) {
      window.HTMLCanvasElement.prototype.getContext = function () {
        return {
          font: '14px Arial',
          measureText(text) { return { width: String(text).length * 7 }; },
          createLinearGradient() { return { addColorStop() {} }; },
          createRadialGradient() { return { addColorStop() {} }; },
        };
      };
      window.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
      window.IntersectionObserver = class { constructor(cb) { this.cb = cb; } observe(el) { this.cb([{ isIntersecting: true, target: el }]); } unobserve() {} disconnect() {} };
      window.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {} });
      window.scrollTo = () => {};
    },
  });
  dom.window.eval(fs.readFileSync(require.resolve('jquery'), 'utf8'));
  dom.window.eval(fs.readFileSync(path.join(root, 'dist/assets/js/app.js'), 'utf8'));
  await new Promise((resolve) => setTimeout(resolve, 4000));
  const records = [];
  const charts = [...dom.window.document.querySelectorAll('.echarts[data-chart-type]')];
  charts.forEach((el, i) => {
    const svg = el.querySelector('svg');
    if (!svg) {
      records.push({ page: pageName, type: el.dataset.chartType, error: 'No SVG rendered' });
      return;
    }
    const type = el.dataset.chartType;
    const filename = `${pageName}-${String(i + 1).padStart(2, '0')}-${slug(type)}.svg`;
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    fs.writeFileSync(path.join(outDir, filename), svg.outerHTML);
    records.push({ page: pageName, type, filename, width: svg.getAttribute('width'), height: svg.getAttribute('height') });
  });
  dom.window.close();
  return records;
}

(async () => {
  const records = [];
  for (const page of pages) records.push(...await exportPage(...page));
  fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(records, null, 2));
  console.log(JSON.stringify(records, null, 2));
})().catch((e) => { console.error(e); process.exit(1); });
