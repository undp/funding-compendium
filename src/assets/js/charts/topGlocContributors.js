const countries = [
  'South Sudan, Republic of',
  'Iraq',
  'Angola',
  'South Africa',
  'Nigeria',
  'Indonesia',
  'Côte d’Ivoire',
  'Lebanon',
  'Pakistan',
  'Ecuador'
];

const arrears = [0, 2.178347, 2.050960, 0, 0, 0, 0.593283, 0.482320, 0.605378, 0.751422];
const currentYear = [4.104243, 0.541441, 0, 1.561569, 0, 1.020358, 0.433866, 0.486082, 0.249447, 0.020918];
const inKind = [0, 0, 0.146696, 0.156477, 1.367872, 0.265233, 0.085263, 0, 0, 0];
const totals = [4.104243, 2.719788, 2.197656, 1.718046, 1.367872, 1.285591, 1.112412, 0.968402, 0.854825, 0.772340];

export function initTopGlocContributors(el, echarts) {
  const option = {
    textStyle: { fontFamily: 'Proxima Nova, Arial, sans-serif' },
    
    title: {
      text: 'Top 10 GLOC contributors',
      subtext: '$ millions',
      left: 0,
      top: 0,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        fontSize: 20,
        fontWeight: 700,
        color: '#232E3D'
      },
      subtextStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        fontSize: 13,
        color: '#6B7280'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: '#ffffff',
      borderColor: '#D1D5DB',
      borderWidth: 1,
      padding: 14,
      textStyle: {
        color: '#232E3D',
        fontSize: 13
      },
      formatter: function (params) {
        const index = params[0].dataIndex;
        const format = (value) => `$${(value * 1000000).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
        let html = `<div style="font-weight:700;margin-bottom:8px">${countries[index]}</div>`;

        if (arrears[index] > 0) {
          html += `<div style="margin-bottom:4px">Arrears: <strong>${format(arrears[index])}</strong></div>`;
        }
        if (currentYear[index] > 0) {
          html += `<div style="margin-bottom:4px">Current year payment: <strong>${format(currentYear[index])}</strong></div>`;
        }
        if (inKind[index] > 0) {
          html += `<div style="margin-bottom:4px">In-kind: <strong>${format(inKind[index])}</strong></div>`;
        }

        return `${html}<div style="margin-top:8px;padding-top:8px;border-top:1px solid #E5E7EB">Total: <strong>${format(totals[index])}</strong></div>`;
      }
    },
    legend: {
      top: 50,
      right: 0,
      itemWidth: 13,
      itemHeight: 13,
      itemGap: 22,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        fontSize: 12,
        color: '#4B5563'
      }
    },
    grid: {
      left: 165,
      right: 80,
      top: 100,
      bottom: 35
    },
    xAxis: {
      type: 'value',
      max: 4.5,
      interval: 1,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#6B7280',
        fontSize: 11,
        formatter: '${value}m'
      },
      splitLine: { lineStyle: { color: '#E5E7EB' } }
    },
    yAxis: {
      type: 'category',
      inverse: true,
      data: countries,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#232E3D',
        fontSize: 12,
        margin: 14
      }
    },
    series: [
      {
        name: 'Arrears',
        type: 'bar',
        stack: 'total',
        barWidth: 22,
        data: arrears,
        itemStyle: { color: SECONDARY_COLORS[0] }
      },
      {
        name: 'Current year payment',
        type: 'bar',
        stack: 'total',
        barWidth: 22,
        data: currentYear,
        itemStyle: { color: SECONDARY_COLORS[1] }
      },
      {
        name: 'In-kind',
        type: 'bar',
        stack: 'total',
        barWidth: 22,
        data: inKind,
        itemStyle: { color: SECONDARY_COLORS[2] }
      },
      {
        name: 'Total',
        type: 'bar',
        data: totals,
        barWidth: 22,
        barGap: '-100%',
        silent: true,
        itemStyle: { color: 'transparent' },
        label: {
          show: true,
          position: 'right',
          distance: 8,
          formatter: (params) => `$${params.value.toFixed(2)}m`,
          color: '#232E3D',
          fontSize: 12,
          fontWeight: 700
        },
        z: 10
      }
    ]
  };

  const chart = echarts.init(el);
  chart.setOption(option);

  const resize = () => chart.resize();
  window.addEventListener('resize', resize);
  el.__echartsInstance = chart;
  el.__echartsResizeHandler = resize;

  return chart;
}

export default initTopGlocContributors;
import { SECONDARY_COLORS } from './chartColors';
