const years = ['2022', '2023', '2024', '2025'];
const latinAmerica = [584.680275, 780.357845, 712.149669, 883.609210];
const europeCIS = [109.872041, 114.048656, 162.312050, 125.223176];
const arabStates = [123.588728, 115.094551, 113.531771, 108.717443];
const africa = [207.700913, 126.318559, 130.999067, 248.314057];
const asiaPacific = [98.178461, 58.449892, 48.127073, 60.160570];
const totals = [1124.037568, 1194.290257, 1167.303461, 1425.934731];

export function initGovernmentFinancingByRegion(el, echarts) {
  const chart = echarts.init(el);

  chart.setOption({
    backgroundColor: 'transparent',
    textStyle: { fontFamily: 'Proxima Nova, Arial, sans-serif' },
    title: {
     
      left: 'center',
      top: 0,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        fontSize: 20,
        fontWeight: 700,
        color: '#232E3D'
      },
      subtextStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        fontSize: 12,
        color: '#7A838F'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(35, 46, 61, 0.035)' } },
      backgroundColor: '#ffffff',
      borderColor: '#D8DDE3',
      borderWidth: 0,
      padding: 0,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        color: '#232E3D',
        fontSize: 12
      },
      formatter: function (params) {
        const index = params[0].dataIndex;
        const amount = (value) => `$${value.toFixed(1).replace(/\.0$/, '')}M`;
        const share = (value) => formatTooltipPercent(value, totals[index]);
        return detailedTooltip(years[index], `$${(totals[index] / 1000).toFixed(2)}B`, [
          { label: 'Latin America and the Caribbean', color: CATEGORY_COLORS[0], value: amount(latinAmerica[index]), detail: share(latinAmerica[index]) },
          { label: 'Africa', color: CATEGORY_COLORS[1], value: amount(africa[index]), detail: share(africa[index]) },
          { label: 'Europe and the CIS', color: CATEGORY_COLORS[2], value: amount(europeCIS[index]), detail: share(europeCIS[index]) },
          { label: 'Arab States', color: CATEGORY_COLORS[3], value: amount(arabStates[index]), detail: share(arabStates[index]) },
          { label: 'Asia and the Pacific', color: CATEGORY_COLORS[4], value: amount(asiaPacific[index]), detail: share(asiaPacific[index]) }
        ]);
      }
    },
    legend: {
      bottom: 5,
      left: 'center',
      icon: 'rect',
      itemWidth: 24,
      itemHeight: 8,
      itemGap: 18,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        fontSize: 11,
        color: '#4B5563'
      },
      data: [
        'Latin America and the Caribbean',
        'Africa',
        'Europe and the CIS',
        'Arab States',
        'Asia and the Pacific'
      ]
    },
    grid: {
      left: 65,
      right: 35,
      top: 35,
      bottom: 75
    },
    xAxis: {
      type: 'category',
      data: years,
      axisLine: { lineStyle: { color: '#C9CED4' } },
      axisTick: { show: false },
      axisLabel: {
        color: '#303944',
        fontSize: 12,
        fontWeight: 600,
        margin: 12
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 1600,
      interval: 400,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#7A838F',
        fontSize: 11,
        formatter: function (value) {
          return value >= 1000 ? `$${(value / 1000).toFixed(1).replace(/\.0$/, '')}B` : `$${value}M`;
        }
      },
      splitLine: { lineStyle: { color: '#C5CBD1' } }
    },
    series: [
      { name: 'Latin America and the Caribbean', type: 'bar', stack: 'total', data: latinAmerica, barWidth: 62, itemStyle: { color: CATEGORY_COLORS[0] } },
      { name: 'Africa', type: 'bar', stack: 'total', data: africa, barWidth: 62, itemStyle: { color: CATEGORY_COLORS[1] } },
      { name: 'Europe and the CIS', type: 'bar', stack: 'total', data: europeCIS, barWidth: 62, itemStyle: { color: CATEGORY_COLORS[2] } },
      { name: 'Arab States', type: 'bar', stack: 'total', data: arabStates, barWidth: 62, itemStyle: { color: CATEGORY_COLORS[3] } },
      { name: 'Asia and the Pacific', type: 'bar', stack: 'total', data: asiaPacific, barWidth: 62, itemStyle: { color: CATEGORY_COLORS[4] } },
      {
        name: 'Total',
        type: 'bar',
        data: totals,
        barWidth: 62,
        barGap: '-100%',
        silent: true,
        itemStyle: { color: 'transparent' },
        label: {
          show: true,
          position: 'top',
          distance: 10,
          formatter: (params) => `$${(params.value / 1000).toFixed(2)}B`,
          color: '#232E3D',
          fontSize: 12,
          fontWeight: 700
        },
        z: 20
      }
    ]
  });

  const resize = () => chart.resize();
  window.addEventListener('resize', resize);
  el.__echartsInstance = chart;
  el.__echartsResizeHandler = resize;

  return chart;
}

export default initGovernmentFinancingByRegion;
import { CATEGORY_COLORS } from './chartColors';
import { detailedTooltip, formatTooltipPercent } from './detailedTooltip';
