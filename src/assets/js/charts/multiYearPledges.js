const years = ['2022', '2023', '2024', '2025'];
const multiYear = [196, 176, 231, 165];
const nonMultiYear = [395, 390, 350, 277];
const total = [591, 566, 581, 442];
const multiYearPercent = [33, 31, 40, 37];
const nonMultiYearPercent = [67, 69, 60, 63];
const multiYearLineColor = '#005F61';

export function initMultiYearPledges(el, echarts) {
  const option = {
    textStyle: { fontFamily: 'Proxima Nova, Arial, sans-serif' },

    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(35, 46, 61, 0.035)' } },
      backgroundColor: '#ffffff',
      borderColor: '#D1D5DB',
      borderWidth: 0,
      padding: 0,
      textStyle: {
        color: '#232E3D',
        fontSize: 13
      },
      formatter: function (params) {
        const index = params[0].dataIndex;
        return detailedTooltip(years[index], `$${total[index]}M`, [
          { label: 'Multi-year pledges', color: SECONDARY_COLORS[0], value: `$${multiYear[index]}M`, detail: `${multiYearPercent[index]}%` },
          { label: 'Non-multi-year pledges', color: SECONDARY_COLORS[1], value: `$${nonMultiYear[index]}M`, detail: `${nonMultiYearPercent[index]}%` }
        ]);
      }
    },
    legend: {
      bottom: 0,
      left: 'center',
      icon: 'rect',
      itemWidth: 24,
      itemHeight: 8,
      itemGap: 24,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        fontSize: 12,
        color: '#4B5563'
      },
      data: [
        'Multi-year pledges',
        {
          name: '% from multi-year commitments',
          icon: 'path://M0 3 H24 V5 H0 Z'
        },
        'Non-multi-year pledges'
      ]
    },
    grid: {
      left: 55,
      right: 55,
      top: 35,
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
    yAxis: {
      type: 'value',
      min: 0,
      max: 600,
      interval: 100,
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
        formatter: '${value}M'
      },
      splitLine: { lineStyle: { color: '#C5CBD1' } }
    },
    series: [
      {
        name: 'Multi-year pledges',
        type: 'bar',
        stack: 'total',
        barWidth: 88,
        data: multiYear,
        itemStyle: { color: SECONDARY_COLORS[0], borderRadius: 0 },
        label: {
          show: true,
          position: 'inside',
          formatter: (params) => `$${params.value}M`,
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
        barWidth: 88,
        data: nonMultiYear,
        itemStyle: { color: SECONDARY_COLORS[1], borderRadius: 0 },
        label: {
          show: true,
          position: 'inside',
          formatter: (params) => `$${params.value}M`,
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
        barWidth: 88,
        barGap: '-100%',
        silent: true,
        itemStyle: { color: 'transparent', borderRadius: 0 },
        label: {
          show: true,
          position: 'top',
          distance: 8,
          formatter: (params) => `$${params.value}M`,
          color: '#232E3D',
          fontSize: 12,
          fontWeight: 700
        },
        z: 10
      },
      {
        name: '% from multi-year commitments',
        type: 'line',
        data: multiYear,
        symbol: 'circle',
        symbolSize: 10,
        lineStyle: {
          width: 3,
          color: multiYearLineColor
        },
        itemStyle: {
          color: multiYearLineColor,
          borderColor: multiYearLineColor,
          borderWidth: 0
        },
        label: {
          show: true,
          position: 'top',
          distance: 8,
          formatter: (params) => `${multiYearPercent[params.dataIndex]}%`,
          color: multiYearLineColor,
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          borderRadius: 0,
          padding: [3, 5],
          fontSize: 12,
          fontWeight: 800
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
import { detailedTooltip } from './detailedTooltip';
