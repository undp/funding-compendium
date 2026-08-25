const years = ['2022', '2023', '2024', '2025'];
const latinAmerica = [584.680275, 780.357845, 712.149669, 883.609210];
const europeCIS = [109.872041, 114.048656, 162.312050, 125.223176];
const arabStates = [123.588728, 115.094551, 113.531771, 108.717443];
const africa = [207.700913, 126.318559, 130.999067, 248.314057];
const asiaPacific = [98.178461, 58.449892, 48.127073, 60.160570];
const totals = [1124.037568, 1194.290257, 1167.303461, 1425.934731];
const regionColors = REGION_COLORS;

export function initGovernmentFinancingByRegion(el, echarts) {
  const chart = echarts.init(el);

  chart.setOption({
    backgroundColor: 'transparent',
    textStyle: { fontFamily: 'ProximaNova, Arial, sans-serif' },
    title: {
     
      left: 'center',
      top: 0,
      textStyle: {
        fontFamily: 'ProximaNova, Arial, sans-serif',
        fontSize: 20,
        fontWeight: 700,
        color: '#232E3D'
      },
      subtextStyle: {
        fontFamily: 'ProximaNova, Arial, sans-serif',
        fontSize: 14,
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
        fontFamily: 'ProximaNova, Arial, sans-serif',
        color: '#232E3D',
        fontSize: 14
      },
      formatter: function (params) {
        const index = params[0].dataIndex;
        const amount = (value) => `$${value.toFixed(1).replace(/\.0$/, '')}M`;
        const share = (value) => formatTooltipPercent(value, totals[index]);
        return detailedTooltip(years[index], `$${(totals[index] / 1000).toFixed(2)}B`, [
          { label: 'Latin America and the Caribbean', color: regionColors.lac, value: amount(latinAmerica[index]), detail: share(latinAmerica[index]) },
          { label: 'Africa', color: regionColors.africa, value: amount(africa[index]), detail: share(africa[index]) },
          { label: 'Europe and the CIS', color: regionColors.europe, value: amount(europeCIS[index]), detail: share(europeCIS[index]) },
          { label: 'Arab States', color: regionColors.arab, value: amount(arabStates[index]), detail: share(arabStates[index]) },
          { label: 'Asia and the Pacific', color: regionColors.asia, value: amount(asiaPacific[index]), detail: share(asiaPacific[index]) }
        ]);
      }
    },
    legend: [
      {
        bottom: 31,
        left: 'center',
        icon: 'rect',
        itemWidth: 24,
        itemHeight: 8,
        itemGap: 16,
        textStyle: {
          fontFamily: 'ProximaNova, Arial, sans-serif',
          fontSize: 13,
          color: '#4B5563'
        },
        data: [
          'Latin America and the Caribbean',
          'Africa',
          'Europe and the CIS'
        ]
      },
      {
        bottom: 5,
        left: 'center',
        icon: 'rect',
        itemWidth: 24,
        itemHeight: 8,
        itemGap: 16,
        textStyle: {
          fontFamily: 'ProximaNova, Arial, sans-serif',
          fontSize: 13,
          color: '#4B5563'
        },
        data: [
          'Arab States',
          'Asia and the Pacific',
          {
            name: 'Total',
            icon: 'path://M0,3 L24,3 L24,5 L0,5 Z',
            itemStyle: {
              color: '#1C1C1C',
              borderColor: '#1C1C1C',
              borderWidth: 0
            }
          }
        ]
      }
    ],
    grid: {
      left: 65,
      right: 35,
      top: 34,
      bottom: 112
    },
    xAxis: {
      type: 'category',
      data: years,
      axisLine: { lineStyle: { color: '#C9CED4' } },
      axisTick: { show: false },
      axisLabel: {
        color: '#303944',
        fontSize: 14,
        fontWeight: 600,
        margin: 12
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 1500,
      interval: 500,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#7A838F',
        fontSize: 13,
        formatter: function (value) {
          return value >= 1000 ? `$${(value / 1000).toFixed(1).replace(/\.0$/, '')}B` : `$${value}M`;
        }
      },
      splitLine: { lineStyle: { color: '#C5CBD1' } }
    },
    series: [
      { name: 'Latin America and the Caribbean', type: 'bar', stack: 'total', data: latinAmerica, barWidth: 90, itemStyle: { color: regionColors.lac } },
      { name: 'Africa', type: 'bar', stack: 'total', data: africa, barWidth: 90, itemStyle: { color: regionColors.africa } },
      { name: 'Europe and the CIS', type: 'bar', stack: 'total', data: europeCIS, barWidth: 90, itemStyle: { color: regionColors.europe } },
      { name: 'Arab States', type: 'bar', stack: 'total', data: arabStates, barWidth: 90, itemStyle: { color: regionColors.arab } },
      { name: 'Asia and the Pacific', type: 'bar', stack: 'total', data: asiaPacific, barWidth: 90, itemStyle: { color: regionColors.asia } },
      {
        name: 'Total',
        type: 'line',
        data: totals,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { color: '#1C1C1C', width: 2.5 },
        itemStyle: { color: '#1C1C1C', borderWidth: 0 },
        label: {
          show: true,
          position: 'top',
          distance: 10,
          formatter: (params) => `$${(params.value / 1000).toFixed(2)}B`,
          color: '#232E3D',
          fontSize: 14,
          fontWeight: 700
        },
        emphasis: { scale: 1.25 },
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
import { detailedTooltip, formatTooltipPercent } from './detailedTooltip';
import { REGION_COLORS } from './chartColors';
