import fs from 'fs';
import https from 'https';
import path from 'path';
import * as realEcharts from 'echarts';
import { initResourcesByFundingType } from '../src/assets/js/charts/resourcesByFundingType';
import { initTrendsInResources } from '../src/assets/js/charts/trendsInResources';
import { initContributionByDonorCategory } from '../src/assets/js/charts/contributionByDonorCategory';
import { initContributionsByDonorResource } from '../src/assets/js/charts/contributionsByDonorResource';
import { initResourcesByFundingChannel } from '../src/assets/js/charts/resourcesByFundingChannel';
import { initRegularResourcesAllocation } from '../src/assets/js/charts/regularResourcesAllocation';
import { initResourcesByDevelopmentStatus } from '../src/assets/js/charts/resourcesByDevelopmentStatus';
import { initResourcesByCountryTypology } from '../src/assets/js/charts/resourcesByCountryTypology';
import { initResourcesByRegion } from '../src/assets/js/charts/resourcesByRegion';
import { initInstitutionalBudgetAllocation } from '../src/assets/js/charts/institutionalBudgetAllocation';
import { initTopCoreContributors } from '../src/assets/js/charts/topCoreContributors';
import { initMultiYearPledges } from '../src/assets/js/charts/multiYearPledges';
import { initTopGlocContributors } from '../src/assets/js/charts/topGlocContributors';
import { initTopOtherResourcesContributors } from '../src/assets/js/charts/topOtherResourcesContributors';
import { initThematicWindowContributions } from '../src/assets/js/charts/thematicWindowContributions';
import { initFundingWindowContributorFlow } from '../src/assets/js/charts/fundingWindowContributorFlow';
import { initTopUnPooledFunds } from '../src/assets/js/charts/topUnPooledFunds';
import { initTopPooledFundMemberStates } from '../src/assets/js/charts/topPooledFundMemberStates';
import { initPooledFundContributions } from '../src/assets/js/charts/pooledFundContributions';
import { initGovernmentFinancingByCountry } from '../src/assets/js/charts/governmentFinancingByCountry';
import { initGovernmentFinancingByRegion } from '../src/assets/js/charts/governmentFinancingByRegion';
import { initVerticalFundContributions } from '../src/assets/js/charts/verticalFundContributions';
import { initEuContributionsByRegion } from '../src/assets/js/charts/euContributionsByRegion';
import { initIfiContributionsDonut } from '../src/assets/js/charts/ifiContributionsDonut';
import { initIfiContributionsByType } from '../src/assets/js/charts/ifiContributionsByType';
import { initTopIfiRecipientCountries } from '../src/assets/js/charts/topIfiRecipientCountries';
import { initTopPrivateSectorContributors } from '../src/assets/js/charts/topPrivateSectorContributors';
import { initPrivateSectorContributionsByType } from '../src/assets/js/charts/privateSectorContributionsByType';

const makeNode = () => ({
  style: {}, dataset: {}, children: [], className: '', innerHTML: '', hidden: false,
  classList: { add() {}, remove() {}, toggle() {} },
  setAttribute() {}, getAttribute() { return null; }, addEventListener() {}, remove() {},
  appendChild(child) { this.children.push(child); return child; },
  insertAdjacentElement() {}, insertAdjacentHTML() {}, querySelector() { return makeNode(); },
  querySelectorAll() { return []; },
  getContext() { return { font: '14px Arial', measureText(text) { return { width: String(text).length * 7 }; } }; },
});
global.window = {
  addEventListener() {}, removeEventListener() {}, location: { href: 'file:///chart-exports/' }, innerWidth: 1200,
  matchMedia() { return { matches: false, addEventListener() {}, removeEventListener() {} }; },
};
global.document = { createElement() { return makeNode(); } };
global.requestAnimationFrame = (cb) => { try { cb(); } catch (_) {} };
global.Image = class { addEventListener() {} set src(_) {} };

// ECharts probes the host platform for a canvas even when its SSR renderer is
// SVG. Provide the one canvas operation it uses for desktop label layout.
realEcharts.setPlatformAPI({
  createCanvas() {
    return {
      getContext() {
        return {
          font: '14px Arial',
          measureText(text) { return { width: String(text).length * 7 }; },
        };
      },
    };
  },
});

const charts = [
  ['resources-by-funding-type', initResourcesByFundingType, 1000, 360],
  ['trends-in-resources', initTrendsInResources, 1000, 480],
  ['contribution-by-donor-category', initContributionByDonorCategory, 1200, 650],
  ['contributions-by-donor-resource', initContributionsByDonorResource, 1200, 1200],
  ['resources-by-funding-channel', initResourcesByFundingChannel, 1100, 650],
  ['regular-resources-allocation', initRegularResourcesAllocation, 1000, 560],
  ['resources-by-development-status', initResourcesByDevelopmentStatus, 900, 500],
  ['resources-by-country-typology', initResourcesByCountryTypology, 900, 500],
  ['resources-by-region', initResourcesByRegion, 1100, 580],
  ['institutional-budget-allocation', initInstitutionalBudgetAllocation, 1000, 500],
  ['top-core-contributors', initTopCoreContributors, 1200, 750],
  ['multi-year-pledges', initMultiYearPledges, 1200, 600],
  ['top-gloc-contributors', initTopGlocContributors, 1200, 520],
  ['top-other-resources-contributors', initTopOtherResourcesContributors, 1200, 720],
  ['thematic-window-contributions', initThematicWindowContributions, 1000, 360],
  ['funding-window-contributor-flow', initFundingWindowContributorFlow, 1100, 650],
  ['top-un-pooled-funds', initTopUnPooledFunds, 1100, 650],
  ['top-pooled-fund-member-states', initTopPooledFundMemberStates, 900, 540],
  ['pooled-fund-contributions', initPooledFundContributions, 900, 540],
  ['government-financing-by-country', initGovernmentFinancingByCountry, 1100, 1080],
  ['government-financing-by-region', initGovernmentFinancingByRegion, 1000, 520],
  ['vertical-fund-contributions', initVerticalFundContributions, 1000, 480],
  ['eu-contributions-by-region', initEuContributionsByRegion, 1000, 450],
  ['ifi-contributions-donut', initIfiContributionsDonut, 900, 540],
  ['ifi-contributions-by-type', initIfiContributionsByType, 900, 450],
  ['top-ifi-recipient-countries', initTopIfiRecipientCountries, 900, 450],
  ['top-private-sector-contributors', initTopPrivateSectorContributors, 900, 450],
  ['private-sector-contributions-by-type', initPrivateSectorContributionsByType, 900, 450],
];

const out = path.resolve('chart-exports');
fs.mkdirSync(out, { recursive: true });
const results = [];

const fetchText = (url, redirects = 0) => new Promise((resolve, reject) => {
  https.get(url, { headers: { 'User-Agent': 'funding-compendium-svg-exporter/1.0' } }, (response) => {
    if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location && redirects < 5) {
      response.resume();
      resolve(fetchText(new URL(response.headers.location, url).href, redirects + 1));
      return;
    }
    if (response.statusCode !== 200) {
      response.resume();
      reject(new Error(`Unable to download ${url}: HTTP ${response.statusCode}`));
      return;
    }
    response.setEncoding('utf8');
    let body = '';
    response.on('data', (chunk) => { body += chunk; });
    response.on('end', () => resolve(body));
  }).on('error', reject);
});

const decodeSvgDataUrl = (url) => {
  const comma = url.indexOf(',');
  const metadata = url.slice(0, comma);
  const payload = url.slice(comma + 1);
  return /;base64/i.test(metadata)
    ? Buffer.from(payload, 'base64').toString('utf8')
    : decodeURIComponent(payload);
};

const attr = (markup, name) => {
  const match = markup.match(new RegExp(`\\s${name}="([^"]*)"`));
  return match ? match[1] : '';
};

const inlineVectorFlags = async (svgMarkup) => {
  const imageTags = svgMarkup.match(/<image\b[^>]*><\/image>/g) || [];
  const flagTags = imageTags.filter((tag) => {
    const href = attr(tag, 'href');
    return /^https:\/\/flagcdn\.com\/[a-z]+\.svg$/i.test(href)
      || /Flag_of_the_United_Nations\.svg$/i.test(href)
      || /^data:image\/svg\+xml/i.test(href);
  });
  const sources = new Map();
  await Promise.all([...new Set(flagTags.map((tag) => attr(tag, 'href')))].map(async (href) => {
    sources.set(href, href.startsWith('data:') ? decodeSvgDataUrl(href) : await fetchText(href));
  }));
  let output = svgMarkup;
  for (const [index, tag] of flagTags.entries()) {
    const href = attr(tag, 'href');
    const source = sources.get(href);
    const root = source.match(/<svg\b([^>]*)>([\s\S]*?)<\/svg>/i);
    if (!root) throw new Error(`Downloaded flag is not SVG: ${href}`);
    const sourceViewBox = attr(`<svg${root[1]}>`, 'viewBox')
      || `0 0 ${attr(`<svg${root[1]}>`, 'width') || 30} ${attr(`<svg${root[1]}>`, 'height') || 20}`;
    const idPrefix = `embedded-flag-${index + 1}-`;
    const ids = [...root[2].matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
    let vectorMarkup = root[2];
    for (const id of ids) {
      const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      vectorMarkup = vectorMarkup
        .replace(new RegExp(`id="${escaped}"`, 'g'), `id="${idPrefix}${id}"`)
        .replace(new RegExp(`url\\(#${escaped}\\)`, 'g'), `url(#${idPrefix}${id})`)
        .replace(new RegExp(`(["'])#${escaped}(["'])`, 'g'), `$1#${idPrefix}${id}$2`);
    }
    const wrapperAttrs = ['x', 'y', 'width', 'height', 'transform', 'opacity']
      .map((name) => attr(tag, name) ? `${name}="${attr(tag, name)}"` : '')
      .filter(Boolean)
      .join(' ');
    output = output.replace(tag, `<svg ${wrapperAttrs} viewBox="${sourceViewBox}" preserveAspectRatio="xMidYMid meet" overflow="hidden">${vectorMarkup}</svg>`);
  }
  return { markup: output, count: flagTags.length };
};

const addFundingWindowFlags = (svgMarkup, chart) => {
  const flags = [
    ['Germany', 'de'], ['Denmark', 'dk'], ['Sweden', 'se'], ['Luxembourg', 'lu'],
    ['Republic of Korea', 'kr'], ['Iceland', 'is'], ['Switzerland', 'ch'], ['United Kingdom', 'gb'],
  ];
  const seriesModel = chart.getModel().getSeriesByIndex(0);
  const data = seriesModel.getData();
  const tags = flags.map(([name, code]) => {
    const layout = data.getItemLayout(data.indexOfName(name));
    const width = name === 'Switzerland' ? 18 : 28;
    const slotOffset = name === 'Switzerland' ? 30 : 36;
    const x = seriesModel.layoutInfo.x + layout.x - slotOffset;
    const y = seriesModel.layoutInfo.y + layout.y + layout.dy / 2 - 9;
    return `<image href="https://flagcdn.com/${code}.svg" x="${x}" y="${y}" width="${width}" height="18"></image>`;
  }).join('');
  return svgMarkup.replace('</svg>', `${tags}</svg>`);
};

for (const [type, initFn, width, height] of charts) {
  const chart = realEcharts.init(null, null, { renderer: 'svg', ssr: true, width, height });
  const proxy = { ...realEcharts, init: () => chart };
  const el = makeNode();
  el.clientWidth = width; el.clientHeight = height; el.parentElement = makeNode();
  try {
    initFn(el, proxy);
    let rendered = chart.renderToSVGString();
    if (type === 'funding-window-contributor-flow') rendered = addFundingWindowFlags(rendered, chart);
    const { markup: svg, count: inlinedVectorFlags } = await inlineVectorFlags(rendered);
    const filename = `${type}.svg`;
    fs.writeFileSync(path.join(out, filename), svg);
    results.push({ type, filename, width, height, inlinedVectorFlags });
  } catch (error) {
    results.push({ type, error: error.stack || String(error) });
  }
  chart.dispose();
}

fs.copyFileSync(path.resolve('src/assets/img/Top-15-recipient countries-of-other -resources.svg'), path.join(out, 'top-15-recipient-countries-of-other-resources.svg'));
results.push({ type: 'top-15-recipient-countries-of-other-resources', filename: 'top-15-recipient-countries-of-other-resources.svg', width: 1200, height: 800 });
fs.writeFileSync(path.join(out, 'manifest.json'), JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
