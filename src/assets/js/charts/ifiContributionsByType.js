const years = ['2022', '2023', '2024', '2025'];
const indirect = [183.380526, 138.235831, 127.851205, 113.326189];
const direct = [119.260389, 219.046226, 215.964761, 202.966471];
const total = [302.640915, 357.282057, 343.815966, 316.292660];
const ifiColors = ['#B7862B', '#7E492F'];

export function initIfiContributionsByType(el, echarts) {
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
      borderWidth: 0,
      padding: 0,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        color: '#232E3D',
        fontSize: 12
      },
      formatter: function (params) {
        const index = params[0].dataIndex;
        const indirectShare = indirect[index] / total[index] * 100;
        const directShare = direct[index] / total[index] * 100;

        return detailedTooltip(years[index], `$${total[index].toFixed(1).replace(/\.0$/, '')}M`, [
          { label: 'Indirect government financing', color: ifiColors[1], value: `$${indirect[index].toFixed(1).replace(/\.0$/, '')}M`, detail: `${indirectShare.toFixed(0)}%` },
          { label: 'Direct contribution', color: ifiColors[0], value: `$${direct[index].toFixed(1).replace(/\.0$/, '')}M`, detail: `${directShare.toFixed(0)}%` }
        ]);
      }
    },
    legend: {
      bottom: 5,
      left: 'center',
      icon: 'rect',
      itemWidth: 24,
      itemHeight: 8,
      itemGap: 26,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        fontSize: 11,
        color: '#4B5563'
      },
      data: [
        'Indirect government financing',
        'Direct contribution',
        {
          name: 'Total',
          icon: 'path://M0,2 L24,2 L24,6 L0,6 Z',
          itemStyle: {
            color: '#1C1C1C',
            borderColor: '#1C1C1C',
            borderWidth: 0
          }
        }
      ]
    },
    grid: {
      left: 25,
      right: 25,
      top: 10,
      bottom: 75,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: years,
      axisLine: { lineStyle: { color: '#D8DDE3' } },
      axisTick: { show: false },
      axisLabel: {
        color: '#303944',
        fontSize: 12,
        fontWeight: 600,
        margin: 13
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 400,
      interval: 100,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        show: true,
        color: '#7A838F',
        fontSize: 11,
        formatter: (value) => `$${value}M`
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#C5CBD1',
          width: 1
        }
      }
    },
    series: [
      {
        name: 'Indirect government financing',
        type: 'bar',
        data: indirect,
        barWidth: 66,
        barGap: '8%',
        barCategoryGap: '28%',
        itemStyle: { color: ifiColors[1] },
        label: {
          show: true,
          position: 'inside',
          formatter: (params) => `$${Math.round(params.value)}M`,
          color: '#ffffff',
          fontSize: 11,
          fontWeight: 700
        },
        emphasis: { itemStyle: { opacity: 0.82 } }
      },
      {
        name: 'Direct contribution',
        type: 'bar',
        data: direct,
        barWidth: 66,
        itemStyle: { color: ifiColors[0] },
        label: {
          show: true,
          position: 'inside',
          formatter: (params) => `$${Math.round(params.value)}M`,
          color: '#ffffff',
          fontSize: 11,
          fontWeight: 700
        },
        emphasis: { itemStyle: { opacity: 0.82 } }
      },
      {
        name: 'Total',
        type: 'line',
        data: total,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          color: '#1C1C1C',
          width: 2.5
        },
        itemStyle: {
          color: '#1C1C1C',
          borderColor: '#ffffff',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'top',
          distance: 10,
          formatter: (params) => `$${Math.round(params.value)}M`,
          color: '#1C1C1C',
          fontSize: 12,
          fontWeight: 700
        },
        emphasis: { scale: 1.25 },
        z: 20
      }
    ]
  });

  const resize = () => chart.resize();
  window.addEventListener('resize', resize);
  el.__echartsInstance = chart;
  el.__echartsResizeHandler = resize;

  return chart;
}

export default initIfiContributionsByType;
import { SECONDARY_COLORS } from './chartColors';
import { detailedTooltip } from './detailedTooltip';
