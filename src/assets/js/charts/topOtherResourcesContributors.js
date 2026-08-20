const contributors = [
  'Vertical fund—GEF',
  'European Union',
  'Vertical Fund—GFATM',
  'Argentina',
  'Multi-Partner Trust Funds',
  'Norway',
  'Germany',
  'Japan',
  'Republic of Korea',
  'Gabon',
  'Sweden',
  'Guatemala',
  'Saudi Arabia',
  'Denmark',
  'Vertical fund - Green Climate Fund',
  'Brazil',
  'Colombia',
  'World Bank Group',
  'United Nations Agencies',
  'United Kingdom'
];

const values = [
  371.578945,
  312.784472,
  310.762558,
  305.781408,
  233.741124,
  225.463048,
  221.601868,
  208.745006,
  131.564223,
  123.262922,
  110.882152,
  98.091888,
  92.705485,
  86.498670,
  84.422285,
  75.503188,
  73.721768,
  71.266739,
  69.396342,
  61.409719
];

export function initTopOtherResourcesContributors(el, echarts) {
  const chart = echarts.init(el);

  chart.setOption({
    
    textStyle: {
      fontFamily: 'Proxima Nova, Arial, sans-serif'
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
        const exactValue = Math.round(item.value * 1000000).toLocaleString('en-US');

        return `<div style="font-family:'Proxima Nova',Arial,sans-serif;font-weight:700;margin-bottom:6px">${item.name}</div>
          <div style="font-family:'Proxima Nova',Arial,sans-serif">Other resources: <strong>$${exactValue}</strong></div>`;
      }
    },
    grid: {
      left: 230,
      right: 100,
      top: 0,
      bottom: 45
    },
    xAxis: {
      type: 'value',
      max: 400,
      interval: 100,
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
      data: contributors,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#2F3742',
        fontSize: 12,
        margin: 14,
        width: 200,
        overflow: 'truncate'
      }
    },
    series: [{
      name: 'Other Resources',
      type: 'bar',
      data: values,
      barWidth: 16,
      itemStyle: { color: RESOURCE_COLORS.other },
      label: {
        show: true,
        position: 'right',
        distance: 8,
        formatter: (params) => `$${Math.round(params.value)}M`,
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

export default initTopOtherResourcesContributors;
import { RESOURCE_COLORS } from './chartColors';
