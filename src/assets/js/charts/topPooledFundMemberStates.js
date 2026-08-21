const countries = [
  'Norway',
  'Germany',
  'The Netherlands',
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

const values = [18, 14, 8, 6, 5, 5, 4, 4, 4, 3, 2, 2, 1, 1, 1];
const flagCodes = {
  Norway: 'no', Germany: 'de', 'The Netherlands': 'nl', Australia: 'au',
  'United Kingdom': 'gb', Canada: 'ca', Spain: 'es', Sweden: 'se',
  'European Union': 'eu', Denmark: 'dk', Switzerland: 'ch', Ireland: 'ie',
  'Republic of Korea': 'kr', Italy: 'it', Belgium: 'be'
};
const flagKey = (name) => `flag_${name.replace(/[^a-zA-Z0-9]/g, '_')}`;
const flagStyles = Object.fromEntries(countries.map((name) => [flagKey(name), {
  backgroundColor: { image: `https://flagcdn.com/${flagCodes[name]}.svg` },
  borderColor: '#c7cdd1', borderWidth: 0.5, height: 20, width: 30
}]));

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
      left: 205,
      right: 55,
      top: 20,
      bottom: 35
    },
    xAxis: {
      type: 'value',
      min: 0,
      max: 20,
      interval: 5,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#7A838F',
        fontSize: 11,
        formatter: '{value}%'
      },
      splitLine: { lineStyle: { color: '#C5CBD1' } }
    },
    yAxis: {
      type: 'category',
      inverse: true,
      data: countries,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#2F3742',
        fontSize: 13,
        margin: 15,
        formatter: (name) => `{country|${name}}  {${flagKey(name)}|}`,
        rich: {
          country: { color: '#2F3742', fontSize: 13, lineHeight: 20, width: 145, align: 'right' },
          ...flagStyles
        }
      }
    },
    series: [{
      name: 'Share of total',
      type: 'bar',
      data: values,
      barWidth: 18,
      itemStyle: {
        color: function (params) {
          const lightness = 29 + (params.dataIndex * 3.25);
          return `hsl(205, 72%, ${lightness}%)`;
        }
      },
      label: {
        show: true,
        position: 'right',
        distance: 7,
        formatter: '{c}%',
        color: '#36434D',
        fontSize: 12,
        fontWeight: 700
      },
      emphasis: {
        itemStyle: { opacity: 0.82 }
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
