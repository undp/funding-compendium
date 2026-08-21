const years = ['2022', '2023', '2024', '2025'];
const climate = [47.139971, 36.479248, 64.069679, 51.423047];
const development = [78.697794, 45.339076, 69.668037, 77.134571];
const humanitarian = [0.203308, 0.466253, 0, 0];
const peace = [132.144448, 137.714204, 115.829064, 105.183506];
const undpTotal = [249, 224, 251, 234];

export function initPooledFundContributions(el, echarts) {
  const chart = echarts.init(el);

  chart.setOption({
   
    textStyle: { fontFamily: 'Proxima Nova, Arial, sans-serif' },
    title: {
      
      subtext: '2022–2025 · $M',
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
        const compositionTotal = climate[index] + development[index] + humanitarian[index] + peace[index];
        const share = (value) => formatTooltipPercent(value, compositionTotal);
        return detailedTooltip(years[index], `$${undpTotal[index]}M`, [
          { label: 'Climate and environment', color: SECONDARY_COLORS[0], value: amount(climate[index]), detail: share(climate[index]) },
          { label: 'Development', color: SECONDARY_COLORS[1], value: amount(development[index]), detail: share(development[index]) },
          { label: 'Humanitarian', color: SECONDARY_COLORS[2], value: humanitarian[index] > 0 ? amount(humanitarian[index]) : '—', detail: humanitarian[index] > 0 ? share(humanitarian[index]) : null },
          { label: 'Peace and transition', color: SECONDARY_COLORS[3], value: amount(peace[index]), detail: share(peace[index]) }
        ]);
      }
    },
    legend: {
      bottom: 5,
      left: 'center',
      icon: 'rect',
      itemWidth: 24,
      itemHeight: 8,
      itemGap: 20,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        fontSize: 11,
        color: '#4B5563'
      },
      data: [
        'Climate and environment',
        'Development',
        'Humanitarian',
        'Peace and transition'
      ]
    },
    grid: {
      left: 65,
      right: 80,
      top: 55,
      bottom: 75,
      containLabel: true
    },
    xAxis: {
      type: 'value',
      min: 0,
      max: 300,
      interval: 50,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#7A838F',
        fontSize: 11,
        formatter: '${value}M'
      },
      splitLine: { lineStyle: { color: '#C5CBD1' } }
    },
    yAxis: {
      type: 'category',
      inverse: true,
      data: years,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#232E3D',
        fontSize: 13,
        fontWeight: 700,
        margin: 15
      }
    },
    series: [
      {
        name: 'Climate and environment',
        type: 'bar',
        stack: 'total',
        barWidth: 32,
        data: climate,
        itemStyle: { color: SECONDARY_COLORS[0] }
      },
      {
        name: 'Development',
        type: 'bar',
        stack: 'total',
        barWidth: 32,
        data: development,
        itemStyle: { color: SECONDARY_COLORS[1] }
      },
      {
        name: 'Humanitarian',
        type: 'bar',
        stack: 'total',
        barWidth: 32,
        data: humanitarian,
        itemStyle: { color: SECONDARY_COLORS[2] }
      },
      {
        name: 'Peace and transition',
        type: 'bar',
        stack: 'total',
        barWidth: 32,
        data: peace,
        itemStyle: { color: SECONDARY_COLORS[3] }
      },
      {
        name: 'UNDP Total',
        type: 'bar',
        data: undpTotal,
        barWidth: 32,
        barGap: '-100%',
        silent: true,
        itemStyle: { color: 'transparent' },
        label: {
          show: true,
          position: 'right',
          distance: 9,
          formatter: (params) => `$${params.value}M`,
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

export default initPooledFundContributions;
import { SECONDARY_COLORS } from './chartColors';
import { detailedTooltip, formatTooltipPercent } from './detailedTooltip';
