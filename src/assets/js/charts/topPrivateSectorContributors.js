const donors = [
  'Bill & Melinda Gates Foundation',
  'The Coca-Cola Foundation',
  'Open Society Foundation',
  'WWF – World Wide Fund for Nature',
  'Palestinian American Medical Association',
  'Bloomberg Family Foundation',
  'Samsung Electronics Co., Ltd.',
  'Al Maktoum Foundation',
  'Education Above All',
  'Mastercard Worldwide'
];

const values = [
  9.164853, 8.255274, 7.812565, 6.195864, 5.040976,
  3.465347, 2.620811, 2.3, 2.217801, 2.130149
];

const palette = CATEGORY_COLORS.slice(0, donors.length);

export function initTopPrivateSectorContributors(el, echarts) {
  const chart = echarts.init(el);

  chart.setOption({
    textStyle: { fontFamily: 'Proxima Nova, Arial, sans-serif' },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        shadowStyle: { color: 'rgba(35, 46, 61, 0.035)' }
      },
      backgroundColor: '#ffffff',
      borderColor: '#D8DDE3',
      borderWidth: 1,
      padding: 12,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        color: '#232E3D',
        fontSize: 12
      },
      formatter: function (params) {
        const item = params[0];
        const exact = Math.round(item.value * 1000000).toLocaleString('en-US');
        return `<div style="font-family:'Proxima Nova',Arial,sans-serif;font-size:13px;font-weight:700;margin-bottom:6px">${item.name}</div>
          <div style="font-family:'Proxima Nova',Arial,sans-serif">Contribution: <strong>$${exact}</strong></div>`;
      }
    },
    grid: {
      left: 270,
      right: 80,
      top: 25,
      bottom: 40
    },
    xAxis: {
      type: 'value',
      min: 0,
      max: 10,
      interval: 2,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#7A838F',
        fontSize: 10,
        formatter: (value) => `$${value}m`
      },
      splitLine: { lineStyle: { color: '#ECEEF1' } }
    },
    yAxis: {
      type: 'category',
      inverse: true,
      data: donors,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#303944',
        fontSize: 11,
        lineHeight: 14,
        margin: 14,
        width: 240,
        overflow: 'break'
      }
    },
    series: [{
      name: 'Contribution',
      type: 'bar',
      data: values,
      barWidth: 17,
      itemStyle: {
        color: (params) => palette[params.dataIndex]
      },
      label: {
        show: true,
        position: 'right',
        distance: 8,
        formatter: (params) => `$${params.value.toFixed(1)}m`,
        color: '#303944',
        fontSize: 11,
        fontWeight: 700
      },
      emphasis: { itemStyle: { opacity: 0.8 } }
    }]
  });

  const resize = () => chart.resize();
  window.addEventListener('resize', resize);
  el.__echartsInstance = chart;
  el.__echartsResizeHandler = resize;

  return chart;
}

export default initTopPrivateSectorContributors;
import { CATEGORY_COLORS } from './chartColors';
