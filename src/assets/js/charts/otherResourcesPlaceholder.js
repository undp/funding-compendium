const categories = ['2022', '2023', '2024', '2025'];
const values = [62, 74, 68, 86];

export function initOtherResourcesPlaceholder(el, echarts) {
  const chart = echarts.init(el);

  chart.setOption({
    textStyle: {
      fontFamily: 'Proxima Nova, Arial, sans-serif',
      color: '#232E3D'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    grid: {
      left: 55,
      right: 30,
      top: 35,
      bottom: 45,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: categories,
      axisTick: { show: false },
      axisLine: { lineStyle: { color: '#9CA3AF' } }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#E5E7EB' } }
    },
    series: [{
      name: 'Placeholder data',
      type: 'bar',
      data: values,
      barMaxWidth: 48,
      itemStyle: { color: '#006EB5' },
      emphasis: { itemStyle: { color: '#E94E87' } }
    }]
  });

  const resize = () => chart.resize();
  window.addEventListener('resize', resize);
  el.__echartsInstance = chart;
  el.__echartsResizeHandler = resize;

  return chart;
}

export default initOtherResourcesPlaceholder;
