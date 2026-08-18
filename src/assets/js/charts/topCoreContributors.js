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
  ['Government of Iceland', 238186],
  ['Viet Nam', 70000],
  ['Government of Liechtenstein', 60729],
  ['Government of Portugal', 50000],
  ['Cambodia**', 10000],
  ['Philippines', 10000],
  ['Samoa*', 6000]
];

const names = data.map((item) => item[0]);
const values = data.map((item) => item[1]);

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
    title: {
      text: 'Core contributions by country',
      subtext: '2025',
      left: 0,
      top: 0,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        fontSize: 24,
        fontWeight: 700,
        color: '#232E3D'
      },
      subtextStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        fontSize: 14,
        color: '#6B7280'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: '#ffffff',
      borderColor: '#E5E7EB',
      borderWidth: 1,
      textStyle: {
        color: '#232E3D',
        fontFamily: 'Proxima Nova, Arial, sans-serif'
      },
      formatter: function (params) {
        const item = params[0];
        return `<strong>${item.name}</strong><br>Core contribution: <strong>$${item.value.toLocaleString()}</strong>`;
      }
    },
    grid: {
      top: 85,
      left: 190,
      right: 90,
      bottom: 35
    },
    xAxis: {
      type: 'value',
      max: 110000000,
      splitNumber: 5,
      axisLabel: {
        color: '#7A8491',
        fontSize: 11,
        formatter: function (value) {
          return value === 0 ? '$0' : `$${value / 1000000}M`;
        }
      },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        lineStyle: { color: '#E8EBEF' }
      }
    },
    yAxis: {
      type: 'category',
      inverse: true,
      data: names,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#232E3D',
        fontSize: 12,
        margin: 14
      }
    },
    series: [{
      name: 'Core contribution',
      type: 'bar',
      data: values,
      barWidth: 12,
      itemStyle: {
        color: function (params) {
          if (params.dataIndex === 0) return '#006EB5';
          if (params.dataIndex < 5) return '#00AEEF';
          return '#73D2DE';
        },
        borderRadius: 0
      },
      label: {
        show: true,
        position: 'right',
        distance: 7,
        color: '#4B5563',
        fontSize: 10,
        formatter: function (params) {
          return formatValue(params.value);
        }
      },
      emphasis: {
        itemStyle: { color: '#E94E87' },
        label: {
          color: '#232E3D',
          fontWeight: 700
        }
      }
    }]
  };

  const chart = echarts.init(el);
  chart.setOption(option);

  const resize = () => chart.resize();
  window.addEventListener('resize', resize);
  el.__echartsInstance = chart;
  el.__echartsResizeHandler = resize;

  return chart;
}

export default initTopCoreContributors;
