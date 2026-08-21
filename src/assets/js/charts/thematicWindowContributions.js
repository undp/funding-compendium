import { detailedTooltip } from './detailedTooltip';

const years = ['2022', '2023', '2024', '2025'];
const values = [119, 126, 126, 115];

export function initThematicWindowContributions(el, echarts) {
  const chart = echarts.init(el);

  chart.setOption({
    backgroundColor: 'transparent',
    textStyle: {
      fontFamily: 'Proxima Nova, Arial, sans-serif'
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#ffffff',
      borderColor: '#D8DDE3',
      borderWidth: 0,
      padding: 0,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        color: '#232E3D',
        fontSize: 13
      },
      formatter: function (params) {
        const item = params[0];
        const index = item.dataIndex;
        const previous = index > 0 ? values[index - 1] : null;
        const change = previous === null ? '' : ((item.value - previous) / previous) * 100;
        const comparison = previous === null
          ? 'Starting year'
          : change === 0
            ? `No change from ${years[index - 1]}`
            : `${change > 0 ? 'Up' : 'Down'} ${Math.abs(change).toFixed(1).replace(/\.0$/, '')}% from ${years[index - 1]}`;
        return detailedTooltip(item.axisValue, `$${item.value}M`, [
          { label: 'Change from previous year', value: comparison }
        ]);
      }
    },
    grid: {
      left: 55,
      right: 35,
      top: 24,
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
        fontSize: 14,
        margin: 12
      }
    },
    yAxis: {
      type: 'value',
      min: 100,
      max: 129,
      interval: 10,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#7A838F',
        fontSize: 11,
        formatter: (value) => value === 129 ? '' : `$${value}M`
      },
      splitLine: { show: false }
    },
    series: [{
      name: 'Contributions',
      type: 'line',
      data: values,
      symbol: 'circle',
      symbolSize: 9,
      lineStyle: {
        width: 3,
        color: SECONDARY_COLORS[0]
      },
      itemStyle: {
        color: SECONDARY_COLORS[0],
        borderColor: '#ffffff',
        borderWidth: 2
      },
      label: {
        show: true,
        position: 'top',
        distance: 10,
        formatter: '${c}M',
        color: '#36434D',
        fontSize: 12,
        fontWeight: 700
      },
      areaStyle: {
        color: 'rgba(61, 153, 153, 0.10)'
      },
      markLine: {
        silent: true,
        symbol: 'none',
        label: { show: false },
        lineStyle: { color: '#C5CBD1', width: 1, type: 'solid' },
        data: [{ yAxis: 100 }, { yAxis: 110 }, { yAxis: 120 }]
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
import { SECONDARY_COLORS } from './chartColors';
