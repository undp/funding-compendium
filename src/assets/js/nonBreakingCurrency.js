const CURRENCY_UNIT_PATTERN = /((?:US\$|\$|USD\s*)\d[\d,.]*)([ \t]+)(million|billion|[MB])\b/gi;
const PERCENT_PATTERN = /(\d[\d,.]*)([ \t]+)(percent)\b/gi;
const EXCLUDED_SELECTOR = 'script, style, textarea, input, select, option, code, pre, [contenteditable="true"], .echarts';

export function applyNonBreakingCurrency(root = document.body) {
  if (!root) return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes = [];

  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }

  textNodes.forEach((node) => {
    const parent = node.parentElement;

    if (!parent || parent.closest(EXCLUDED_SELECTOR)) return;

    node.nodeValue = node.nodeValue.replace(
      CURRENCY_UNIT_PATTERN,
      '$1\u00a0$3'
    );
    node.nodeValue = node.nodeValue.replace(
      PERCENT_PATTERN,
      '$1\u00a0$3'
    );
  });
}

export default applyNonBreakingCurrency;
