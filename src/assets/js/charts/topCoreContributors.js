const data = [
  ['Germany', 105197907],
  ['Japan', 45391094],
  ['Sweden', 40911333],
  ['Switzerland', 38608749],
  ['Norway', 37343097],
  ['The Netherlands', 37037037],
  ['Canada', 29325513],
  ['Denmark', 19104386],
  ['Republic of Korea', 15370924],
  ['United Kingdom', 14666667],
  ['Belgium', 11560694],
  ['Ireland', 8959538],
  ['Qatar', 8000000],
  ['Spain', 7638073],
  ['New Zealand', 4793289],
  ['India', 4248772],
  ['Luxembourg', 3685532],
  ['China', 3450000],
  ['Saudi Arabia', 2000000],
  ['Austria', 1409249],
  ['Türkiye', 1200000],
  ['Finland', 1169591],
  ['Thailand', 865112],
  ['Kuwait', 570000],
  ['Singapore', 300000],
  ['Iceland', 238186],
  ['Viet Nam', 70000],
  ['Liechtenstein', 60729],
  ['Portugal', 50000],
  ['Cambodia**', 10000],
  ['Philippines', 10000],
  ['Samoa*', 6000]
];

const names = data.map((item) => item[0]);
const values = data.map((item) => item[1]);

const flagCodes = {
  Germany: 'de', Japan: 'jp', Sweden: 'se', Switzerland: 'ch', Norway: 'no',
  'The Netherlands': 'nl', Canada: 'ca', Denmark: 'dk', 'Republic of Korea': 'kr',
  'United Kingdom': 'gb', Belgium: 'be', Ireland: 'ie', Qatar: 'qa', Spain: 'es',
  'New Zealand': 'nz', India: 'in', Luxembourg: 'lu', China: 'cn',
  'Saudi Arabia': 'sa', Austria: 'at', 'Türkiye': 'tr', Finland: 'fi',
  Thailand: 'th', Kuwait: 'kw', Singapore: 'sg', Iceland: 'is',
  'Viet Nam': 'vn', Liechtenstein: 'li', Portugal: 'pt',
  'Cambodia**': 'kh', Philippines: 'ph', 'Samoa*': 'ws'
};

const flagUrls = Object.fromEntries(
  Object.entries(flagCodes).map(([name, code]) => [name, `https://flagcdn.com/${code}.svg`])
);

const flagKey = (name) => `flag_${name.replace(/[^a-zA-Z0-9]/g, '_')}`;
const flagStyles = Object.fromEntries(
  Object.entries(flagUrls).map(([name, url]) => [flagKey(name), {
    width: 28,
    height: 18,
    backgroundColor: { image: url },
    borderColor: '#C5CBD1',
    borderWidth: 1,
    align: 'center',
    verticalAlign: 'middle'
  }])
);

function formatValue(value) {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1).replace('.0', '')}M`;
  }

  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }

  return `$${value}`;
}

export function initTopCoreContributors(el, echarts) {
  const option = {
    textStyle: { fontFamily: 'Proxima Nova, Arial, sans-serif' },
    backgroundColor: '#ffffff',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: '#ffffff',
      borderColor: '#E5E7EB',
      borderWidth: 1,
      textStyle: {
        color: '#232E3D',
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        fontSize: 14
      },
      formatter: function (params) {
        const item = params[0];
        return `<strong>${item.name}</strong><br>Core contribution: <strong>$${item.value.toLocaleString('en-US')}</strong>`;
      }
    },
    grid: {
      top: 20,
      left: 235,
      right: 130,
      bottom: 45
    },
    xAxis: {
      type: 'value',
      max: 100000000,
      interval: 20000000,
      axisLabel: {
        color: '#7A8491',
        fontSize: 12,
        formatter: function (value) {
          return value === 0 ? '$0' : `$${value / 1000000}M`;
        }
      },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        lineStyle: { color: '#C5CBD1' }
      }
    },
    yAxis: [
      {
        type: 'category',
        inverse: true,
        data: names,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          interval: 0,
          width: 175,
          align: 'right',
          margin: 58,
          color: '#232E3D',
          fontFamily: 'Proxima Nova, Arial, sans-serif',
          fontSize: 13,
          lineHeight: 22
        }
      },
      {
        type: 'category',
        inverse: true,
        data: names,
        position: 'left',
        offset: 20,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          interval: 0,
          width: 34,
          align: 'center',
          margin: 8,
          formatter: function (name) {
            return `{${flagKey(name)}|}`;
          },
          rich: flagStyles
        }
      }
    ],
    series: [{
      name: 'Core contribution',
      type: 'bar',
      clip: false,
      data: values,
      barWidth: 22,
      itemStyle: {
        color: RESOURCE_COLORS.regular,
        borderRadius: 0
      },
      label: {
        show: true,
        position: 'right',
        distance: 9,
        color: '#4B5563',
        fontSize: 12,
        formatter: function (params) {
          return formatValue(params.value);
        }
      },
      emphasis: {
        itemStyle: { color: RESOURCE_COLORS.regular, opacity: 0.82 },
        label: {
          color: '#232E3D',
          fontWeight: 700
        }
      }
    }]
  };

  const chart = echarts.init(el);
  chart.setOption(option);

  Object.values(flagUrls).forEach((url) => {
    const image = new Image();
    image.addEventListener('load', () => chart.resize());
    image.src = url;
  });

  const resize = () => chart.resize();
  window.addEventListener('resize', resize);
  el.__echartsInstance = chart;
  el.__echartsResizeHandler = resize;

  return chart;
}

export default initTopCoreContributors;
import { RESOURCE_COLORS } from './chartColors';
