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
    backgroundColor: '#ffffff',
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
      axisPointer: { type: 'shadow' },
      backgroundColor: '#ffffff',
      borderColor: '#D8DDE3',
      borderWidth: 1,
      padding: 13,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        color: '#232E3D',
        fontSize: 12
      },
      formatter: function (params) {
        const index = params[0].dataIndex;
        return `<div style="font-size:14px;font-weight:700;margin-bottom:9px">${years[index]}</div>
          <div style="margin-bottom:5px">Latin America and the Caribbean: <strong>$${latinAmerica[index].toFixed(1)}M</strong></div>
          <div style="margin-bottom:5px">Africa: <strong>$${africa[index].toFixed(1)}M</strong></div>
          <div style="margin-bottom:5px">Europe and the CIS: <strong>$${europeCIS[index].toFixed(1)}M</strong></div>
          <div style="margin-bottom:5px">Arab States: <strong>$${arabStates[index].toFixed(1)}M</strong></div>
          <div style="margin-bottom:5px">Asia and the Pacific: <strong>$${asiaPacific[index].toFixed(1)}M</strong></div>
          <div style="margin-top:8px;padding-top:8px;border-top:1px solid #E5E7EB">Total: <strong>$${(totals[index] / 1000).toFixed(2)}B</strong></div>`;
      }
    },
    legend: {
      top: 55,
      left: 0,
      itemWidth: 12,
      itemHeight: 12,
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
      top: 125,
      bottom: 50
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
          return value >= 1000 ? `$${(value / 1000).toFixed(1)}B` : `$${value}M`;
        }
      },
      splitLine: { lineStyle: { color: '#E8EAED' } }
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
