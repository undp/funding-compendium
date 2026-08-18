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
        const humanitarianRow = humanitarian[index] > 0
          ? `<div style="margin-bottom:5px">Humanitarian: <strong>$${humanitarian[index].toFixed(1)}M</strong></div>`
          : '';

        return `<div style="font-size:14px;font-weight:700;margin-bottom:9px">${years[index]}</div>
          <div style="margin-bottom:5px">Climate and environment: <strong>$${climate[index].toFixed(1)}M</strong></div>
          <div style="margin-bottom:5px">Development: <strong>$${development[index].toFixed(1)}M</strong></div>
          ${humanitarianRow}
          <div style="margin-bottom:5px">Peace and transition: <strong>$${peace[index].toFixed(1)}M</strong></div>
          <div style="margin-top:8px;padding-top:8px;border-top:1px solid #E5E7EB">UNDP Total: <strong>$${undpTotal[index]}M</strong></div>`;
      }
    },
    legend: {
      top: 55,
      left: 0,
      itemWidth: 12,
      itemHeight: 12,
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
      top: 115,
      bottom: 45,
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
      splitLine: { lineStyle: { color: '#E8EAED' } }
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
