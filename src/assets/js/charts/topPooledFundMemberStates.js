const countries = [
  'Norway',
  'Germany',
  'Netherlands',
  'Australia',
  'United Kingdom',
  'Canada',
  'Spain',
  'Sweden',
  'European Union',
  'Denmark',
  'Switzerland',
  'Ireland',
  'Republic of Korea',
  'Italy',
  'Belgium'
];

const values = [14, 6, 5, 5, 4, 4, 4, 3, 2, 2, 1, 1, 1, 1, 1];

export function initTopPooledFundMemberStates(el, echarts) {
  const chart = echarts.init(el);

  chart.setOption({
    textStyle: { fontFamily: 'Proxima Nova, Arial, sans-serif' },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: '#ffffff',
      borderColor: '#D8DDE3',
      borderWidth: 1,
      padding: 11,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        color: '#232E3D',
        fontSize: 12
      },
      formatter: function (params) {
        const item = params[0];
        return `<div style="font-family:'Proxima Nova',Arial,sans-serif;font-weight:700;margin-bottom:5px">${item.name}</div>
          <div style="font-family:'Proxima Nova',Arial,sans-serif">Share of total: <strong>${item.value}%</strong></div>`;
      }
    },
    grid: {
      left: 135,
      right: 55,
      top: 20,
      bottom: 35
    },
    xAxis: {
      type: 'value',
      min: 0,
      max: 15,
      interval: 5,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#7A838F',
        fontSize: 11,
        formatter: '{value}%'
      },
      splitLine: { lineStyle: { color: '#E8EAED' } }
    },
    yAxis: {
      type: 'category',
      inverse: true,
      data: countries,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#2F3742',
        fontSize: 12,
        margin: 13
      }
    },
    series: [{
      name: 'Share of total',
      type: 'bar',
      data: values,
      barWidth: 15,
      itemStyle: {
        color: function (params) {
          if (params.dataIndex === 0) return SECONDARY_COLORS[0];
          if (params.dataIndex <= 3) return SECONDARY_COLORS[1];
          return SECONDARY_COLORS[2];
        }
      },
      label: {
        show: true,
        position: 'right',
        distance: 7,
        formatter: '{c}%',
        color: '#36434D',
        fontSize: 11,
        fontWeight: 700
      },
      emphasis: {
        itemStyle: { color: SECONDARY_COLORS[3] }
      }
    }]
  });

  const resize = () => chart.resize();
  window.addEventListener('resize', resize);
  el.__echartsInstance = chart;
  el.__echartsResizeHandler = resize;

  return chart;
}

export default initTopPooledFundMemberStates;
import { SECONDARY_COLORS } from './chartColors';
