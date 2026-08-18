const years = ['2022', '2023', '2024', '2025'];
const multiYear = [196, 176, 231, 165];
const nonMultiYear = [395, 390, 350, 277];
const total = [591, 566, 581, 442];
const multiYearPercent = [33, 31, 40, 37];
const nonMultiYearPercent = [67, 69, 60, 63];

export function initMultiYearPledges(el, echarts) {
  const option = {
    textStyle: { fontFamily: 'Proxima Nova, Arial, sans-serif' },

    title: {
      text: 'Regular resources income from multi-year pledges',
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
        fontSize: 13,
        color: '#6B7280'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: '#ffffff',
      borderColor: '#D1D5DB',
      borderWidth: 1,
      padding: 14,
      textStyle: {
        color: '#232E3D',
        fontSize: 13
      },
      formatter: function (params) {
        const index = params[0].dataIndex;
        return `<div style="font-weight:700;margin-bottom:8px">${years[index]}</div>
          <div style="margin-bottom:5px">Multi-year pledges: <strong>$${multiYear[index]}m</strong> <span style="color:#6B7280">(${multiYearPercent[index]}%)</span></div>
          <div style="margin-bottom:5px">Non-multi-year pledges: <strong>$${nonMultiYear[index]}m</strong> <span style="color:#6B7280">(${nonMultiYearPercent[index]}%)</span></div>
          <div style="margin-top:8px;padding-top:8px;border-top:1px solid #E5E7EB">Total core contributions: <strong>$${total[index]}m</strong></div>`;
      }
    },
    legend: {
      bottom: 0,
      left: 'center',
      itemWidth: 14,
      itemHeight: 14,
      itemGap: 24,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        fontSize: 12,
        color: '#4B5563'
      },
      data: [
        'Multi-year pledges',
        'Non-multi-year pledges',
        '% from multi-year commitments'
      ]
    },
    grid: {
      left: 55,
      right: 55,
      top: 95,
      bottom: 85,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: years,
      axisLine: { lineStyle: { color: '#9CA3AF' } },
      axisTick: { show: false },
      axisLabel: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        fontSize: 12,
        color: '#4B5563',
        margin: 12
      }
    },
    yAxis: [
      {
        type: 'value',
        min: 0,
        max: 800,
        interval: 200,
        nameLocation: 'end',
        nameGap: 15,
        nameTextStyle: {
          color: '#6B7280',
          fontSize: 11
        },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: '#6B7280',
          fontSize: 11,
          formatter: '${value}m'
        },
        splitLine: { lineStyle: { color: '#E5E7EB' } }
      },
      {
        type: 'value',
        min: 0,
        max: 80,
        interval: 20,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: '#6B7280',
          fontSize: 11,
          formatter: '{value}%'
        },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: 'Multi-year pledges',
        type: 'bar',
        stack: 'total',
        barWidth: 48,
        data: multiYear,
        itemStyle: { color: SECONDARY_COLORS[0] },
        label: {
          show: true,
          position: 'inside',
          formatter: (params) => `$${params.value}m`,
          color: '#ffffff',
          fontSize: 11,
          fontWeight: 600
        },
        emphasis: { focus: 'series' }
      },
      {
        name: 'Non-multi-year pledges',
        type: 'bar',
        stack: 'total',
        barWidth: 48,
        data: nonMultiYear,
        itemStyle: { color: SECONDARY_COLORS[1] },
        label: {
          show: true,
          position: 'inside',
          formatter: (params) => `$${params.value}m`,
          color: '#ffffff',
          fontSize: 11,
          fontWeight: 600
        },
        emphasis: { focus: 'series' }
      },
      {
        name: 'Total',
        type: 'bar',
        data: total,
        barWidth: 48,
        barGap: '-100%',
        silent: true,
        itemStyle: { color: 'transparent' },
        label: {
          show: true,
          position: 'top',
          distance: 8,
          formatter: (params) => `$${params.value}m`,
          color: '#232E3D',
          fontSize: 12,
          fontWeight: 700
        },
        z: 10
      },
      {
        name: '% from multi-year commitments',
        type: 'line',
        yAxisIndex: 1,
        data: multiYearPercent,
        symbol: 'circle',
        symbolSize: 9,
        lineStyle: {
          width: 3,
          color: SECONDARY_COLORS[2]
        },
        itemStyle: {
          color: SECONDARY_COLORS[2],
          borderColor: '#ffffff',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'top',
          distance: 8,
          formatter: '{c}%',
          color: SECONDARY_COLORS[2],
          fontSize: 12,
          fontWeight: 700
        },
        z: 20
      }
    ]
  };

  const chart = echarts.init(el);
  chart.setOption(option);

  const resize = () => chart.resize();
  window.addEventListener('resize', resize);
  el.__echartsInstance = chart;
  el.__echartsResizeHandler = resize;

  return chart;
}

export default initMultiYearPledges;
import { SECONDARY_COLORS } from './chartColors';
