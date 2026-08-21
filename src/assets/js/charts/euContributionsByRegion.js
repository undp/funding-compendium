const years = ['2022', '2023', '2024', '2025'];
const europeCIS = [200.481496, 83.462734, 156.614441, 109.936817];
const asiaPacific = [34.775270, 27.085425, 41.237828, 47.784762];
const arabStates = [64.213951, 63.000735, 33.382367, 62.799930];
const africa = [36.805815, 87.067348, 42.136036, 54.721618];
const latinAmerica = [8.304391, 19.182275, 20.524953, 20.360354];
const global = [18.469002, 21.419253, 11.049183, 17.180990];
const totals = [363.049926, 301.217771, 304.944809, 312.784472];

export function initEuContributionsByRegion(el, echarts) {
  const chart = echarts.init(el);

  chart.setOption({
    backgroundColor: 'transparent',
    textStyle: { fontFamily: 'Proxima Nova, Arial, sans-serif' },
    title: {
      
      subtext: '',
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
        return detailedTooltip(years[index], amount(totals[index]), [
          { label: 'Europe and the CIS', color: CATEGORY_COLORS[0], value: amount(europeCIS[index]), detail: share(europeCIS[index]) },
          { label: 'Asia and the Pacific', color: CATEGORY_COLORS[1], value: amount(asiaPacific[index]), detail: share(asiaPacific[index]) },
          { label: 'Arab States', color: CATEGORY_COLORS[2], value: amount(arabStates[index]), detail: share(arabStates[index]) },
          { label: 'Africa', color: CATEGORY_COLORS[3], value: amount(africa[index]), detail: share(africa[index]) },
          { label: 'Latin America and the Caribbean', color: CATEGORY_COLORS[4], value: amount(latinAmerica[index]), detail: share(latinAmerica[index]) },
          { label: 'Global', color: CATEGORY_COLORS[5], value: amount(global[index]), detail: share(global[index]) }
        ]);
      }
    },
    legend: {
      bottom: 5,
      left: 'center',
      icon: 'rect',
      itemWidth: 24,
      itemHeight: 8,
      itemGap: 16,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        fontSize: 11,
        color: '#4B5563'
      },
      data: [
        'Europe and the CIS',
        'Asia and the Pacific',
        'Arab States',
        'Africa',
        'Latin America and the Caribbean',
        'Global',
        {
          name: 'Total',
          icon: 'path://M0,2 L24,2 L24,6 L0,6 Z',
          itemStyle: {
            color: '#1C1C1C',
            borderColor: '#1C1C1C',
            borderWidth: 0
          }
        }
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
      max: 400,
      interval: 100,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#7A838F',
        fontSize: 11,
        formatter: '${value}M'
      },
      splitLine: { lineStyle: { color: '#C5CBD1' } }
    },
    series: [
      { name: 'Europe and the CIS', type: 'bar', stack: 'total', data: europeCIS, barWidth: 90, itemStyle: { color: CATEGORY_COLORS[0] } },
      { name: 'Asia and the Pacific', type: 'bar', stack: 'total', data: asiaPacific, barWidth: 90, itemStyle: { color: CATEGORY_COLORS[1] } },
      { name: 'Arab States', type: 'bar', stack: 'total', data: arabStates, barWidth: 90, itemStyle: { color: CATEGORY_COLORS[2] } },
      { name: 'Africa', type: 'bar', stack: 'total', data: africa, barWidth: 90, itemStyle: { color: CATEGORY_COLORS[3] } },
      { name: 'Latin America and the Caribbean', type: 'bar', stack: 'total', data: latinAmerica, barWidth: 90, itemStyle: { color: CATEGORY_COLORS[4] } },
      { name: 'Global', type: 'bar', stack: 'total', data: global, barWidth: 90, itemStyle: { color: CATEGORY_COLORS[5] } },
      {
        name: 'Total',
        type: 'line',
        data: totals,
        symbol: 'circle',
        symbolSize: 9,
        lineStyle: { color: '#1C1C1C', width: 3 },
        itemStyle: {
          color: '#1C1C1C',
          borderColor: '#ffffff',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'top',
          distance: 10,
          formatter: (params) => `$${Math.round(params.value)}M`,
          color: '#232E3D',
          fontSize: 12,
          fontWeight: 700
        },
        emphasis: { scale: 1.3 },
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

export default initEuContributionsByRegion;
import { CATEGORY_COLORS } from './chartColors';
import { detailedTooltip, formatTooltipPercent } from './detailedTooltip';
