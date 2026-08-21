const years = ['2022', '2023', '2024', '2025'];
const climate = [47.139971, 36.479248, 64.069679, 51.423047];
const development = [78.697794, 45.339076, 69.668037, 77.134571];
const humanitarian = [0.203308, 0.466253, 0, 0];
const peace = [132.144448, 137.714204, 115.829064, 105.183506];
const undpTotal = [249, 224, 251, 234];
const totalLabelAnchors = years.map((_, index) => Math.max(
  undpTotal[index],
  climate[index] + development[index] + humanitarian[index] + peace[index]
));
const pooledColors = ['#267878', '#3D9999', '#E86B2E', '#C3D51F'];

export function initPooledFundContributions(el, echarts) {
  const chart = echarts.init(el);

  chart.setOption({
   
    textStyle: { fontFamily: 'Proxima Nova, Arial, sans-serif' },
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
          { label: 'Climate and environment', color: pooledColors[0], value: amount(climate[index]), detail: share(climate[index]) },
          { label: 'Development', color: pooledColors[1], value: amount(development[index]), detail: share(development[index]) },
          { label: 'Humanitarian', color: pooledColors[2], value: humanitarian[index] > 0 ? amount(humanitarian[index]) : '—', detail: humanitarian[index] > 0 ? share(humanitarian[index]) : null },
          { label: 'Peace and transition', color: pooledColors[3], value: amount(peace[index]), detail: share(peace[index]) }
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
      top: 20,
      bottom: 75,
      containLabel: true
    },
    xAxis: {
      type: 'value',
      min: 0,
      max: 299,
      interval: 50,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#7A838F',
        fontSize: 11,
        formatter: (value) => value === 299 ? '' : `$${value}M`
      },
      splitLine: {
        show: true,
        lineStyle: { color: '#C5CBD1', width: 1, type: 'solid' }
      }
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
        itemStyle: { color: pooledColors[0] }
      },
      {
        name: 'Development',
        type: 'bar',
        stack: 'total',
        barWidth: 32,
        data: development,
        itemStyle: { color: pooledColors[1] }
      },
      {
        name: 'Humanitarian',
        type: 'bar',
        stack: 'total',
        barWidth: 32,
        data: humanitarian,
        itemStyle: { color: pooledColors[2] }
      },
      {
        name: 'Peace and transition',
        type: 'bar',
        stack: 'total',
        barWidth: 32,
        data: peace,
        itemStyle: { color: pooledColors[3] }
      },
      {
        name: '',
        type: 'bar',
        data: totalLabelAnchors,
        barWidth: 32,
        barGap: '-100%',
        silent: true,
        itemStyle: { color: 'transparent' },
        label: {
          show: true,
          position: 'right',
          distance: 9,
          formatter: (params) => `$${undpTotal[params.dataIndex]}M`,
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
