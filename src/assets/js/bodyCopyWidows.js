const LAST_THREE_WORDS = /(\S+)[ \t\u00a0]+(\S+)[ \t\u00a0]+(\S+)(\s*)$/;
const EXCLUDED_SELECTOR = '.chart-source, .echarts, nav, table, button, [role="button"], [contenteditable="true"]';

const protectHyphens = (word) => word.replace(/-/g, '\u2011');

export function protectBodyCopyWidows(root = document) {
  root.querySelectorAll('main p').forEach((paragraph) => {
    if (paragraph.closest(EXCLUDED_SELECTOR)) return;
    if (paragraph.textContent.trim().split(/\s+/).length < 6) return;

    const walker = document.createTreeWalker(paragraph, NodeFilter.SHOW_TEXT);
    const textNodes = [];

    while (walker.nextNode()) {
      if (walker.currentNode.nodeValue.trim()) {
        textNodes.push(walker.currentNode);
      }
    }

    const lastNode = textNodes[textNodes.length - 1];
    if (!lastNode || !LAST_THREE_WORDS.test(lastNode.nodeValue)) return;

    lastNode.nodeValue = lastNode.nodeValue.replace(
      LAST_THREE_WORDS,
      (_, first, second, third, trailingSpace) =>
        `${protectHyphens(first)}\u00a0${protectHyphens(second)}\u00a0${protectHyphens(third)}${trailingSpace}`
    );
  });
}

export default protectBodyCopyWidows;
