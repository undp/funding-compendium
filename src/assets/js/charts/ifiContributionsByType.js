const years = ['2022', '2023', '2024', '2025'];
const indirect = [183.380526, 138.235831, 127.851205, 113.326189];
const direct = [119.260389, 219.046226, 215.964761, 202.966471];
const total = [302.640915, 357.282057, 343.815966, 316.292660];

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
      borderWidth: 1,
      padding: 13,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        color: '#232E3D',
        fontSize: 12
      },
      formatter: function (params) {
        const index = params[0].dataIndex;
        const indirectShare = indirect[index] / total[index] * 100;
        const directShare = direct[index] / total[index] * 100;

        return `<div style="font-size:14px;font-weight:700;margin-bottom:9px">${years[index]}</div>
          <div style="display:flex;justify-content:space-between;gap:28px;margin-bottom:6px"><span>Indirect government financing</span><strong>$${indirect[index].toFixed(1)}M · ${indirectShare.toFixed(0)}%</strong></div>
          <div style="display:flex;justify-content:space-between;gap:28px;margin-bottom:6px"><span>Direct contribution</span><strong>$${direct[index].toFixed(1)}M · ${directShare.toFixed(0)}%</strong></div>
          <div style="margin-top:9px;padding-top:9px;border-top:1px solid #E5E7EB;display:flex;justify-content:space-between;gap:28px"><span>Total</span><strong>$${total[index].toFixed(1)}M</strong></div>`;
      }
    },
    legend: {
      bottom: 0,
      left: 'center',
      itemWidth: 14,
      itemHeight: 10,
      itemGap: 26,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        fontSize: 11,
        color: '#4B5563'
      },
      data: [
        'Indirect government financing',
        'Direct contribution',
        'Total'
      ]
    },
    grid: {
      left: 25,
      right: 25,
      top: 25,
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
      axisLabel: { show: false },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#EDF0F2',
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
        itemStyle: { color: SECONDARY_COLORS[0] },
        label: {
          show: true,
          position: 'inside',
          formatter: (params) => `$${Math.round(params.value)}M`,
          color: '#17372A',
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
        itemStyle: { color: SECONDARY_COLORS[1] },
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
          color: '#253746',
          width: 2.5
        },
        itemStyle: {
          color: '#253746',
          borderColor: '#ffffff',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'top',
          distance: 10,
          formatter: (params) => `$${Math.round(params.value)}M`,
          color: '#253746',
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
