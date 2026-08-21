export function detailedTooltip(heading, total, rows) {
  const visibleRows = rows
    .filter((row) => row && row.value !== undefined && row.value !== null)
    .sort((a, b) => Number(a.value === '—') - Number(b.value === '—'));
  const nonZeroRows = visibleRows.filter((row) => row.value !== '—').length;

  const breakdown = visibleRows
    .map((row) => `
      <div style="display:flex;justify-content:space-between;align-items:baseline;gap:28px;margin-bottom:6px">
        <span>${row.color ? `<span style="display:inline-block;width:12px;height:6px;margin-right:7px;background:${row.color};vertical-align:middle"></span>` : ''}${row.label}</span>
        <strong style="white-space:nowrap;${row.value === '—' ? 'color:#8A929B;font-weight:400' : ''}">${row.value}${row.detail && !(nonZeroRows === 1 && row.detail === '100%') ? ` <span style="color:#6B7280;font-weight:400">${row.detail}</span>` : ''}</strong>
      </div>`)
    .join('');

  return `<div style="min-width:250px;font-family:'Proxima Nova',Arial,sans-serif">
    <div style="display:flex;justify-content:space-between;align-items:baseline;gap:24px;background:#263746;color:#fff;padding:10px 12px;margin:0 0 11px">
      <strong style="font-size:14px">${heading}</strong>
      <strong style="font-size:14px;white-space:nowrap">${total}</strong>
    </div>
    <div style="padding:0 12px 7px">
      ${breakdown}
    </div>
  </div>`;
}

export function formatTooltipPercent(value, total) {
  if (!total || value <= 0) return '0%';
  const percent = value / total * 100;
  return percent < 1 ? '&lt;1%' : `${Math.round(percent)}%`;
}

export default detailedTooltip;
