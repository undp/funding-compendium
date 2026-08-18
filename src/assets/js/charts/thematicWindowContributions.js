const years = ['2022', '2023', '2024', '2025'];
const values = [119, 126, 115, 115];

export function initThematicWindowContributions(el, echarts) {
  const chart = echarts.init(el);

  chart.setOption({
    backgroundColor: '#ffffff',
    textStyle: {
      fontFamily: 'Proxima Nova, Arial, sans-serif'
    },
    title: {
      text: '',
      subtext: '$ millions',
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
      backgroundColor: '#ffffff',
      borderColor: '#D8DDE3',
      borderWidth: 1,
      padding: 10,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        color: '#232E3D',
        fontSize: 13
      },
      formatter: function (params) {
        const item = params[0];
        return `<strong>${item.axisValue}</strong><br>$${item.value}m`;
      }
    },
    grid: {
      left: 55,
      right: 35,
      top: 90,
      bottom: 45
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: years,
      axisLine: { lineStyle: { color: '#C9CED4' } },
      axisTick: { show: false },
      axisLabel: {
        color: '#59636E',
        fontSize: 12,
        margin: 12
      }
    },
    yAxis: {
      type: 'value',
      min: 100,
      max: 135,
      interval: 10,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#7A838F',
        fontSize: 11,
        formatter: '${value}m'
      },
      splitLine: { lineStyle: { color: '#E8EAED' } }
    },
    series: [{
      name: 'Contributions',
      type: 'line',
      data: values,
      symbol: 'circle',
      symbolSize: 9,
      lineStyle: {
        width: 3,
        color: '#688FA5'
      },
      itemStyle: {
        color: '#688FA5',
        borderColor: '#ffffff',
        borderWidth: 2
      },
      label: {
        show: true,
        position: 'top',
        distance: 10,
        formatter: '${c}m',
        color: '#36434D',
        fontSize: 12,
        fontWeight: 700
      },
      areaStyle: {
        color: 'rgba(104, 143, 165, 0.08)'
      },
      emphasis: { scale: 1.3 }
    }]
  });

  const resize = () => chart.resize();
  window.addEventListener('resize', resize);
  el.__echartsInstance = chart;
  el.__echartsResizeHandler = resize;

  return chart;
}

export default initThematicWindowContributions;
