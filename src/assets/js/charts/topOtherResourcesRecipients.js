const countries = [
  'Argentina',
  'Ukraine',
  'Syrian Arab Republic',
  'Programme of Assistance to the Palestinian People',
  'Gabon',
  'Colombia',
  'Guatemala',
  'Brazil',
  'Lebanon',
  'Democratic Republic of the Congo',
  'Yemen',
  'Moldova, Republic of',
  'Haiti',
  'Türkiye',
  'Zimbabwe'
];

const values = [306, 191, 154, 130, 123, 106, 102, 95, 86, 84, 82, 74, 67, 66, 65];

export function initTopOtherResourcesRecipients(el, echarts) {
  const chart = echarts.init(el);

  chart.setOption({
    textStyle: {
      fontFamily: 'Proxima Nova, Arial, sans-serif'
    },
    title: {
      subtext: '$M',
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
      padding: 12,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        color: '#232E3D',
        fontSize: 13
      },
      formatter: function (params) {
        const item = params[0];
        return `<div style="font-family:'Proxima Nova',Arial,sans-serif;font-weight:700;margin-bottom:6px">${item.name}</div>
          <div style="font-family:'Proxima Nova',Arial,sans-serif">Other resources: <strong>$${item.value}M</strong></div>`;
      }
    },
    grid: {
      left: 285,
      right: 85,
      top: 85,
      bottom: 40
    },
    xAxis: {
      type: 'value',
      min: 0,
      max: 330,
      interval: 50,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#7A838F',
        fontSize: 11,
        formatter: '${value}M'
      },
      splitLine: {
        lineStyle: { color: '#E8EAED' }
      }
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
        lineHeight: 15,
        margin: 14,
        width: 245,
        overflow: 'break'
      }
    },
    series: [{
      name: 'Other resources',
      type: 'bar',
      data: values,
      barWidth: 17,
      itemStyle: { color: RESOURCE_COLORS.other },
      label: {
        show: true,
        position: 'right',
        distance: 8,
        formatter: (params) => `$${params.value}M`,
        color: '#46515D',
        fontSize: 11,
        fontWeight: 600
      },
      emphasis: {
        itemStyle: { color: RESOURCE_COLORS.other, opacity: 0.82 }
      }
    }]
  });

  const resize = () => chart.resize();
  window.addEventListener('resize', resize);
  el.__echartsInstance = chart;
  el.__echartsResizeHandler = resize;

  return chart;
}

export default initTopOtherResourcesRecipients;
import { RESOURCE_COLORS } from './chartColors';
